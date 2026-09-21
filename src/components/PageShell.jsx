// Grey page background with a centred column, for signed-in pages inside the public layout.
export default function PageShell({ children, width = 'max-w-5xl' }) {
  return (
    <div className="bg-[#F5F5F5] min-h-[70vh]">
      <div className={`${width} mx-auto px-6 sm:px-8 py-10 space-y-8`}>{children}</div>
    </div>
  );
}
