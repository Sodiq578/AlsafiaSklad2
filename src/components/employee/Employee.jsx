import React, { useEffect, useState } from "react";
import {
  User,
  Phone,
  Calendar,
  Briefcase,
  DollarSign,
  Info,
} from "lucide-react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { formatDate } from "../../utils/utils";

export const UserProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState([]);

  useEffect(() => {
    getEmployee();
  }, []);

  async function getEmployee() {
    try {
      let { data } = await axios.get(`/employee/${id}`);
      console.log(data);
      setUser(data.employee);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className=" mx-auto p-8 bg-gray-100 rounded-lg shadow-lg dashboard">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-3">
        Foydalanuvchi Profili
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Foydalanuvchi haqida ma'lumot */}
        <div>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Shaxsiy ma'lumotlar
          </h2>
          <ul className="space-y-3">
            <li className="flex items-center">
              <User className="w-5 h-5 text-blue-500 mr-3" />
              <span className="font-medium mr-2">Ismi:</span> {user.name}
            </li>
            <li className="flex items-center">
              <User className="w-5 h-5 text-blue-500 mr-3" />
              <span className="font-medium mr-2">Familiyasi:</span> {user.lastName}
            </li>
            <li className="flex items-center">
              <Calendar className="w-5 h-5 text-red-500 mr-3" />
              <span className="font-medium mr-2">Tug'ilgan sana:</span>
              {formatDate(user.dateOfBirth)}
            </li>
            <li className="flex items-center">
              <Phone className="w-5 h-5 text-orange-500 mr-3" />
              <span className="font-medium">Telefon:</span> {user.phoneNumber}
            </li>
          </ul>
        </div>

        {/* Ishga oid ma'lumotlar */}
        <div>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Ishga oid ma'lumotlar
          </h2>
          <ul className="space-y-3">
            <li className="flex items-center">
              <Briefcase className="w-5 h-5 text-green-500 mr-3" />
              <span className="font-medium mr-2">Lavozim:</span> {user.position}
            </li>
            <li className="flex items-center">
              <Calendar className="w-5 h-5 text-purple-500 mr-3" />
              <span className="font-medium mr-2">Ishga kirgan sana:</span>
              {formatDate(user.dateOfEmployment)}
            </li>
            <li className="flex items-center">
              <DollarSign className="w-5 h-5 text-yellow-500 mr-3" />
              <span className="font-medium mr-2">Maosh turi:</span>
              {user.salaryType === "stable" ? "Barqaror" : "Foizli"}
            </li>
          </ul>
        </div>
      </div>

      {/* Izoh */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Izoh</h2>
        <p className="bg-white p-4 rounded-lg shadow-md text-gray-600">
          <Info className="w-5 h-5 inline-block text-gray-400 mr-2" />
          {user.comment}
        </p>
      </div>
    </div>
  );
};
