export default function Disclaimer({ className = "" }: { className?: string }) {
  return (
    <p
      className={`rounded-md border border-calm-200 bg-calm-100 px-4 py-3 text-sm text-calm-700 ${className}`}
      role="note"
    >
      This is general information, not legal advice. It cannot tell you what to
      do in your own situation. For that, please speak to a qualified
      professional.
    </p>
  );
}
