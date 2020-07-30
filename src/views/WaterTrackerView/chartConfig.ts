export const chartConfig = {
  type: 'line',
  data: {
    labels: ['Sun', 'Mon', 'Tus', 'Wen', 'Thu', 'Fri', 'Sat'],
    datasets: [
      {
        steppedLine: false,
        data: [20,55,15,80,60,70,35],
        backgroundColor: [
          "rgba(255, 255, 255, 0)"
        ],
        borderColor: [
          "rgba(188, 213, 247, 0.4)"
        ],
        borderWidth: 3,
        pointBackgroundColor: "#3283EB",
        pointBorderWidth: 4,
        pointBorderColor: '#fff',
        pointHoverRadius: 10,
      }
    ]
  },
  options: {
    title: {
      display: false,
    },
    aspectRatio: 1.5,
    responsive: true,
    legend: {
      display: false
    },
    elements: {
      line: {
        tension: 0.6
      },
      point: {
        radius: 10
      }
    },
    scales: {
      xAxes: [
        {
          gridLines: {
            display: true,
            tickMarkLength: 10,
            borderDash: [6,6],
            drawTicks: false,
          },
          ticks: {
            fontColor: "#000",
            fontSize: 12,
            zeroLineBorderDashOffset: 20,
            padding: 10
          }
        }
      ],
      yAxes: [
        {
          gridLines: {
            display: true,
            drawBorder: false,
            color: "#bbcbdb",
            lineWidth: 1,
            tickMarkLength: 20,
            zeroLineWidth: 1,
            borderDash: [6,6],
            drawTicks: false,

          },
          ticks: {
            beginAtZero: false,
            suggestedMin: 0,
            suggestedMax: 100,
            fontColor: "#000",
            fontSize: 12,
            stepSize: 25,
            zeroLineBorderDashOffset: 20,
            padding: 10
          }
        }
      ]
    }
  }
};