import React, { useEffect, useContext, useState } from "react";
import { Container } from "react-bootstrap";
import UserContext from "./../contexts/UserContext";
import Utils from "./../Utils";
import _ from "lodash";

const MyOrder = (props) => {
  const [data, setData] = useState({ loading: true, data: [], slugs: [], pageInfo: {} });
  const [filters, setFilters] = useState({ start: 0, limit: 10 });
  const { getServerData } = useContext(UserContext);

  const fetchData = () => {
    getServerData(`student/my-orders?start=${filters.start}&limit=${filters.limit}`, true)
      .then((res) => {
        setData({ ...res, loading: false });
      })
      .catch((msg) => {
        setData({ success: false, message: msg, loading: false });
      });
  };

  const gotoPage = (page) => (e) => {
    const start = (page - 1) * filters.limit;
    setFilters({ ...filters, start: start });
  };
  useEffect(window.scrollEffect, []);
  useEffect(fetchData, [filters]);

  useEffect(() => {
    const $ = window.jQuery;

    $(document).ready(function () {
      $('[data-toggle="popover"]').popover();
    });
  }, [data]);

  const renderDataGrid = () => {
    return (
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr className="myordertr">
              <th>Sl.</th>
              <th>Order Id</th>
              <th>Order Items</th>
              <th>Amount</th>
              <th>Ordered On</th>
            </tr>
          </thead>
          <tbody className="orderitemscolor">{data.data.map(renderRow)}</tbody>
        </table>

        {data.pageInfo.total > filters.limit && Utils.showPagination({ ...data.pageInfo, ..._.pick(filters, ["start", "limit"]) }, gotoPage)}
      </div>
    );
  };

  const renderRow = (rec, idx) => {
    const dump = JSON.parse(rec.dump);
    const details = dump.description.split(" AND ");
    const items = JSON.parse(rec.items);
    let slug = "";

    return (
      <tr>
        <td>{filters.start + idx + 1}</td>
        <td>{dump.razorpayOrderId}</td>
        <td>
          <ul>
            {details.map((d, idx2) => {
              slug = _.get(_.find(data.slugs, { id: items[idx2].course }), "slug", "");
              return (
                <li>
                  <a href={`/courses/${slug}`}>
                    <b>{d.split("||")[0]}</b> - <span className="text-uppercase">({d.split("||").splice(1).join(",")})</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </td>
        <td>
          {rec.currency} {parseFloat(rec.amount).toFixed(2)}
        </td>
        <td>{Utils.dateTime(rec.created_at)}</td>
      </tr>
    );
  };

  return (
    <>
      <Container fluid className="h-100 p-0">
        <div className="profile-wrapper">
          <div className="container">
            <h1>My Orders</h1>
            {data.loading === true && (
              <div className="alert alert-warning m-5 p-5">
                Fetching your ordered items..
                <div className="progress">
                  <div
                    className="progress-bar progress-bar-striped progress-bar-animated"
                    role="progressbar"
                    aria-valuenow="100"
                    style={{ width: "100%" }}
                  ></div>
                </div>
              </div>
            )}
            {data.loading === false && data.data.length === 0 && (
              <h4 className="p-5 text-center">
                Hey, you have not ordered anything yet.. You should have a look at the{" "}
                <a href={Utils.getTrainerURL(`professional-profile/trainercourses`)}>courses</a> we have.
              </h4>
            )}
            {data.loading === false && data.data.length > 0 && renderDataGrid()}
          </div>
        </div>
      </Container>
    </>
  );
};

export default MyOrder;
