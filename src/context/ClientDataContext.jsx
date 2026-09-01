import { createContext, useContext, useState } from 'react';

const ClientDataContext = createContext(null);

const initialClientJobs = [
  {
    id: 1,
    title: 'Experienced Nanny Needed for Toddler',
    category: 'Childcare',
    city: 'Karachi',
    area: 'DHA Phase 6',
    payMin: 1800,
    payMax: 2200,
    duration: 'Ongoing',
    startDate: 'May 10, 2026',
    description: 'Looking for a caring, experienced nanny to look after our 2-year-old daughter. Flexible daytime hours.',
    status: 'Open',
    postedAt: '2 hours ago',
    applicants: [
      {
        id: 101,
        workerId: 1,
        workerName: 'Fatima Ahmed',
        rating: 4.9,
        proposedRate: 2000,
        experience: '3 years',
        category: 'Childcare'
      },
      {
        id: 102,
        workerId: 2,
        workerName: 'Ayesha Khan',
        rating: 5.0,
        proposedRate: 1800,
        experience: '5 years',
        category: 'Childcare'
      }
    ]
  },
  {
    id: 2,
    title: 'Wedding Event Assistant Staff (3 People)',
    category: 'Event Staffing',
    city: 'Lahore',
    area: 'Gulberg III',
    payMin: 2500,
    payMax: 3000,
    duration: 'One-time',
    startDate: 'May 15, 2026',
    description: 'Need energetic event staff to assist with guest greeting, seating coordination, and gift distribution.',
    status: 'Assigned',
    assignedWorker: 'Ali Hassan',
    postedAt: '1 day ago',
    applicants: [
      {
        id: 103,
        workerId: 3,
        workerName: 'Ali Hassan',
        rating: 4.8,
        proposedRate: 2700,
        experience: '4 years',
        category: 'Event Staffing'
      }
    ]
  },
  {
    id: 3,
    title: 'Daily House Help & Deep Kitchen Clean',
    category: 'Domestic Help',
    city: 'Islamabad',
    area: 'F-7',
    payMin: 1200,
    payMax: 1500,
    duration: 'Ongoing',
    startDate: 'April 20, 2026',
    description: 'Routine daily cleaning, floor washing, dishwashing, and weekly refrigerator deep cleaning.',
    status: 'Completed',
    assignedWorker: 'Sadia Bibi',
    totalPaid: 15000,
    postedAt: '2 weeks ago',
    hasReview: true,
    applicants: []
  }
];

const initialWorkers = [
  {
    id: 1,
    name: 'Fatima Ahmed',
    category: 'Childcare',
    skills: ['Toddler Care', 'CPR Certified', 'Meal Prep'],
    city: 'Karachi',
    experience: 3,
    rating: 4.9,
    reviewsCount: 24,
    verified: true,
    hourlyRate: 500
  },
  {
    id: 2,
    name: 'Ayesha Khan',
    category: 'Childcare',
    skills: ['Newborn Care', 'First Aid', 'Early Learning'],
    city: 'Islamabad',
    experience: 5,
    rating: 5.0,
    reviewsCount: 38,
    verified: true,
    hourlyRate: 600
  },
  {
    id: 3,
    name: 'Ali Hassan',
    category: 'Event Staffing',
    skills: ['Guest Coordination', 'Valet Service', 'Setup'],
    city: 'Lahore',
    experience: 4,
    rating: 4.8,
    reviewsCount: 19,
    verified: true,
    hourlyRate: 550
  },
  {
    id: 4,
    name: 'Muhammad Raza',
    category: 'Handyman',
    skills: ['Fixture Replacement', 'Painting', 'Carpentry'],
    city: 'Karachi',
    experience: 6,
    rating: 4.7,
    reviewsCount: 42,
    verified: false,
    hourlyRate: 700
  },
  {
    id: 5,
    name: 'Tariq Mehmood',
    category: 'Driving',
    skills: ['City Navigation', 'Automatic & Manual', 'Clean CNIC'],
    city: 'Lahore',
    experience: 8,
    rating: 4.9,
    reviewsCount: 51,
    verified: true,
    hourlyRate: 650
  },
  {
    id: 6,
    name: 'Sadia Bibi',
    category: 'Domestic Help',
    skills: ['Deep Cleaning', 'Laundry', 'Ironing'],
    city: 'Islamabad',
    experience: 4,
    rating: 4.9,
    reviewsCount: 29,
    verified: true,
    hourlyRate: 450
  }
];

