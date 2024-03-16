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



document.getElementById("userForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent form submission
  
  // Retrieve input values
  var weight = parseFloat(document.getElementById("weight").value);
  var height = parseFloat(document.getElementById("height").value);
  var age = parseInt(document.getElementById("age").value);
  var gender = document.getElementById("gender").value;
  var physicalActivity = parseFloat(document.getElementById("physicalActivity").value);
  var sleepDuration = parseFloat(document.getElementById("sleepDuration").value);
  var stressLevel = parseInt(document.getElementById("stressLevel").value);
  
  // Health status categories
  var healthStatus = {
      GREAT: "Great",
      MEDIUM: "Medium",
      BAD: "Bad"
  };

  // Health status determination based on criteria
  var healthCondition;
  if (age >= 12 && age <= 60) {
      if (gender === "male") {
          if (weight >= 50 && weight <= 90 && height >= 160 && height <= 190 &&
              physicalActivity >= 7 && sleepDuration >= 7 && stressLevel <= 5) {
              healthCondition = healthStatus.GREAT;
          } else {
              healthCondition = healthStatus.MEDIUM;
          }
      } else if (gender === "female") {
          if (weight >= 45 && weight <= 80 && height >= 150 && height <= 180 &&
              physicalActivity >= 7 && sleepDuration >= 7 && stressLevel <= 5) {
              healthCondition = healthStatus.GREAT;
          } else {
              healthCondition = healthStatus.MEDIUM;
          }
      } else {
          healthCondition = healthStatus.BAD; // Non-binary gender, we're assuming a general case here
      }
  } else {
      healthCondition = healthStatus.BAD; // For ages outside of the range, assuming it's bad
  }
  alert("Your health condition is: " + healthCondition);
  
  // Generate CSV content
  var csvContent = "Weight (kg),Height (cm),Age (years),Gender,Physical Activity (hours/week),Sleep Duration (hours/night),Stress Level (1-10)\n";
  csvContent += `${weight},${height},${age},${gender},${physicalActivity},${sleepDuration},${stressLevel}\n`;
  // Create a new Blob with the CSV content
  var blob = new Blob([csvContent], { type: 'text/csv' });
  var link = document.createElement('a');
  // Set the link href for the download
  link.href = URL.createObjectURL(blob);
  // Set the filename for the download
  link.download = 'participants.csv';
  // Append the link to the body and click it to trigger the download
  document.body.appendChild(link);
  link.click();
  // Append the data to the existing participants.csv file
  var file = new File([blob], 'participants.csv', { type: 'text/csv' });
  var reader = new FileReader();
  reader.onload = function(e) {
      var existingContent = e.target.result;
      var newContent = existingContent + csvContent;
      var newBlob = new Blob([newContent], { type: 'text/csv' });
      var fileWriter = new FileWriter();
      fileWriter.write(file, newBlob);
      console.log('Data appended to participants.csv');
  };
  reader.readAsText(file);
});
