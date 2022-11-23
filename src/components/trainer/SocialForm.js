import {useEffect, useContext, useState} from 'react';
import {Form, Alert, Spinner, Row, Col, Button} from 'react-bootstrap';
import UserContext from '../../contexts/UserContext';
import _ from 'lodash';



const SocialForm = (props) => {

  const [count, setCount] = useState(4);
  const [socialData, setSocialData] = useState([]);
  const [saving, setSaving] = useState(false);
  const [response, setResponse] = useState({success: false, message: ""});
  const {getServerData,setServerData} = useContext(UserContext);
  const [content,setContent] = useState("");
  const onContentChange = (e) => {
    setContent(e.target.value);
  }

  useEffect(() => {
    getServerData('trainer/my-social')
    .then(setSocialData)
    .catch(err => console.log(err));
  },[]);

  useEffect(window.scrollEffect,[]);

  useEffect(() => {window.setTimeout(() => setResponse({message: ""}), 5000)},[response]);

  const onSave = (e) => {
    const frm = e.currentTarget;
    e.preventDefault();
    let frmdata = new FormData(frm);
    setSaving(true);
    setServerData('trainer/my-social',frmdata)
    .then(res => {
      setSaving(false);
      setResponse(res);
    })
  }


  return <Form onSubmit={onSave}>
    
    <Row>
        <Col md={6} className="mt-3">
            <Form.Label>Facebook URL: </Form.Label>
            <Form.Control type="text" name="fburl" placeholder="Enter facebook page url" defaultValue={_.get(socialData,'fburl','')} />
        </Col>
        <Col md={6} className="mt-3">
            <Form.Label>Instagram URL: </Form.Label>
            <Form.Control type="text" name="instaburl" placeholder="Enter Instagram page url" defaultValue={_.get(socialData,'instaburl','')} />
        </Col>
    </Row>  
    <Row>  
        <Col md={6} className="mt-3">
            <Form.Label>LinkedIn URL: </Form.Label>
            <Form.Control type="text" name="linurl" placeholder="Enter LinkedIn page url" defaultValue={_.get(socialData,'linurl','')} />
        </Col>
        <Col md={6} className="mt-3">
            <Form.Label>Pinterest URL: </Form.Label>
            <Form.Control type="text" name="pinurl" placeholder="Enter pinterest page url" defaultValue={_.get(socialData,'pinurl','')} />
        </Col>
    </Row>
    <Row>
        <Col md={6} className="mt-3">
            <Form.Label>Twitter URL: </Form.Label>
            <Form.Control type="text" name="twurl" placeholder="Enter twitter page url" defaultValue={_.get(socialData,'twurl','')} />
        </Col>
        <Col md={6} className="mt-3">
            <Form.Label>Youtube URL: </Form.Label>
            <Form.Control type="text" name="uturl" placeholder="Enter youtube page url" defaultValue={_.get(socialData,'uturl','')} />
        </Col>
    </Row>
    
    <Row>
      <Col md={12} className="m-3 text-right">
        {saving && <>Saving.. <Spinner animation="border" /></>}
        {!saving && response.message==="" && <Button type="submit" className="profile-save">Save</Button>}
        {!saving && response.message!=="" && <Alert variant={response.success ? 'info' : 'danger'} className="p-3 mt-2 text-center">{response.message}</Alert>}
      </Col>
    </Row>
  
  </Form>

};

export default SocialForm;