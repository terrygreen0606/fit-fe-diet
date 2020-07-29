import React, { useEffect } from 'react';

import Chart from "chart.js";

const WaterChart = ( labels ) => {

 useEffect(() => {

    const data = labels.labels

    const ctx = document.getElementById("myChart");
  
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: data,
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
            // pointHoverBackgroundColor: "#3283EB",
            pointBorderWidth: 4,
            pointBorderColor: '#fff',
            // pointHoverBorderColor: "#3283EB",
            // pointHoverBorderWidth: 0,
            pointHoverRadius: 10,
            // hoverBorderColor: '#000'
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
    });
  })


  return (
    <div>
      <canvas id="myChart"></canvas>
    </div>
  )
}

export default WaterChart;