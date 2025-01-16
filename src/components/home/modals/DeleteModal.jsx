import axios from "axios";

export const DeleteModal = ({
  closeDeleteModal,
  selectedData,
  handleDelete,
}) => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      onClick={closeDeleteModal}
    >
      <div
        className="bg-white p-6 rounded-md w-1/3"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-xl font-semibold mb-4">Mahsulotni O'chirish</h3>
        <p className="mb-4">
          Haqiqatan ham {selectedData?.name} mahsulotini o'chirmoqchimisiz?
        </p>
        <div className="flex justify-between">
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white py-2 px-4 rounded-md"
          >
            Ha, o'chirish
          </button>
          <button
            onClick={() => closeDeleteModal()}
            className="bg-gray-600 text-white py-2 px-4 rounded-md"
          >
            Yoq, bekor qilish
          </button>
        </div>
      </div>
    </div>
  );
};
