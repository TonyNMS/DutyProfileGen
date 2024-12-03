import React from "react";

const CSVExported = ({ journeysCollection }) => {
  const exportPlotDataToCSV = () => {
    if (!journeysCollection.length) {
      alert("No journeys to export!");
      return;
    }

    // Prepare data for time and power
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

    // Combine time and power into CSV format
    const csvContent = [
      ["Time (seconds)", "Power (kW)"].join(","), // Header row
      ...timeData.map((time, index) => `${time},${powerData[index]}`), // Each row: time,power
    ].join("\n");

    // Create a Blob from the CSV content
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

    // Create a link to download the CSV
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "time_vs_power.csv";
    link.style.display = "none";

    // Add link to the DOM and trigger click
    document.body.appendChild(link);
    link.click();

    // Clean up
    document.body.removeChild(link);
  };

  return (
    <div>
      <button onClick={exportPlotDataToCSV}>Export Plot Data to CSV</button>
    </div>
  );
};

export default CSVExported;
