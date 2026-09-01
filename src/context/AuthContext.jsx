import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('quickhire_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (e) {
      console.error('Error loading user from localStorage:', e);
      return null;
    }
  });

  const [role, setRole] = useState(() => {
    try {
      const savedRole = localStorage.getItem('quickhire_role');
      if (savedRole) return savedRole;
      const savedUser = localStorage.getItem('quickhire_user');
      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        return parsed?.role || null;
      }
    } catch (e) {
      console.error('Error loading role from localStorage:', e);
    }
    return null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('quickhire_user', JSON.stringify(user));
      localStorage.setItem('quickhire_role', user.role || role || 'worker');
    } else {
      localStorage.removeItem('quickhire_user');
      localStorage.removeItem('quickhire_role');
    }
  }, [user, role]);

  const login = (email, password, userRole = 'worker') => {
    const defaultUser = userRole === 'worker' 
      ? {
          name: 'Fatima Ahmed',
          email: email || 'fatima@quickhire.pk',
          phone: '+92 300 1234567',
          city: 'Karachi',
          category: 'Childcare',
          experience: 3,
          role: 'worker',
          rating: 4.9,
          completedJobs: 24,
          earningsThisWeek: 18500,
          isOnDuty: true
        }
      : {
          name: 'Ali Raza',
          email: email || 'ali@quickhire.pk',
          phone: '+92 302 9876543',
          city: 'Lahore',
          role: 'client'
        };

    setUser(defaultUser);
    setRole(userRole);
    return defaultUser;
  };

  const register = (formData, userRole = 'client') => {
    const newUser = {
      name: formData.name || (userRole === 'worker' ? 'New Worker' : 'New Client'),
      email: formData.email || 'user@quickhire.pk',
      phone: formData.phone || '+92 300 0000000',
      city: formData.city || 'Karachi',
      category: formData.category || 'General',
      experience: formData.experience || 1,
      role: userRole,
      rating: 5.0,
      completedJobs: 0,
      earningsThisWeek: 0,
      isOnDuty: true
    };

    setUser(newUser);
    setRole(userRole);
    return newUser;
  };

  const logout = () => {
    setUser(null);
    setRole(null);
    localStorage.removeItem('quickhire_user');
    localStorage.removeItem('quickhire_role');
  };

  const updateProfile = (updatedFields) => {
    setUser((prev) => {
      const updated = { ...prev, ...updatedFields };
      localStorage.setItem('quickhire_user', JSON.stringify(updated));
      return updated;
    });
  };

  const toggleDuty = () => {
    setUser((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, isOnDuty: !prev.isOnDuty };
      localStorage.setItem('quickhire_user', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role || role,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updateProfile,
        toggleDuty
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
