"use client";

import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-orange-50 to-white text-gray-800">
      <h1 className="text-4xl font-bold mb-4">Silly Nutrition</h1>
      <p className="text-lg mb-6">
        🚀 This is a clean test page to make sure everything builds correctly.
      </p>
      <Link
        href="/samples/glp1"
        className="text-orange-600 underline hover:text-orange-800"
      >
        Go to GLP-1 Sample →
      </Link>
    </main>
  );
}

