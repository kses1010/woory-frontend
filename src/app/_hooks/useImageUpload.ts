import { useToast } from '@/app/_hooks/useToast';
import { ChangeEvent, useRef, useState } from 'react';

const MAX_SIZE = 5 * 1024 * 1024;

export const useImageUpload = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { setIsToastFloating } = useToast();

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      if (file.size > MAX_SIZE) {
        setIsToastFloating(true);
      } else {
        const reader = new FileReader();
        reader.onloadend = () => {
          setSelectedImage(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleDeleteClick = () => {
    setSelectedImage(null);
  };

  return { fileInputRef, selectedImage, setSelectedImage, handleImageChange, handleUploadClick, handleDeleteClick };
};
