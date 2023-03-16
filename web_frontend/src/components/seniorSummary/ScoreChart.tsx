import ApexChart from "react-apexcharts";

function ScoreChart() {
  return (
    <ApexChart
      type="radialBar"
      series={[80]}
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
          lineCap: "round",
        },
        labels: ["점수"],
        plotOptions: {
          radialBar: {
            startAngle: 0,
            endAngle: 360,
            hollow: {
              margin: 0,
              size: "60%",
              background: "#fff",
              image: undefined,
              imageOffsetX: 0,
              imageOffsetY: 0,
              position: "front",
              dropShadow: {
                enabled: true,
                top: 3,
                left: 0,
                blur: 4,
                opacity: 0.24,
              },
            },
            track: {
              background: "#fff",
              strokeWidth: "67%",
              margin: 0,
              dropShadow: {
                enabled: true,
                top: -3,
                left: 0,
                blur: 4,
                opacity: 0.35,
              },
            },

            dataLabels: {
              show: true,
              name: {
                offsetY: -10,
                show: true,
                color: "#888",
                fontSize: "1.7rem",
              },
              value: {
                formatter: function (val: number) {
                  return val.toString();
                },
                color: "#111",
                fontSize: "3.5rem",
                show: true,
              },
            },
          },
        },
        fill: {
          type: "gradient",
          gradient: {
            shade: "dark",
            type: "horizontal",
            shadeIntensity: 0.5,
            gradientToColors: ["#ABE5A1"],
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100],
          },
        },
        colors: ["#0fbcf9"],
      }}
    />
  );
}

export default ScoreChart;
