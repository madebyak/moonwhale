'use client';
import React from 'react';
import Container from '@/components/layout/Container';

const VideoSection: React.FC = () => {
  return (
    <section className="py-16 bg-black">
      <Container>
        <div className="w-full">
          <video
            className="w-full h-auto rounded-lg"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="/file-3.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </Container>
    </section>
  );
};

export default VideoSection; 