import { createContext, useContext, useState } from 'react';

const WorkerDataContext = createContext(null);

const initialJobs = [
  {
    id: 1,
    title: 'Full-time Nanny Position',
    clientName: 'Ahmed Family',
    clientType: 'Family',
    category: 'Childcare',
    city: 'Karachi',
    area: 'DHA Phase 6',
    payMin: 1800,
    payMax: 2200,
    duration: '3 months',
    startDate: 'May 10, 2026',
    description: 'Looking for an experienced nanny to care for our 2-year-old daughter. Must have experience with toddlers and CPR certification.',
    applicationsCount: 8,
    postedAt: '2 hours ago',
    applied: false
  },
  {
    id: 2,
    title: 'Weekend Childcare Needed',
    clientName: 'Kamran Malik',
    clientType: 'Individual',
    category: 'Childcare',
    city: 'Karachi',
    area: 'Clifton',
    payMin: 1500,
    payMax: 1800,
    duration: 'Ongoing',
    startDate: 'May 8, 2026',
    description: 'Need reliable childcare for weekends (Saturday & Sunday) for our 5-year-old son. Meal prep skills preferred.',
    applicationsCount: 5,
    postedAt: '5 hours ago',
    applied: false
  },
  {
    id: 3,
    title: 'Event Childcare - Wedding',
    clientName: 'Royal Events PK',
    clientType: 'Event Organizer',
    category: 'Event Staffing',
    city: 'Lahore',
    area: 'Gulberg',
    payMin: 2500,
    payMax: 3000,
    duration: '1 day',
    startDate: 'May 15, 2026',
    description: 'Need 3 childcare providers for wedding event. Must be comfortable managing multiple children (ages 2-8) in a festive environment.',
    applicationsCount: 15,
    postedAt: '1 day ago',
    applied: true
  },
  {
    id: 4,
    title: 'Daily House Help & Meal Prep',
    clientName: 'Zainab Household',
    clientType: 'Family',
    category: 'Domestic Help',
    city: 'Islamabad',
    area: 'F-7',
    payMin: 1200,
    payMax: 1500,
    duration: '6 months',
    startDate: 'May 5, 2026',
    description: 'Looking for daily house help for cleaning, laundry, and light meal preparation. 5 days a week.',
    applicationsCount: 12,
    postedAt: '2 days ago',
    applied: false
  },
  {
    id: 5,
    title: 'Senior Citizen Companion & Driver',
    clientName: 'Dr. Tariq Hassan',
    clientType: 'Individual',
    category: 'Driving',
    city: 'Lahore',
    area: 'Model Town',
    payMin: 2000,
    payMax: 2500,
    duration: '1 month',
    startDate: 'May 12, 2026',
    description: 'Require a courteous driver/companion for daily clinic visits and groceries. Clean driving record required.',
    applicationsCount: 4,
    postedAt: '3 hours ago',
    applied: false
  },
  {
    id: 6,
    title: 'Handyman / Repair Work',
    clientName: 'Apex Offices',
    clientType: 'Business',
    category: 'Handyman',
    city: 'Karachi',
    area: 'PECHS',
    payMin: 3000,
    payMax: 4000,
    duration: '2 days',
    startDate: 'May 9, 2026',
    description: 'Minor carpentry, fixture replacements, and paint touch-ups for corporate office space.',
    applicationsCount: 9,
    postedAt: '1 day ago',
    applied: false
  }
];

