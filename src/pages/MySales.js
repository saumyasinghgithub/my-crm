import React, { useState, useContext, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import DataTable from "react-data-table-component";
import UserContext from "./../contexts/UserContext";
import _ from "lodash";

const MySales = (props) => {
  const [data, setData] = useState({ loading: true, error: false, pageInfo: {}, data: [] });
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [filters, setFilters] = useState({ where: { startDate: startDate, endDate: endDate }, limit: 15, start: 0 });
  const [searchcustomer, setSearchCustomer] = useState("");
  const [searchorder, setSearchOrder] = useState("");
  const { getUserData, getServerData } = useContext(UserContext);

  const columns = [
    {
      name: "ORDER ID",
      selector: (row) => {
        const dump = JSON.parse(row.dump);
        return <span class="badge bg-success">{dump.razorpayOrderId}</span>;
      },
      sortable: true,
    },
    {
      name: "CUSTOMER EMAIL",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "ORDER ITEMS",
      selector: (row) => {
        const dump = JSON.parse(row.dump);
        const details = dump.description.split(" AND ");
        return details.map((d) => (
          <li>
            <b>{d.split("||")[0]}</b> - <span class="badge bg-warning">({d.split("||").splice(1).join(",")})</span>
          </li>
        ));
      },
      sortable: true,
    },
    {
      name: "ORDER AMOUNT",
      selector: (row) => row.amount,
      sortable: true,
    },
    {
      name: "ORDER DATE",
      selector: (row) => row.created_at,
      sortable: true,
    },
  ];
  const fetchList = () => {
    setData({ ...data, loading: true });
    const uData = getUserData();
    const userid = uData.id;
    let params = `?limit=${filters.limit}&start=${filters.start}&user_id=` + userid + `&`;
    params += _.map(filters.where, (v, k) => `where[${k}]=${v}`).join("&");
    getServerData("sales/list" + params, true).then((res) => {
      if (res.data.success) {
        const min = Date.parse(startDate);
        const max = Date.parse(endDate);
        let salesData = res.data.data;
        if (startDate != null && endDate != null) {
          const filterSales = salesData.filter((d) => {
            return d.timestampvalue * 1000 >= min && d.timestampvalue * 1000 <= max;
          });
          setData({ ...data, loading: false, error: false, pageInfo: res.data.pageInfo, data: filterSales });
        } else if (searchcustomer != null) {
          const filterCustomers = salesData.filter((cus) => {
            return cus.email.toLowerCase().includes(searchcustomer.toLowerCase());
          });
          setData({ ...data, loading: false, error: false, pageInfo: res.data.pageInfo, data: filterCustomers });
        } else {
          setData({ ...data, loading: false, error: false, pageInfo: res.data.pageInfo, data: res.data.data });
        }
      } else {
      }
    });
  };
  useEffect(fetchList, [filters, startDate, endDate, searchcustomer]);
  const handleStartDate = (e) => {
    setStartDate(e.target.value);
  };
  const handleEndDate = (e) => {
    setEndDate(e.target.value);
  };
  const handleSearchCustomer = (e) => {
    setSearchCustomer(e.target.value);
  };
  const handleSearchOrder = (e) => {
    setSearchOrder(e.target.value);
  };
  /**
   * Stats Dynamic data display
   */
  const [stats, setStats] = useState({ success: false, stats: [] });

  const loadStats = () => {
    getServerData("trainer/my-sales-stats", true).then(setStats);
  };

  useEffect(loadStats, []);

  useEffect(window.scrollEffect, []);
  return (
    <>
      <Container fluid className="h-100 p-0">
        <div className="profile-wrapper">
          <div className="container mysale">
            <h1>My Sales</h1>
            {stats.success === true && (
              <div className="row">
                <div className="col-lg-4 col-6">
                  <div className="small-box bg-info">
                    <div className="inner">
                      <h3>$ {stats.stats[0]}</h3>
                      <p>Total Sales</p>
                    </div>
                    <div className="icon">
                      <i className="ion ion-bag"></i>
                    </div>
                    {/* <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right"></i></a> */}
                  </div>
                </div>

                {/* <div className="col-lg-3 col-6">
                    <div className="small-box bg-success">
                    <div className="inner">
                    <h3>{parseFloat(stats.stats[1]).toFixed(1)}<sup className="supTag">%</sup></h3>
                    <p>My Course Ratio</p>
                    </div>
                    <div className="icon">
                    <i className="ion ion-stats-bars"></i>
                    </div>
                    </div>
                </div> */}

                <div className="col-lg-4 col-6">
                  <div className="small-box bg-warning">
                    <div className="inner">
                      <h3>{stats.stats[2]}</h3>
                      <p>My Students</p>
                    </div>
                    <div className="icon">
                      <i className="ion ion-person-add"></i>
                    </div>
                    {/* <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right"></i></a> */}
                  </div>
                </div>

                <div className="col-lg-4 col-6">
                  <div className="small-box bg-danger">
                    <div className="inner">
                      <h3>{stats.stats[3]}</h3>
                      <p>Total Order Items</p>
                    </div>
                    <div className="icon">
                      <i className="ion ion-pie-graph"></i>
                    </div>
                    {/* <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right"></i></a> */}
                  </div>
                </div>
              </div>
            )}
            <div className="row">
              {/* <div className="col-md-3" style={{ float: "left",marginTop: "0.75%" }}>
                        <div className="form-group">
                        <label></label>
                            <div className="input-group input-group-sm">
                                <div className="input-group-prepend">

                                </div>
                                <input type="text" value={searchorder} onChange={handleSearchOrder} placeholder='Enter Order Id' className="form-control" />
                                <div className="input-group-append">
                                    <div className="input-group-text"><i className="fas fa-ambulance"></i></div>
                                </div>
                            </div>
                            </div>
                        </div> */}
              <div className="col-md-4" style={{ float: "left" }}>
                <div className="form-group">
                  <label>Enter Email Id</label>
                  <div className="input-group input-group-sm">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="fas fa-envelope"></i>
                      </span>
                    </div>
                    <input
                      type="email"
                      value={searchcustomer}
                      onChange={handleSearchCustomer}
                      className="form-control"
                      placeholder="Enter Your Email Address"
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-4" style={{ float: "left" }}>
                <div className="form-group">
                  <label>Start Date</label>
                  <div className="input-group input-group-sm">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="far fa-calendar-alt"></i>
                      </span>
                    </div>
                    <input
                      type="date"
                      className="form-control"
                      data-inputmask-alias="datetime"
                      data-inputmask-inputformat="dd/mm/yyyy"
                      data-mask=""
                      inputmode="numeric"
                      name="startDate"
                      onChange={handleStartDate}
                      value={startDate}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-4" style={{ float: "left" }}>
                <div className="form-group">
                  <label>End Date</label>
                  <div className="input-group input-group-sm">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="far fa-calendar-alt"></i>
                      </span>
                    </div>
                    <input
                      type="date"
                      className="form-control"
                      data-inputmask-alias="datetime"
                      data-inputmask-inputformat="dd/mm/yyyy"
                      data-mask=""
                      inputmode="numeric"
                      name="endDate"
                      onChange={handleEndDate}
                      value={endDate}
                    />
                  </div>
                </div>
              </div>
            </div>
            <Row>
              <Col md={12}>
                <DataTable columns={columns} data={data.data} />
              </Col>
            </Row>
          </div>
        </div>
      </Container>
    </>
  );
};

export default MySales;
