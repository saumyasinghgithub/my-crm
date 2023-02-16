import { useEffect, useContext, useState } from 'react';
import { Form, Alert, Spinner, Row, Col, Button } from 'react-bootstrap';
import UserContext from './../../contexts/UserContext';
import _ from 'lodash';


const CalibForm = (props) => {


  const [pa, setPA] = useState([]);
  const [myc, setMyc] = useState([]);
  const [saving, setSaving] = useState(false);
  const [response, setResponse] = useState({ success: false, message: "" });
  const { getServerData, setServerData } = useContext(UserContext);
  const [dataarray, setDataarray] = useState([]);

  useEffect(() => {
    getServerData('profile_attributes')
      .then(setPA)
      .then(() => getServerData('trainer/my-calibs?limit=999999'))
      .then(setMyc)
      .catch(err => console.log(err));
  }, []);
  useEffect(window.scrollEffect, []);

  useEffect(() => { window.setTimeout(() => setResponse({ message: "" }), 5000) }, [response]);


  const onSave = (e) => {
    const frm = e.currentTarget;
    e.preventDefault();
    let frmdata = new FormData(frm);
    setSaving(true);
    setServerData('trainer/my-calibs', frmdata)
      .then(res => {
        setSaving(false);
        setResponse(res);
      })
  }

  const isMyc = (pid, pval) => {
    return _.get(_.find(myc, r => r.pa_id === pid && r.pa_value === pval), 'id', false) !== false;
  }
  const handleOptionChange = (event) => {
    let selectedId = Number(event.target.id);
    let selectedValue = Number(event.target.value);
    //alert('selectedValue'+selectedValue);
    pa.map((item) => {
      //return item.title; print industries, sub industries n all
      //return item.children; it returns object
      let items = item.children;
      //alert(items);
      items.map((newItem) => {
        //alert(newItem.title); //prints agriculture, IT , mining
        let newItems = newItem.children;   
        let dataarray = _.filter(newItems, rec => Number(rec.parent_id) === selectedValue);
        //alert('grandChildren'+JSON.stringify(dataarray));
        if (dataarray.length > 0) {
          setDataarray(dataarray);
        }        
      })
    });
  };
  
  const renderPA = () => {
    return pa.map(p => <Col md={6} key={p.title} className="mt-3">
      <Form.Label>{p.title}</Form.Label>
      <Form.Control as="select" multiple name={`calib[${p.id}][]`} onChange={handleOptionChange}>
        {_.get(p, 'children.length', 0) > 0 && p.children.map(pc => <option key={pc.id} value={pc.id} selected={isMyc(p.id, pc.id)}>{pc.title}</option>)}
      </Form.Control> 
      <ul> 
      {dataarray.map(arrayvalues =>
        <li>
          {arrayvalues.title}
        </li>   
        )}   
      </ul>       
    </Col>
    )
  };


  return <Form onSubmit={onSave}>
    <Row>
      <Col md={12}><h1>Trainer Attribute Details</h1></Col>
      {renderPA()}
      <Col md={12} className="text-right">
        {saving && <>Saving.. <Spinner animation="border" /></>}
        {!saving && response.message === "" && <Button type="submit" className="profile-save">Save</Button>}
        {!saving && response.message !== "" && <Alert variant={response.success ? 'info' : 'danger'} className="p-3 mt-2 text-center">{response.message}</Alert>}
      </Col>
    </Row>
  </Form>

};

export default CalibForm;