'use strict';

var chart_1 = document.getElementById('chart_1');
var chart_2 = document.getElementById('chart_2');
var chart_3 = document.getElementById('chart_3');
var loading_bar = document.getElementById('loading_bar');

var labels = ['сен', 'окт', 'ноя', 'дек', 'янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сент'];
var data = [12, 19, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3, 5];

getData(charts_api_pathname)
    .then(data => {
        loading_bar.remove();
        runCharts(data);
    });

function runCharts(data) {
    var orders_chart = new Chart(chart_1, {
        type: 'bar',
        data: {
            labels: data.labels,
            datasets: [{
                label: 'Заказы, грн.',
                data: data.orders,
                backgroundColor: 'rgba(75, 192, 192, 0.2',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
    
    var expenses_chart = new Chart(chart_2, {
        type: 'bar',
        data: {
            labels: data.labels,
            datasets: [{
                label: 'Расходы, грн.',
                data: data.expenses,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
      
    var orders_chart = new Chart(chart_3, {
        type: 'bar',
        data: {
            labels: data.labels,
            datasets: [{
                label: 'Прибыль, грн.',
                data: data.profit,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}
