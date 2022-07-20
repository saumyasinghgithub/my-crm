import {useEffect, useContext, useState} from 'react';
import {Form, Alert, Spinner, Row, Col, Button} from 'react-bootstrap';
import UserContext from '../../contexts/UserContext';
import _ from 'lodash';
import moment from 'moment';


const AwardCertificationsForm = (props) => {

  const [count, setCount] = useState(4);
  const [awardData, setAwardData] = useState([]);
  const [saving, setSaving] = useState(false);
  const [response, setResponse] = useState({success: false, message: ""});
  const {getServerData,setServerData} = useContext(UserContext);
  const [content,setContent] = useState("");
  let curYear = new Date().getFullYear();
  const onContentChange = (e) => {
    setContent(e.target.value);
  }

  useEffect(() => {
    getServerData('trainer/my-awards')
    .then(setAwardData)
    .catch(err => console.log(err));
  },[]);

  useEffect(() => {
    setCount(_.max([4,awardData.length]));
  }, [awardData]);

  useEffect(window.scrollEffect,[]);

  useEffect(window.scrollEffect,[]);

  useEffect(() => {window.setTimeout(() => setResponse({message: ""}), 5000)},[response]);

  const removeAData = (pos) => (e) => {
    let newdata = [...awardData];
    newdata.splice(pos,1);
    setAwardData(newdata);
  }
  

  const onSave = (e) => {
    const frm = e.currentTarget;
    e.preventDefault();
    let frmdata = new FormData(frm);
    setSaving(true);
    setServerData('trainer/my-awards',frmdata)
    .then(res => {
      setSaving(false);
      setResponse(res);
    })
  }

  const renderAcademicFields = () => {
    let year = 0;
    return <>
        {(new Array(count)).fill(1).map((v,k) => <Row key={k} className="my-1" style={{"backgroundColor": k%2===0 ? '#ddf4f4' : '#f8f8f8'}}>
        <Col md={3} className="mt-3">
          <Form.Control as="select" name="year">
            <option value=""> - Select year - </option>
            {(new Array(50)).fill(1).map((v,k1) => {
              year = moment().year()-50+k1;
              return <option key={k1} value={year} selected={_.get(awardData,`${k}.year`,'')===year}>{year}</option>;
            })}
          </Form.Control>
        </Col>
        <Col md={9} className="mt-3">
          <Form.Control type="text" name="award" placeholder="Certification/Award Name" defaultValue={_.get(awardData,`${k}.award`,'')} />
        </Col>
        
        <Col md={6} className="mt-3">
          <Form.Control type="text" name="organisation" placeholder="Enter Issuing Organization's Name" defaultValue={_.get(awardData,`${k}.organisation`,'')} />
        </Col>
        <Col md={6} className="mt-3 mb-3">
          <Form.Control type="text" name="url" placeholder="Enter Certificate URL " defaultValue={_.get(awardData,`${k}.url`,'')} />
        </Col>

        {k > 3 && <i className="fa fa-minus-circle fa-lg mt-2 cursor-pointer text-danger remove-award" onClick={removeAData(k)} />}
        
      </Row>)}
    </>;
  }

  return <Form onSubmit={onSave}>
    <Form.Control type="hidden" name="id" defaultValue={_.get(awardData,'id','')} />
    <h1>Awards/Certifications <i className="fa fa-plus-circle text-success Adddetails" onClick={() => setCount(count+1)} /></h1>
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

export default AwardCertificationsForm;