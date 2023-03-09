import { useState, useEffect, useContext } from "react";
import { Container, Tab, Row, Col, Button } from "react-bootstrap";
import UserContext from "./../contexts/UserContext";
import DataTableGrid from "../components/DataTableGrid";
import _ from "lodash";
import { useParams } from "react-router-dom";

const CorporateGroupDetail = () => {
  const [cGroup, setCGroup] = useState({ loading: false, data: false });
  const { getServerData, setServerData } = useContext(UserContext);
  const { cgid } = useParams();

  const listColumns = {
    id: { minWidth: "70px", maxWidth: "70px" },
    name: { sortable: true },
  };

  const columns = _.map(listColumns, (style, name) => ({
    name: name.toUpperCase(),
    selector: (row) => row[name],
    ...style,
  }));

  const fetchDetail = () => {
    setCGroup({ ...cGroup, loading: true });
    getServerData(`corporate/${cgid}`, true).then((res) => {
      if (res.success) {
        console.log("picking", _.pick(res, ["cg", "students", "mycourses"]));
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

  return (
    <>
      <Container fluid className="h-100 p-0">
        <div className="profile-wrapper">
          <div className="container mysale">
            <DataTableGrid
              title={_.get(cGroup, "data.cg.name", "")}
              columns={columns}
              data={_.get(cGroup, "data.students", [])}
              selectableRows
              pagination
            />
          </div>
        </div>
      </Container>
    </>
  );
};

export default CorporateGroupDetail;
