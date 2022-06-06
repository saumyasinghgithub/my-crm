import {useEffect, useContext, useState} from 'react';
import {Form, Alert, Spinner, Row, Col, Button, Modal} from 'react-bootstrap';
import UserContext from './../../contexts/UserContext';
import _ from 'lodash';
import DataTableGrid from '../../components/DataTableGrid';
import axios from 'axios';
import Utils from './../../Utils';


const CourseResources = (props) => {

  const [mycourse, setMycourse] = useState([]);
  const [saving, setSaving] = useState(false);
  const [response, setResponse] = useState({success: false, message: ""});
  const {getServerData,setServerData} = useContext(UserContext);

  const [list,setList] = useState({loading: false, error: false, pageInfo: {}, data: []});
    
  const listColumns = ['id','type','name','price'];

    const columns = listColumns.map(v => ({
        name: v.toUpperCase(),
        selector: row => row[v],
        sortable: true
    }));

    columns.push({
      name: "Action",
      cell: row => <>
          <Button size='sm' variant="light" className="mr-1"><i className="fa fa-edit" /></Button>
          <Button size='sm' variant="light" className="mr-1"><i className="fa fa-trash text-danger" /></Button>
      </>,
      sortable: false
  });

  const onContentChange = (fld) => (value) => {
    let c = {...mycourse};
    c[fld] = value;
    setMycourse(c);
  }
  
  const fetchList = () => {
    setList({...list, loading: true})
    axios.get(Utils.apiUrl('trainer/my-resources'),Utils.apiHeaders())
    .then(res => {
      if(res.data.success){
        setList({...list, loading: false, error: false, pageInfo: res.data.pageInfo, data: res.data.data.map(v => _.pick(v,listColumns))});
      }else{
        setList({...list, loading: false, error: res.data.message, pageInfo: {}, data: []});
      }
    })
  };
  useEffect(window.scrollEffect,[]);
  useEffect(fetchList,[]);


  useEffect(() => {window.setTimeout(() => setResponse({message: ""}), 5000)},[response]);
  

  const onSave = (e) => {
    const frm = e.currentTarget;
    e.preventDefault();
    let frmdata = new FormData(frm);
    setSaving(true);
    setServerData('trainer/my-courses ',frmdata)
    .then(res => {
      setSaving(false);
      setResponse(res);
    })
  }
  
  const renderForm = () => <Form onSubmit={onSave}>
    <Form.Control type="hidden" name="id" defaultValue={_.get(mycourse,'id','')} />
  
   <h1>Course Resources</h1>
    <Row>
      <Col md={12} className="mt-3">
        <Form.Label>Course Title: </Form.Label>
        <Form.Control type="text" name="name" placeholder="Enter course Title" defaultValue={_.get(mycourse,'name','')} />
      </Col>
    </Row>
    <Row> 
      <Col md={12} className="mt-3">  
        <Form.Label>Price: </Form.Label>
        <Form.Control type="text" name="price" placeholder="Enter course price" defaultValue={_.get(mycourse,'price','')} />
      </Col>
    </Row>
    <Row>   
      <Col md={12} className="mt-3">
          <Form.Control as="select" name="type" defaultValue={_.get(setMycourse,`type`,'')}>
            <option value=""> - Select Course Type - </option>
            {Utils.courseType.map(v => <option key={v} value={v}>{v}</option>)}
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


return <Modal show={true} size="xl" onHide={_.get(props,"onClose","")}>
<Modal.Header closeButton>
  <Modal.Title>Course Resources for {props.name}</Modal.Title>
</Modal.Header>

<Modal.Body>
  <DataTableGrid columns={columns} data={list.data} />
</Modal.Body>

</Modal>;

};

export default CourseResources;