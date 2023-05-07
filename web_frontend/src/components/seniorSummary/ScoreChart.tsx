import ApexChart from "react-apexcharts";

function ScoreChart(prop: number) {
  return (
    <ApexChart
      type="radialBar"
      series={[prop]}
      options={{
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
              strokeWidth: "70%",
              margin: 0,
              dropShadow: {
                enabled: true,
                top: 3,
                left: 0,
                blur: 7,
                opacity: 0.5,
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
