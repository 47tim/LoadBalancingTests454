// Timothy Hyde 2025
// This is the functionality for cycling through the different charts on the webpage

const labels = ['ALB', 'CLB', 'NLB', 'CUSTOM'];

    const chartData = [
      {
        label: 'Requests per Second',
        data: [110.09, 114.62, 97.71, 98.40],
        backgroundColor: 'steelblue'
      },
      {
        label: 'Time per Request (ms)',
        data: [182.23, 174.52, 206.92, 204.04],
        backgroundColor: 'seagreen'
      },
      {
        label: 'Transfer Rate (KB/s)',
        data: [310.70, 278.37, 237.31, 335.85],
        backgroundColor: 'orange'
      },
      {
        label: 'Total Time (s)',
        data: [4.56, 4.36, 5.17, 5.10],
        backgroundColor: 'purple'
      }
    ];

    let currentChart = 0;

    const ctx = document.getElementById('mainChart').getContext('2d');

    let chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [chartData[currentChart]]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true
          },
          title: {
            display: true,
            text: chartData[currentChart].label
          }
        },
        scales: {
          y: {
            min: Math.min(...chartData[currentChart].data) - 1,
            max: Math.max(...chartData[currentChart].data) + 1
          }
        }
      }
    });

    function cycleChart() {
      currentChart = (currentChart + 1) % chartData.length;
      const data = chartData[currentChart].data;
      const min = Math.min(...data);
      const max = Math.max(...data);

      chart.data.datasets = [chartData[currentChart]];
      chart.options.plugins.title.text = chartData[currentChart].label;
      chart.options.scales.y.min = min - 1;
      chart.options.scales.y.max = max + 1;
      chart.update();
    }