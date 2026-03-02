"use client";

import { BrainCircuit, CheckCircle2, EyeOff, Flame, Keyboard, RotateCcw, Skull, Timer } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

// Sample mode data
const modes = [
  {
    id: "general",
    name: "General",
    description: "Standard typing with flexible corrections.",
    icon: "🧠",
    difficulty: "Easy",
    stats: {
      avgWPM: 65,
      accuracy: 97,
      sessions: 12,
      bestNetWPM: 72,
      avgNetWPM: 63,
      completed: 10,
      skillLevel: "Intermediate",
    },
    badgeVariant: "default",
  },
  {
    id: "instant-death",
    name: "Instant Death",
    description: "One mistake and you're out. High focus required.",
    icon: "💀",
    difficulty: "Hardcore",
    stats: {
      avgWPM: 58,
      accuracy: 90,
      sessions: 7,
      bestNetWPM: 61,
      avgNetWPM: 52,
      completed: 2,
      skillLevel: "Advanced",
    },
    badgeVariant: "destructive",
  },
  {
    id: "strict",
    name: "Strict Mode",
    description: "Follow best practices strictly or get penalized.",
    icon: "🎯",
    difficulty: "Hard",
    stats: {
      avgWPM: 60,
      accuracy: 92,
      sessions: 5,
      bestNetWPM: 64,
      avgNetWPM: 56,
      completed: 4,
      skillLevel: "Advanced",
    },
    badgeVariant: "outline",
  },
  {
    id: "memory",
    name: "Memory",
    description: "Remember each word or lose your flow",
    icon: "🧠",
    difficulty: "Extreme",
    stats: {
      avgWPM: 70,
      accuracy: 95,
      sessions: 9,
      bestNetWPM: 75,
      avgNetWPM: 66,
      completed: 9,
      skillLevel: "Pro",
    },
    badgeVariant: "default",
  },
  {
    id: "blind",
    name: "Blind Mode",
    description: "Typed text is hidden. Trust your muscle memory!",
    icon: "🙈",
    difficulty: "Hardcore",
    stats: {
      avgWPM: 52,
      accuracy: 87,
      sessions: 6,
      bestNetWPM: 57,
      avgNetWPM: 48,
      completed: 3,
      skillLevel: "Skilled",
    },
    badgeVariant: "destructive",
  },
  {
    id: "hardcore",
    name: "Hardcore Mode",
    description: "Strict rules + instant death combined for max challenge.",
    icon: "🔥",
    difficulty: "Extreme",
    stats: {
      avgWPM: 50,
      accuracy: 85,
      sessions: 3,
      bestNetWPM: 54,
      avgNetWPM: 45,
      completed: 1,
      skillLevel: "Elite",
    },
    badgeVariant: "destructive",
  },
];

type FeedbackType = {
  feedback: String,
  modeName: String
};

export default function TypingModesGrid() {

  const [practiceModeFeedback, setPracticeModeFeedback] = useState<FeedbackType | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem('practiceModeFeedback');
    
    if (raw !== null) {
      try {
        const parsed: FeedbackType = JSON.parse(raw);
        setPracticeModeFeedback(parsed);
      } catch (e) {
        console.error("Invalid JSON in sessionStorage for 'practiceModeFeedback'", e);
      }

      sessionStorage.removeItem('practiceModeFeedback');
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setPracticeModeFeedback(null);
      }
    };

    if (practiceModeFeedback) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [practiceModeFeedback]);




  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

      {/* practiceModeFeedback modal starts */}

      {
        practiceModeFeedback && (
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setPracticeModeFeedback(null)} // 👈 close on backdrop click
          >
            <div
              className="relative bg-white p-6 rounded-xl w-full max-w-lg shadow-xl"
              onClick={(e) => e.stopPropagation()} // 👈 prevent modal click from closing
            >
              {/* Close Button */}
              <button
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 cursor-pointer"
                onClick={() => setPracticeModeFeedback(null)}
                aria-label="Close"
              >
                ✖️
              </button>

              {/* Title */}
              <h2 className="text-xl font-bold text-red-600 mb-4">💀 Disqualified in <span className="capitalize">{ practiceModeFeedback.modeName && practiceModeFeedback.modeName }</span> Mode</h2>

              {/* Feedback HTML */}
              {practiceModeFeedback != null && (
                <div
                  dangerouslySetInnerHTML={{ __html: practiceModeFeedback.feedback }}
                />
              )}

              {/* Footer buttons */}
              <div className="flex justify-end space-x-2 mt-4">
                <Link className="flex items-center text-blue-600 hover:underline" href={`/typing-test/${practiceModeFeedback.modeName}`}>
                  <RotateCcw className="me-1" /> Try Again
                </Link>
              </div>
            </div>
          </div>
        )
      }

      {/* practiceModeFeedback modal ends */}


      

      {modes.map((mode, index) => (
        
        <Link key={index} href={`/typing-test/${mode.id}`}>
          <div className="flex flex-col justify-between overflow-hidden rounded-lg cursor-pointer shadow hover:shadow-lg transition-shadow py-5">

            <div className="flex flex-col items-center px-5">

              {
                mode.name.toLowerCase() == 'general' ?

                <Keyboard className="scale-200 text-blue-600 mb-3" /> :

                mode.name.toLowerCase() == 'instant death' ?

                <Skull className="scale-200 text-blue-600 mb-3" /> :

                mode.name.toLowerCase() == 'strict mode' ?

                <CheckCircle2 className="scale-200 text-blue-600 mb-3" /> :

                mode.name.toLowerCase() == 'memory' ?

                <BrainCircuit className="scale-200 text-blue-600 mb-3" /> :

                mode.name.toLowerCase() == 'blind mode' ?

                <EyeOff className="scale-200 text-blue-600 mb-3" /> :

                mode.name.toLowerCase() == 'hardcore mode' ?

                <Flame className="scale-200 text-blue-600 mb-3" /> :

                ''

              }

              <h3 className="text-xl font-semibold my-2 text-blue-600">{mode.name}</h3>
              <p className="text-sm text-muted-foreground">{mode.description}</p>
            </div>

            

          </div>
        </Link>

      ))}
    </div>
  );
}