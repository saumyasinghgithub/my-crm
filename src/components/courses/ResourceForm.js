import {useEffect, useContext, useState} from 'react';
import {Form, Alert, Spinner, Row, Col, Button, Modal} from 'react-bootstrap';
import UserContext from './../../contexts/UserContext';
import _ from 'lodash';
import Utils from './../../Utils';


const ResourceForm = (props) => {

  const [mode, setMode] = useState('Add');

  const [cres, setCRes] = useState({});
  const [saving, setSaving] = useState(false);
  const [response, setResponse] = useState({success: false, message: ""});
  const {getServerData,setServerData} = useContext(UserContext);

  useEffect(() => {
    if(_.get(props,'id',false)){
      let params = `fname=id&fvalue=${props.id}`;
      getServerData('trainer/course-resources?'+params)
      .then(data => setCRes(data[0]))
      .then(() => setMode('Update'))
      .catch(err => console.log(err));
    }
  },[]);
      
      useEffect(window.scrollEffect,[]);
    
      useEffect(() => {window.setTimeout(() => setResponse({message: ""}), 5000)},[response]);

      const onSave = (e) => {
        const frm = e.currentTarget;
        e.preventDefault();
        let frmdata = new FormData(frm);
        setSaving(true);
        setServerData('trainer/course-resources ',frmdata)
        .then(res => {
          setSaving(false);
          setResponse(res);
          props.onSave();
          props.onClose();
        })
      }


    const renderForm = () => <Form onSubmit={onSave}>
    <Form.Control type="hidden" name="id" value={_.get(cres,'id','')} />
    <Form.Control type="hidden" name="course_id" value={props.course_id} />
  
   <h1>Course Resources</h1>
    <Row>
      <Col md={12} className="mt-3">
        <Form.Label>Course Title: </Form.Label>
        <Form.Control type="text" name="name" placeholder="Enter course Title" defaultValue={_.get(cres,'name','')} />
      </Col>
    </Row>
    <Row> 
      <Col md={12} className="mt-3">  
        <Form.Label>Price: </Form.Label>
        <Form.Control type="text" name="price" placeholder="Enter course price" defaultValue={_.get(cres,'price','')} />
      </Col>
    </Row>
    <Row>   
      <Col md={12} className="mt-3">
          <Form.Control as="select" name="type">
            <option value=""> - Select Course Type - </option>
            {Utils.courseType.map(v => <option key={v} value={v} selected={cres.type===v}>{v}</option>)}
          </Form.Control>
      </Col> 
    </Row>

    <Row>
      <Col md={12} className="mt-3 text-right">
        {saving && <>Saving.. <Spinner animation="border" /></>}
        {!saving && response.message==="" && <Button type="submit" className="profile-save">Save</Button>}
        {!saving && response.message!=="" && <Alert variant={response.success ? 'info' : 'danger'} className="p-3 mt-2 text-center">{response.message}</Alert>}
      </Col>
    </Row>
  
  </Form>;

const renderModal = () => <Modal show={true} size="lg" onHide={_.get(props,"onClose","")}>
<Modal.Header closeButton>
  <Modal.Title>{mode} Course</Modal.Title>
</Modal.Header>

<Modal.Body>
  {renderForm()}
</Modal.Body>

</Modal>

  return <>
    {props.type!=="modal" && renderForm()}
    {props.type==="modal" && renderModal()}
  </>;
};

export default ResourceForm;