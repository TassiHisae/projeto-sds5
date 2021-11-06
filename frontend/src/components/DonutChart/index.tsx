import axios from 'axios';
import Chart from 'react-apexcharts';
import { SaleSum } from 'types/sale';
import { BASE_URL } from 'utils/requests';

type ChartData = {
    series: number[];
    labels: string[];
}

const DonutChart = () => {

    let chartData: ChartData = { series: [], labels: [] };

    axios.get(`${BASE_URL}/sales/amount-by-seller`)
        .then(resp => {
            console.log(resp.data);
            const data = resp.data as SaleSum[];
            chartData.series = data.map(value => value.sum);
            chartData.labels = data.map(value => value.sellerName);
        });

    // const mockData = {
    //     series: [477138, 499928, 444867, 220426, 473088],
    //     labels: ['Anakin', 'Barry Allen', 'Kal-El', 'Logan', 'Padmé']
    // }

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