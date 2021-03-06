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
          },
        },
      ],
      xAxes: [
        {
          gridLines: {
            tickMarkLength: 4,
            borderDash: [4, 4],
            drawTicks: false,
          },
          ticks: {
            fontColor: '#878787',
            fontSize: 10,
            padding: 15,
          },
        },
      ],
    },
    legend: {
      display: false,
    },
  },
};
