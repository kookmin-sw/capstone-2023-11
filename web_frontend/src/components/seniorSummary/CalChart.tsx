import ApexChart from "react-apexcharts";
import { IWeeklyData } from "../../core/atom";

function CalChart(prop: IWeeklyData, BMR: number, dateStrings: string[]) {
  const calories = [];
  if (prop) {
    for (let i = 0; i < 7; i++) {
      const calData = prop.weeklyFoodNutrientSum[i].calorie;
      calories.push(calData);
    }
  }
  return (
    <ApexChart
      type="line"
      series={[
        {
          name: "칼로리",
          data: calories,
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
          categories: dateStrings,
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
