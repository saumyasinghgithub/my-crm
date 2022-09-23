import React,{useState,useEffect} from "react";
import { Container,Row,Col } from "react-bootstrap";
import DataTable from "react-data-table-component";
import axios from "axios";
import Utils from "../Utils";

const MySales = (props) => {
    const columns = [
        {
            name:'ID',
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
        }
    ];
    const fetchList = () => {
        axios.get(Utils.apiUrl('sales/list'),Utils.apiHeaders()).then(res => {
            if(res.data.success){

            } else {

            }
        });
    }
    return (<>
        <Container fluid className="h-100 p-0">
            <div className="profile-wrapper">
                <div className="container mysale">
                    <h1>My Sales</h1>
                    <div className="row">
                        <div className="col-lg-3 col-6">
                            <div className="small-box bg-info">
                                <div className="inner">
                                    <h3>$ 100</h3>
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
                                    <h3>100<sup className="supTag">%</sup></h3>
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
                                    <h3>100</h3>
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
                                    <h3>100</h3>
                                    <p>Total Order Items</p>
                                </div>
                                <div className="icon">
                                    <i className="ion ion-pie-graph"></i>
                                </div>
                                <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right"></i></a>
                            </div>
                        </div>
                    </div>
                    <Row>
                        <Col md={12}></Col>
                    </Row>
                    <DataTable columns={columns} data={data}>

                    </DataTable>
                </div>
            </div>
        </Container>
    </>
    );
}

export default MySales;