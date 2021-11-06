import axios from 'axios';
import Chart from 'react-apexcharts';
import { SaleSum } from 'types/sale';
import { BASE_URL } from 'utils/requests';
import { useState, useEffect } from 'react';

type ChartData = {
    labels: string[];
    series: number[];
}

const DonutChart = () => {

    const [chartData, setChartData] = useState<ChartData>({
        labels: [],
        series: []
    });

    useEffect(() => {
        axios.get(`${BASE_URL}/sales/amount-by-seller`)
            .then(resp => {
                const data = resp.data as SaleSum[];
                setChartData({ labels: data.map(({ sellerName }) => sellerName), series: data.map(({ sum }) => sum) });
            });
    }, []);

    const options = {
        legend: {
            show: true
        }
    }

    return (
        <Chart
            options={{ ...options, labels: chartData.labels }}
            series={chartData.series}
            type="donut"
            height="240"
        />
    );
}

export default DonutChart;