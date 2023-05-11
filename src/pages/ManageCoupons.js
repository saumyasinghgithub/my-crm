import React, { useState, useEffect, useContext } from "react";
import _ from "lodash";
import { Container, Tab, Row, Col, Button, Badge } from "react-bootstrap";
import CouponForm from "../components/coupon/CouponForm";
import DataTableGrid from "../components/DataTableGrid";
import UserContext from "./../contexts/UserContext";
import Utils from "../Utils";
import axios from "axios";

const ManageCoupons = (props) => {
  const { apiHeaders } = useContext(UserContext);
  const [showForm, setShowForm] = useState({ id: false, mode: 0 }); // 0=do not show, 1=add, 2=edit
  const listColumns = ["id", "coupon_code", "coupon_type", "discount_value", "usage_limit", "courses", "expiry_date"];
  const [list, setList] = useState({ loading: false, error: false, pageInfo: {}, data: [] });

  const fetchList = () => {
    setList({ ...list, loading: true });
    axios.get(Utils.apiUrl("coupons/list"), apiHeaders()).then((res) => {
      if (res.data.success) {
        setList({ ...list, loading: false, error: false, pageInfo: res.data.pageInfo, data: res.data.data.map((v) => _.pick(v, listColumns)) });
      } else {
        setList({ ...list, loading: false, error: res.data.message, pageInfo: {}, data: [] });
      }
    });
  };
  useEffect(fetchList, []);

  const columns = listColumns.map((v) => ({
    name: v.toUpperCase(),
    selector: (row) => row[v],
    format: (row) => {
      if (v == "discount_value") {
        return row.discount_value + " " + (row.coupon_type === 2 ? "USD" : "%");
      } else if (v == "usage_limit") {
        return row.usage_limit > 0 ? row.usage_limit : "Unlimited";
      } else if (v == "courses") {
        return !_.isEmpty(row.courses) ? row.courses : "All courses";
      } else if (v == "expiry_date") {
        if (!_.isEmpty(row[v]) && row[v] != "0000-00-00") {
          const date = new Date(row[v]);
          const formattedDate = date.toLocaleDateString();
          return formattedDate;
        } else {
          return "Unlimited";
        }
      } else {
        return row[v];
      }
    },
    sortable: true,
    omit: v === "coupon_type",
    wrap: v === "courses",
  }));
  columns.push({
    name: "Action",
    cell: (row) => (
      <>
        <Button
          size="sm"
          variant="light"
          className="mr-1"
          onClick={() => setShowForm({ mode: 2, id: row.id })}
          data-toggle="tooltip"
          title="Edit Course"
        >
          <i className="fa fa-edit" />
        </Button>
        <Button size="sm" variant="light" className="mr-1" onClick={deleteRecord(row.id)} data-toggle="tooltip" title="Delete Course">
          <i className="fa fa-trash text-danger" />
        </Button>
      </>
    ),
    sortable: false,
  });
  const deleteRecord = (id) => (e) => {
    if (window.confirm("You are going to delete record, are you sure?")) {
      axios.delete(Utils.apiUrl(`coupons/${id}`), apiHeaders()).then((res) => {
        fetchList();
        window.alert(res.data.message);
      });
    }
  };

  return (
    <>
      <Container fluid className="h-100 p-0">
        <div className="profile-wrapper">
          <div className="container my-course mysale">
            <h1>My Coupons </h1>
            <Tab.Container id="left-tabs-example">
              <div className="card-header ui-sortable-handle">
                <h3 className="card-title">Coupon List #</h3>
                <span className="btn float-right">
                  <button className="btn btn-success btn-sm" onClick={() => setShowForm({ mode: 1, id: false })}>
                    Add Coupon <i className="fas fa-plus"></i>
                  </button>
                </span>
              </div>
              <Row>
                <Col sm={12}>
                  <DataTableGrid columns={columns} pagination data={list.data} className="coupon-table" />
                </Col>
              </Row>
            </Tab.Container>
            {showForm.mode > 0 && (
              <CouponForm
                type="modal"
                id={showForm.id}
                mode={showForm.mode}
                onClose={() => setShowForm({ ...showForm, mode: 0 })}
                onSave={fetchList}
              />
            )}
          </div>
        </div>
      </Container>
    </>
  );
};

export default ManageCoupons;
