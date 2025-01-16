import axios from "axios";
import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Legend, Tooltip } from "chart.js";
import { BarChart2, Users, Package, DollarSign } from "lucide-react";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
  responsive: true,
  plugins: {
    legend: { position: "top" },
    tooltip: { enabled: true },
  },
};

const Card = ({ background, title, value, icon: Icon }) => (
  <div
    className="p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
    style={{ background: background }}
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-3xl font-semibold mt-2 text-gray-800">{value}</p>
      </div>
      <div className="p-3 rounded-full bg-blue-50">
        <Icon className="w-6 h-6 text-blue-600" />
      </div>
    </div>
  </div>
);

export const Products = () => {
  const [data, setData] = useState([]);
  const [employeesData, setEmployeesData] = useState();

  useEffect(() => {
    getProductsData();
    getEmployeesData();
  }, []);

  async function getProductsData() {
    try {
      let { data } = await axios.get("/dashboard");
      setData(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function getEmployeesData() {
    try {
      let { data } = await axios.get("/employees/dashboard");
      setEmployeesData(data);
    } catch (error) {
      console.log(error);
    }
  }

  const chartData = {
    labels: ["Mavjud mahsulotlar soni", "Jami narx"],
    datasets: [
      {
        // label: "",
        data: [data.totalRemainingAmount, data.totalPrice, 3, 5, 2],
        backgroundColor: ["rgba(255, 99, 132, 0.6)", "rgba(54, 162, 235, 0.6)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };

  console.log(employeesData);

  return (
    <div className="min-h-screen bg-[#f8fafc] p-6 dashboard">
      <div className="mb-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card
            title="Jammi maxsulotlar"
            value={data.totalProducts || 0}
            icon={Package}
            background={"#FFE0B2"}
          />
          <Card
            title="Shu yillik sotuvlar"
            value={data.yearlySales || 0}
            icon={BarChart2}
            background={"#C5E1A5"}
          />
          <Card
            title="Xaftalik sotuvlar"
            value={data.weeklySales || 0}
            icon={Users}
            background={"#E1BEE7"}
          />
          <Card
            title="Kunlik sotuvlar"
            value={data.dailySales || 0}
            icon={DollarSign}
            background={"#B2DFDB"}
          />
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="h-[400px] flex items-center justify-center text-gray-500 border border-dashed border-gray-200 rounded-lg">
          <Pie data={chartData} options={options} />
        </div>
        <div>
          <h1>Xodimlar haqida malumot</h1>
          <div>
            Umumiy xodimlar soni: {employeesData?.totalEmployees}
            <p>
              Umumiy lavozimlar:
              {employeesData
                ? Object.entries(employeesData.positionCounts).map(
                    ([position, count]) => (
                      <li key={position}>
                        {position}: {count}
                      </li>
                    )
                  )
                : "Lavozimlar yo'q"}
            </p>
            <p>
            {employeesData
                ? Object.entries(employeesData.salaryTypeCounts).map(
                    ([position, count]) => (
                      <li key={position}>
                        {count} kishi {position ==="stable"? "foiz": "oylik"} da oylik oladi
                      </li>
                    )
                  )
                : "Lavozimlar yo'q"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
