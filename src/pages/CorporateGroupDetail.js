import { useState, useEffect, useContext } from "react";
import { Container, Tab, Row, Col, Form } from "react-bootstrap";
import UserContext from "./../contexts/UserContext";
import DataTableGrid from "../components/DataTableGrid";
import _ from "lodash";
import { useParams } from "react-router-dom";

const CorporateGroupDetail = () => {
  const [cGroup, setCGroup] = useState({ loading: false, data: false });
  const [mycourse, setMycourse] = useState("");
  const [selected, setSelected] = useState([]);
  const { getServerData, setServerData } = useContext(UserContext);
  const { cgid } = useParams();

  const listColumns = {
    name: { sortable: true },
  };

  const columns = _.map(listColumns, (style, name) => ({
    name: name.toUpperCase(),
    selector: (row) => row[name],
    ...style,
  }));

  const handleAssignStudents = ({ selectedRows }) => {
    setSelected(selectedRows);
  };

  const fetchDetail = () => {
    setCGroup({ ...cGroup, loading: true });
    getServerData(`corporate/${cgid}`, true).then((res) => {
      if (res.success) {
        setCGroup({
          ...cGroup,
          loading: false,
          error: false,
          data: _.pick(res, ["cg", "students", "mycourses"]),
        });
      } else {
        setCGroup({
          ...cGroup,
          loading: false,
          error: res.error,
          data: false,
        });
      }
    });
  };
  useEffect(fetchDetail, []);

  const submitGroupAssignment = (e) => {
    const params = `cgid=${cGroup.data.cg.id}&courseid=${mycourse}&userids=${_.map(selected, (s) => s.id).join(",")}`;
    setServerData("corporate/assign", params, "post").then(console.log);
  };

  return (
    <>
      <Container fluid className="h-100 p-0">
        <div className="profile-wrapper">
          <div className="container mysale">
            <h1>Corporate Group: {_.get(cGroup, "data.cg.name", "")}</h1>
            <Form.Label>
              <h3>My Courses:</h3>
            </Form.Label>
            <Form.Control as="select" onChange={(e) => setMycourse(e.currentTarget.value)} defaultValue={mycourse}>
              <option value="" disabled>
                Choose a course to enroll students below
              </option>
              {_.get(cGroup, "data.mycourses", []).map((course) => (
                <option key={course.id} value={course.id}>
                  {course.name} ({course.sku})
                </option>
              ))}
            </Form.Control>

            <DataTableGrid
              title="Group Students"
              columns={columns}
              data={_.get(cGroup, "data.students", [])}
              selectableRows
              onSelectedRowsChange={handleAssignStudents}
              pagination
            />

            <div className="alert-warning p-2 px-4 mt-3 text-left ml-0">
              <h4>Assigning students to the course will:</h4>
              <ol>
                <li>Enroll student to the selected Course.</li>
                <li>Create a Course Group in course itself, if already not created.</li>
                <li>Add the student to this Course Group.</li>
              </ol>
              <button className="btn btn-lg btn-secondary" onClick={submitGroupAssignment} disabled={mycourse === "" || selected.length === 0}>
                Assign Course to selected students
              </button>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default CorporateGroupDetail;
