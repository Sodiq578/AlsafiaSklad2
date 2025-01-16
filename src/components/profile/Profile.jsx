import React, { useState } from "react";
import { ProfileModal } from "./Modal";

export const ProfileMe = () => {
  const [profile, setProfile] = useState({
    name: "Ali",
    lastName: "Valiyev",
    phoneNumber: "+998901234567",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSavePassword = (newPassword) => {
    // Yangi parolni saqlash
    console.log("Yangi parol:", newPassword);
    // Parolni o'zgartirish amallarini shu yerda bajarishingiz mumkin
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-8 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Mening Profilim</h1>

      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-700">Ism: {profile.name}</h2>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-700">Familiya: {profile.lastName}</h2>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-700">Telefon Raqami: {profile.phoneNumber}</h2>
        </div>

        <div className="mt-6">
          <button
            onClick={handleOpenModal}
            className="px-6 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600"
          >
            Parolni o'zgartirish
          </button>
        </div>
      </div>

      {/* Modalni ochish */}
      <ProfileModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSavePassword}
      />
    </div>
  );
};