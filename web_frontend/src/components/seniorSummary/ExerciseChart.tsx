import ApexChart from "react-apexcharts";
import { IWeeklyData } from "../../core/atom";

function ExerciseChart(prop: IWeeklyData, dateStrings: string[]) {
  const calories = [];
  const times = [];
  if (prop?.weeklyExerciseInfo) {
    for (let i = 0; i < 7; i++) {
      const calData = prop?.weeklyExerciseInfo[i].calorie;
      const timeData = prop?.weeklyExerciseInfo[i].hour;
      calories.push(calData);
      times.push(timeData);
    }
  }
  return (
    <ApexChart
      series={[
        {
          name: "소모 칼로리",
          type: "column",
          data: calories,
        },
        {
          name: "운동 시간",
          type: "line",
          data: times,
        },
      ]}
      options={{
        plotOptions: {
          bar: {
            borderRadius: 5,
          },
        },
        theme: {
          mode: "light",
        },
        chart: {
          type: "line",
          toolbar: {
            show: false,
          },
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
        xaxis: {
          axisBorder: { show: false },
          axisTicks: { show: false },
          labels: { show: true },
          categories: dateStrings,
        },
        yaxis: [
          {
            show: false,
          },
          {
            opposite: true,
            show: false,
          },
        ],
        fill: {
          opacity: 1,
        },
        stroke: {
          curve: "smooth",
          width: 2,
        },
        colors: ["#6fbaff", "#0be881"],
        dataLabels: {
          enabled: true,
          textAnchor: "middle",
          style: {
            fontSize: "10px",
            fontFamily: "Helvetica, Arial, sans-serif",
            // colors: ["#fff", "#000"],
            colors: undefined,
          },
          background: {
            enabled: true,
            foreColor: "#fff",
            opacity: 0.9,
            padding: 2,
            borderRadius: 2,
            borderWidth: 1,
            borderColor: undefined,
          },
        },
        legend: {
          position: "top",
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

export default ExerciseChart;
