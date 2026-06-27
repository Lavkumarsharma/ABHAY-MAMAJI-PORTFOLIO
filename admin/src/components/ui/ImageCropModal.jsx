'use client';
import { useState, useRef, useCallback } from 'react';
import ReactCrop, { centerCrop, makeAspectCrop, convertToPixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { X, Check, ZoomIn, ZoomOut, RotateCw } from 'lucide-react';

function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
  return centerCrop(
    makeAspectCrop({ unit: '%', width: 90 }, aspect, mediaWidth, mediaHeight),
    mediaWidth,
    mediaHeight
  );
}

async function getCroppedBlob(image, crop, rotation = 0, scale = 1) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('No 2d context');
  }

  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  const pixelRatio = window.devicePixelRatio || 1;

  canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
  canvas.height = Math.floor(crop.height * scaleY * pixelRatio);

  ctx.scale(pixelRatio, pixelRatio);
  ctx.imageSmoothingQuality = 'high';

  const cropX = crop.x * scaleX;
  const cropY = crop.y * scaleY;

  const rotateRads = (rotation * Math.PI) / 180;
  const centerX = image.naturalWidth / 2;
  const centerY = image.naturalHeight / 2;

  ctx.save();

  // Move the crop origin to the canvas origin
  ctx.translate(-cropX, -cropY);
  // Move origin to center of the original image
  ctx.translate(centerX, centerY);
  // Rotate around center
  ctx.rotate(rotateRads);
  // Scale from center
  ctx.scale(scale, scale);
  // Translate back
  ctx.translate(-centerX, -centerY);

  ctx.drawImage(
    image,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight
  );

  ctx.restore();

  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob), 'image/jpeg', 0.95);
  });
}

/**
 * ImageCropModal
 * Props:
 *   src         – data URL of the selected file
 *   aspect      – e.g. 3/4, 1, 16/9 (undefined = free crop)
 *   onConfirm   – called with the cropped File object
 *   onClose     – called to cancel
 */
export default function ImageCropModal({ src, aspect, onConfirm, onClose }) {
  const [crop, setCrop] = useState();
  const [completedCrop, setCompletedCrop] = useState(null);
  const [rotation, setRotation] = useState(0);
  const [scale, setScale] = useState(1);
  const imgRef = useRef(null);

  const onImageLoad = useCallback((e) => {
    const { width, height } = e.currentTarget;
    if (aspect) {
      setCrop(centerAspectCrop(width, height, aspect));
    } else {
      setCrop(centerAspectCrop(width, height, 1));
    }
  }, [aspect]);

  const handleConfirm = async () => {
    let finalCrop = completedCrop;
    if (!finalCrop && crop && imgRef.current) {
      finalCrop = convertToPixelCrop(crop, imgRef.current.width, imgRef.current.height);
    }
    if (!finalCrop || !imgRef.current) return;
    const blob = await getCroppedBlob(imgRef.current, finalCrop, rotation, scale);
    const file = new File([blob], 'cropped.jpg', { type: 'image/jpeg' });
    onConfirm(file);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-[#0f0f17] border border-slate-800 rounded-2xl shadow-2xl w-full max-w-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800">
          <h3 className="text-base font-bold text-white">Crop Image</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition cursor-pointer">
            <X size={18} />
          </button>
        </div>

        {/* Crop Area */}
        <div className="flex-1 overflow-auto p-4 flex items-center justify-center bg-[#07070d] min-h-0" style={{ maxHeight: '60vh' }}>
          <ReactCrop
            crop={crop}
            onChange={(_, percentCrop) => setCrop(percentCrop)}
            onComplete={(c) => setCompletedCrop(c)}
            aspect={aspect}
            minWidth={50}
            minHeight={50}
          >
            <img
              ref={imgRef}
              src={src}
              alt="Crop preview"
              style={{ transform: `scale(${scale}) rotate(${rotation}deg)`, maxHeight: '55vh', maxWidth: '100%', objectFit: 'contain' }}
              onLoad={onImageLoad}
            />
          </ReactCrop>
        </div>

        {/* Controls */}
        <div className="px-5 py-4 border-t border-slate-800 flex flex-col gap-4">
          <div className="flex items-center gap-4 flex-wrap">
            {/* Zoom */}
            <div className="flex items-center gap-2">
              <ZoomOut size={14} className="text-slate-400" />
              <input
                type="range" min="0.5" max="3" step="0.05"
                value={scale}
                onChange={e => setScale(Number(e.target.value))}
                className="w-28 accent-violet-500"
              />
              <ZoomIn size={14} className="text-slate-400" />
              <span className="text-xs text-slate-500 w-8">{Math.round(scale * 100)}%</span>
            </div>

            {/* Rotate */}
            <button
              type="button"
              onClick={() => setRotation(r => (r + 90) % 360)}
              className="flex items-center gap-1 text-xs text-slate-400 hover:text-white transition cursor-pointer px-3 py-1.5 rounded-xl bg-slate-800/60 hover:bg-slate-700/60"
            >
              <RotateCw size={13} /> Rotate 90°
            </button>

            {/* Aspect presets */}
            <div className="flex items-center gap-1 ml-auto">
              {[
                { label: 'Free', val: undefined },
                { label: '1:1', val: 1 },
                { label: '3:4', val: 3/4 },
                { label: '4:3', val: 4/3 },
                { label: '16:9', val: 16/9 },
              ].map(({ label, val }) => (
                <button
                  key={label}
                  type="button"
                  className="text-[10px] font-semibold px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition cursor-pointer"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-slate-800 text-slate-300 text-sm font-semibold hover:bg-slate-700 transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              disabled={!crop && !completedCrop}
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-pink-500 text-white text-sm font-bold hover:from-violet-700 hover:to-pink-600 transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Check size={15} /> Use Cropped Image
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
