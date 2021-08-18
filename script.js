window.onload = function () {
  const min = 1,
    max = 200;

  // Charts Data Random
  const data = [
    { label: "Jan", value: getRandomInt(min, max) },
    { label: "Feb", value: getRandomInt(min, max) },
    { label: "March", value: getRandomInt(min, max) },
    { label: "April", value: getRandomInt(min, max) },
    { label: "May", value: getRandomInt(min, max) }
  ];

  // Charts Specification
  const targetid = "chart",
    canvasWidth = 600,
    canvasHeight = 450;
  const chart = new BarChart(targetid, canvasWidth, canvasHeight, data);
};

// Random number generator
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}
