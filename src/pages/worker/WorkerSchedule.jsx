import { useState } from 'react';
import { useWorkerData } from '../../context/WorkerDataContext';
import { StatusPill } from '../../components/StatusPill';
import { Calendar as CalendarIcon, Clock, MapPin, DollarSign, User, CheckCircle2 } from 'lucide-react';

export default function WorkerSchedule() {
  const { schedule } = useWorkerData();
  const [viewMode, setViewMode] = useState('list');

  return (
    <div className="p-8 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#0A0A0A]">Work Schedule</h1>
          <p className="text-gray-600 mt-1">View your confirmed upcoming job shifts and bookings</p>
        </div>

        {/* View mode toggle */}
        <div className="flex bg-gray-200 p-1 rounded-xl w-fit">
          <button
            type="button"
            onClick={() => setViewMode('list')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
              viewMode === 'list' ? 'bg-white text-[#0A0A0A] shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            List View
          </button>
          <button
            type="button"
            onClick={() => setViewMode('calendar')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
              viewMode === 'calendar' ? 'bg-white text-[#0A0A0A] shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Calendar View
          </button>
        </div>
      </div>

      {viewMode === 'calendar' ? (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-6">
          <div className="flex items-center justify-between border-b pb-4">
            <h2 className="text-lg font-bold text-[#0A0A0A]">May 2026</h2>
            <span className="text-xs text-gray-500 font-medium">3 Confirmed Bookings</span>
          </div>

          <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-gray-400 mb-2">
            <div>MON</div>
            <div>TUE</div>
            <div>WED</div>
            <div>THU</div>
            <div>FRI</div>
            <div>SAT</div>
            <div>SUN</div>
          </div>

          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
              const hasBooking = day === 5 || day === 10 || day === 15;
              const bookingDetail = day === 5 ? 'Childcare' : day === 10 ? 'Weekend Care' : day === 15 ? 'Wedding Event' : null;

              return (
                <div
                  key={day}
                  className={`min-h-[70px] p-2 border rounded-xl flex flex-col justify-between transition-all ${
                    hasBooking
                      ? 'border-[#FF6B00] bg-[#FFF0E6]'
                      : 'border-gray-100 bg-[#F9F9F9]'
                  }`}
                >
                  <span className={`text-xs font-bold ${hasBooking ? 'text-[#FF6B00]' : 'text-gray-600'}`}>{day}</span>
                  {hasBooking && (
                    <div className="bg-[#FF6B00] text-white text-[10px] p-1 rounded font-semibold truncate">
                      {bookingDetail}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {schedule.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:border-[#FF6B00] transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
            >
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="text-xl font-bold text-[#0A0A0A]">{item.jobTitle}</h3>
                  <StatusPill status={item.status}>
                    {item.status.toUpperCase()}
                  </StatusPill>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-gray-600 pt-2">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-400" />
                    <span>Client: <strong className="text-gray-800">{item.clientName}</strong></span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span>{item.date} • {item.time}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span>{item.location}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 border-t sm:border-t-0 sm:border-l border-gray-100 pt-4 sm:pt-0 sm:pl-6 w-full sm:w-auto justify-between sm:justify-start">
                <div>
                  <div className="text-xs text-gray-400">Total Pay</div>
                  <div className="font-bold text-[#FF6B00] text-lg">{item.pay}</div>
                </div>
                <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
