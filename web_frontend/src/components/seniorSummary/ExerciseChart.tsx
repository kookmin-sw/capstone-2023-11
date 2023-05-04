import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { dateAtom, fatAtom } from "../../core/atom";

function ExerciseChart() {
  const fatPercent = useRecoilValue(fatAtom);
  const dateStrings = useRecoilValue(dateAtom);
  return (
    <ApexChart
      type="bar"
      series={[
        {
          name: "칼로리",
          data: fatPercent,
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
        colors: ["#6fbaff"],
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
