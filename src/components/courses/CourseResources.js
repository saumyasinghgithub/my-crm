import React, { useState, useEffect, useContext } from "react";
import { Button, Modal } from "react-bootstrap";
import _ from "lodash";
import DataTableGrid from "../DataTableGrid";
import ResourceForm from "./ResourceForm";
import axios from "axios";
import Utils from "../../Utils";
import UserContext from "./../../contexts/UserContext";

const CourseResources = (props) => {
  const { apiHeaders, getServerData } = useContext(UserContext);
  const [showmc, setShowmc] = useState({ show: false, row: null, type: null });
  const [list, setList] = useState({ loading: false, error: false, pageInfo: {}, data: [] });
  const [showForm, setShowForm] = useState({ id: false, mode: 0 }); // 0=do not show, 1=add, 2=edit

  const listColumns = ["id", "name", "price", "type", "created_at"];
  const columns = listColumns.map((v) => ({
    name: v.toUpperCase(),
    selector: (row) => row[v],
    sortable: true,
  }));

  columns.push({
    name: "Action",
    cell: (row) => (
      <>
        <Button size="sm" variant="light" className="mr-1" onClick={() => setShowForm({ id: row.id, mode: 2 })}>
          <i className="fa fa-edit" />
        </Button>
        <Button size="sm" variant="light" className="mr-1" onClick={deleteRecord(row.id)}>
          <i className="fa fa-trash text-danger" />
        </Button>
      </>
    ),
    sortable: false,
  });

  const deleteRecord = (id) => (e) => {
    if (window.confirm("You are going to delete record, are you sure?")) {
      axios.delete(Utils.apiUrl(`trainer/course-resources/${id}`), apiHeaders()).then((res) => {
        fetchList();
        window.alert(res.data.message);
      });
    }
  };

  const fetchList = () => {
    setList({ ...list, loading: true });
    let params = `fname=course_id&fvalue=${props.id}`;
    getServerData(`trainer/course-resources?${params}`, true).then((res) => {
      if (res.data.success) {
        console.log(res.data.data);
        setList({ ...list, loading: false, error: false, pageInfo: res.data.pageInfo, data: res.data.data.map((v) => _.pick(v, listColumns)) });
      } else {
        setList({ ...list, loading: false, error: res.data.message, pageInfo: {}, data: [] });
      }
    });
  };
  useEffect(window.scrollEffect, []);
  useEffect(fetchList, []);

  const renderButton = () => (
    <div className="card-header ui-sortable-handle">
      <h3 className="card-title">Resource List #</h3>
      <span className="btn float-right">
        <button className="btn btn-success btn-sm" onClick={() => setShowForm({ mode: 1, id: false })}>
          Add Course Resource <i className="fas fa-plus"></i>
        </button>
      </span>
    </div>
  );

  return (
    <Modal show={true} size="xl" onHide={_.get(props, "onClose", "")}>
      <Modal.Header closeButton>
        <Modal.Title>Course Resources for {props.name}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {renderButton()}
        <DataTableGrid columns={columns} data={list.data} />
      </Modal.Body>
      {showForm.mode > 0 && (
        <ResourceForm type="modal" id={showForm.id} course_id={props.id} onClose={() => setShowForm({ ...showForm, mode: 0 })} onSave={fetchList} />
      )}
    </Modal>
  );
};

export default CourseResources;
