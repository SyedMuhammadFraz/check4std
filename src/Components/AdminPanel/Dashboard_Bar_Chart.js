import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

function Dashboard_Bar_Chart() {
    const [state, setState] = useState({
        series: [
            {
                name: "Total Orders",
                data: [10, 15, 8, 12, 20, 18, 14, 10, 7, 9, 11, 6, 5, 13, 17, 16], // Dummy values
            },
        ],
        options: {
            chart: {
                type: "bar",
                height: 400,
                toolbar: { show: true },
            },
            plotOptions: {
                bar: {
                    horizontal: false, // Vertical bars
                    columnWidth: "60%",
                    distributed: false, // Ensure all bars are the same color
                },
            },
            colors: ["#3498db"], // Set a single color for all bars
            xaxis: {
                categories: [
                    "10 Test Panel",
                    "10 Test with Early RNA",
                    "Chlamydia",
                    "Gonorrhea",
                    "Chlamydia & Gonorrhea Panel",
                    "Herpes I & II Test",
                    "Chlamydia Test",
                    "Gonorrhea Test",
                    "Hepatitis A Test",
                    "Hepatitis B Test",
                    "Hepatitis C Test",
                    "Oral Herpes Test",
                    "Genital Herpes Test",
                    "HIV 1 & 2 Antibody (4th Gen) Test",
                    "HIV RNA Early Detection Test",
                    "Syphilis Test",
                ],
                labels: {
                    rotate: -45,
                    style: { fontSize: "12px", fontWeight: "bold", colors: "#333" },
                },
            },
            yaxis: {
                title: { text: "Number of Orders" },
            },
            tooltip: { theme: "dark" },
            legend: { show: false }, // Hides extra labels under bars
        },
    });

    return (
        <div>
            <ReactApexChart options={state.options} series={state.series} type="bar" height={400} />
        </div>
    );
}

export default Dashboard_Bar_Chart;
