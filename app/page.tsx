"use client";

import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="min-h-screen p-8 flex flex-col items-start gap-4 bg-white">
      <h1 className="text-3xl font-bold">Silly Nutrition</h1>
      <p>Deployment smoke test. If you can see this, the page compiles.</p>
      <Link href="/samples/glp1" className="underline">
        Go to GLP-1 sample →
      </Link>
    </main>
  );
}
