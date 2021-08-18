# Bar-JS-Canvas-Library
> Lightweight, configurable and simple bar chart library in JavaScript

[![Packagist](https://img.shields.io/packagist/l/doctrine/orm.svg)]()
[![Chrome Web Store](https://img.shields.io/chrome-web-store/stars/nimelepbpejjlbmoobocpfnjhihnpked.svg)]()
[![Open Source Love png1](https://badges.frapsoft.com/os/v1/open-source.png?v=103)](https://github.com/ellerbrock/open-source-badges/)
[![Ask Me Anything !](https://img.shields.io/badge/Ask%20me-anything-1abc9c.svg)](https://GitHub.com/tauseefansari/)
[![ForTheBadge built-with-love](http://ForTheBadge.com/images/badges/built-with-love.svg)](https://GitHub.com/Naereen/)



## Description
bar.js is a Canvas based simple JavaScript Bar Chart Library to provide a configurable, lightweight and dependency-free experience.

![](output/ss1.PNG)

## Installation
Download  the `bar.min.js`and include it in your project.

```html
<script src="bar.min.js"></script>
```

## Usage
To create the bar chart, you need a block level container like a div or p.

```html
<div id="chart">This will be bar chart!</div>
```
Then you can create the BarChart object in your JavaScript file.

```js
var barChart = new BarChart(chartId, chartWidth, chartHeight, data);
```

### Parameters
- `chartId - containerId (String)`
Defines the id of container like "chart"

- `chartWidth (Integer)`
Defines the width of the chart like 500

- `chartHeight (Integer)`
Defines the height of the chart like 400

- `data (Objects Array)`
Defines the data objects. The objects should have 2 key-value pairs: label and value. Example data: 

```js
  var data = [
    {label: 'Jan', value: 123,
    {label: 'Feb', value: 11,
    {label: 'March', value: 55,
    {label: 'April', value: 893,
    {label: 'May', value: 343
  ];
```

## Licence
[MIT](https://github.com/tauseefansari/Bar-JS-Canvas-Library/blob/main/LICENSE) © [Tauseef Ansari](https://github.com/tauseefansari)
