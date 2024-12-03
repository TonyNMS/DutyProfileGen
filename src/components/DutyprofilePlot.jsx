import React, { useEffect } from "react";
import Chart from "chart.js/auto";

const DutyProfilePlot = ({ journeysCollection }) => {
  useEffect(() => {
    if (journeysCollection.length === 0) return;

    // Prepare data
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

    // Destroy previous chart instance if it exists
    const existingChart = Chart.getChart("dutyChart");
    if (existingChart) existingChart.destroy();

    // Create new chart
    new Chart(document.getElementById("dutyChart"), {
      type: "line",
      data: {
        labels: timeData,
        datasets: [
          {
            label: "Power vs Time",
            data: powerData,
            borderColor: "white",
            borderWidth: 0.1,
            tension: 0.1,
            pointRadius: 0,
            fill: false,
          },
        ],
      },
      options: {
        scales: {
          x: {
            title: {
              display: true,
              text: "Time (seconds)",
            },
          },
          y: {
            title: {
              display: true,
              text: "Power (kW)",
            },
          },
        },
      },
    });
  }, [journeysCollection]);

  return (
    <div className="dutyProfilePlot">
      <h3>Duty Profile Plot</h3>
      <canvas id="dutyChart"></canvas>
    </div>
  );
};

export default DutyProfilePlot;
