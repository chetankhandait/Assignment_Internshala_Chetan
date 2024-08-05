// components/EditBannerTemplateBs.tsx

import React, { useState } from 'react';

interface BannerEditProps {
  banner: {
    id: number;
    title: string;
    description: string;
    cta: string;
    image: string;
    background: string;
  };
  onClose: () => void;
  onSave: (updatedBanner: any) => void;
}

const EditBannerTemplateBs: React.FC<BannerEditProps> = ({ banner, onClose, onSave }) => {
  const [editedBanner, setEditedBanner] = useState(banner);
  const [uploadedImage, setUploadedImage] = useState<string | ArrayBuffer | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedBanner({
      ...editedBanner,
      [name]: value,
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result);
        setEditedBanner({
          ...editedBanner,
          image: event.target?.result as string, // Update the image field with the uploaded image data URL
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    onSave({ ...editedBanner, image: uploadedImage || editedBanner.image });
    onClose();
  };

  return (
    <div className="fixed inset-0 text-black bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-lg font-bold mb-4">Edit Banner</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={editedBanner.title}
            onChange={handleChange}
            className="border border-gray-300 rounded px-4 py-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={editedBanner.description}
            onChange={handleChange}
            className="border border-gray-300 rounded px-4 py-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">CTA</label>
          <input
            type="text"
            name="cta"
            value={editedBanner.cta}
            onChange={handleChange}
            className="border border-gray-300 rounded px-4 py-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Image URL</label>
          <input
            type="text"
            name="image"
            value={editedBanner.image}
            onChange={handleChange}
            className="border border-gray-300 rounded px-4 py-2 w-full"
          />
          <div className="mt-2">
            <label className="block text-sm font-medium mb-1">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="border border-gray-300 rounded px-4 py-2 w-full"
            />
          </div>
        </div>
        <div className="flex justify-end">
          <button onClick={onClose} className="text-gray-600 mr-4">Cancel</button>
          <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
        </div>
      </div>
    </div>
  );
};

export default EditBannerTemplateBs;
