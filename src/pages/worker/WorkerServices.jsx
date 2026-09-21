import { CheckCircle2, MapPin } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useWorkerData } from '../../context/WorkerDataContext';
import WorkerServiceForm from '../../components/WorkerServiceForm';
import { CategoryChip } from '../../components/CategoryChip';
import { BACKEND_CATEGORIES } from '../../api/categories';
import { formatDate, formatPKR } from '../../constants/hiring';

export default function WorkerServices() {
  const { user } = useAuth();
  const { services, profile, postService } = useWorkerData();
  const [posted, setPosted] = useState(false);

  const mainCategory = user?.workerBio?.expertiseCategory || user?.workerBio?.expertiseCategories?.[0] || '';

  const handlePost = async (form) => {
    await postService(form);
    setPosted(true);
    setTimeout(() => setPosted(false), 3000);
  };

  return (
    <div className="p-4 sm:p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[#0A0A0A]">My Services</h1>
        <p className="text-gray-600 mt-1">Post each service you offer. Clients hire you through them.</p>
      </div>

      <div className="grid xl:grid-cols-5 gap-6 items-start">
        <section className="xl:col-span-3 bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 space-y-6">
          <h2 className="text-xl font-bold text-[#0A0A0A]">Post a new service</h2>
          {posted && (
            <div role="status" className="bg-emerald-50 border border-emerald-300 text-emerald-800 p-4 rounded-xl flex items-center gap-3 text-sm font-medium">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              Service posted.
            </div>
          )}
          <WorkerServiceForm categories={BACKEND_CATEGORIES} defaultCategory={mainCategory} defaultCity={profile?.city || user?.city || ''} onPost={handlePost} />
        </section>

        <section className="xl:col-span-2 space-y-4">
          <h2 className="text-xl font-bold text-[#0A0A0A]">Services you posted here</h2>
          {services.length === 0 ? (
            <p className="text-sm text-gray-500 bg-white rounded-2xl border border-gray-100 p-6">
              Nothing posted from this device yet.
            </p>
          ) : (
            services.map((service) => (
              <div key={service.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <CategoryChip variant="orange">{service.category}</CategoryChip>
                  <span
                    className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                      service.is_available ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    {service.is_available ? 'AVAILABLE' : 'UNAVAILABLE'}
                  </span>
                </div>
                <p className="text-sm text-gray-700 whitespace-pre-line">{service.job_description}</p>
                <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {service.area}, {service.city}
                  </span>
                  <span className="font-bold text-[#FF6B00] text-sm">{formatPKR(service.rate)}</span>
                </div>
                <div className="text-[11px] text-gray-400">Posted {formatDate(service.created_at)}</div>
              </div>
            ))
          )}
        </section>
      </div>
    </div>
  );
}
