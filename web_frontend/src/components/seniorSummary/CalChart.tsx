import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { BMRAtom, dateAtom } from "../../core/atom";
import { IUserData } from "./Comment";

function CalChart(prop: IUserData) {
  const BMR = useRecoilValue(BMRAtom);
  const dateStrings = useRecoilValue(dateAtom);
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
