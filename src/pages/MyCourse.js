import React, { useState, useEffect, useContext } from "react";
import _ from "lodash";
import { Container, Tab, Row, Col, Button, Badge } from "react-bootstrap";
import { CourseForm, CourseResources, CourseContents } from "../components/courses";
import DataTableGrid from "../components/DataTableGrid";
import axios from "axios";
import Utils from "../Utils";
import UserContext from "./../contexts/UserContext";

const MyCourse = (props) => {
  const { apiHeaders, getServerData } = useContext(UserContext);
  const [showmc, setShowmc] = useState({ show: false, row: null, type: null });

  const [list, setList] = useState({ loading: false, error: false, pageInfo: {}, data: [] });
  const [filters, setFilters] = useState({ limit: 10, start: 0 });
  const [showForm, setShowForm] = useState({ id: false, mode: 0 }); // 0=do not show, 1=add, 2=edit

  const listColumns = ["id", "name", "level", "language", "duration", "created_at"];

  const columns = listColumns.map((v) => ({
    name: v.toUpperCase(),
    selector: (row) => row[v],
    format: (row) => {
      if (v == "duration") {
        return <div>{row[v]} Hour</div>;
      } else if (v == "created_at") {
        const date = new Date(row[v]);
        return date.toLocaleDateString();
      } else {
        return row[v];
      }
    },
    sortable: true,
    //omit: ['level','language'].includes(v),
    maxWidth: 300,
  }));

  columns.push({
    name: "Action",
    cell: (row) => (
      <>
        <Button
          size="sm"
          variant="light"
          className="mr-1"
          onClick={() => setShowmc({ show: true, row: row, type: "resource" })}
          data-toggle="tooltip"
          title="Course Resources"
        >
          <i className="fas fa-suitcase" />
        </Button>
        {/* <Button size='sm' variant="light" className="mr-1" onClick={() => setShowmc({show: true, row: row, type: 'content'})} data-toggle="tooltip" title="Course Content"><i className="fa fa-book" /></Button>*/}
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
      axios.delete(Utils.apiUrl(`trainer/my-courses/${id}`), apiHeaders()).then((res) => {
        fetchList();
        window.alert(res.data.message);
      });
    }
  };

  const gotoPage = (page) => (e) => {
    const start = (page - 1) * filters.limit;
    setFilters({ ...filters, start: start });
  };

  const fetchList = () => {
    setList({ ...list, loading: true });
    let params = `?limit=${filters.limit}&start=${filters.start}&`;
    getServerData("trainer/my-courses" + params, true).then((res) => {
      if (res.success) {
        setList({ ...list, loading: false, error: false, pageInfo: res.pageInfo, data: res.data.map((v) => _.pick(v, listColumns)) });
      } else {
        setList({ ...list, loading: false, error: res.message, pageInfo: {}, data: [] });
      }
    });
  };
  const $ = window.$;

  useEffect(() => {
    $(document).ready(function () {
      $('[data-toggle="tooltip"]').tooltip();
    });
  }, []);

  useEffect(window.scrollEffect, []);
  useEffect(fetchList, [filters]);

  return (
    <>
      <Container fluid className="h-100 p-0">
        <div className="profile-wrapper">
          <div className="container my-course mysale">
            <h1>My Courses </h1>

            <Tab.Container id="left-tabs-example">
              <div className="card-header ui-sortable-handle">
                <h3 className="card-title">Course List #</h3>
                <span className="btn float-right">
                  <button className="btn btn-success btn-sm" onClick={() => setShowForm({ mode: 1, id: false })}>
                    Add Course <i className="fas fa-plus"></i>
                  </button>
                </span>
              </div>
              <Row>
                <Col sm={12}>
                  <DataTableGrid columns={columns} data={list.data} />
                </Col>
              </Row>
              {_.get(list, "pageInfo.total", 0) > filters.limit &&
                Utils.showPagination({ ...list.pageInfo, ..._.pick(filters, ["start", "limit"]) }, gotoPage)}
            </Tab.Container>

            {showForm.mode > 0 && (
              <CourseForm type="modal" id={showForm.id} onClose={() => setShowForm({ ...showForm, mode: 0 })} onSave={fetchList} />
            )}
            {showmc.show && showmc.type === "resource" && (
              <CourseResources type="modal" id={showmc.row.id} name={showmc.row.name} onClose={() => setShowmc({ ...showmc, show: false })} />
            )}
            {showmc.show && showmc.type === "content" && (
              <CourseContents type="modal" id={showmc.row.id} name={showmc.row.name} onClose={() => setShowmc({ ...showmc, show: false })} />
            )}
          </div>
        </div>
      </Container>
    </>
  );
};

export default MyCourse;
