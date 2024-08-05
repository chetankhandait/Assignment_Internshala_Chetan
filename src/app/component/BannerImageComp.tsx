'use client';
import React, { useEffect, useRef } from 'react';

interface BannerProps {
  id: number;
  title: string;
  description: string;
  cta: string;
  image: string;
  background: string;
  design: {
    backgroundColor: string;
    title: {
      font: string;
      color: string;
      position: { x: number; y: number };
      fontSize: number;
    };
    description: {
      font: string;
      color: string;
      position: { x: number; y: number };
      fontSize: number;
    };
    cta: {
      color: string;
      textColor: string;
      position: { x: number; y: number };
      fontSize: number;
      width: number;
      height: number;
    };
    image: {
      position: { x: number; y: number };
      width: number;
      height: number;
      shape: string; // Shape type ('circle' or 'rectangle')
      borderRadius: number; // Radius for circular shape
    };
  };
  onEdit: (id: number) => void;
}

const BannerCanvasComp: React.FC<BannerProps> = ({
  id,
  title,
  description,
  cta,
  image,
  background,
  design,
  onEdit,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (canvas && ctx) {
      // Set canvas dimensions
      const canvasWidth = 500; // Adjust canvas width
      const canvasHeight = 300; // Adjust canvas height
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;

      // Draw background
      const backgroundImage = new Image();
      backgroundImage.crossOrigin = 'anonymous'; // Enable CORS
      backgroundImage.src = background;
      backgroundImage.onload = () => {
        ctx.drawImage(backgroundImage, 0, 0, canvasWidth, canvasHeight);

        // Draw title
        ctx.font = `${design.title.fontSize}px ${design.title.font}`; // Font size and family
        ctx.fillStyle = design.title.color; // Title color
        ctx.textAlign = 'left'; // Align text to the left
        ctx.fillText(title, design.title.position.x, design.title.position.y); // Title position

        // Draw description
        ctx.font = `${design.description.fontSize}px ${design.description.font}`; // Font size and family
        ctx.fillStyle = design.description.color; // Description color
        ctx.textAlign = 'left'; // Align text to the left
        ctx.fillText(description, design.description.position.x, design.description.position.y); // Description position

        // Draw image
        const img = new Image();
        img.crossOrigin = 'anonymous'; // Enable CORS
        img.src = image;
        img.onload = () => {
          const imgWidth = img.width;
          const imgHeight = img.height;
          const { width, height, position, shape, borderRadius } = design.image;

          if (shape === 'circle') {
            // Draw circular image
            ctx.save();
            ctx.beginPath();
            ctx.arc(position.x + width / 2, position.y + height / 2, borderRadius, 0, 2 * Math.PI);
            ctx.clip();
            ctx.drawImage(img, position.x, position.y, width, height);
            ctx.restore();
          } else {
            // Draw rectangular image
            ctx.drawImage(img, position.x, position.y, width, height);
          }

          // Draw CTA
          const ctaX = design.cta.position.x;
          const ctaY = design.cta.position.y;
          const ctaWidth = design.cta.width;
          const ctaHeight = design.cta.height;

          ctx.fillStyle = design.cta.color;
          ctx.fillRect(ctaX, ctaY, ctaWidth, ctaHeight); // Draw CTA background

          // Draw CTA text
          ctx.fillStyle = design.cta.textColor;
          ctx.textAlign = 'center'; // Center text horizontally
          ctx.textBaseline = 'middle'; // Center text vertically
          ctx.font = `${design.cta.fontSize}px Arial`; // Font size for CTA

          // Calculate the vertical center position for text
          const textX = ctaX + ctaWidth / 2;
          const textY = ctaY + ctaHeight / 2;

          ctx.fillText(cta, textX, textY); // Draw CTA text in the center
        };
      };
    }
  }, [title, description, cta, image, background, design]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      try {
        const dataUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = `banner-${id}.png`;
        link.href = dataUrl;
        link.click();
      } catch (error) {
        console.error('Download failed:', error);
        alert('Download failed. Ensure images have CORS headers.');
      }
    }
  };

  return (
    <div className="relative mb-6">
      <canvas ref={canvasRef} className="border rounded-lg shadow-lg"></canvas>
      <button
        onClick={() => onEdit(id)}
        className="absolute top-3 right-3 text-white bg-gray-800 hover:bg-gray-700 rounded-full w-8 h-8"
      >
        ✎
      </button>
      <button
        onClick={handleDownload}
        className="absolute bottom-3 right-3 text-white bg-black hover:bg-white hover:text-black transition-all rounded-full py-2 px-5 "
      >
        Download ⬇
      </button>
    </div>
  );
};

export default BannerCanvasComp;
