"use client";

import React, { useState, useRef, useEffect } from "react";
import { VoiceNoteData } from "../../../types/player";
import { formatDurationMs } from "../../../utils/formatDuration";
import { VoiceNotePlayer } from "./VoiceNotePlayer";

export interface VoiceNoteComposerProps {
  value: VoiceNoteData | null;
  onChange: (voiceNote: VoiceNoteData | null) => void;
  onRecordingChange?: (isRecording: boolean) => void;
}

export function VoiceNoteComposer({
  value,
  onChange,
  onRecordingChange,
}: VoiceNoteComposerProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isStarting, setIsStarting] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const elapsedRef = useRef<number>(0);

  // Notify parent of recording state
  useEffect(() => {
    onRecordingChange?.(isRecording);
  }, [isRecording, onRecordingChange]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const startRecording = async () => {
    setErrorMessage(null);
    setIsStarting(true);

    if (
      typeof window === "undefined" ||
      !navigator.mediaDevices ||
      !navigator.mediaDevices.getUserMedia
    ) {
      setErrorMessage(
        "Microphone access is not supported in this browser environment. You can still save written reflections!"
      );
      setIsStarting(false);
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const mimeType = MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
        ? "audio/webm;codecs=opus"
        : MediaRecorder.isTypeSupported("audio/ogg;codecs=opus")
        ? "audio/ogg;codecs=opus"
        : "";

      const recorder = mimeType ? new MediaRecorder(stream, { mimeType }) : new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      chunksRef.current = [];
      elapsedRef.current = 0;

      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      recorder.onstop = () => {
        const durationSec = Math.max(1, elapsedRef.current);
        const durationMillis = durationSec * 1000;
        const blob = new Blob(chunksRef.current, {
          type: mimeType || "audio/webm",
        });

        // Instant local object URL
        const objectUrl = URL.createObjectURL(blob);

        // Also convert to data URI so it persists across reloads in localStorage
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64Uri = reader.result as string;
          onChange({
            uri: base64Uri,
            durationMillis,
          });
        };
        reader.readAsDataURL(blob);

        // Set immediate local state
        onChange({
          uri: objectUrl,
          durationMillis,
        });

        if (streamRef.current) {
          streamRef.current.getTracks().forEach((track) => track.stop());
          streamRef.current = null;
        }
      };

      recorder.start(200);
      setIsRecording(true);
      setIsStarting(false);
      setRecordingSeconds(0);

      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setRecordingSeconds((prev) => {
          const next = prev + 1;
          elapsedRef.current = next;
          if (next >= 180) {
            // Maximum 3 minutes (like Qurus app)
            stopRecording();
          }
          return next;
        });
      }, 1000);
    } catch (err) {
      console.warn("Could not start recording:", err);
      setErrorMessage(
        "Microphone access needed: Please allow microphone access in your browser to attach a voice note to this verse."
      );
      setIsStarting(false);
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
  };

  if (value && !isRecording) {
    return (
      <div className="space-y-2.5">
        <label className="block text-xs font-semibold text-[#4A605C]">Voice note</label>
        <VoiceNotePlayer voiceNote={value} onRemove={() => onChange(null)} />

        <button
          type="button"
          onClick={startRecording}
          disabled={isStarting}
          className="w-full py-2.5 rounded-xl border border-[#D8E4E0] text-xs font-medium text-[#4A605C] hover:text-[#122824] hover:bg-[#F2F7F5] flex items-center justify-center gap-2 transition-colors"
        >
          <svg
            className="w-3.5 h-3.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
            <line x1="12" y1="19" x2="12" y2="23" />
            <line x1="8" y1="23" x2="16" y2="23" />
          </svg>
          <span>Replace recording</span>
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-2.5">
      <label className="block text-xs font-semibold text-[#4A605C]">Voice note</label>
      <p className="text-xs text-[#7E9490] leading-relaxed">
        Speak a reflection and attach it to this verse. You can still write a note too.
      </p>

      {isRecording ? (
        <div className="p-4 rounded-2xl bg-[#EEEAF8] border-2 border-[#5548A0]/40 space-y-3">
          {/* Live indicator & timer */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#C45C56] animate-pulse" />
              <span className="text-sm font-bold text-[#5548A0]">Recording</span>
            </div>
            <span className="text-base font-semibold font-mono text-[#122824]">
              {formatDurationMs(recordingSeconds * 1000)}
            </span>
          </div>

          {/* STOP BUTTON (Large, Unmissable Red Button replicating App) */}
          <button
            type="button"
            onClick={stopRecording}
            className="w-full py-3 px-4 rounded-xl bg-[#C45C56] hover:bg-[#B34D47] text-white text-sm font-bold flex items-center justify-center gap-2 shadow-sm active:scale-98 transition-all cursor-pointer"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <rect x="6" y="6" width="12" height="12" rx="2" />
            </svg>
            <span>Stop Recording</span>
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={startRecording}
          disabled={isStarting}
          className="w-full py-3.5 px-4 rounded-2xl bg-[#5548A0] hover:bg-[#473B88] text-white text-sm font-semibold flex items-center justify-center gap-2.5 shadow-sm transition-all cursor-pointer"
        >
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
          >
            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
            <line x1="12" y1="19" x2="12" y2="23" />
            <line x1="8" y1="23" x2="16" y2="23" />
          </svg>
          <span>{isStarting ? "Starting microphone..." : "Record voice note"}</span>
        </button>
      )}

      {errorMessage && (
        <p className="text-xs text-[#C45C56] mt-2 leading-relaxed bg-[#C45C56]/10 p-2.5 rounded-xl border border-[#C45C56]/20">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
