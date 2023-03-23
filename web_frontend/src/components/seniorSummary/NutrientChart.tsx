import ApexChart from "react-apexcharts";
import { IUserData } from "./Comment";

function NutrientChart(prop: IUserData) {
  const dateStrings = [];
  for (let i = 7; i >= 1; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dateString = `${month}/${day}`;
    dateStrings.push(dateString);
    console.log(dateString);
  }
  return (
    <ApexChart
      type="bar"
      series={[
        {
          name: "지방",
          data: prop.nutrient.fat,
        },
        {
          name: "단백질",
          data: prop.nutrient.protein,
        },
        {
          name: "탄수화물",
          data: prop.nutrient.carbohydrate,
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
