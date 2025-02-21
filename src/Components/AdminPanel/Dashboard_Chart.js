import React, { useState } from 'react'
import ReactApexChart from "react-apexcharts";

function Dashboard_Chart() {
    const [state, setState] = useState({
        series: [
            {
                name: "New Users",
                data: [50, 70, 80, 120, 150, 200, 180, 220, 250, 300, 320, 350],
            },
        ],
        options: {
            chart: {
                type: "area",
                height: 400,
                zoom: {
                    enabled: false,
                },
                animations: {
                    enabled: true,
                    speed: 800,
                    animateGradually: {
                        enabled: true,
                        delay: 150,
                    },
                    dynamicAnimation: {
                        enabled: true,
                        speed: 350,
                    },
                },
            },
            toolbar: {
                show: true, // Ensure the toolbar is visible
            },
            xaxis: {
                categories: [
                    "Jan",
                    "Feb",
                    "Mar",
                    "April",
                    "May",
                    "June",
                    "July",
                    "Aug",
                    "Sept",
                    "Oct",
                    "Nov",
                    "Dec",
                ],
                labels: {
                    style: {
                        colors: "#333333", // Tomato color for x-axis labels
                    },
                },
            },
            yaxis: {
                labels: {
                    style: {
                        colors: "#333333", // Steel blue color for y-axis labels
                    },
                },
            },
            tooltip: {
                theme: "dark", // Options: 'dark', 'light', or 'custom'
                style: {
                    fontSize: "12px",
                    fontFamily: "'Kanit', serif",
                },
                marker: {
                    show: true,
                    fillColors: ["#eeeeee"], // Change the color of the marker in the tooltip
                },
            },
        },
    });
    return (
        <div>
            <ReactApexChart
                options={state.options}
                series={state.series}
                type="area"
                height={400}
                // width={500}
            />
        </div>
    )
}

export default Dashboard_Chart