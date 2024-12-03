import React, { useEffect } from "react";
import Chart from "chart.js/auto";

const DutyProfilePlot = ({ journeysCollection }) => {
    const generateSegmentedVariancePower = (avgPower, variance, durationInSeconds) => {
        const segments = 5; // Divide time into 5 segments
        const segmentDuration = Math.floor(durationInSeconds / segments);
        const powerData = [];
      
        for (let i = 0; i < segments; i++) {
          const varianceCap = Math.random() * variance; // Random variance cap for this segment
          for (let j = 0; j < segmentDuration; j++) {
            const varianceFactor = Math.random() * (varianceCap / 100);
            const power = Math.random() < 0.5
              ? avgPower * (1 - varianceFactor)
              : avgPower * (1 + varianceFactor);
            powerData.push(power);
          }
        }
      
        return powerData;
      };
    const downsampleData = (timeData, powerData, step = 10) => {
        const downsampledTime = [];
        const downsampledPower = [];
        for (let i = 0; i < timeData.length; i += step) {
          downsampledTime.push(timeData[i]);
          downsampledPower.push(powerData[i]);
        }
        return { downsampledTime, downsampledPower };
    };
    const smoothData = (powerData, windowSize = 5) => {
        return powerData.map((_, idx, arr) => {
          const start = Math.max(0, idx - Math.floor(windowSize / 2));
          const end = Math.min(arr.length, idx + Math.ceil(windowSize / 2));
          const window = arr.slice(start, end);
          return window.reduce((sum, val) => sum + val, 0) / window.length;
        });
    };
          

  useEffect(() => {
    if (journeysCollection.length === 0) return;

    // Prepare data
    let timeData = [];
    let powerData = [];
    let currentTime = 0;

    journeysCollection.forEach((journey) => {
        const durationInSeconds = journey.time_span * 60;
        const segmentPower = generateSegmentedVariancePower(journey.avg_pwr, journey.var, durationInSeconds);
      
        for (let i = 0; i < segmentPower.length; i++) {
          timeData.push(currentTime);
          powerData.push(segmentPower[i]);
          currentTime++;
        }
    });
    const { downsampledTime, downsampledPower } = downsampleData(timeData, powerData, 10);
    const smoothedPower = smoothData(downsampledPower, 5);

    const existingChart = Chart.getChart("dutyChart");
    if (existingChart) existingChart.destroy();

    new Chart(document.getElementById("dutyChart"), {
      type: "line",
      data: {
        labels: downsampledTime,
        datasets: [
          {
            label: "Power vs Time",
            data: smoothedPower,
            borderColor: "black",
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
