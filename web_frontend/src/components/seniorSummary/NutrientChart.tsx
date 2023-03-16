import ApexChart from "react-apexcharts";

function NutrientChart() {
  return (
    <ApexChart
      type="bar"
      series={[
        {
          name: "지방",
          data: [17, 23, 7, 16, 28, 7, 9],
        },
        {
          name: "단백질",
          data: [22, 45, 80, 31, 88, 12, 0],
        },
        {
          name: "탄수화물",
          data: [32, 50, 60, 45, 40, 30, 25],
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
          categories: ["3/15", "3/16", "3/17", "3/18", "3/19", "3/20", "3/21"],
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
                enabled: true,
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
      }}
    />
  );
}

export default NutrientChart;