const initialApplications = [
  {
    id: 101,
    jobId: 3,
    title: 'Event Childcare - Wedding',
    clientName: 'Royal Events PK',
    category: 'Event Staffing',
    city: 'Lahore',
    payMin: 2500,
    payMax: 3000,
    duration: '1 day',
    startDate: 'May 15, 2026',
    status: 'accepted',
    appliedDate: 'May 1, 2026'
  },
  {
    id: 102,
    jobId: 99,
    title: 'Afternoon Tutor for Grade 4',
    clientName: 'Mrs. Sara Bilal',
    category: 'Tutoring',
    city: 'Karachi',
    payMin: 1800,
    payMax: 2000,
    duration: '2 weeks',
    startDate: 'May 2, 2026',
    status: 'pending',
    appliedDate: 'April 29, 2026'
  },
  {
    id: 103,
    jobId: 98,
    title: 'Relocation & Moving Assistant',
    clientName: 'SwiftRelo Co.',
    category: 'Moving',
    city: 'Karachi',
    payMin: 2200,
    payMax: 2500,
    duration: '1 day',
    startDate: 'April 25, 2026',
    status: 'declined',
    appliedDate: 'April 20, 2026'
  }
];

const initialSchedule = [
  {
    id: 201,
    jobTitle: 'Daily Childcare & Tutoring',
    clientName: 'Ahmed Family',
    date: 'May 5, 2026',
    time: '9:00 AM - 5:00 PM',
    status: 'confirmed',
    location: 'DHA Phase 6, Karachi',
    pay: 'PKR 2,200/day'
  },
  {
    id: 202,
    jobTitle: 'Weekend Care',
    clientName: 'Khan Family',
    date: 'May 10, 2026',
    time: '10:00 AM - 6:00 PM',
    status: 'confirmed',
    location: 'Clifton Block 4, Karachi',
    pay: 'PKR 1,800/day'
  },
  {
    id: 203,
    jobTitle: 'Event Childcare - Wedding',
    clientName: 'Royal Events PK',
    date: 'May 15, 2026',
    time: '4:00 PM - 11:00 PM',
    status: 'confirmed',
    location: 'Gulberg III, Lahore',
    pay: 'PKR 3,000/day'
  }
];

const initialReviews = [
  {
    id: 301,
    clientName: 'Sadia Malik',
    rating: 5,
    date: 'April 28, 2026',
    jobTitle: 'Childcare & House Support',
    comment: 'Fatima was incredible with our two toddlers! Punctual, extremely gentle, and responsible. Highly recommended!'
  },
  {
    id: 302,
    clientName: 'Usman Farooq',
    rating: 5,
    date: 'April 15, 2026',
    jobTitle: 'Birthday Party Event Assistant',
    comment: 'Managed 10+ kids smoothly at our party. Kept them engaged with games and ensured complete safety.'
  },
  {
    id: 303,
    clientName: 'Ayesha Khan',
    rating: 4,
    date: 'March 30, 2026',
    jobTitle: 'Weekend Babysitting',
    comment: 'Very pleasant and trustworthy. Will definitely hire again.'
  }
];

export function WorkerDataProvider({ children }) {
  const [jobs, setJobs] = useState(initialJobs);
  const [applications, setApplications] = useState(initialApplications);
  const [schedule] = useState(initialSchedule);
  const [reviews] = useState(initialReviews);

  const applyForJob = (jobId) => {
    setJobs((prevJobs) =>
      prevJobs.map((j) =>
        j.id === jobId
          ? { ...j, applied: true, applicationsCount: j.applicationsCount + 1 }
          : j
      )
    );

    const targetJob = jobs.find((j) => j.id === jobId);
    if (targetJob) {
      const newApp = {
        id: Date.now(),
        jobId: targetJob.id,
        title: targetJob.title,
        clientName: targetJob.clientName,
        category: targetJob.category,
        city: targetJob.city,
        payMin: targetJob.payMin,
        payMax: targetJob.payMax,
        duration: targetJob.duration,
        startDate: targetJob.startDate,
        status: 'pending',
        appliedDate: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        })
      };

      setApplications((prevApps) => [newApp, ...prevApps]);
    }
  };

  return (
    <WorkerDataContext.Provider
      value={{
        jobs,
        applications,
        schedule,
        reviews,
        applyForJob
      }}
    >
      {children}
    </WorkerDataContext.Provider>
  );
}

export function useWorkerData() {
  const context = useContext(WorkerDataContext);
  if (!context) {
    throw new Error('useWorkerData must be used within a WorkerDataProvider');
  }
  return context;
}
