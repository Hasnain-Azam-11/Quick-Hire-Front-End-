import { useWorkerData } from '../../context/WorkerDataContext';
import { StatusPill } from '../../components/StatusPill';
import { CategoryChip } from '../../components/CategoryChip';
import { Calendar, MapPin, DollarSign, Clock, FileText } from 'lucide-react';
import { formatDate, formatPayRange } from '../../constants/hiring';

export default function WorkerApplications() {
  const { applications } = useWorkerData();

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[#0A0A0A]">My Applications</h1>
        <p className="text-gray-600 mt-1">Track the status of your submitted job applications</p>
      </div>

      {applications.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 space-y-3">
          <div className="w-16 h-16 bg-[#F5F5F5] rounded-full flex items-center justify-center mx-auto text-gray-400">
            <FileText className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-[#0A0A0A]">No Applications Yet</h3>
          <p className="text-gray-500 text-sm max-w-md mx-auto">
            You haven't submitted any job applications yet. Head over to Browse Jobs to find open postings.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => (
            <div
              key={app.id}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:border-gray-200 transition-all space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-xl font-bold text-[#0A0A0A]">{app.title}</h2>
                    <StatusPill status={app.status}>
                      {app.status.toUpperCase()}
                    </StatusPill>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <CategoryChip variant="orange">{app.category}</CategoryChip>
                    <span>• Client: <strong className="text-gray-800">{app.clientName}</strong></span>
                  </div>
                </div>

                <div className="text-right sm:text-right text-xs text-gray-500">
                  <span>Applied on: <strong className="text-gray-700">{app.appliedDate}</strong></span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-[#F5F5F5] rounded-xl text-xs">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <div>
                    <div className="text-gray-500">Location</div>
                    <div className="font-semibold text-gray-800">{app.city}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-[#FF6B00]" />
                  <div>
                    <div className="text-gray-500">Pay Range</div>
                    <div className="font-bold text-[#FF6B00]">{formatPayRange(app.payMin, app.payMax)} / {app.payUnit}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <div>
                    <div className="text-gray-500">Duration</div>
                    <div className="font-semibold text-gray-800">{app.duration}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <div>
                    <div className="text-gray-500">Start Date</div>
                    <div className="font-semibold text-gray-800">{formatDate(app.startDate)}</div>
                  </div>
                </div>
              </div>

              {app.status === 'accepted' && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-xs text-emerald-800 flex items-center justify-between">
                  <div>
                    <strong>Congratulations!</strong> The client accepted your application. Check your Schedule tab for shift timing details.
                  </div>
                </div>
              )}

              {app.status === 'declined' && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-xs text-red-700">
                  This application was not selected. Keep applying for other open postings on the platform!
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
