import ApexChart from "react-apexcharts";
import { IUserData } from "./Comment";

function CalChart(prop: IUserData) {
  const preBMR = 10 * prop.weight + 6.25 * prop.height - 5 * prop.age;
  const BMR = Math.round(prop.isMale ? preBMR + 5 * 1.375 + 300 : preBMR - 161 * 1.375 + 350);
  return (
    <ApexChart
      type="line"
      series={[
        {
          name: "칼로리",
          data: prop.calories,
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
        },
        grid: {
          show: true,
          xaxis: {
            lines: {
              show: true,
            },
          },
          yaxis: {
            lines: {
              show: false,
            },
          },
        },
        yaxis: { show: false },
        xaxis: {
          axisBorder: { show: false },
          axisTicks: { show: true },
          labels: { show: true },
          categories: ["3/15", "3/16", "3/17", "3/18", "3/19", "3/20", "3/21"],
        },
        stroke: {
          curve: "smooth",
          width: 5,
        },
        dataLabels: {
          enabled: true,
          offsetY: -7,
          background: {
            enabled: false,
          },
        },
        annotations: {
          yaxis: [
            {
              y: BMR,
              borderColor: "#ff616d",
            },
          ],
        },
        fill: {
          type: "gradient",
          gradient: { gradientToColors: ["#0be881"], stops: [0, 100] },
        },
        colors: ["#0fbcf9"],
        tooltip: {
          enabled: false,
        },
      }}
    />
  );
}

export default CalChart;
