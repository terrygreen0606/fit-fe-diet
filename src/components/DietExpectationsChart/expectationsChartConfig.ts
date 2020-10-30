export const data = ({
  pointBackgroundColor1,
  pointBackgroundColor2,
  pointBorderColor,
  backgroundColor,
  borderColor,
}: any) => ({
  labels: [],
  datasets: [
    {
      lineTension: 0.5,
      pointBackgroundColor: context => {
        const index = context.dataIndex;

        if (index === 1) {
          return pointBackgroundColor1;
        } else if (index === 3) {
          return pointBackgroundColor2;
        } else {
          return 'transparent';
        }
      },
      pointRadius: context => {
        const index = context.dataIndex;

        if (index === 1 || index === 3) {
          return 12;
        } else {
          return 0;
        }
      },
      pointBorderWidth: context => {
        const index = context.dataIndex;

        if (index === 1 || index === 3) {
          return 6;
        } else {
          return 0;
        }
      },
      pointBorderColor,
      backgroundColor,
      borderColor,
      borderWidth: 2,
      data: []
    }
  ],
});

export const options = {
  legend: {
    display: false
  },
  scales: {
    yAxes: [{
      display: false,
    }],
    xAxes: [{
      display: false,

    }]
  },
  responsive: true,
  showAllTooltips: true,
  tooltips: {
    filter: (tooltipItem, data) => {
      const label = data.labels[tooltipItem.index];
      
      if (tooltipItem.index === 1 || tooltipItem.index === 3) {
        return true;
      } else {
        return false;
      }
    },
    backgroundColor: '#FFF',
    titleFontFamily: '"SF Pro Text", "SF Pro Icons", "Helvetica Neue", "Helvetica", "Arial", sans-serif',
    titleFontSize: 14,
    titleFontColor: '#000',
    titleFontStyle: '500',
    caretSize: 0,
    caretPadding: 25,
    yPadding: 5,
    xPadding: 3,
    cornerRadius: 10,
    bodyFontStyle: 'bold',
    titleAlign: 'center',
    bodyFontColor: '#000',
    bodyFontFamily: '"SF Pro Text", "SF Pro Icons", "Helvetica Neue", "Helvetica", "Arial", sans-serif',
    bodyAlign: 'center',
    bodyFontSize: 14,
    displayColors: false,
  }
};
