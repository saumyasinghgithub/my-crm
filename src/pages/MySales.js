import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import DataTable from "react-data-table-component";
import axios from "axios";
import Utils from "../Utils";
import _ from "lodash";

const MySales = (props) => {
    const [data, setData] = useState([]);
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [filters, setFilters] = useState({ where: { startDate: startDate, endDate: endDate }, limit: 15, start: 0 });

    const columns = [
        {
            name: 'ID',
            selector: row => row.id,
            sortable: false,
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
            selector: row => row.created_at,
            sortable: true,
        }
    ];

    const fetchList = () => {
        const uData = Utils.getUserData();
        const userid = uData.id;
        let params = `?limit=${filters.limit}&start=${filters.start}&user_id=` + userid + `&`;
        params += _.map(filters.where, (v, k) => `where[${k}]=${v}`).join('&');
        axios.get(Utils.apiUrl('sales/mysaleslist' + params), Utils.apiHeaders()).then(res => {
            if (res.data.success) {
                setData(res.data.data);
                console.log(res.data.data);
                return res.data.data;
            } else {

            }
        });
    }
    useEffect(fetchList,[]);
    const handleStartDate = (e) => {
        setStartDate(e.target.value);
    };

    const handleEndDate = (e) => {
        setEndDate(e.target.value);
    };

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
                    <div className="col-md-12">
                        <div className="col-md-3" style={{ float: "left" }}>
                            <div className="form-group">
                                <label>Start Date:</label>
                                <div className="input-group input-group-sm">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="far fa-calendar-alt"></i></span>
                                    </div>
                                    <input type="date" className="form-control" data-inputmask-alias="datetime" data-inputmask-inputformat="dd/mm/yyyy" data-mask="" inputmode="numeric" name="startDate" onChange={handleStartDate} value={startDate} />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3" style={{ float: "left" }}>
                            <div className="form-group">
                                <label>End Date</label>
                                <div className="input-group input-group-sm">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="far fa-calendar-alt"></i></span>
                                    </div>
                                    <input type="date" className="form-control" data-inputmask-alias="datetime" data-inputmask-inputformat="dd/mm/yyyy" data-mask="" inputmode="numeric" name="endDate" onChange={handleEndDate} value={endDate} />
                                </div>

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