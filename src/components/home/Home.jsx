import "./home.css";
import axios from "axios";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
  Download,
  Edit2,
  Plus,
  Search,
  Trash2,
  ShoppingCart,
} from "lucide-react";
import { SellModal } from "./modals/SellModal";
import { UpdateModal } from "./modals/UpdateModal";
import { DeleteModal } from "./modals/DeleteModal";

export const ProductsPage = () => {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modalni boshqarish uchun holat
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Edit modalni boshqarish uchun
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Delete modalni boshqarish uchun
  const [selectedProduct, setSelectedProduct] = useState(null); // Tanlangan mahsulot
  const [quantity, setQuantity] = useState(1); // Miqdor
  const [totalPrice, setTotalPrice] = useState(0); // Umumiy narx
  const [newName, setNewName] = useState(""); // Mahsulot nomi uchun yangi holat
  const [newAmount, setNewAmount] = useState(0); // Mahsulot miqdori uchun yangi holat
  const [currentPage, setCurrentPage] = useState(1); // Hozirgi sahifa
  const [loading, setLoading] = useState(false); // Yangi mahsulotlar yuklanayotganini tekshirish

  useEffect(() => {
    getProduct();
    // Scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Cleanup event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [currentPage]);

  // Mahsulotlarni olish
  async function getProduct() {
    if (loading) return; // Agar yuklanayotgan bo'lsa, yana so'rov yubormang
    setLoading(true);

    try {
      let { data } = await axios.get(`/products/all?limit=4&page=${currentPage}`);
      setData(prevData => [...prevData, ...data.data]); // Yangi mahsulotlarni eski ro'yxatga qo'shish
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  // Scroll hodisasi - pastga qarab olinganida yangi mahsulotlarni yuklash
  const handleScroll = () => {
    const bottom = window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight;
    if (bottom && !loading) {
      setCurrentPage(prevPage => prevPage + 1); // Sahifani oshiring va yangi mahsulotlarni yuklang
    }
  };

  const downloadExcel = async () => {
    try {
      const response = await axios.get("/products/download", {
        responseType: "blob", // Use blob format for file download
      });

      // Start file download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "products.xlsx"); // File name
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  async function handleInputChange(e) {
    const value = e.target.value;
    try {
      if (value === "") {
        // Agar input bo'sh bo'lsa, barcha mahsulotlarni ko'rsat
        getProduct();
      } else {
        // Aks holda nomga ko'ra qidirish
        let { data } = await axios.get(`/products/search?name=${value}`);
        setData(data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  // Modalni ochish va tanlangan mahsulotni saqlash
  const openModal = (product) => {
    setSelectedProduct(product);
    setQuantity(1);
    setTotalPrice(product.price);
    setIsModalOpen(true);
  };

  // Edit modalni ochish va tanlangan mahsulotni saqlash
  const openEditModal = (product) => {
    setSelectedProduct(product);
    setNewName(product.name); // Mahsulot nomini o'zgartirish uchun
    setNewAmount(product.totalAmount); // Mahsulot miqdorini o'zgartirish uchun
    setIsEditModalOpen(true);
  };

  // Modalni yopish
  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditModalOpen(false);
  };

  const openDeleteModal = (product) => {
    setSelectedProduct(product);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleDeleteProduct = async () => {
    try {
      await axios.delete(`/products/delete/${selectedProduct.id}`);
      alert("Mahsulot o'chirildi!");
      closeModal();
      getProduct(); // Mahsulotlar ro'yxatini yangilash
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#EEF2F7] dashboard">
      <div className="p-4 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="flex">
              <div className="relative flex items-center">
                <Search className="absolute left-3 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Mahsulotlarni qidiring"
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 home_search"
                />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              <Plus className="w-5 h-5" />
              <Link to={"/product/create"}>Yangi mahsulot</Link>
            </button>
            <button
              className="flex items-center gap-2 bg-gray-100 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
              onClick={() => downloadExcel()}
            >
              <Download className="w-5 h-5" />
              <span>Export</span>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-md shadow p-4">
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Mahsulotlar Ro'yxati</h3>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border p-3 text-left pointer">Nom</th>
                  <th className="border p-3 text-left pointer">Rasm</th>
                  <th className="border p-3 text-left pointer">Jami Miqdor</th>
                  <th className="border p-3 text-left pointer">Sotilgan Miqdor</th>
                  <th className="border p-3 text-left pointer">Qolgan Miqdor</th>
                  <th className="border p-3 text-left pointer">Mahsulot Narxi (so'm)</th>
                  <th className="border p-3 text-left pointer">Umumiy Summa (so'm)</th>
                  <th className="border p-3 text-left pointer">Daromad (so'm)</th>
                  <th className="border p-3 text-left pointer">Amallar</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => {
                  return (
                    <tr key={index} className="data_box">
                    <td className="data_name_cell">
                      <Link
                        to={`/product/${item.id}`}
                        className="data_name_link"
                      >
                        {item.name}
                      </Link>
                    </td>
                    <td className="data_image_cell">
                      <img
                        src={`http://localhost:1218/${item.productImage}`}
                        alt="mahsulotning rasmi"
                        className="data_image"
                      />
                    </td>
                    <td className="data_total_amount_cell">{item.totalAmount}</td>
                    <td className="data_quantity_sold_cell">{item.quantitySold}</td>
                    <td className="data_remaining_amount_cell">{item.remainingAmount}</td>
                    <td className="data_price_cell">{item.price}</td>
                    <td className="data_total_price_cell">{item.totalPrice}</td>
                    <td className="data_revenue_cell">{item.revenue}</td>
                    <td className="data_action_cell">
                      <div className="action_buttons">
                        <button
                          className="action_cart_button"
                          onClick={() => openModal(item)}
                        >
                          <ShoppingCart className="action_icon" />
                        </button>
                        <button
                          className="action_edit_button"
                          onClick={() => openEditModal(item)}
                        >
                          <Edit2 className="action_icon" />
                        </button>
                        <button
                          className="action_delete_button"
                          onClick={() => openDeleteModal(item)}
                        >
                          <Trash2 className="action_icon" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <SellModal
          closeModal={closeModal}
          quantity={quantity}
          setQuantity={setQuantity}
          selectedProduct={selectedProduct}
          totalPrice={totalPrice}
          setTotalPrice={setTotalPrice}
        />
      )}

      {isEditModalOpen && (
        <UpdateModal
          closeModal={closeModal}
          newName={newName}
          setNewName={setNewName}
          newAmount={newAmount}
          setNewAmount={setNewAmount}
          selectedProduct={selectedProduct}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteModal
          handleDelete={handleDeleteProduct}
          closeDeleteModal={closeDeleteModal}
          selectedData={selectedProduct}
        />
      )}
    </div>
  );
};
