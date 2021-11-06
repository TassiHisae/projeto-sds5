import axios from "axios";
import { SalePage } from "types/sale";
import { useState, useEffect } from 'react';
import { BASE_URL } from "utils/requests";
import { formatLocalDate } from "utils/format";

const DataTable = () => {

    const [page, setPage] = useState<SalePage>({
        first: true,
        last: true,
        number: 0,
        totalElements: 0,
        totalPages: 0
    });

    useEffect(() => {
        axios.get(`${BASE_URL}/sales?page=0&size=10&sort=date,desc`)
            .then(resp => {
                setPage(resp.data);
            });
    }, [])

    console.log(page);

    return (
        <div className="table-responsive">
            <table className="table table-striped table-sm">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Seller</th>
                        <th>Visits</th>
                        <th>Deals</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        page.content?.map(sale => (<tr key={sale.id}>
                            <td>{formatLocalDate(sale.date, 'MM/dd/yyyy')}</td>
                            <td>{sale.seller.name}</td>
                            <td>{sale.visited}</td>
                            <td>{sale.deals}</td>
                            <td>{sale.amount.toFixed(2)}</td>
                        </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}

export default DataTable;