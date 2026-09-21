import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BadgeCheck,
  Calendar,
  CalendarClock,
  CheckCircle2,
  ChevronRight,
  Circle,
  Clock,
  Inbox,
  MapPin,
  Search,
  Settings,
  Star,
  Store,
  Wallet,
  XCircle,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useWorkerData } from '../../context/WorkerDataContext';
import { Avatar } from '../../components/Avatar';
import { Button } from '../../components/Button';
import { CategoryChip } from '../../components/CategoryChip';
import { StatusPill } from '../../components/StatusPill';
import { formatDate, formatDuration, formatPayRange, formatPKR, parseDate, timeAgo } from '../../constants/hiring';

const TABS = [
  { id: 'requests', label: 'Hire Requests', icon: Inbox },
  { id: 'upcoming', label: 'Upcoming Jobs', icon: CalendarClock },
  { id: 'jobs', label: 'Open Jobs', icon: Search },
];

function greeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

const startTime = (value) => {
  const t = parseDate(value).getTime();
  return Number.isNaN(t) ? Infinity : t;
};

function StatCard({ to, icon: Icon, label, value, hint, tone }) {
  return (
    <Link
      to={to}
      className="group bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:border-[#FF6B00]/40 transition-all flex items-start gap-4"
    >
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${tone}`}>
        <Icon size={22} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-2xl font-extrabold text-[#0A0A0A] truncate">{value}</div>
        <div className="text-xs font-semibold text-gray-500">{label}</div>
        {hint && <div className="text-[11px] text-gray-400 mt-0.5 truncate">{hint}</div>}
      </div>
      <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-[#FF6B00] group-hover:translate-x-0.5 transition-all mt-1" />
    </Link>
  );
}

function EmptyState({ icon: Icon, title, text, to, cta }) {
  return (
    <div className="py-12 text-center space-y-3">
      <div className="w-14 h-14 rounded-full bg-[#F5F5F5] text-gray-400 flex items-center justify-center mx-auto">
        <Icon className="w-7 h-7" />
      </div>
      <h3 className="font-bold text-[#0A0A0A]">{title}</h3>
      <p className="text-sm text-gray-500 max-w-sm mx-auto">{text}</p>
      {to && (
        <Link to={to}>
          <Button variant="outline" className="text-xs py-2 px-5 font-semibold mt-1">{cta}</Button>
        </Link>
      )}
    </div>
  );
}

export default function WorkerHome() {
  const { user } = useAuth();
  const { jobs, schedule, offers, profile, services, applyForJob, respondToOffer, setWorkerDuty } = useWorkerData();

  const [tab, setTab] = useState(null);
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);

  const firstName = (user?.name || 'there').split(' ')[0];
  const isOnDuty = profile?.isOnDuty ?? true;
  const hasReviews = (profile?.reviewsCount ?? 0) > 0;

  const pendingOffers = offers.filter((o) => o.status === 'pending');
  const upcoming = schedule
    .filter((s) => s.status === 'confirmed')
    .sort((a, b) => startTime(a.startDate) - startTime(b.startDate));
  const openJobs = jobs.filter((j) => !j.applied);
  const bookedValue = upcoming.reduce((sum, s) => sum + (Number(s.total) || 0), 0);

  // Open on hire requests when there are any, otherwise on upcoming work.
  const activeTab = tab ?? (pendingOffers.length > 0 ? 'requests' : 'upcoming');
  const counts = { requests: pendingOffers.length, upcoming: upcoming.length, jobs: openJobs.length };

  const checklist = [
    { done: Boolean(user?.workerBioId || profile?.cnicFileName || profile?.verified), label: 'Submit your CNIC', to: '/worker/settings' },
    { done: Boolean(services.length || profile?.subcategories?.length), label: 'Post a service', to: '/worker/services' },
    { done: Boolean(profile?.rates?.day || profile?.rates?.week || profile?.rates?.month), label: 'Set your rates', to: '/worker/settings' },
    { done: Boolean(profile?.bio), label: 'Write a short bio', to: '/worker/settings' },
    { done: Boolean(profile?.city), label: 'Add your city', to: '/worker/settings' },
  ];
  const percent = Math.round((checklist.filter((c) => c.done).length / checklist.length) * 100);

  const notify = (message) => {
    clearTimeout(toastTimer.current);
    setToast(message);
    toastTimer.current = setTimeout(() => setToast(null), 3200);
  };

  const toggleDuty = () => {
    setWorkerDuty(user.id, !isOnDuty);
    notify(isOnDuty ? "You're Off-Duty. Clients can't find your profile." : "You're On-Duty. Clients can hire you now.");
  };

  const respond = (offer, decision) => {
    respondToOffer(offer.id, decision);
    notify(
      decision === 'accepted'
        ? `Accepted. ${offer.clientName}'s job is in your schedule.`
        : `Declined ${offer.clientName}'s request.`
    );
  };

  const apply = (job) => {
    applyForJob(job.id);
    notify(`Application sent for "${job.title}".`);
  };

  const startingRate = profile?.rates?.day
    ? `${formatPKR(profile.rates.day)} / day`
    : profile?.rates?.month
    ? `${formatPKR(profile.rates.month)} / month`
    : 'No rate set';

  const viewAllLink = {
    requests: { to: '/worker/offers', label: 'All hire requests' },
    upcoming: { to: '/worker/schedule', label: 'Full schedule' },
    jobs: { to: '/worker/jobs', label: 'Browse all jobs' },
  }[activeTab];

  return (
    <div className="p-4 sm:p-8 space-y-6">
      {/* Welcome + availability */}
      <section className="relative overflow-hidden rounded-3xl bg-[#0A0A0A] text-white p-6 sm:p-8">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute -top-20 -left-10 w-72 h-72 bg-[#FF6B00] rounded-full blur-3xl" />
          <div className="absolute -bottom-24 right-10 w-80 h-80 bg-[#FF6B00] rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 grid lg:grid-cols-[1fr_auto] gap-8 items-center">
          <div className="space-y-5">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#FF6B00]">Worker dashboard</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight">
                {greeting()}, {firstName}
              </h1>
              <p className="text-gray-300 max-w-xl">
                {pendingOffers.length > 0
                  ? `You have ${pendingOffers.length} hire request${pendingOffers.length === 1 ? '' : 's'} waiting for your reply.`
                  : upcoming.length > 0
                  ? `You have ${upcoming.length} upcoming job${upcoming.length === 1 ? '' : 's'}. Nothing needs your attention right now.`
                  : 'No jobs booked yet. Complete your profile and apply to open jobs to get started.'}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link to="/worker/jobs">
                <Button variant="primary" className="text-sm py-2.5 px-5 font-semibold gap-2">
                  <Search className="w-4 h-4" />
                  Browse Jobs
                </Button>
              </Link>
              <Link to="/worker/offers">
                <Button variant="outline" className="text-sm py-2.5 px-5 font-semibold gap-2 border-white/30 text-white hover:bg-white hover:text-[#0A0A0A]">
                  <Inbox className="w-4 h-4" />
                  Hire Requests{pendingOffers.length > 0 ? ` (${pendingOffers.length})` : ''}
                </Button>
              </Link>
              <Link to="/worker/settings">
                <Button variant="outline" className="text-sm py-2.5 px-5 font-semibold gap-2 border-white/30 text-white hover:bg-white hover:text-[#0A0A0A]">
                  <Settings className="w-4 h-4" />
                  Edit Profile
                </Button>
              </Link>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm w-full lg:w-72 space-y-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-xs text-gray-400 font-semibold">Availability</div>
                <div className={`text-lg font-bold ${isOnDuty ? 'text-emerald-400' : 'text-gray-300'}`}>
                  {isOnDuty ? 'On-Duty' : 'Off-Duty'}
                </div>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={isOnDuty}
                aria-label="Toggle on-duty status"
                onClick={toggleDuty}
                className={`relative inline-flex h-8 w-14 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ${
                  isOnDuty ? 'bg-[#FF6B00]' : 'bg-gray-600'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-7 w-7 transform rounded-full bg-white shadow transition duration-200 ${
                    isOnDuty ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              {isOnDuty
                ? 'Your profile is live. Clients can find and hire you.'
                : 'Your profile is hidden from search until you go On-Duty.'}
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          to="/worker/schedule"
          icon={Wallet}
          label="Earnings This Week"
          value={formatPKR(profile?.earningsThisWeek ?? 0)}
          hint="View your schedule"
          tone="bg-[#FFF0E6] text-[#FF6B00]"
        />
        <StatCard
          to="/worker/schedule"
          icon={CalendarClock}
          label="Booked Value"
          value={formatPKR(bookedValue)}
          hint={`${upcoming.length} confirmed job${upcoming.length === 1 ? '' : 's'}`}
          tone="bg-emerald-50 text-emerald-600"
        />
        <StatCard
          to="/worker/reviews"
          icon={Star}
          label="Rating"
          value={hasReviews ? profile.rating : 'New'}
          hint={hasReviews ? `${profile.reviewsCount} reviews` : 'No reviews yet'}
          tone="bg-amber-50 text-amber-500"
        />
        <StatCard
          to="/worker/applications"
          icon={CheckCircle2}
          label="Jobs Completed"
          value={profile?.completedJobs ?? 0}
          hint="See your applications"
          tone="bg-sky-50 text-sky-600"
        />
      </section>

      <div className="grid xl:grid-cols-3 gap-6 items-start">
        {/* Work centre */}
        <section className="xl:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div role="tablist" aria-label="Your work" className="flex border-b border-gray-100 overflow-x-auto">
            {TABS.map(({ id, label, icon: Icon }) => {
              const selected = activeTab === id;
              return (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setTab(id)}
                  className={`flex items-center gap-2 px-5 py-4 text-sm font-semibold whitespace-nowrap border-b-2 transition-colors cursor-pointer ${
                    selected
                      ? 'border-[#FF6B00] text-[#FF6B00]'
                      : 'border-transparent text-gray-500 hover:text-[#0A0A0A]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                  <span
                    className={`min-w-5 h-5 px-1.5 rounded-full text-[11px] font-bold flex items-center justify-center ${
                      selected ? 'bg-[#FF6B00] text-white' : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    {counts[id]}
                  </span>
                </button>
              );
            })}
          </div>

          <div role="tabpanel" className="p-5 sm:p-6">
            {activeTab === 'requests' &&
              (pendingOffers.length === 0 ? (
                <EmptyState
                  icon={Inbox}
                  title="No pending hire requests"
                  text="When a client wants to hire you directly, the request shows up here so you can reply in one tap."
                  to="/worker/offers"
                  cta="View all requests"
                />
              ) : (
                <ul className="space-y-4">
                  {pendingOffers.map((offer) => (
                    <li key={offer.id} className="border border-gray-200 rounded-xl p-4 hover:border-[#FF6B00] transition-colors space-y-3">
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <h3 className="font-bold text-[#0A0A0A] truncate">{offer.clientName}</h3>
                          <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 mt-1">
                            <CategoryChip variant="orange">{offer.category}</CategoryChip>
                            <span>Requested {timeAgo(offer.createdAt)}</span>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="font-bold text-[#FF6B00]">{formatPKR(offer.rate)}</div>
                          <div className="text-[11px] text-gray-400">per {offer.payUnit}</div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-x-5 gap-y-1 text-xs text-gray-600">
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-gray-400" />
                          {formatDuration(offer.durationType, offer.durationCount)}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-gray-400" />
                          Starts {formatDate(offer.startDate)}
                        </span>
                        {offer.city && (
                          <span className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-gray-400" />
                            {offer.city}
                          </span>
                        )}
                      </div>

                      {offer.note && <p className="text-xs text-gray-600 bg-[#F5F5F5] rounded-lg p-3">“{offer.note}”</p>}

                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          className="text-xs py-2 px-4 font-semibold gap-1.5 border-[#EF4444] text-[#EF4444] hover:bg-[#EF4444] hover:text-white"
                          onClick={() => respond(offer, 'declined')}
                        >
                          <XCircle className="w-4 h-4" />
                          Decline
                        </Button>
                        <Button variant="primary" className="text-xs py-2 px-5 font-semibold gap-1.5" onClick={() => respond(offer, 'accepted')}>
                          <CheckCircle2 className="w-4 h-4" />
                          Accept
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              ))}

            {activeTab === 'upcoming' &&
              (upcoming.length === 0 ? (
                <EmptyState
                  icon={CalendarClock}
                  title="Nothing booked yet"
                  text="Accepted hire requests and jobs you win will appear here, in date order."
                  to="/worker/jobs"
                  cta="Find jobs to apply for"
                />
              ) : (
                <ul className="space-y-3">
                  {upcoming.map((item, index) => {
                    const date = parseDate(item.startDate);
                    const validDate = !Number.isNaN(date.getTime());
                    return (
                      <li key={item.id} className="flex items-center gap-4 border border-gray-200 rounded-xl p-4 hover:border-[#FF6B00] transition-colors">
                        <div className={`w-14 flex-shrink-0 text-center rounded-xl py-2 ${index === 0 ? 'bg-[#FF6B00] text-white' : 'bg-[#F5F5F5] text-[#0A0A0A]'}`}>
                          <div className="text-[10px] font-bold uppercase opacity-80">
                            {validDate ? date.toLocaleDateString('en-US', { month: 'short' }) : 'ASAP'}
                          </div>
                          <div className="text-xl font-extrabold leading-none">{validDate ? date.getDate() : '—'}</div>
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-[#0A0A0A] truncate">{item.jobTitle}</h3>
                            {index === 0 && (
                              <span className="text-[10px] font-bold text-[#FF6B00] bg-[#FFF0E6] px-2 py-0.5 rounded-full flex-shrink-0">
                                NEXT UP
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-gray-500 mt-0.5 truncate">
                            {item.clientName} • {item.time} • {item.location}
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0 hidden sm:block space-y-1">
                          <div className="text-sm font-bold text-[#FF6B00]">{item.pay}</div>
                          <StatusPill status={item.status}>{item.status.toUpperCase()}</StatusPill>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              ))}

            {activeTab === 'jobs' &&
              (openJobs.length === 0 ? (
                <EmptyState
                  icon={Search}
                  title="No open jobs right now"
                  text="You've applied to everything available. New postings from clients show up here."
                  to="/worker/applications"
                  cta="Track your applications"
                />
              ) : (
                <ul className="space-y-4">
                  {openJobs.slice(0, 5).map((job) => (
                    <li key={job.id} className="border border-gray-200 rounded-xl p-4 hover:border-[#FF6B00] transition-colors space-y-3">
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <h3 className="font-bold text-[#0A0A0A] truncate">{job.title}</h3>
                          <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 mt-1">
                            <CategoryChip variant="orange">{job.category}</CategoryChip>
                            <span>{job.clientName}</span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {job.city}{job.area ? `, ${job.area}` : ''}
                            </span>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="font-bold text-[#FF6B00] text-sm">
                            {formatPayRange(job.payMin, job.payMax)}
                          </div>
                          <div className="text-[11px] text-gray-400">per {job.payUnit} • {job.duration}</div>
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 line-clamp-2">{job.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] text-gray-400">Posted {job.postedAt}</span>
                        <Button variant="primary" className="text-xs py-2 px-5 font-semibold" onClick={() => apply(job)}>
                          Apply Now
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              ))}

            {counts[activeTab] > 0 && (
              <div className="mt-5 pt-4 border-t border-gray-100 text-right">
                <Link to={viewAllLink.to} className="inline-flex items-center gap-1 text-sm font-semibold text-[#FF6B00]! hover:underline">
                  {viewAllLink.label}
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* Side cards */}
        <aside className="space-y-6">
          <section className="bg-gradient-to-br from-[#FF6B00] to-[#FF8C3A] rounded-2xl p-6 text-white shadow-lg space-y-3">
            <div className="flex items-center gap-2">
              <Store className="w-5 h-5" />
              <h2 className="font-bold text-lg">Need something done?</h2>
            </div>
            <p className="text-sm text-white/90">
              You can hire other workers with this same account. Go to the home page, pick a category and post what you need.
            </p>
            <Link to="/">
              <Button variant="outline" fullWidth className="border-white text-white hover:bg-white hover:text-[#FF6B00] text-xs py-2.5 font-semibold">
                Hire as a client
              </Button>
            </Link>
          </section>

          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-[#0A0A0A]">Profile strength</h2>
              <span className="text-sm font-extrabold text-[#FF6B00]">{percent}%</span>
            </div>

            <div
              className="h-2.5 rounded-full bg-gray-100 overflow-hidden"
              role="progressbar"
              aria-label="Profile strength"
              aria-valuenow={percent}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#FF6B00] to-[#FF8C3A] transition-all duration-500"
                style={{ width: `${percent}%` }}
              />
            </div>

            {percent === 100 ? (
              <p className="text-sm text-emerald-700 bg-emerald-50 rounded-xl p-3 flex items-center gap-2">
                <BadgeCheck className="w-4 h-4 flex-shrink-0" />
                Your profile is complete. You&apos;re ready to be hired.
              </p>
            ) : (
              <ul className="space-y-1.5">
                {checklist.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.to}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                        item.done ? 'text-gray-400! line-through' : 'text-[#0A0A0A]! hover:bg-[#FFF0E6]'
                      }`}
                    >
                      {item.done ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      ) : (
                        <Circle className="w-4 h-4 text-gray-300 flex-shrink-0" />
                      )}
                      <span className="flex-1">{item.label}</span>
                      {!item.done && <ChevronRight className="w-4 h-4 text-gray-300" />}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-[#0A0A0A]">How clients see you</h2>
              <span
                className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                  isOnDuty ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-500'
                }`}
              >
                {isOnDuty ? 'LISTED' : 'HIDDEN'}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Avatar name={user?.name || 'Worker'} size="lg" verified={profile?.verified} />
              <div className="min-w-0">
                <div className="font-bold text-[#0A0A0A] truncate">{user?.name}</div>
                <div className="mt-1">
                  {profile?.category ? (
                    <CategoryChip variant="orange">{profile.category}</CategoryChip>
                  ) : (
                    <span className="text-xs text-gray-400">No category yet</span>
                  )}
                </div>
              </div>
            </div>

            {profile?.subcategories?.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {profile.subcategories.map((s) => (
                  <span key={s} className="px-2.5 py-1 bg-[#F5F5F5] text-gray-600 rounded-lg text-xs">
                    {s}
                  </span>
                ))}
              </div>
            )}

            <div className="flex items-center justify-between text-sm pt-3 border-t border-gray-100">
              <span className="text-gray-500">Starting from</span>
              <span className="font-bold text-[#FF6B00]">{startingRate}</span>
            </div>

            <Link to={`/worker-profile/${user?.id}`}>
              <Button variant="outline" fullWidth className="text-xs py-2.5 font-semibold">
                View public profile
              </Button>
            </Link>
          </section>
        </aside>
      </div>

      {toast && (
        <div
          role="status"
          className="toast-in fixed bottom-6 left-1/2 -translate-x-1/2 z-50 max-w-[90vw] bg-[#0A0A0A] text-white text-sm font-medium px-5 py-3 rounded-full shadow-2xl flex items-center gap-2"
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          {toast}
        </div>
      )}
    </div>
  );
}
