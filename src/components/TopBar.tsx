import LanguageToggle from "@/components/i18n/LanguageToggle";

// A slim strip above the header holding the language toggle at the top left.
export default function TopBar() {
  return (
    <div className="border-b border-calm-200 bg-white">
      <div className="mx-auto flex max-w-4xl items-center px-4 py-2">
        <LanguageToggle />
      </div>
    </div>
  );
}
