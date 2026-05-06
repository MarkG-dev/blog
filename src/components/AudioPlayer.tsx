"use client";

import { useState, useRef, useEffect, useCallback } from "react";

interface Track {
  title: string;
  text: string;
  slug: string;
}

interface AudioPlayerProps {
  tracks: Track[];
}

export function AudioPlayer({ tracks }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const speak = useCallback(
    (index: number) => {
      window.speechSynthesis.cancel();
      if (intervalRef.current) clearInterval(intervalRef.current);

      const track = tracks[index];
      if (!track) return;

      const utterance = new SpeechSynthesisUtterance(track.text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;

      // Try to pick a natural-sounding voice
      const voices = window.speechSynthesis.getVoices();
      const preferred = voices.find(
        (v) =>
          v.name.includes("Samantha") ||
          v.name.includes("Karen") ||
          v.name.includes("Daniel") ||
          v.name.includes("Google") ||
          v.lang.startsWith("en")
      );
      if (preferred) utterance.voice = preferred;

      utterance.onend = () => {
        if (index < tracks.length - 1) {
          setCurrentTrack(index + 1);
          speak(index + 1);
        } else {
          setIsPlaying(false);
          setProgress(0);
        }
      };

      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
      setIsPlaying(true);
      setCurrentTrack(index);

      // Approximate progress (speechSynthesis doesn't give real progress)
      const wordsPerSecond = 2.5;
      const words = track.text.split(/\s+/).length;
      const estimatedDuration = words / wordsPerSecond;
      let elapsed = 0;

      intervalRef.current = setInterval(() => {
        elapsed += 0.5;
        setProgress(Math.min((elapsed / estimatedDuration) * 100, 99));
      }, 500);
    },
    [tracks]
  );

  const togglePlay = () => {
    if (isPlaying) {
      window.speechSynthesis.cancel();
      if (intervalRef.current) clearInterval(intervalRef.current);
      setIsPlaying(false);
    } else {
      speak(currentTrack);
    }
  };

  const skipTo = (index: number) => {
    setCurrentTrack(index);
    if (isPlaying) {
      speak(index);
    }
    setShowPlaylist(false);
  };

  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  if (tracks.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gf-dark/95 backdrop-blur-sm border-t border-gf-border">
      {/* Playlist dropdown */}
      {showPlaylist && (
        <div className="max-w-4xl mx-auto px-4 py-3 border-b border-gf-border">
          <p className="text-xs text-gf-muted mb-2 font-mono uppercase tracking-wider">
            Playlist
          </p>
          {tracks.map((track, i) => (
            <button
              key={track.slug}
              onClick={() => skipTo(i)}
              className={`block w-full text-left py-1.5 text-sm transition-colors ${
                i === currentTrack
                  ? "text-gf-accent"
                  : "text-gf-muted hover:text-gf-text"
              }`}
            >
              {i === currentTrack && isPlaying && (
                <span className="inline-block w-2 h-2 bg-gf-accent rounded-full mr-2 animate-pulse" />
              )}
              {track.title}
            </button>
          ))}
        </div>
      )}

      {/* Player bar */}
      <div className="max-w-4xl mx-auto px-4 h-14 flex items-center gap-4">
        {/* Play/pause */}
        <button
          onClick={togglePlay}
          className="w-8 h-8 flex items-center justify-center text-gf-accent hover:text-gf-white transition-colors"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <rect x="3" y="2" width="4" height="12" rx="1" />
              <rect x="9" y="2" width="4" height="12" rx="1" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M4 2l10 6-10 6V2z" />
            </svg>
          )}
        </button>

        {/* Track info */}
        <div className="flex-1 min-w-0">
          <p className="text-sm text-gf-text truncate">
            {tracks[currentTrack]?.title || "No track"}
          </p>
          {/* Progress bar */}
          <div className="mt-1 h-1 bg-gf-border rounded-full overflow-hidden">
            <div
              className="h-full bg-gf-accent rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Track counter + playlist toggle */}
        <button
          onClick={() => setShowPlaylist(!showPlaylist)}
          className="text-xs text-gf-muted hover:text-gf-text font-mono transition-colors"
        >
          {currentTrack + 1}/{tracks.length}
        </button>
      </div>
    </div>
  );
}
