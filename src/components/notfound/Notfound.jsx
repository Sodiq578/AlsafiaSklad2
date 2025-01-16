import React from "react";
import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

export const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 dashboard">
      <div className="max-w-md w-full space-y-8 text-center">
        <AlertTriangle className="mx-auto h-16 w-16 text-yellow-400" />
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
          404 - Sahifa topilmadi
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Kechirasiz, siz qidirayotgan sahifa mavjud emas yoki ko'chirilgan
          bo'lishi mumkin.
        </p>
        <div className="mt-5">
          <Link
            to="/home"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Asosiy sahifaga qaytish
          </Link>
        </div>
      </div>
    </div>
  );
};
