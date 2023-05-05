import React, { useState, useEffect, useContext } from "react";
import _ from "lodash";
import { Container, Tab, Row, Col, Button } from "react-bootstrap";
import CorporateForm from "../components/corporate_groups/CorporateForm";
import ImportStudent from "../components/corporate_groups/ImportStudent";
import DataTableGrid from "../components/DataTableGrid";
import axios from "axios";
import moment from "moment";
import Utils from "../Utils";
import UserContext from "./../contexts/UserContext";

const MyCorporateGroup = (props) => {
  const { apiHeaders } = useContext(UserContext);

  const [showForm, setShowForm] = useState({ id: false, mode: 0, name: "" }); // 0=do not show, 1=add, 2=edit, 3=Import

  const [list, setList] = useState({
    loading: false,
    error: false,
    data: [],
  });

  const listColumns = {
    id: { minWidth: "70px", maxWidth: "70px" },
    name: { sortable: true },
    students: { maxWidth: "70px" },
    processing: { maxWidth: "70px" },
    created_at: {
      maxWidth: "180px",
      sortable: true,
      format: (row) => {
        return moment(row["created_at"]).format("MMM DD, YYYY hh:mm a");
      },
    },
  };

  const columns = _.map(listColumns, (style, name) => ({
    name: name.toUpperCase(),
    selector: (row) => row[name],
    ...style,
  }));

  columns.push({
    name: "Action",
    cell: (row) => (
      <>
        <Button size="sm" variant="light" className="mr-1" href={`/my-corporate-groups/${row.id}`}>
          <i className="fa fa-eye" />
        </Button>
        <Button size="sm" variant="light" className="mr-1" onClick={() => setShowForm({ mode: 2, id: row.id })}>
          <i className="fa fa-edit" />
        </Button>
        <Button
          size="sm"
          variant="light"
          className="mr-1"
          title="Import Students"
          onClick={() => setShowForm({ mode: 3, id: row.id, name: row.name })}
        >
          <i className="fa fa-upload text-success" />
        </Button>
        <Button size="sm" variant="light" className="mr-1" onClick={deleteRecord(row.id)}>
          <i className="fa fa-trash text-danger" />
        </Button>
      </>
    ),
    sortable: false,
    maxWidth: "180px !important",
  });

  const deleteRecord = (id) => (e) => {
    if (window.confirm("You are going to delete record, are you sure?")) {
      axios.delete(Utils.apiUrl(`trainer/my-blogs/${id}`), apiHeaders()).then((res) => {
        fetchList();
        window.alert(res.data.message);
      });
    }
  };

  const fetchList = () => {
    setList({ ...list, loading: true });
    axios.get(Utils.apiUrl("corporate/my-corporates"), apiHeaders()).then((res) => {
      if (res.data.success) {
        setList({
          ...list,
          loading: false,
          error: false,
          data: res.data.data.map((v) => _.pick(v, Object.keys(listColumns))),
        });
      } else {
        setList({
          ...list,
          loading: false,
          error: res.data.message,
          data: [],
        });
      }
    });
  };
  useEffect(window.scrollEffect, []);
  useEffect(fetchList, []);

  return (
    <>
      <Container fluid className="h-100 p-0">
        <div className="profile-wrapper">
          <div className="container mysale">
            <h1>My Corporate Groups </h1>

            <Tab.Container id="left-tabs-example">
              <div className="card-header ui-sortable-handle">
                <h3 className="card-title">Corporate Group list</h3>
                <span className="btn float-right">
                  <button className="btn btn-success btn-sm" onClick={() => setShowForm({ mode: 1, id: false })}>
                    Add Corporate <i className="fas fa-plus"></i>
                  </button>
                </span>
              </div>
              <Row>
                <Col sm={12}>
                  <DataTableGrid columns={columns} data={list.data} />
                </Col>
              </Row>
            </Tab.Container>

            {(showForm.mode === 1 || showForm.mode === 2) && (
              <CorporateForm type="modal" id={showForm.id} onClose={() => setShowForm({ ...showForm, mode: 0 })} onSave={fetchList} />
            )}

            {showForm.mode === 3 && (
              <ImportStudent
                type="modal"
                id={showForm.id}
                name={showForm.name}
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

export default MyCorporateGroup;
