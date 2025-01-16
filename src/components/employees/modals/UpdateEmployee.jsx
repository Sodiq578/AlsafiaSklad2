import axios from "axios";

export const EmployeeUpdateModal = ({
  closeModal,
  name,
  setName,
  lastName,
  setLastName,
  position,
  setPosition,
  phoneNumber,
  setPhoneNumber,
  salaryType,
  setSalaryType,
  selectedData,
}) => {

  const handleEmployeeUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`/employee/update/${selectedData.id}`, {
        name: name,
        lastName: lastName,
        position: position,
        phoneNumber: phoneNumber,
        salaryType: salaryType,
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
        <form onSubmit={handleEmployeeUpdate}>
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2">
              Ismi
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="lastName" className="block mb-2">
              Familiasi
            </label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
          <label htmlFor="position" className="block mb-2">
              Lavozim
            </label>
          <select
            id="position"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-200"
          >
            <option selected>Lavozimlar</option>
            <option value="GenDirektor">GenDirektor</option>
            <option value="Operatsion Direktor">Operatsion Direktor</option>
            <option value="Menejer">Menejer</option>
            <option value="HR">HR</option>
            <option value="SMM">SMM</option>
            <option value="Dasturchi">Dasturchi</option>
            <option value="Targetolog">Targetolog</option>
            <option value="Yetkazuvchi">Yetkazuvchi</option>
            <option value="Rob">Rob</option>
            <option value="Loyihachi">Loyihachi</option>
            <option value="Kontrol Menejer">Kontrol Menejer</option>
            <option value="Operator">Operator</option>
            <option value="Farosh">Farrosh</option>
          </select>
          </div>
          <div className="mb-4">
          <label htmlFor="salaryType" className="block mb-2">
              Maosh turi
            </label>
            <select
              id="salaryType"
              value={salaryType}
              onChange={(e) => setSalaryType(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-200"
            >
              <option value="stable">Stable</option>
              <option value="percentage">Percentage</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block mb-2">
              Telefon
            </label>
            <input
              type="text"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full p-2 border rounded"
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
