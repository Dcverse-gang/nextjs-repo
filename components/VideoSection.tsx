// components/VideoSection.tsx — Demo video frame
"use client"

import { useState } from "react"

export default function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <div className="video-section reveal">
      <div className="video-frame" role="img" aria-label="CloneOS platform demo video">
        {/* Browser chrome */}
        <div className="video-chrome" aria-hidden="true">
          <span className="chrome-dot" />
          <span className="chrome-dot" />
          <span className="chrome-dot" />
          <div className="chrome-bar">cloneos.io · platform demo</div>
        </div>

        {isPlaying ? (
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/hhKNtHQFaoU?autoplay=1&rel=0"
            title="CloneOS video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            style={{ position: "absolute", inset: "44px 0 0 0", border: 0, zIndex: 1 }}
          />
        ) : (
          <>
            <img
              className="video-thumb"
              src="https://img.youtube.com/vi/hhKNtHQFaoU/hqdefault.jpg"
              alt="CloneOS video thumbnail"
            />
            <button className="play-btn" aria-label="Play demo video" onClick={() => setIsPlaying(true)}>
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          </>
        )}

        {!isPlaying && (
          <div className="video-label" aria-hidden="true">
            Watch the 90-second demo →
          </div>
        )}
      </div>
    </div>
  )
}
