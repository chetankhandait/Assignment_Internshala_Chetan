'use client'
import React, { useState } from 'react';
import bannerData from '../data/adBanners.json';
import BannerCanvasComp from '../component/BannerImageComp';
import EditBannerTemplateBs from '../component/EditBannerTemplateBs';

const HomePage = () => {
  const [prompt, setPrompt] = useState('');
  const [banners, setBanners] = useState(bannerData);
  const [filteredBanners, setFilteredBanners] = useState(bannerData);
  const [isEditing, setIsEditing] = useState(false);
  const [currentBanner, setCurrentBanner] = useState<any>(null);

  const handleGenerate = () => {
    const updatedBanners = banners.map((banner) => ({
      ...banner,
      title: banner.title.includes(prompt) ? banner.title.replace(/\b\w+\b/g, prompt) : banner.title,
    }));

    setFilteredBanners(updatedBanners);
  };

  const handleEdit = (id: number) => {
    const bannerToEdit = banners.find((banner) => banner.id === id);
    setCurrentBanner(bannerToEdit);
    setIsEditing(true);
  };

  const handleSave = (updatedBanner: any) => {
    const updatedBanners = banners.map((banner) =>
      banner.id === updatedBanner.id ? updatedBanner : banner
    );
    setBanners(updatedBanners);
    setFilteredBanners(updatedBanners);
  };

  return (
    <div className="container mx-auto p-4 overflow-hidden">
      <h1 className="text-2xl font-bold mb-4 text-center">Banner Generator</h1>
      <div className="flex justify-center mb-4">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter a keyword..."
          className="border border-gray-300 text-black rounded px-4 py-2 mr-2 w-1/3"
        />
        <button
          onClick={handleGenerate}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Generate
        </button>
      </div>
      <div className="flex items-center justify-around">
        {filteredBanners.map((banner) => (
          <BannerCanvasComp key={banner.id} {...banner} onEdit={handleEdit} />
        ))}
      </div>
      {isEditing && currentBanner && (
        <EditBannerTemplateBs
          banner={currentBanner}
          onClose={() => setIsEditing(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default HomePage;
