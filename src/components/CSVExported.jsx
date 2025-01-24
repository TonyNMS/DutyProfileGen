import React from "react";

const CSVExported = ({ journeysCollection }) => {
  const exportPlotDataToCSV = () => {
    if (!journeysCollection.length) {
      alert("No journeys to export!");
      return;
    }


    let timeData = [];
    let powerData = [];
    let currentTime = 0;

    journeysCollection.forEach((journey) => {
      const durationInSeconds = journey.time_span * 60; // Convert minutes to seconds
      for (let i = 0; i < durationInSeconds; i++) {
        const varianceFactor = Math.random() * (journey.var / 100);
        const power = Math.random() < 0.5
          ? journey.avg_pwr * (1 - varianceFactor)
          : journey.avg_pwr * (1 + varianceFactor);

        timeData.push(currentTime);
        powerData.push(power);
        currentTime++;
      }
    });

 
    const csvContent = [
      ["Time (seconds)", "Power (kW)"].join(","), // Header row
      ...timeData.map((time, index) => `${time},${powerData[index]}`), // Each row: time,power
    ].join("\n");


    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });


    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "time_vs_power.csv";
    link.style.display = "none";


    document.body.appendChild(link);
    link.click();


    document.body.removeChild(link);
  };

  return (
    <div>
      <button onClick={exportPlotDataToCSV}>Export Plot Data to CSV</button>
    </div>
  );
};

export default CSVExported;
