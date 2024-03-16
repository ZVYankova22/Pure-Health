const data = [{
    labels: ['1996', '2000', '2004', '2008', '2012', '2016', '2018'],
    datasets: [{
      label: 'World Obesity',
      data: [18, 23, 33, 34, 35, 40, 45],
      backgroundColor: [
        'rgba(255, 26, 104, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(0, 0, 0, 0.2)'
      ],
      borderColor: [
        'rgba(255, 26, 104, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(0, 0, 0, 1)'
      ],
      borderWidth: 1
    }]
  }]
 
 
  const config = {
    type: 'line',
    data: data[0],
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };
 
  // render init block
  const myChart = new Chart(
    document.getElementById('lineChart'),
    config
  );
 
  const chartVersion = document.getElementById('chartVersion');
chartVersion.innerText = Chart.version;
