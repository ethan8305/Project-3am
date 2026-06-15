import Link from "next/link";

export default function NotFound() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-calm-700">Page not found</h1>
      <p className="max-w-2xl">
        We could not find that page. It may have moved, or the link may be out
        of date.
      </p>
      <Link
        href="/"
        className="inline-block rounded-md bg-calm-600 px-4 py-2 text-sm font-semibold text-white hover:bg-calm-700"
      >
        Go to the home page
      </Link>
    </div>
  );
}
