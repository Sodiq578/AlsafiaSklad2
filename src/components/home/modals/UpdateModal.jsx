import axios from "axios";

export const UpdateModal = ({
  closeModal,
  newName,
  setNewName,
  newAmount,
  setNewAmount,
  selectedProduct
}) => {
    
  const handleProductUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`/products/update/${selectedProduct.id}`, {
        name: newName,
        amount: newAmount,
      });
      alert("Mahsulot yangilandi!");
      closeModal();
      getProduct(); // Mahsulotlar ro'yxatini yangilash
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      onClick={closeModal}
    >
      <div
        className="bg-white p-6 rounded-md w-1/3"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-xl font-semibold mb-4">Mahsulotni Yangilash</h3>
        <form onSubmit={handleProductUpdate}>
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2">
              Mahsulot Nomi
            </label>
            <input
              type="text"
              id="name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="amount" className="block mb-2">
              Jami Miqdor
            </label>
            <input
              type="number"
              id="amount"
              value={newAmount}
              onChange={(e) => setNewAmount(e.target.value)}
              className="w-full p-2 border rounded"
              min="0"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md"
          >
            Yangilash
          </button>
        </form>
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
        >
          X
        </button>
      </div>
    </div>
  );
};
