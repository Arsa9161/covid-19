import React, { useEffect } from "react";
import { Chart, registerables } from "chart.js";
import axios from "axios";

const mn = {
  confirmed: {
    title: "Тохиолдол",
    color: "rgba(0, 0, 255, 0.5)",
  },
  recovered: {
    title: "Идгэрсэн",
    color: "rgba(0, 255, 0, 0.5)",
  },
  deaths: {
    title: "Нас барсан",
    color: "rgba(255, 0, 0, 0.5)",
  },
};

function ChartStatistic({ country }) {
  Chart.register(...registerables);

  const getConfig = (stats) => {
    const data = {
      labels: stats.confirmed.map((e) => e.date),
      datasets: Object.keys(mn).map((el) => {
        return {
          label: mn[el].title,
          data: stats[el].map((e) => e.cases),
          borderColor: mn[el].color,
          backgroundColor: mn[el].color,
        };
      }),
    };

    return {
      type: "line",
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "Chart.js Line Chart",
          },
        },
      },
    };
  };

  useEffect(() => {
    axios.post("http://localhost:3001/country", { country }).then((res) => {
      console.log(getConfig(res.data));
      let myChart = new Chart(
        document.getElementById("myChart"),
        getConfig(res.data)
      );
    });
  }, []);

  return (
    <div>
      chart <canvas id="myChart"></canvas>
    </div>
  );
}

export default ChartStatistic;
