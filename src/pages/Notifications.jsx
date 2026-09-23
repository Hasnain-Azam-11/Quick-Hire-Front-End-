import { Link } from 'react-router-dom';
import { Bell, CheckCheck, FileText, Inbox, MessageCircle, ShieldCheck, Star, Wallet2 } from 'lucide-react';
import PageShell from '../components/PageShell';
import { Button } from '../components/Button';
import { useMarketplace } from '../context/MarketplaceContext';

const ICONS = {
  offer: Inbox,
  application: FileText,
  review: Star,
  message: MessageCircle,
  verification: ShieldCheck,
  payment: Wallet2,
};

// The full list behind the navbar's bell dropdown.
export default function Notifications() {
  const { myNotifications, unreadNotificationCount, markNotificationRead, markAllNotificationsRead } = useMarketplace();

  return (
    <PageShell width="max-w-3xl">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#0A0A0A]">Notifications</h1>
          <p className="text-gray-600 mt-1">Hire requests, messages, reviews and updates about your account</p>
        </div>
        {unreadNotificationCount > 0 && (
          <Button variant="outline" className="text-xs py-2 px-4 gap-1.5" onClick={markAllNotificationsRead}>
            <CheckCheck className="w-4 h-4" />
            Mark all read
          </Button>
        )}
      </div>

      {myNotifications.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 space-y-3">
          <div className="w-16 h-16 bg-[#F5F5F5] rounded-full flex items-center justify-center mx-auto text-gray-400">
            <Bell className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-[#0A0A0A]">Nothing yet</h3>
          <p className="text-gray-500 text-sm max-w-md mx-auto">
            You&apos;ll see hire requests, messages, reviews and other updates here as they happen.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 divide-y divide-gray-50 overflow-hidden">
          {myNotifications.map((n) => {
            const Icon = ICONS[n.type] || Bell;
            return (
              <Link
                key={n.id}
                to={n.link || '/notifications'}
                onClick={() => markNotificationRead(n.id)}
                className={`flex items-start gap-4 px-6 py-4 hover:bg-[#F5F5F5] transition-colors ${n.isRead ? '' : 'bg-[#FFF8F3]'}`}
              >
                <span
                  className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    n.isRead ? 'bg-gray-100 text-gray-400' : 'bg-[#FFF0E6] text-[#FF6B00]'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className={`block text-sm ${n.isRead ? 'text-gray-700 font-medium' : 'text-[#0A0A0A] font-bold'}`}>
                    {n.title}
                  </span>
                  {n.body && <span className="block text-xs text-gray-500 mt-1">{n.body}</span>}
                  <span className="block text-[11px] text-gray-400 mt-1.5">{n.timeAgo}</span>
                </span>
                {!n.isRead && <span className="w-2.5 h-2.5 rounded-full bg-[#FF6B00] mt-2 flex-shrink-0" />}
              </Link>
            );
          })}
        </div>
      )}
    </PageShell>
  );
}
