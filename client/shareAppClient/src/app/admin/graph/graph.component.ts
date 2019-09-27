import { Component, OnInit } from "@angular/core";
import { Chart } from "chart.js";
@Component({
  selector: "app-graph",
  templateUrl: "./graph.component.html",
  styleUrls: ["./graph.component.css"]
})
export class GraphComponent implements OnInit {
  title = "dashboard";
  chart;
  chart2 = [];
  pie: any;
  doughnut: any;

  data1 = [];

  ngOnInit() {
    // socket.on("data1", res => {
    //   this.updateChartData(this.chart, res, 0);
    //   this.updateChartData(this.doughnut, res.slice(0, 5), 0);
    // });

    // socket.on("data2", res => {
    //   this.updateChartData(this.chart, res, 1);
    // });

    let options = {
      // aspectRatio: 1,
      // legend: false,
      tooltips: false,

      elements: {
        point: {
          borderWidth: function(context) {
            return Math.min(Math.max(1, context.datasetIndex + 1), 8);
          },
          hoverBackgroundColor: "transparent",
          hoverBorderColor: function(context) {
            return "red";
          },
          hoverBorderWidth: function(context) {
            var value = context.dataset.data[context.dataIndex];
            return Math.round((8 * value.v) / 1000);
          },
          radius: function(context) {
            var value = context.dataset.data[context.dataIndex];
            var size = context.chart.width;
            var base = Math.abs(value.v) / 1000;
            return (size / 24) * base;
          }
        }
      }
    };

    this.doughnut = new Chart("doughnut", {
      type: "doughnut",
      options: {
        responsive: true,
        title: {
          display: true,
          text: "Registered Users"
        },
        legend: {
          position: "top"
        },
        animation: {
          animateScale: true,
          animateRotate: true
        }
      },
      data: {
        datasets: [
          {
            data: [1, 2, 1, 1, 1, 1, 1],
            backgroundColor: [
              "red",
              "orange",
              "yellow",
              "green",
              "pink",
              "blue",
              "purple"
            ],
            label: "Dataset 1"
          }
        ],
        labels: [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        ]
      }
    });
  }

  addData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach(dataset => {
      dataset.data.push(data);
    });
    chart.update();
  }

  removeData(chart) {
    chart.data.labels.pop();
    chart.data.datasets.forEach(dataset => {
      dataset.data.pop();
    });
    chart.update();
  }

  updateChartData(chart, data, dataSetIndex) {
    chart.data.datasets[dataSetIndex].data = data;
    chart.update();
  }
}
