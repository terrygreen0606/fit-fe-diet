import { getImagePath } from 'utils';

export const chartConfig = {
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
            callback: (value) => `${value}%`,
          },
        },
      ],
    },
  },
};

export const bannerData = [
  {
    title: 'wt.banner.title1',
    desc: 'wt.banner.desc1',
    image: getImagePath('water-woman.png'),
  },
  {
    title: 'wt.banner.title2',
    desc: 'wt.banner.desc2',
    image: getImagePath('glasses.png'),
  },
  {
    title: 'wt.banner.title3',
    desc: 'wt.banner.desc3',
    image: getImagePath('woman-graphic.png'),
  },
];

export const periods = {
  week: 'week',
  month: 'month',
  year: 'year',
};
