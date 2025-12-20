import { useState } from "react";
import ReactApexChart from "react-apexcharts";
const dataSet = [
    // PRODUCT A
    [
        [new Date("2014-01-01").getTime(), 3400000],
        [new Date("2014-01-03").getTime(), 4300000],
        [new Date("2014-01-06").getTime(), 3100000],
        [new Date("2014-01-10").getTime(), 5200000],
        [new Date("2014-01-15").getTime(), 4100000],
        [new Date("2014-01-20").getTime(), 4800000],
    ],

    // PRODUCT B
    [
        [new Date("2014-01-01").getTime(), 2800000],
        [new Date("2014-01-04").getTime(), 3600000],
        [new Date("2014-01-08").getTime(), 2900000],
        [new Date("2014-01-12").getTime(), 4500000],
        [new Date("2014-01-18").getTime(), 3900000],
        [new Date("2014-01-20").getTime(), 4200000],
    ],

    // PRODUCT C
    [
        [new Date("2014-01-02").getTime(), 1900000],
        [new Date("2014-01-05").getTime(), 2600000],
        [new Date("2014-01-09").getTime(), 2300000],
        [new Date("2014-01-14").getTime(), 3200000],
        [new Date("2014-01-17").getTime(), 2800000],
        [new Date("2014-01-20").getTime(), 3500000],
    ],
];


const ApexChart = () => {
    const [state,] = useState({

        series: [{
            name: 'PRODUCT A',
            data: dataSet[0]
        }, {
            name: 'PRODUCT B',
            data: dataSet[1]
        }, {
            name: 'PRODUCT C',
            data: dataSet[2]
        }],
        options: {
            chart: {
                type: 'area',
                stacked: false,
                height: 350,
                zoom: {
                    enabled: false
                },
            },
            dataLabels: {
                enabled: false
            },
            markers: {
                size: 0,
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shadeIntensity: 1,
                    inverseColors: false,
                    opacityFrom: 0.45,
                    opacityTo: 0.05,
                    stops: [20, 100, 100, 100]
                },
            },
            yaxis: {
                labels: {
                    style: {
                        colors: '#8e8da4',
                    },
                    offsetX: 0,
                    formatter: function (val) {
                        return (val / 1000000).toFixed(2);
                    },
                },
                axisBorder: {
                    show: false,
                },
                axisTicks: {
                    show: false
                }
            },
            xaxis: {
                type: 'datetime',
                tickAmount: 8,
                min: new Date("01/01/2014").getTime(),
                max: new Date("01/20/2014").getTime(),
                labels: {
                    rotate: -15,
                    rotateAlways: true,
                    formatter: function (val, timestamp) {
                        return new Date(timestamp).toUTCString().slice(0, 16);
                    }
                }
            },
            title: {
                text: 'Irregular Data in Time Series',
                align: 'left',
                offsetX: 14
            },
            tooltip: {
                shared: true
            },
            legend: {
                position: 'top',
                horizontalAlign: 'right',
                offsetX: -10
            }
        },


    });



    return (
        <div>
            <div id="chart">
                <ReactApexChart options={state.options} series={state.series} type="area" height={350} />
            </div>
            <div id="html-dist"></div>
        </div>
    );
}

export default ApexChart