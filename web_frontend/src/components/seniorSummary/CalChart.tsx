import ApexChart from "react-apexcharts";

function CalChart() {
  return (
    <ApexChart
      type="line"
      series={[
        {
          name: "칼로리",
          data: [560, 900, 670, 1100, 720, 520, 950],
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
              y: 1000,
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
          y: {
            formatter: (value) => `$ ${value.toFixed(3)}`,
          },
        },
      }}
    />
  );
}

export default CalChart;
