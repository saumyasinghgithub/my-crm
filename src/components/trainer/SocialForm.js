import {useEffect, useContext, useState} from 'react';
import {Form, Alert, Spinner, Row, Col, Button} from 'react-bootstrap';
import UserContext from '../../contexts/UserContext';
import _ from 'lodash';



const SocialForm = (props) => {
  const socialPlatforms = ['facebook','instagram','linkedin','pinterest','twitter','youtube'];

  const [count, setCount] = useState(4);
  const [socialData, setSocialData] = useState({});
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
      setSocialData(res);
    })
  }


  return <>
    <h1>Social Platform</h1>
    <Form onSubmit={onSave}>
      
      <Row>
        {socialPlatforms.map(fld => <Col key={fld} md={6} className="mt-3">
            <Form.Label><i className={`fab fa-2x fa-${fld} mr-2`}></i>{fld.toUpperCase()} URL: </Form.Label>
            <Form.Control type="text" name={fld} placeholder={`Enter ${fld} page url`} defaultValue={_.get(socialData,fld,'')} />
        </Col>)}
      </Row>
      
      <Row>
        <Col md={12} className="m-3 text-right">
          {saving && <>Saving.. <Spinner animation="border" /></>}
          {!saving && response.message==="" && <Button type="submit" className="profile-save">Save</Button>}
          {!saving && response.message!=="" && <Alert variant={response.success ? 'info' : 'danger'} className="p-3 mt-2 text-center">{response.message}</Alert>}
        </Col>
      </Row>
    
    </Form>
  </>};

export default SocialForm;