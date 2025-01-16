import React, { useState } from "react";

export const ProfileModal = ({ isOpen, onClose, onSave }) => {
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveChanges = () => {
    if (!passwords.currentPassword || !passwords.newPassword || !passwords.confirmPassword) {
      setError("Iltimos, barcha maydonlarni to'ldiring.");
      return;
    }

    if (passwords.newPassword !== passwords.confirmPassword) {
      setError("Yangi parollar mos kelmaydi.");
      return;
    }

    // Parolni o'zgartirish
    onSave(passwords.newPassword);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center"
    >
      <div
        onClick={(e) => e.stopPropagation()} // Modal tashqarisiga bosishdan himoya qiladi
        className="bg-white p-6 rounded-lg shadow-lg w-96"
      >
        <h2 className="text-2xl font-semibold mb-4">Parolni o'zgartirish</h2>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">Amaldagi parol</label>
          <input
            type="password"
            name="currentPassword"
            value={passwords.currentPassword}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-lg mb-4"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">Yangi parol</label>
          <input
            type="password"
            name="newPassword"
            value={passwords.newPassword}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-lg mb-4"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">Yangi parolni tasdiqlash</label>
          <input
            type="password"
            name="confirmPassword"
            value={passwords.confirmPassword}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-lg mb-4"
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="flex justify-between mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg"
          >
            Yopish
          </button>
          <button
            onClick={handleSaveChanges}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Saqlash
          </button>
        </div>
      </div>
    </div>
  );
};