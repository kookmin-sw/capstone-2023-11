import ApexChart from "react-apexcharts";
import { IUserData } from "./Comment";

function NutrientChart(prop: IUserData) {
  const preBMR = 10 * prop.weight + 6.25 * prop.height - 5 * prop.age;
  const BMR = Math.round(prop.isMale ? preBMR + 5 * 1.375 + 300 : preBMR - 161 * 1.375 + 350);
  const dateStrings = [];
  for (let i = 7; i >= 1; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dateString = `${month}/${day}`;
    dateStrings.push(dateString);
  }
  const goals = {
    protein: prop.weight * 0.8,
    carbohydrate: (BMR * 0.55) / 4,
    fat: (BMR * 0.25) / 9,
    cholesterol: 200,
    sodium: 2000,
  };
  const fatPercent = [];
  const proPercent = [];
  const carPercent = [];
  for (let i = 0; i < 7; i++) {
    const fat = Math.round((prop.nutrient.fat[i] / goals.fat) * 100);
    const protein = Math.round((prop.nutrient.protein[i] / goals.protein) * 100);
    const carbohydrate = Math.round((prop.nutrient.carbohydrate[i] / goals.carbohydrate) * 100);
    fatPercent.push(fat);
    proPercent.push(protein);
    carPercent.push(carbohydrate);
  }
  return (
    <ApexChart
      type="bar"
      series={[
        {
          name: "지방",
          data: fatPercent,
        },
        {
          name: "단백질",
          data: proPercent,
        },
        {
          name: "탄수화물",
          data: carPercent,
        },
      ]}
      options={{
        theme: {
          mode: "light",
        },
        chart: {
          toolbar: {
            show: false,
          },
          stacked: true,
        },
        grid: {
          show: true,
          xaxis: {
            lines: {
              show: false,
            },
          },
          yaxis: {
            lines: {
              show: true,
            },
          },
        },
        yaxis: { show: false },
        xaxis: {
          axisBorder: { show: false },
          axisTicks: { show: false },
          labels: { show: true },
          categories: dateStrings,
        },
        fill: {
          opacity: 1,
        },
        stroke: {
          curve: "smooth",
          width: 0,
        },
        colors: ["#2897ff", "#6fbaff", "#b4dbff"],
        dataLabels: {
          enabled: true,
        },
        plotOptions: {
          bar: {
            columnWidth: "50%",
            barHeight: "80%",
            horizontal: false,
            borderRadius: 5,
            dataLabels: {
              maxItems: 50,
              hideOverflowingLabels: true,
              total: {
                enabled: false,
                style: {
                  fontSize: "1.3rem",
                  fontWeight: 900,
                },
              },
            },
          },
        },
        legend: {
          position: "bottom",
          offsetY: 20,
          fontFamily: "Pretendard_Bold",
          itemMargin: {
            horizontal: 17,
          },
          onItemHover: {
            highlightDataSeries: false,
          },
        },
        tooltip: {
          enabled: false,
        },
      }}
    />
  );
}

export default NutrientChart;
