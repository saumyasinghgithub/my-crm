import {useEffect, useContext, useState} from 'react';
import {Form, Alert, Spinner, Row, Col, Button} from 'react-bootstrap';
import UserContext from '../../contexts/UserContext';
import { Editor } from "@tinymce/tinymce-react";
import _ from 'lodash';
import Utils from './../../Utils';
import moment from 'moment';


const AcademicForm = (props) => {

  const [count, setCount] = useState(4);
  const [academicData, setAcademicData] = useState([]);
  const [saving, setSaving] = useState(false);
  const [response, setResponse] = useState({success: false, message: ""});
  const {getServerData,setServerData} = useContext(UserContext);
  const [content,setContent] = useState("");
  let curYear = new Date().getFullYear();
  const onContentChange = (e) => {
    setContent(e.target.value);
  }

  useEffect(() => {
    getServerData('trainer/my-academic')
    .then(setAcademicData)
    .catch(err => console.log(err));
  },[]);

  useEffect(() => {
    setCount(_.max([4,academicData.length]));
  }, [academicData]);

  useEffect(window.scrollEffect,[]);

  useEffect(window.scrollEffect,[]);

  useEffect(() => {window.setTimeout(() => setResponse({message: ""}), 5000)},[response]);

  const removeAData = (pos) => (e) => {
    let newdata = [...academicData];
    newdata.splice(pos,1);
    setAcademicData(newdata);
  }
  

  const onSave = (e) => {
    const frm = e.currentTarget;
    e.preventDefault();
    let frmdata = new FormData(frm);
    setSaving(true);
    setServerData('trainer/my-academic',frmdata)
    .then(res => {
      setSaving(false);
      setResponse(res);
    })
  }

  const renderAcademicFields = () => {
    let year = 0;
    return <>
        {(new Array(count)).fill(1).map((v,k) => <Row key={k}>
        <Col md={8} className="mt-3">
          <Form.Control as="select" name="qualification">
            <option value=""> - Select Qualification - </option>
            {Utils.academicQualifications.map(v => <option key={v} value={v} selected={_.get(academicData,`${k}.qualification`,'')===v}>{v}</option>)}
          </Form.Control></Col>
        <Col md={3} className="mt-3">
          <Form.Control as="select" name="year">
            <option value=""> - Select Passing year - </option>
            {(new Array(50)).fill(1).map((v,k1) => {
              year = moment().year()-50+k1;
              return <option key={k1} value={year} selected={_.get(academicData,`${k}.year`,'')===year}>{year}</option>;
            })}
          </Form.Control>
        </Col>
        <Col md={1} className="mt-3">{k > 3 && <i className="fa fa-minus-circle fa-2x text-danger" onClick={removeAData(k)} />}</Col>
      </Row>)}
    </>;
  }

  return <Form onSubmit={onSave}>
    
    <h1>Academic Qualification <i className="fa fa-plus-circle text-success" onClick={() => setCount(count+1)} /></h1>

    {count > 0 && renderAcademicFields()}
    
    <Row>
      <Col md={12} className="text-right">
        {saving && <>Saving.. <Spinner animation="border" /></>}
        {!saving && response.message==="" && <Button type="submit" className="profile-save">Save</Button>}
        {!saving && response.message!=="" && <Alert variant={response.success ? 'info' : 'danger'} className="p-3 mt-2 text-center">{response.message}</Alert>}
      </Col>
    </Row>
  
  </Form>

};

export default AcademicForm;