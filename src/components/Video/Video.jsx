import { useState, useRef } from "react";
export default function VideoPlayer() {
  const videoRef = useRef(null);
  // 1. Create a state variable to track if the video is playing
  const [isPlaying, setIsPlaying] = useState(false);

  function handleToggle() {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true); // Update state to show Pause icon
    } else {
      videoRef.current.pause();
      setIsPlaying(false); // Update state to show Play icon
    }
  }

  // The Reset Logic
  function handleReset() {
    videoRef.current.pause(); // 1. Stop the playback
    videoRef.current.currentTime = 0; // 2. Rewind to the start
    setIsPlaying(false); // 3. Update the UI button
  }

  return (
    <div
      style={{
        padding: "20px",
        position: "fixed", // Ensures it stays in the background
        zIndex: -1, // Pushes it behind the modal
        pointerEvents: "none",
      }}
    >
      {/* This DIV is now the resizable handle */}
      <div
        style={{
          width: "800px",
          height: "800px",
          minWidth: "200px",
          minHeight: "112px",
          overflow: "hidden",
          resize: "both", // Enables the draggable corner
          border: "2px solid #ccc",
          lineHeight: 0, // Removes extra space at the bottom
          margin: "auto",
        }}
      >
        <video
          ref={videoRef}
          src="/modal-css-part2.mp4"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      <div style={{ marginTop: "10px" }}>
        <button
          onClick={handleToggle}
          style={{ fontSize: "24px", padding: "10px 20px" }}
        >
          {isPlaying ? "⏸️ Pause" : "▶️ Play"}
        </button>

        <button onClick={handleReset} style={{ padding: "10px 20px" }}>
          🔄 Reset
        </button>
      </div>
    </div>
  );
}
