'use client';

import NotesGenerator from '@/components/Note_Gen';

// This is the main page component that renders the NotesGenerator UI.
export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-6 font-sans">
      <NotesGenerator />
    </div>
  );
}