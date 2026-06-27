'use client';
import { useState, useCallback } from 'react';
import api from '../services/api';
import { toast } from 'react-toastify';
import ImageCropModal from '../components/ui/ImageCropModal';

/**
 * Returns:
 *  - CropModalNode  – JSX to render in the page (null when inactive)
 *  - openCropPicker – call with ({ onUploaded, aspect? }) to launch file-picker → crop → upload
 */
export function useImageUploadWithCrop(authHeaders) {
  const [cropState, setCropState] = useState(null); // { src, aspect, onUploaded }

  const openCropPicker = useCallback(({ onUploaded, aspect } = {}) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        setCropState({ src: reader.result, aspect, onUploaded });
      };
      reader.readAsDataURL(file);
    };
    input.click();
  }, []);

  const handleCropConfirm = useCallback(async (croppedFile) => {
    const { onUploaded } = cropState || {};
    setCropState(null);
    const formData = new FormData();
    formData.append('image', croppedFile);
    try {
      toast.info('Uploading cropped image...');
      const res = await api.post('/api/upload/image', formData, {
        headers: { ...authHeaders(), 'Content-Type': 'multipart/form-data' },
      });
      toast.success('Image uploaded!');
      onUploaded?.(res.data.url);
    } catch {
      toast.error('Image upload failed.');
    }
  }, [cropState, authHeaders]);

  const CropModalNode = cropState ? (
    <ImageCropModal
      src={cropState.src}
      aspect={cropState.aspect}
      onConfirm={handleCropConfirm}
      onClose={() => setCropState(null)}
    />
  ) : null;

  return { CropModalNode, openCropPicker };
}
