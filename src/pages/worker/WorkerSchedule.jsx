import { useState } from 'react';
import { useWorkerData } from '../../context/WorkerDataContext';
import { StatusPill } from '../../components/StatusPill';
import { Clock, MapPin, User, CheckCircle2 } from 'lucide-react';
import { endDateFor, parseDate } from '../../constants/hiring';

// Days of `year`/`month` covered by each booking, keyed by day number.
function bookingsByDay(schedule, year, month) {
  const days = {};
  schedule.forEach((item) => {
    const start = parseDate(item.startDate);
    if (Number.isNaN(start.getTime())) return;
    const end = endDateFor(item.startDate, item.durationType, item.durationCount) || new Date(year, month + 1, 0);
    const cursor = new Date(start);
    while (cursor <= end) {
      if (cursor.getFullYear() === year && cursor.getMonth() === month) {
        (days[cursor.getDate()] ||= []).push(item.jobTitle);
      }
      cursor.setDate(cursor.getDate() + 1);
    }
  });
  return days;
}

export default function WorkerSchedule() {
  const { schedule } = useWorkerData();
  const [viewMode, setViewMode] = useState('list');

  // The calendar opens on the month of the earliest booking (or today if there are none).
  const starts = schedule.map((item) => parseDate(item.startDate)).filter((d) => !Number.isNaN(d.getTime()));
  const shown = starts.length ? new Date(Math.min(...starts)) : new Date();
  const year = shown.getFullYear();
  const month = shown.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const leadingBlanks = (new Date(year, month, 1).getDay() + 6) % 7; // weeks start on Monday
  const booked = bookingsByDay(schedule, year, month);
  const confirmedCount = schedule.filter((item) => item.status === 'confirmed').length;

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
            <h2 className="text-lg font-bold text-[#0A0A0A]">
              {shown.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h2>
            <span className="text-xs text-gray-500 font-medium">{confirmedCount} Confirmed Bookings</span>
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
            {Array.from({ length: leadingBlanks }, (_, i) => (
              <div key={`blank-${i}`} />
            ))}
            {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
              const titles = booked[day];
              const hasBooking = Boolean(titles);

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
                    <div className="bg-[#FF6B00] text-white text-[10px] p-1 rounded font-semibold truncate" title={titles.join(', ')}>
                      {titles[0]}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {schedule.length === 0 && (
            <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 text-sm text-gray-500">
              No confirmed bookings yet. Accepted hire requests and job applications will show up here.
            </div>
          )}
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
                  <div className="text-xs text-gray-400">Rate</div>
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
