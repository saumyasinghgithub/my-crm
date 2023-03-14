import { useEffect, useContext, useState } from 'react';
import _ from 'lodash';
import { Form, Alert, Spinner, Row, Col, Button } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import UserContext from "../../contexts/UserContext";
import Utils from './../../Utils';
import axios from 'axios';
const SliderForm = (props) => {
    const [sliderData, setSliderData] = useState([]);
    const { getServerData, setServerData } = useContext(UserContext);
    const [saving, setSaving] = useState(false);
    const [response, setResponse] = useState({ success: false, message: "" });
    const [lastinsertid, setLastinsertid] = useState();

    const trainerDetails = Utils.getUserData();

    const fetchSlider = () => {
        getServerData("trainer/sliders")
            .then((data) => {
                console.log('fetching data'+data);
                setSliderData(data);
            })
            .catch((err) => console.log(err));
    };
    
      useEffect(window.scrollEffect, []);
      useEffect(fetchSlider,[]);
    
      useEffect(() => {
        window.setTimeout(() => setResponse({ message: "" }), 5000);
      }, [response]);

    const photoUploader = (fld, title) => {
        return <>
            <Form.Label>{title}</Form.Label>
            <Form.Control type="file" size="lg" name={fld + '_image'} accept=".jpeg,.png,.PNG,.jpg;" required/>
            <div className="text-center">{!_.isEmpty(_.get(sliderData, fld + '_image', '')) && <img src={`${process.env.REACT_APP_API_URL}/uploads/slider/${sliderData[fld].slider_image}`} className="thumbnail mt-3" />}</div>
        </>;
    }

    const addAData = (e) => {
        let newdata = [...sliderData, { slider_image: "", slider_text: "",cta_link:""}];
        setSliderData(newdata);
    };
    const removeAData = (pos,pos2)  => (e) => {
        if(pos2){
            if(window.confirm("You are going to delete record, are you sure?")){
                axios.delete(Utils.apiUrl(`trainer/delslider/${pos}`),Utils.apiHeaders())
                .then(res => {
                  fetchSlider();
                  window.alert(res.data.message);
                })
              }
        }        
      };
    const renderSliderFields = () => {
        return (
            <>
                {sliderData.map((v, k) => (
                    <Accordion defaultActiveKey={[0]} alwaysOpen>
                        <Row>
                            <Accordion.Item eventKey={k}
                                className="my-1"
                                style={{ backgroundColor: k % 2 === 0 ? "#ddf4f4" : "#f8f8f8" }}>
                                <Accordion.Header className="mb-0"><strong>Image Slider {k + 1} </strong></Accordion.Header>
                                <Accordion.Body>
                                    <Row>
                                        <Col md={12} className="mt-3 mb-3">
                                            {photoUploader(`${k}`, 'Upload Large Slider Image (Image dimension should be 360cm x 260cm)')}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={12} className="mt-3 mb-3">
                                            <Form.Control
                                                type="text"
                                                name="slider_text"
                                                placeholder="Slider Text"
                                                defaultValue={_.get(sliderData, `${k}.slider_text`, "")}
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={12} className="mt-3 mb-3">
                                            <Form.Control
                                                type="text"
                                                name="cta_link"
                                                placeholder="Call to action button link."
                                                defaultValue={_.get(sliderData, `${k}.cta_link`, "")}
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={12} className="m-3 text-right">
                                            {saving && <>Saving.. <Spinner animation="border" /></>}
                                            {!saving && response.message === "" && <Button type="submit" className="profile-save">Save</Button>}
                                            {!saving && response.message !== "" && <Alert variant={response.success ? 'info' : 'danger'} className="p-3 mt-2 text-center">{response.message}</Alert>}
                                        </Col>
                                    </Row>
                                </Accordion.Body>
                            </Accordion.Item>
                            <i
                                className="fa fa-minus-circle fa-lg mt-2 cursor-pointer text-danger remove-award"
                                onClick={removeAData((_.get(sliderData, `${k}.id`, "")),(`${sliderData[k].slider_image}`))}
                            />
                        </Row>
                    </Accordion>
                ))}
            </>
        );
    }
    const onSave = (e) => {
        const frm = e.currentTarget;
        e.preventDefault();
        let frmdata = new FormData(frm);
        setSaving(true);
        setServerData("trainer/imagesliders", frmdata).then((res) => {
            setSaving(false);
            setResponse(res);
            setLastinsertid(res.insertId);
        });
    };
    return (
        <>
            <Form onSubmit={onSave}>
                <Form.Control type="hidden" name="user_id" value={trainerDetails.id} />
                <Form.Control type="hidden" name="created_at" value={Date().toLocaleString()} />
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