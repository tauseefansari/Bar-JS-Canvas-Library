/**
 *
 * bar.js
 * simple, elegant bar chart library
 * {date} - version 1.0
 * {url}
 *
 * Copyright 2021 {Tauseef Ansari}
 * Relased under the MIT License
 * {license url}
 *
 */

"use strict";
let chart = null;

function BarChart(targetid, width, height, data) {
  // Base
  chart = this;

  // Configure chart
  chart.configureChart(targetid, width, height, data);

  // Chart Pre-Operations
  chart.performPreOperations();

  // Draw Chart
  chart.drawChart();
}

BarChart.prototype.configureChart = function (targetid, width, height, data) {
  // Canvas Specification
  chart.setCanvasParameters(targetid, width, height, data);

  // Chart Parameters
  chart.setChartParameters();
};

BarChart.prototype.setCanvasParameters = function (targetid, width, height, data) {
  // Global Specification from user for canvas
  chart.id = targetid;
  chart.width = width;
  chart.height = height;
  chart.data = data;
};

BarChart.prototype.setChartParameters = function () {
  // Chart Specification
  // Axis Configurations
  chart.axisRatio = 10; // in percentage
  chart.verticalMargin = (chart.height * chart.axisRatio) / 100;
  chart.horizontalMargin = (chart.width * chart.axisRatio) / 100;
  chart.axisColor = "#b1b1b1";
  chart.axisWidth = 1.5;

  // Label Configurations
  chart.fontRatio = 3;
  chart.fontFamily = "times";
  chart.fontStyle = "normal";
  chart.fontWeight = "300";
  chart.fontColor = "#666";
  chart.verticalFontSize = (chart.height * chart.fontRatio) / 100;
  chart.horizontalFontSize = (chart.width * chart.fontRatio) / 100;

  // Guideline Configurations
  chart.guidelineColor = "#e5e5e5";
  chart.guidelineWidth = 0.9;
};

BarChart.prototype.performPreOperations = function () {
  // Create Canvas
  chart.createCanvas();

  // Get Data
  chart.handleData();

  // Prepare Data
  chart.prepareData();
};

BarChart.prototype.createCanvas = function () {
  // Create Canvas
  const canvas = document.createElement("canvas");
  canvas.id = chart.id + "-" + Math.random();
  canvas.width = chart.width;
  canvas.height = chart.height;

  // Append Canvas inside target
  document.getElementById(chart.id).innerHTML = ""; // Clean Target
  document.getElementById(chart.id).appendChild(canvas); // Append Canvas

  // Add canvas to chart object
  chart.canvas = canvas;
  chart.context = canvas.getContext("2d");
};

BarChart.prototype.handleData = function () {
  // Chart Data
  chart.labels = [];
  chart.values = [];

  // Handle Data
  chart.data.forEach(item => {
    chart.labels.push(item.label);
    chart.values.push(item.value);
  });
};

BarChart.prototype.prepareData = function () {
  chart.itemsNum = chart.data.length;
  chart.maxValue = Math.max.apply(null, chart.values);
  chart.minValue = Math.min.apply(null, chart.values);

  // Axis Specifications
  chart.verticalAxisWidth = chart.height - 2 * chart.verticalMargin; // Bottom and top margin
  chart.horizontalAxisWidth = chart.width - 2 * chart.horizontalMargin; // left and right margin

  // Label Specifications
  chart.verticalUpperBound = Math.ceil(chart.maxValue / 10) * 10;
  chart.verticalLabelFreq = chart.verticalUpperBound / chart.itemsNum;
  chart.horizontalLabelFreq = chart.horizontalAxisWidth / chart.itemsNum;
};

BarChart.prototype.drawChart = function () {
  // Draw Vertical Axis
  chart.drawVerticalAxis();

  // Draw Vertical Labels
  chart.drawVerticalLabels();

  // Draw Horizontal Axis
  chart.drawHorizontalAxis();

  // Draw Horizontal Labels
  chart.drawHorizontalLabels();

  // Draw Horizontal Guidelines
  chart.drawHorizontalGuidelines();

  // Draw Vertical Guidelines
  chart.drawVerticalGuidelines();

  // Draw Bars
  chart.drawBars();
};

BarChart.prototype.drawVerticalAxis = function () {
  // Vertical Axis
  chart.context.beginPath();
  chart.context.strokeStyle = chart.axisColor;
  chart.context.lineWidth = chart.axisWidth;
  chart.context.moveTo(chart.horizontalMargin, chart.verticalMargin);
  chart.context.lineTo(chart.horizontalMargin, chart.height - chart.verticalMargin);
  chart.context.stroke();
};

BarChart.prototype.drawVerticalLabels = function () {
  // Text Specifications
  const labelFont = `${chart.fontStyle} ${chart.fontWeight} ${chart.verticalFontSize}px ${chart.fontFamily}`;
  chart.context.font = labelFont;
  chart.context.textAlign = "right";
  chart.context.fillStyle = chart.fontColor;

  // Scale Values for Frequency
  const scaledVerticalLabelFreq = (chart.verticalAxisWidth / chart.verticalUpperBound) * chart.verticalLabelFreq;

  // Draw Labels
  for (let index = 0; index <= chart.itemsNum; index++) {
    const labelText = chart.verticalUpperBound - index * chart.verticalLabelFreq;
    const verticalLabelX = chart.horizontalMargin - chart.horizontalMargin / chart.axisRatio;
    const verticalLabelY = chart.verticalMargin + index * scaledVerticalLabelFreq;
    chart.context.fillText(labelText, verticalLabelX, verticalLabelY);
  }
};

