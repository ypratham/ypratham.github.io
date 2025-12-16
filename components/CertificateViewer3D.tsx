"use client";
import React, { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PresentationControls, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { X, RotateCcw, ZoomIn, ZoomOut, Download } from "lucide-react";
import { Certificate } from "@/types";

interface CertificateViewer3DProps {
  certificate: Certificate;
  onClose: () => void;
  accentColor?: string;
}

// Camera controller for zoom
function CameraController({ zoom }: { zoom: number }) {
  const { camera } = useThree();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    camera.position.z = zoom;
  }, [zoom, camera]);

  return null;
}

// 3D Certificate Plane Component
function CertificatePlane({ imageUrl }: { imageUrl: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useTexture(imageUrl);

  // Calculate aspect ratio for certificate
  const img = texture.image as HTMLImageElement | undefined;
  const aspectRatio = img ? img.width / img.height : 1.4;
  const width = 4;
  const height = width / aspectRatio;

  return (
    <PresentationControls
      global
      rotation={[0, 0, 0]}
      polar={[-Math.PI / 6, Math.PI / 6]}
      azimuth={[-Math.PI / 6, Math.PI / 6]}
    >
      <mesh ref={meshRef} castShadow receiveShadow>
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial map={texture} side={THREE.DoubleSide} />
      </mesh>
    </PresentationControls>
  );
}

// Loading Fallback
function LoadingFallback() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = state.clock.elapsedTime * 2;
    }
  });

  return (
    <mesh ref={meshRef}>
      <ringGeometry args={[0.3, 0.4, 32]} />
      <meshBasicMaterial color="#FF4655" />
    </mesh>
  );
}

// Main Component
const CertificateViewer3D: React.FC<CertificateViewer3DProps> = ({
  certificate,
  onClose,
  accentColor = "#FF4655",
}) => {
  const [zoom, setZoom] = useState(5);

  // Disable body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleZoomIn = () => setZoom((prev) => Math.max(prev - 1, 2));
  const handleZoomOut = () => setZoom((prev) => Math.min(prev + 1, 10));
  const handleReset = () => setZoom(5);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "course":
        return "📚";
      case "workshop":
        return "🎯";
      case "hackathon":
        return "🏆";
      case "school":
        return "🎓";
      default:
        return "📜";
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0F1923]/98 backdrop-blur-sm flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-start p-4 md:p-6">
        <div>
          <div
            className="text-xs uppercase tracking-widest mb-1 flex items-center gap-2"
            style={{ color: accentColor }}
          >
            {getCategoryIcon(certificate.category)} {certificate.category}
          </div>
          <h2 className="text-xl md:text-2xl font-header font-bold text-white uppercase tracking-tight">
            {certificate.title}
          </h2>
          <p className="text-[#ECE8E1]/60 text-sm">
            {certificate.issuer} • {certificate.date}
          </p>
        </div>

        <button
          onClick={onClose}
          className="p-2 bg-[#ECE8E1]/10 hover:bg-[#FF4655] text-white transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      {/* 3D Canvas - Takes remaining space */}
      <div className="flex-1 min-h-0">
        <Canvas camera={{ position: [0, 0, zoom], fov: 50 }}>
          <Suspense fallback={<LoadingFallback />}>
            <CameraController zoom={zoom} />

            {/* Simple lighting */}
            <ambientLight intensity={1} />

            {/* Certificate */}
            <CertificatePlane imageUrl={certificate.image} />
          </Suspense>
        </Canvas>
      </div>

      {/* Controls - Fixed at bottom */}
      <div className="p-4 md:p-6 flex justify-center">
        <div className="flex items-center gap-1 bg-[#0F1923] border border-[#ECE8E1]/20 p-1">
          <button
            onClick={handleZoomIn}
            className="p-3 hover:bg-[#FF4655] text-[#ECE8E1] hover:text-white transition-colors"
            title="Zoom In"
          >
            <ZoomIn size={20} />
          </button>
          <button
            onClick={handleReset}
            className="p-3 hover:bg-[#FF4655] text-[#ECE8E1] hover:text-white transition-colors"
            title="Reset View"
          >
            <RotateCcw size={20} />
          </button>
          <button
            onClick={handleZoomOut}
            className="p-3 hover:bg-[#FF4655] text-[#ECE8E1] hover:text-white transition-colors"
            title="Zoom Out"
          >
            <ZoomOut size={20} />
          </button>
          <div className="w-px h-8 bg-[#ECE8E1]/20 mx-1"></div>
          <a
            href={certificate.image}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-3 bg-[#FF4655] hover:bg-[#FF4655]/80 text-white text-sm font-bold uppercase tracking-widest transition-colors flex items-center gap-2"
          >
            <Download size={16} />
            Download
          </a>
        </div>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-20 right-4 text-[#ECE8E1]/30 text-xs uppercase tracking-widest hidden md:block">
        <p>Drag to rotate</p>
      </div>
    </div>
  );
};

export default CertificateViewer3D;
