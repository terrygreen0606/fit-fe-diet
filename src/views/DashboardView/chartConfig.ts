export default {
  options: {
    title: {
      display: false,
    },
    aspectRatio: 1.5,
    responsive: true,
    legend: {
      display: false,
    },
    elements: {
      line: {
        tension: 0.6,
      },
      point: {
        radius: 10,
      },
    },
    tooltips: {
      backgroundColor: '#3283EB',
      titleFontColor: '#fff',
      titleFontStyle: 'bold',
      titleSpacing: 4,
      titleFontSize: 14,
      titleFontFamily: "'Montserrat', sans-serif",
    },
    scales: {
      xAxes: [
        {
          gridLines: {
            display: true,
            tickMarkLength: 10,
            borderDash: [6, 6],
            drawTicks: false,
          },
          ticks: {
            fontColor: '#000',
            fontSize: 14,
            padding: 10,
            fontFamily: "'Montserrat', sans-serif",
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            display: true,
            drawBorder: false,
            color: '#bbcbdb',
            lineWidth: 1,
            tickMarkLength: 20,
            zeroLineWidth: 1,
            borderDash: [6, 6],
            drawTicks: false,
          },
          ticks: {
            beginAtZero: false,
            suggestedMin: 0,
            suggestedMax: 100,
            fontColor: '#000',
            fontSize: 14,
            stepSize: 25,
            padding: 10,
            fontFamily: "'Montserrat', sans-serif",
          },
        },
      ],
    },
  },
};