const initialClientReviews = [
  {
    id: 301,
    workerName: 'Sadia Bibi',
    jobTitle: 'Daily House Help & Deep Kitchen Clean',
    rating: 5,
    date: 'April 28, 2026',
    comment: 'Sadia was incredibly thorough and polite! Kept everything sparkling clean and completed all tasks efficiently.'
  },
  {
    id: 302,
    workerName: 'Ali Hassan',
    jobTitle: 'Corporate Dinner Event Assistance',
    rating: 5,
    date: 'April 10, 2026',
    comment: 'Great attitude, handled guest arrivals smoothly without any supervision needed.'
  }
];

export function ClientDataProvider({ children }) {
  const [clientJobs, setClientJobs] = useState(initialClientJobs);
  const [workers] = useState(initialWorkers);
  const [clientReviews, setClientReviews] = useState(initialClientReviews);
  const [sentOffers, setSentOffers] = useState([]);

  const postJob = (jobData) => {
    const newJob = {
      id: Date.now(),
      title: jobData.title,
      category: jobData.category,
      city: jobData.city,
      area: jobData.area || 'Central',
      payMin: Number(jobData.payMin) || 1500,
      payMax: Number(jobData.payMax) || 2000,
      duration: jobData.duration || 'One-time',
      startDate: jobData.startDate || 'Immediate',
      description: jobData.description,
      status: 'Open',
      postedAt: 'Just now',
      applicants: []
    };

    setClientJobs((prev) => [newJob, ...prev]);
    return newJob;
  };

  const acceptApplicant = (jobId, applicantId) => {
    setClientJobs((prevJobs) =>
      prevJobs.map((job) => {
        if (job.id === jobId) {
          const applicant = job.applicants.find((a) => a.id === applicantId);
          return {
            ...job,
            status: 'Assigned',
            assignedWorker: applicant ? applicant.workerName : 'Worker'
          };
        }
        return job;
      })
    );
  };

  const sendOffer = (workerId, offerData) => {
    const worker = workers.find((w) => w.id === workerId);
    const newOffer = {
      id: Date.now(),
      workerId,
      workerName: worker ? worker.name : 'Worker',
      proposedRate: offerData.proposedRate,
      jobDescription: offerData.jobDescription,
      sentAt: 'Just now',
      status: 'Pending'
    };

    setSentOffers((prev) => [newOffer, ...prev]);
  };

  const addReview = (reviewData) => {
    const newReview = {
      id: Date.now(),
      workerName: reviewData.workerName,
      jobTitle: reviewData.jobTitle || 'Service Contract',
      rating: Number(reviewData.rating),
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }),
      comment: reviewData.comment
    };

    setClientReviews((prev) => [newReview, ...prev]);

    if (reviewData.jobId) {
      setClientJobs((prevJobs) =>
        prevJobs.map((j) => (j.id === reviewData.jobId ? { ...j, hasReview: true } : j))
      );
    }
  };

  return (
    <ClientDataContext.Provider
      value={{
        clientJobs,
        workers,
        clientReviews,
        sentOffers,
        postJob,
        acceptApplicant,
        sendOffer,
        addReview
      }}
    >
      {children}
    </ClientDataContext.Provider>
  );
}

export function useClientData() {
  const context = useContext(ClientDataContext);
  if (!context) {
    throw new Error('useClientData must be used within a ClientDataProvider');
  }
  return context;
}
