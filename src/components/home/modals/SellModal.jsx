import axios from "axios";

export const SellModal = ({
  totalPrice,
  selectedProduct,
  closeModal,
  quantity,
  setQuantity,
  setTotalPrice
}) => {
  const handleQuantityChange = (e) => {
    const newQuantity = e.target.value;
    setQuantity(newQuantity);
    if (selectedProduct) {
      setTotalPrice(newQuantity * selectedProduct.price);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`/products/sell/${selectedProduct.id}`, {
        amount:quantity,
      });
      alert("Mahsulot savatga qo'shildi!");
      closeModal(); // Modalni yopish
    } catch (error) {
      console.error("Error adding product to cart:", error);
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
        <h3 className="text-xl font-semibold mb-4">{selectedProduct?.name}</h3>
        <p className="mb-2">Narx: {selectedProduct?.price} so'm</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="quantity" className="block mb-2">
              Miqdor
            </label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={handleQuantityChange}
              className="w-full p-2 border rounded"
              min="1"
            />
          </div>
          <p className="mb-4">Umumiy narx: {totalPrice} so'm</p>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md"
          >
            Savatga qo'shish
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
