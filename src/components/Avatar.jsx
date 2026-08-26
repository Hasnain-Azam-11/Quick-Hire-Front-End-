export function Avatar({ src, name, size = 'md', verified }) {
  const sizes = {
    sm: 'w-10 h-10 text-sm',
    md: 'w-12 h-12 text-base',
    lg: 'w-16 h-16 text-xl',
    xl: 'w-32 h-32 text-4xl'
  };

  const badgeSizes = {
    sm: 'w-3 h-3 bottom-0 right-0',
    md: 'w-4 h-4 bottom-0 right-0',
    lg: 'w-5 h-5 bottom-0 right-0',
    xl: 'w-8 h-8 bottom-1 right-1'
  };

  const getInitials = (name) => {
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <div className="relative inline-block">
      {src ? (
        <img
          src={src}
          alt={name}
          className={`${sizes[size]} rounded-full object-cover border-2 border-white shadow-md`}
        />
      ) : (
        <div className={`${sizes[size]} rounded-full bg-gradient-to-br from-[#FF6B00] to-[#FF8C3A] flex items-center justify-center text-white border-2 border-white shadow-md`}>
          {getInitials(name)}
        </div>
      )}
      {verified && (
        <div className={`absolute ${badgeSizes[size]} bg-[#22C55E] rounded-full border-2 border-white flex items-center justify-center`}>
          <svg className="w-2/3 h-2/3 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
      )}
    </div>
  );
}