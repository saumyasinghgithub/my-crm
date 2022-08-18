import React, {useEffect} from "react";
import { Container } from "react-bootstrap";
import DataTable from 'react-data-table-component';

const MySales = (props) => {
    const columns = [
        {
            name: 'ID',
            selector: row => row.id,
            sortable: true,
        },
        {
            name: 'ORDER ID',
            selector: row => row.orderId,
            sortable: true,
        },
        {
            name: 'ORDER AMOUNT',
            selector: row => row.amount,
            sortable: true,
        },
        {
            name: 'ORDER DATE',
            selector: row => row.date,
            sortable: true,
        }
    ];
    
    const data = [
        {
            id: 1,
            orderId: 'AD-00001',
            amount: '400 USD',
            date: '17-08-2022',
        },
        {
            id: 2,
            orderId: 'AD-00002',
            amount: '300 USD',
            date: '17-08-2022',
        },
        {
            id: 3,
            orderId: 'AD-00003',
            amount: '500 USD',
            date: '17-08-2022',
        },
        {
            id: 4,
            orderId: 'AD-00004',
            amount: '860 USD',
            date: '17-08-2022',
        },
    ]

    useEffect(window.scrollEffect,[]);

    return (<>
        <Container fluid className="h-100 p-0">
        <div className="profile-wrapper">
            <div className="container100">
            <h1>My Sales</h1>
            <DataTable
                columns={columns}
                data={data}
            />
            </div>
        </div>    
        </Container>
    </>);
};

export default MySales;