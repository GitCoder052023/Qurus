export function formatPlaybackTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

export function playbackProgressPercent(currentTime: number, duration: number): number {
  return duration > 0 ? Math.min(100, Math.max(0, (currentTime / duration) * 100)) : 0;
}
