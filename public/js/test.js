
function generateData(count, yrange) {
  let i = 0
  let series = []
  let x, y
  while (i < count) {
    x = String(i + 1)
    y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
    series.push({
      x: x,
      y: y
    });
    i++;
  }
  return series
}

// function generateWeeks(num) {
//   let result = []
//   for (let i = 1; i <= num; i++) {
//     result.push(`Week ${i}`)
//   }
//   return result
// }


const options = {
  chart: {
    height: 350,
    type: "heatmap"
  },
  colors: [
    "#5A9BD5",
  ],
  plotOptions: {
    heatmap: {
      shadeIntensity: 1
    }
  },
  dataLabels: {
    enabled: false
  },
  series: [
    {
      name: "",
      data: generateData(30, {
        min: -30,
        max: 55
      })
    },
    {
      name: "Fri",
      data: generateData(30, {
        min: -30,
        max: 55
      })
    },
    {
      name: "",
      data: generateData(30, {
        min: -30,
        max: 55
      })
    },
    {
      name: "Wednesday",
      data: generateData(30, {
        min: -30,
        max: 55
      })
    },
    {
      name: "",
      data: generateData(30, {
        min: -30,
        max: 55
      })
    },
    {
      name: "Monday",
      data: generateData(30, {
        min: -30,
        max: 55
      })
    },
    {
      name: "",
      data: generateData(30, {
        min: -30,
        max: 55
      })
    },
  ],
  xaxis: {
    type: 'numeric'
    // type: 'category'
    // categories: generateWeeks(53),
    // labels: {
    //   datetimeFormatter: {
    //     year: 'yyyy',
    //     month: 'MMM \'yy',
    //     day: 'dd MMM',
    //     hour: 'HH:mm'
    //   }
    // } 
  },
  title: {
    text: 'Calendar Heatmap'
  },
};

const chart = new ApexCharts(document.querySelector("#chart"), options);
chart.render();