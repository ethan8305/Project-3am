import Link from "next/link";

const navLinks = [
  { href: "/resources", label: "Resource hub" },
  { href: "/triage", label: "Where do I start?" },
  { href: "/booking", label: "Book a clinic" },
];

export default function Header() {
  return (
    <header className="border-b border-calm-200 bg-white">
      <div className="mx-auto flex max-w-4xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/" className="text-lg font-semibold text-calm-700">
          Project 3AM
        </Link>
        <nav aria-label="Main">
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-ink underline-offset-4 hover:underline"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
