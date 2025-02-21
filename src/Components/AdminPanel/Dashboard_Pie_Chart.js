import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

function Dashboard_Pie_Chart() {
    const [state, setState] = useState({
        series: [10, 15, 8, 12, 20, 18, 14, 10, 7, 9, 11, 6, 5, 13, 17, 16], // Dummy values
        options: {
            chart: {
                type: 'pie',
            },
            labels: [
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
                "Syphilis Test"
            ],
            legend: {
                position: 'bottom',
            },
            tooltip: {
                theme: 'dark',
            }
        }
    });

    return (
        <div>
            <ReactApexChart 
                options={state.options} 
                series={state.series} 
                type="pie" 
                height={400} 
            />
        </div>
    );
}

export default Dashboard_Pie_Chart;