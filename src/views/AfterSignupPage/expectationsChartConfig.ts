export const data = {
  labels: [],
  datasets: [
    {
      lineTension: 0.5,
      pointBackgroundColor: context => {
        const index = context.dataIndex;

        if (index === 1) {
          return '#F5827D';
        } else if (index === 3) {
          return '#0FC1A1';
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
      pointBorderColor:'#fff',
      backgroundColor: '#FFEBB4',
      borderColor: '#FFBE00',
      borderWidth: 2,
      data: []
    }
  ],
};

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
  chartArea: {
    backgroundColor: '#fff'
  },
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
    titleFontFamily: 'Montserrat',
    titleFontSize: 14,
    titleFontColor: '#000',
    titleFontStyle: '500',
    caretSize: 0,
    caretPadding: 25,
    position: 'average',
    bodyFontStyle: 'bold',
    titleAlign: 'center',
    bodyFontColor: '#000',
    bodyFontFamily: 'Montserrat',
    bodyAlign: 'center',
    bodyFontSize: 14,
    displayColors: false,
  }
};
