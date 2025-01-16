import axios from "axios";
import { X } from "lucide-react";
import { toast } from "react-toastify";
import React, { useState } from "react";

export const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
        setCroppedImage(null); // cropningni o'chirib tashlash
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the form data
    const formData = new FormData();
    formData.append("name", productName);
    formData.append("totalAmount", totalAmount);
    formData.append("price", price);
    if (image) {
      // Convert the base64 image string to a file (if you want to upload as a file)
      const blob = await fetch(image).then((res) => res.blob());
      formData.append("productImage", blob, "product-image.jpg");
    }

    try {
      // Make the POST request
      const { data } = await axios.post("/products/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Set content type for file upload
        },
      });

      if (data.status === 201) {
        setProductName("");
        setTotalAmount("");
        setPrice("");
        setImage("");
        toast.success("Mahsulot muvaffaqiyatli yaratildi!");
      }
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8 dashboard">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          Yangi mahsulot qo'shish
        </h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-6">
            <label
              htmlFor="productImage"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Mahsulot rasmi
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              {image ? (
                <div className="w-full">
                  <img
                    src={croppedImage || image}
                    alt="Selected product"
                    className="max-w-full h-auto"
                  />
                  <div className="mt-2 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setImage(null)}
                      className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      <X size={16} className="mr-1" />
                      Rasmni o'chirish
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="productImage"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus:ring-indigo-500"
                    >
                      <span>Rasm yuklash</span>
                      <input
                        id="productImage"
                        name="productImage"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">yoki sudrab tashlang</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF gacha 10MB
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="productName"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Mahsulot nomi
            </label>
            <input
              id="productName"
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="totalAmount"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Umumiy miqdor
            </label>
            <input
              id="totalAmount"
              type="number"
              value={totalAmount}
              onChange={(e) => setTotalAmount(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="price"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Narx
            </label>
            <input
              id="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Mahsulot qo'shish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
