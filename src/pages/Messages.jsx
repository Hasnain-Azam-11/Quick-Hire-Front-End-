import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, MessageCircle, Send } from 'lucide-react';
import { Avatar } from '../components/Avatar';
import { useAuth } from '../context/AuthContext';
import { useMarketplace } from '../context/MarketplaceContext';

// Inbox + thread, in one responsive page: a two-pane layout on desktop, and list-or-thread
// (whichever the URL points at) on mobile. No backend yet — see MarketplaceContext's messaging
// actions for the shape a real one needs (conversations + messages, participant-scoped).
export default function Messages() {
  const { conversationId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { myConversations, getMessages, sendMessage, markConversationRead } = useMarketplace();

  const [draft, setDraft] = useState('');
  const bottomRef = useRef(null);

  const active = conversationId ? myConversations.find((c) => c.id === conversationId) : null;
  const messages = conversationId ? getMessages(conversationId) : [];

  // Opening a thread marks its messages read.
  useEffect(() => {
    if (conversationId) markConversationRead(conversationId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversationId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: 'end' });
  }, [messages.length]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!draft.trim() || !conversationId) return;
    sendMessage(conversationId, draft);
    setDraft('');
  };

  const list = (
    <aside
      className={`w-full md:w-80 md:flex-shrink-0 border-r border-gray-100 bg-white flex flex-col min-h-0 ${
        conversationId ? 'hidden md:flex' : 'flex'
      }`}
    >
      <div className="px-5 py-4 border-b border-gray-100 flex-shrink-0">
        <h1 className="text-lg font-bold text-[#0A0A0A]">Messages</h1>
      </div>
      {myConversations.length === 0 ? (
        <p className="text-sm text-gray-500 text-center px-6 py-12">
          No conversations yet. Message a worker from their profile to start one.
        </p>
      ) : (
        <ul className="flex-1 min-h-0 overflow-y-auto">
          {myConversations.map((c) => (
            <li key={c.id}>
              <Link
                to={`/messages/${c.id}`}
                className={`flex items-center gap-3 px-5 py-3.5 border-b border-gray-50 hover:bg-[#F5F5F5] transition-colors ${
                  c.id === conversationId ? 'bg-[#FFF0E6]' : ''
                }`}
              >
                <Avatar name={c.otherUserName} size="md" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-semibold text-sm text-[#0A0A0A] truncate">{c.otherUserName}</span>
                    {c.lastMessageTimeAgo && <span className="text-[11px] text-gray-400 flex-shrink-0">{c.lastMessageTimeAgo}</span>}
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs text-gray-500 truncate">{c.lastMessageText || 'Say hello 👋'}</span>
                    {c.unread > 0 && (
                      <span className="min-w-5 h-5 px-1.5 rounded-full bg-[#FF6B00] text-white text-[11px] font-bold flex items-center justify-center flex-shrink-0">
                        {c.unread}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );

  const thread = conversationId ? (
    <div className="flex-1 flex flex-col min-w-0 min-h-0">
      {!active ? (
        <div className="flex-1 flex items-center justify-center text-sm text-gray-500 px-6 text-center">
          This conversation doesn&apos;t exist or you don&apos;t have access to it.
        </div>
      ) : (
        <>
          <div className="flex items-center gap-3 px-5 py-3.5 border-b border-gray-100 bg-white flex-shrink-0">
            <button
              type="button"
              onClick={() => navigate('/messages')}
              className="md:hidden w-9 h-9 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors cursor-pointer"
              aria-label="Back to conversations"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <Avatar name={active.otherUserName} size="sm" />
            <span className="font-semibold text-sm text-[#0A0A0A]">{active.otherUserName}</span>
          </div>

          <div className="flex-1 min-h-0 overflow-y-auto px-5 py-4 space-y-3 bg-[#FAFBFD]">
            {messages.length === 0 && (
              <p className="text-center text-xs text-gray-400 py-8">No messages yet. Say hello 👋</p>
            )}
            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.isMine ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm ${
                    m.isMine
                      ? 'bg-[#FF6B00] text-white rounded-br-sm'
                      : 'bg-white border border-gray-100 text-[#0A0A0A] rounded-bl-sm shadow-2xs'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          <form onSubmit={handleSend} className="flex items-center gap-3 px-5 py-4 border-t border-gray-100 bg-white flex-shrink-0">
            <input
              type="text"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 px-4 py-2.5 bg-[#F5F5F5] border border-gray-200 rounded-full text-sm focus:outline-none focus:border-[#FF6B00]"
            />
            <button
              type="submit"
              disabled={!draft.trim()}
              aria-label="Send message"
              className="w-10 h-10 rounded-full bg-[#FF6B00] text-white flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#FF7A1A] transition-colors cursor-pointer flex-shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </>
      )}
    </div>
  ) : (
    <div className="hidden md:flex flex-1 flex-col items-center justify-center text-gray-400 gap-3">
      <MessageCircle className="w-10 h-10" />
      <p className="text-sm">Select a conversation to start chatting</p>
    </div>
  );

  return (
    <div className="bg-[#F5F5F5] py-6 sm:py-10 px-4 sm:px-8" data-viewer={user?.id}>
      <div className="max-w-6xl mx-auto h-[75vh] min-h-[420px] bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex">
        {list}
        {thread}
      </div>
    </div>
  );
}
