import { useState, useRef } from "react";
export default function VideoPlayer() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true); // Default to true since you have autoPlay

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

  // Fast Forward 10 seconds
  function handleForward() {
    videoRef.current.currentTime += 10;
  }

  // Rewind 10 seconds
  function handleBackward() {
    videoRef.current.currentTime -= 10;
  }

  return (
    <div
      style={{
        padding: "20px",
        position: "relative",
        zIndex: 1, // High enough to be seen
        // REMOVED pointerEvents: "none"
      }}
    >
      <div
        style={{
          width: "800px",
          height: "500px", // Matched to video height
          overflow: "hidden",
          resize: "both",
          border: "5px solid blue", // Changed to blue so you can see the container
          margin: "auto",
          position: "relative",
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          src="/modal-css-part2.mp4"
          style={{
            display: "block",
            width: "100%", // Fill the 800px container
            height: "100%", // Fill the 800px container
            objectFit: "cover", // Keeps aspect ratio while filling
            backgroundColor: "#000",
          }}
        />
      </div>

      <div style={{ marginTop: "10px", textAlign: "center" }}>
        {/* Backward 10s */}
        <button onClick={handleBackward} style={{ padding: "10px 15px" }}>
          ⏪ -10s
        </button>
        <button
          onClick={handleToggle}
          style={{ fontSize: "24px", padding: "10px 20px" }}
        >
          {isPlaying ? "⏸️ Pause" : "▶️ Play"}
        </button>
        {/* Forward 10s */}
        <button onClick={handleForward} style={{ padding: "10px 15px" }}>
          ⏩ +10s
        </button>
        <button
          onClick={handleReset}
          style={{ padding: "10px 20px", marginLeft: "10px" }}
        >
          🔄 Reset
        </button>
      </div>
    </div>
  );
}