BarChart.prototype.drawHorizontalAxis = function () {
  // Horizontal Axis
  chart.context.beginPath();
  chart.context.strokeStyle = chart.axisColor;
  chart.context.lineWidth = chart.axisWidth;
  chart.context.moveTo(chart.horizontalMargin, chart.height - chart.verticalMargin);
  chart.context.lineTo(chart.width - chart.horizontalMargin, chart.height - chart.verticalMargin);
  chart.context.stroke();
};

BarChart.prototype.drawHorizontalLabels = function () {
  // Text Specifications
  const labelFont = `${chart.fontStyle} ${chart.fontWeight} ${chart.verticalFontSize}px ${chart.fontFamily}`;
  chart.context.textAlign = "center";
  chart.context.textBaseline = "top";
  chart.context.font = labelFont;
  chart.context.fillStyle = chart.fontColor;

  // Draw Labels
  for (let index = 0; index < chart.itemsNum; index++) {
    const horizontalLabelX = chart.horizontalMargin + index * chart.horizontalLabelFreq + chart.horizontalLabelFreq / 2;
    const horizontalLabelY = chart.height - chart.verticalMargin + chart.verticalMargin / chart.axisRatio;
    chart.context.fillText(chart.labels[index], horizontalLabelX, horizontalLabelY);
  }
};

BarChart.prototype.drawHorizontalGuidelines = function () {
  // Guidelines Specifications
  chart.context.strokeStyle = chart.guidelineColor;
  chart.context.lineWidth = chart.guidelineWidth;

  // Scale Values for Guildlines
  const scaledVerticalLabelFreq = (chart.verticalAxisWidth / chart.verticalUpperBound) * chart.verticalLabelFreq;

  // Draw Guidelines
  for (let index = 0; index <= chart.itemsNum; index++) {
    // Starting Point
    const horizontalGuidelineStartX = chart.horizontalMargin;
    const horizontalGuidelineStartY = chart.verticalMargin + index * scaledVerticalLabelFreq;

    //End Point
    const horizontalGuidelineEndX = chart.horizontalMargin + chart.horizontalAxisWidth;
    const horizontalGuidelineEndY = chart.verticalMargin + index * scaledVerticalLabelFreq;

    chart.context.beginPath();
    chart.context.moveTo(horizontalGuidelineStartX, horizontalGuidelineStartY);
    chart.context.lineTo(horizontalGuidelineEndX, horizontalGuidelineEndY);
    chart.context.stroke();
  }
};

BarChart.prototype.drawVerticalGuidelines = function () {
  // Guidelines Specifications
  chart.context.strokeStyle = chart.guidelineColor;
  chart.context.lineWidth = chart.guidelineWidth;

  // Draw Labels
  for (let index = 0; index <= chart.itemsNum; index++) {
    // Starting Point
    const verticalGuidelineStartX = chart.horizontalMargin + index * chart.horizontalLabelFreq;
    const verticalGuidelineStartY = chart.height - chart.verticalMargin;

    // End Point
    const verticalGuidelineEndX = chart.horizontalMargin + index * chart.horizontalLabelFreq;
    const verticalGuidelineEndY = chart.verticalMargin;

    chart.context.beginPath();
    chart.context.moveTo(verticalGuidelineStartX, verticalGuidelineStartY);
    chart.context.lineTo(verticalGuidelineEndX, verticalGuidelineEndY);
    chart.context.stroke();
  }
};

BarChart.prototype.drawBars = function () {
  // Draw Bars
  for (let index = 0; index < chart.itemsNum; index++) {
    // Color for Bar
    const color = chart.createRandomRGBColor();
    const fillOpacity = "0.3";
    const fillColor = `rgba(${color.r},${color.g},${color.b},${fillOpacity})`;
    const borderColor = `rgba(${color.r},${color.g},${color.b})`;

    chart.context.fillStyle = fillColor;
    chart.context.strokeStyle = borderColor;
    chart.context.beginPath();
    const barX = chart.horizontalMargin + index * chart.horizontalLabelFreq + chart.horizontalLabelFreq / chart.axisRatio;
    const barY = chart.height - chart.verticalMargin;
    const barWidth = chart.horizontalLabelFreq - (2 * chart.horizontalLabelFreq) / chart.axisRatio;
    const barHeight = (-1 * chart.verticalAxisWidth * chart.values[index]) / chart.maxValue;
    chart.context.rect(barX, barY, barWidth, barHeight);
    chart.context.stroke();
    chart.context.fill();
  }
};

BarChart.prototype.createRandomRGBColor = function () {
  const red = getRandomInt(0, 257);
  const green = getRandomInt(0, 257);
  const blue = getRandomInt(0, 257);
  return { r: red, g: green, b: blue };
};

// Random number generator
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}
