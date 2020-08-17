export default {
  options: {
    scales: {
      yAxes: [
        {
          gridLines: {
            tickMarkLength: 4,
            borderDash: [4, 4],
            drawTicks: false,
          },
          ticks: {
            beginAtZero: true,
            fontColor: '#878787',
            fontSize: 10,
            padding: 15,
            callback() {
              return '13.05';
            },
          },
        },
      ],
      xAxes: [
        {
          display: false,
        },
      ],
    },
    legend: {
      display: false,
    },
  },
};
