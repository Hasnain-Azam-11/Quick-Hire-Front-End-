import { Link } from 'react-router-dom';
import {
  AtSign,
  BadgeCheck,
  CalendarDays,
  ChevronRight,
  ClipboardList,
  Inbox,
  Mail,
  Phone,
  Star,
} from 'lucide-react';
import PageShell from '../components/PageShell';
import ClientReviewsPanel from '../components/ClientReviewsPanel';
import { Avatar } from '../components/Avatar';
import { Button } from '../components/Button';
import { CategoryChip } from '../components/CategoryChip';
import client from '../api/client';
import { useAuth } from '../context/AuthContext';
import { useMarketplace } from '../context/MarketplaceContext';
import { formatDate } from '../constants/hiring';

function InfoRow({ icon: Icon, label, children }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-9 h-9 rounded-xl bg-[#F5F5F5] text-gray-500 flex items-center justify-center flex-shrink-0">
        <Icon className="w-4 h-4" />
      </div>
      <div className="min-w-0">
        <div className="text-xs text-gray-400">{label}</div>
        <div className="text-sm font-semibold text-[#0A0A0A] break-words">
          {children || <span className="text-gray-400 font-normal">Not added yet</span>}
        </div>
      </div>
    </div>
  );
}

function ActivityLink({ to, icon: Icon, label, count }) {
  const row = (
    <>
      <Icon className="w-4 h-4 text-[#FF6B00]" />
      <span className="flex-1 text-sm font-medium">{label}</span>
      <span className="text-sm font-extrabold">{count}</span>
      {to && <ChevronRight className="w-4 h-4 text-gray-300" />}
    </>
  );

  if (!to) return <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#0A0A0A]">{row}</div>;

  return (
    <Link to={to} className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#FFF0E6] transition-colors text-[#0A0A0A]!">
      {row}
    </Link>
  );
}

// The profile picture comes back from the API as a path like /media/client_profiles/me.jpg.
const pictureUrl = (path) => (!path ? undefined : /^https?:/.test(path) ? path : `${client.defaults.baseURL}${path}`);

// "My profile": opened by clicking your name in the navbar. It shows the client profile the
// backend keeps for this account (picture, phone, rating) next to the account's username and email.
export default function Profile() {
  const { user, roles } = useAuth();
  const { myJobs, sentOffers, clientReviews, myWorkerProfile } = useMarketplace();

  const isWorker = roles.includes('worker');
  const rating = Number(user.averageRating) || 0;

  return (
    <PageShell>
      <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center gap-6">
        <Avatar name={user.name || 'Me'} src={pictureUrl(user.profilePicture)} size="xl" />
        <div className="flex-1 min-w-0 space-y-2">
          <h1 className="text-3xl font-extrabold text-[#0A0A0A] break-words">{user.name}</h1>
          <div className="text-gray-500 text-sm">@{user.username}</div>
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="px-3 py-1 bg-[#0A0A0A] text-white text-xs font-bold rounded-full">Client</span>
            {isWorker && (
              <span className="px-3 py-1 bg-[#FF6B00] text-white text-xs font-bold rounded-full inline-flex items-center gap-1">
                <BadgeCheck className="w-3.5 h-3.5" />
                Worker
              </span>
            )}
          </div>
        </div>
      </section>

      <div className="grid lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8 space-y-6">
            <h2 className="text-xl font-bold text-[#0A0A0A]">Client profile</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <InfoRow icon={AtSign} label="Username">{user.username}</InfoRow>
              <InfoRow icon={Mail} label="Email">{user.email}</InfoRow>
              <InfoRow icon={Phone} label="Phone number">{user.phone}</InfoRow>
              <InfoRow icon={CalendarDays} label="Member since">{user.joinedAt ? formatDate(user.joinedAt) : ''}</InfoRow>
              <InfoRow icon={Star} label="Client rating">
                {rating > 0 ? (
                  <span>{rating.toFixed(1)} / 5</span>
                ) : (
                  <span className="text-gray-400 font-normal">No ratings from workers yet</span>
                )}
              </InfoRow>
            </div>
          </section>

          <ClientReviewsPanel />
        </div>

        <div className="space-y-6">
          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 space-y-1">
            <h2 className="font-bold text-[#0A0A0A] px-3 pt-2 pb-1">Your activity</h2>
            <ActivityLink to="/my-requests" icon={ClipboardList} label="Job requests" count={myJobs.length} />
            <ActivityLink to="/my-requests?tab=offers" icon={Inbox} label="Hire requests sent" count={sentOffers.length} />
            <ActivityLink icon={Star} label="Reviews written" count={clientReviews.length} />
          </section>

          {isWorker ? (
            <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h2 className="font-bold text-[#0A0A0A]">Your worker profile</h2>
              {myWorkerProfile?.category ? (
                <CategoryChip variant="orange">{myWorkerProfile.category}</CategoryChip>
              ) : (
                <p className="text-sm text-gray-500">Finish your worker profile to be listed.</p>
              )}
              <div className="flex flex-col gap-2">
                <Link to="/worker/dashboard">
                  <Button variant="primary" fullWidth className="text-xs py-2.5 font-semibold">Worker dashboard</Button>
                </Link>
                <Link to={`/worker-profile/${user.id}`}>
                  <Button variant="outline" fullWidth className="text-xs py-2.5 font-semibold">View public listing</Button>
                </Link>
              </div>
            </section>
          ) : (
            <section className="bg-gradient-to-br from-[#FF6B00] to-[#FF8C3A] rounded-2xl p-6 text-white shadow-lg space-y-3">
              <h2 className="font-bold text-lg">Want to earn as well?</h2>
              <p className="text-sm text-white/90">Add a worker profile to this same account and start getting hired.</p>
              <Link to="/become-worker">
                <Button variant="outline" fullWidth className="border-white text-white hover:bg-white hover:text-[#FF6B00] text-xs py-2.5 font-semibold">
                  Become a Worker
                </Button>
              </Link>
            </section>
          )}
        </div>
      </div>
    </PageShell>
  );
}
