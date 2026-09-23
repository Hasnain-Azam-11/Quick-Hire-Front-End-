import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, CheckCheck, FileText, Inbox, MessageCircle, ShieldCheck, Star, Wallet2 } from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';

const ICONS = {
  offer: Inbox,
  application: FileText,
  review: Star,
  message: MessageCircle,
  verification: ShieldCheck,
  payment: Wallet2,
};

// The bell icon in both navbars: a dropdown of recent notifications, shared so the two navbars
// (guest/client Navbar and worker's WorkerTopNav) stay in sync automatically.
export default function NotificationsBell() {
  const { myNotifications, unreadNotificationCount, markNotificationRead, markAllNotificationsRead } = useMarketplace();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onPointerDown = (e) => {
      if (!ref.current?.contains(e.target)) setOpen(false);
    };
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  const recent = myNotifications.slice(0, 8);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`Notifications${unreadNotificationCount ? `, ${unreadNotificationCount} unread` : ''}`}
        className="relative w-10 h-10 rounded-full flex items-center justify-center text-gray-600! hover:bg-gray-100 transition-colors cursor-pointer"
      >
        <Bell className="w-5 h-5" />
        {unreadNotificationCount > 0 && (
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-[#FF6B00] ring-2 ring-white" />
        )}
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full mt-2 w-80 max-w-[90vw] bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden z-50"
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <span className="font-bold text-sm text-[#0A0A0A]">Notifications</span>
            {unreadNotificationCount > 0 && (
              <button
                type="button"
                onClick={markAllNotificationsRead}
                className="text-xs font-semibold text-[#FF6B00]! hover:underline cursor-pointer flex items-center gap-1"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                Mark all read
              </button>
            )}
          </div>

          <div className="max-h-96 overflow-y-auto">
            {recent.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-10 px-4">
                Nothing yet. Hire requests, messages and reviews will show up here.
              </p>
            ) : (
              recent.map((n) => {
                const Icon = ICONS[n.type] || Bell;
                return (
                  <Link
                    key={n.id}
                    to={n.link || '/notifications'}
                    role="menuitem"
                    onClick={() => {
                      markNotificationRead(n.id);
                      setOpen(false);
                    }}
                    className={`flex items-start gap-3 px-4 py-3 border-b border-gray-50 last:border-0 hover:bg-[#F5F5F5] transition-colors ${
                      n.isRead ? '' : 'bg-[#FFF8F3]'
                    }`}
                  >
                    <span
                      className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        n.isRead ? 'bg-gray-100 text-gray-400' : 'bg-[#FFF0E6] text-[#FF6B00]'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className={`block text-sm ${n.isRead ? 'text-gray-600 font-medium' : 'text-[#0A0A0A] font-bold'}`}>
                        {n.title}
                      </span>
                      {n.body && <span className="block text-xs text-gray-500 mt-0.5 line-clamp-2">{n.body}</span>}
                      <span className="block text-[11px] text-gray-400 mt-1">{n.timeAgo}</span>
                    </span>
                    {!n.isRead && <span className="w-2 h-2 rounded-full bg-[#FF6B00] mt-2 flex-shrink-0" />}
                  </Link>
                );
              })
            )}
          </div>

          <Link
            to="/notifications"
            role="menuitem"
            onClick={() => setOpen(false)}
            className="block text-center text-xs font-semibold text-[#FF6B00]! hover:bg-[#FFF0E6] py-3 border-t border-gray-100 transition-colors"
          >
            View all notifications
          </Link>
        </div>
      )}
    </div>
  );
}
