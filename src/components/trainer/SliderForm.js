import { useEffect, useContext, useState } from 'react';
import _ from 'lodash';
import { Form, Alert, Spinner, Row, Col, Button } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
const SliderForm = (props) => {
    const [myabout, setMyabout] = useState({});
    const [awardData, setAwardData] = useState([]);

    const photoUploader = (fld, title) => {
        return <>
            <Form.Label>{title}</Form.Label>
            <Form.Control type="file" size="lg" name={fld + '_image'} accept=".jpeg,.png,.PNG,.jpg;" />
            <div className="text-center">{!_.isEmpty(_.get(myabout, fld + '_image', '')) && <img src={`${process.env.REACT_APP_API_URL}/uploads/${fld}/${myabout[fld + '_image']}`} className="thumbnail mt-3" />}</div>
        </>;
    }

    const addAData = (e) => {
        let newdata = [...awardData, { year: "", award: "" }];
        setAwardData(newdata);
    };
    const removeAData = (pos) => (e) => {
        let newdata = [...awardData];
        newdata.splice(pos, 1);
        setAwardData(newdata);
    };
    const saveAData = (pos, attr) => (e) => {
        let newdata = [...awardData];
        _.set(
            newdata,
            `${pos}${attr}`,
            attr === "year" ? parseInt(e.currentTarget.value) : e.currentTarget.value
        );
        setAwardData(newdata);
    };
    const renderSliderFields = () => {
        return (
            <>
                {awardData.map((v, k) => (
                    <Accordion defaultActiveKey={[0]} alwaysOpen>
                        <Row>
                            <Accordion.Item eventKey={k}
                                className="my-1"
                                style={{ backgroundColor: k % 2 === 0 ? "#ddf4f4" : "#f8f8f8" }}>
                                <Accordion.Header className="mb-0"><strong>Image Slider {k + 1} </strong></Accordion.Header>
                                <Accordion.Body>
                                    <Row>
                                        <Col md={12} className="mt-3 mb-3">
                                            {photoUploader('sliderimg', 'Upload Large Slider Image (Image dimension should be 360cm x 260cm)')}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={12} className="mt-3 mb-3">
                                            <Form.Control
                                                type="text"
                                                name="slidertext"
                                                placeholder="Slider Text"
                                                defaultValue={_.get(awardData, `${k}.award`, "")}
                                                onChange={saveAData(k, "award")}
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={12} className="mt-3 mb-3">
                                            <Form.Control
                                                type="text"
                                                name="slidertext"
                                                placeholder="Call to action button link."
                                                defaultValue={_.get(awardData, `${k}.award`, "")}
                                                onChange={saveAData(k, "award")}
                                            />
                                        </Col>
                                    </Row>
                                </Accordion.Body>
                            </Accordion.Item>
                            <i
                                className="fa fa-minus-circle fa-lg mt-2 cursor-pointer text-danger remove-award"
                                onClick={removeAData(k)}
                            />
                        </Row>
                    </Accordion>
                ))}
            </>
        );
    }
    return (
        <>
            <Form>
                <h1>Image Slider <i
                    className="fa fa-plus-circle text-success Adddetails"
                    onClick={addAData}
                /></h1>
                {renderSliderFields()}
            </Form>
        </>
    );
}
export default SliderForm;