import Chart from 'react-apexcharts';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from 'utils/requests';
import { round } from 'utils/format';
import { SaleSuccess } from 'types/sale';

type SeriesData = {
    name: string;
    data: number[];
}

type ChartData = {
    labels: { categories: string[] };
    series: SeriesData[];
}

const BarChart = () => {

    const [chartData, setChartData] = useState<ChartData>({ labels: { categories: [] }, series: [{ name: "", data: [] }] });

    useEffect(() => {
        axios.get(`${BASE_URL}/sales/success-by-seller`)
            .then(resp => {
                const data = resp.data as SaleSuccess[];
                setChartData({
                    labels: {
                        categories: data.map(({ sellerName }) => sellerName)
                    },
                    series: [{
                        name: "% Success",
                        data:
                            data.map(({ visited, deals }) => {
                                return round(100.0 * deals / visited, 1);
                            })
                    }]
                });

            });
    }, []);

    const options = {
        plotOptions: {
            bar: {
                horizontal: true,
            }
        },
    };

    return (
        <Chart
            options={{ ...options, xaxis: chartData.labels }}
            series={chartData.series}
            type="bar"
            height="240"
        />
    );
}

export default BarChart;