"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="flex-grow flex items-center justify-center px-6">
        <div className="max-w-2xl text-center">
          
          <p className="text-sm uppercase tracking-widest text-slate-500 mb-4">
            Welcome to TypeMaster
          </p>

          <h1 className="text-4xl md:text-5xl font-semibold leading-tight mb-6">
            Practice typing in a calm, focused environment.
          </h1>

          <p className="text-lg text-slate-600 mb-10 leading-relaxed">
            Improve your typing speed and accuracy with distraction-free tests 
            designed to help you build better habits, consistency, and confidence.
          </p>

          <Link
            href="/typing-test"
            className="inline-block px-8 py-3 bg-slate-900 text-white rounded-lg text-base font-medium hover:bg-slate-800 transition-colors"
          >
            Start Typing Test
          </Link>

        </div>
      </section>
    </>
  );
}