import React, {useEffect, useState, useContext} from "react";
import { Container, Row, Col } from "react-bootstrap";
import DataTable from 'react-data-table-component';
import UserContext  from './../contexts/UserContext';

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

    const [stats, setStats] = useState({success: false, stats: []});

    const {getServerData} = useContext(UserContext);


    const loadStats = () => {
        getServerData('trainer/my-sales-stats', true)
        .then(setStats)
    };

    useEffect(loadStats, []);


    useEffect(window.scrollEffect,[]);

    return (<>
        <Container fluid className="h-100 p-0">
        <div className="profile-wrapper">
            <div className="container mysale">
            <h1>My Sales</h1>
            {stats.success === true && <div className="row">
                <div className="col-lg-3 col-6">
                    <div className="small-box bg-info">
                    <div className="inner">
                    <h3>$ {stats.stats[0]}</h3>
                    <p>Total Sales</p>
                    </div>
                    <div className="icon">
                    <i className="ion ion-bag"></i>
                    </div>
                    <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right"></i></a>
                    </div>
                </div>

                <div className="col-lg-3 col-6">
                    <div className="small-box bg-success">
                    <div className="inner">
                    <h3>{parseFloat(stats.stats[1]).toFixed(1)}<sup className="supTag">%</sup></h3>
                    <p>My Course Ratio</p>
                    </div>
                    <div className="icon">
                    <i className="ion ion-stats-bars"></i>
                    </div>
                    <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right"></i></a>
                    </div>
                </div>

                <div className="col-lg-3 col-6">
                    <div className="small-box bg-warning">
                    <div className="inner">
                    <h3>{stats.stats[2]}</h3>
                    <p>My Students</p>
                    </div>
                    <div className="icon">
                    <i className="ion ion-person-add"></i>
                    </div>
                    <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right"></i></a>
                    </div>
                </div>

                <div className="col-lg-3 col-6">
                    <div className="small-box bg-danger">
                    <div className="inner">
                    <h3>{stats.stats[3]}</h3>
                    <p>Total Order Items</p>
                    </div>
                    <div className="icon">
                    <i className="ion ion-pie-graph"></i>
                    </div>
                    <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right"></i></a>
                    </div>
                </div>
                
            </div>}
            <Row>
                <Col md={12}></Col>
            </Row>
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