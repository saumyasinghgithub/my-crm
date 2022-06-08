import {useEffect, useContext, useState} from 'react';
import {Form, Alert, Spinner, Row, Col, Button, Modal} from 'react-bootstrap';
import UserContext from './../../contexts/UserContext';
import _ from 'lodash';
import DataTableGrid from '../../components/DataTableGrid';
import ContentForm from './ContentForm';
import axios from 'axios';
import Utils from './../../Utils';


const CourseResources = (props) => {

  const [mycourse, setMycourse] = useState([]);
  const [saving, setSaving] = useState(false);
  const [response, setResponse] = useState({success: false, message: ""});
  const {getServerData,setServerData} = useContext(UserContext);

  const [list,setList] = useState({loading: false, error: false, pageInfo: {}, data: []});
  const [showForm,setShowForm] = useState({id: false, mode: 0}); // 0=do not show, 1=add, 2=edit  
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
      props.onSave();
      props.onClose();
    })
  }
  const renderButton = () => <div className="card-header ui-sortable-handle" >
      <h3 className="card-title">Course List #</h3>
      <span className="btn float-right">
      <button className="btn btn-success btn-sm" onClick={()=>setShowForm({mode: 1, id: false})}>Add Course <i className="fas fa-plus"></i></button>
      </span>
    </div>;

return <Modal show={true} size="xl" onHide={_.get(props,"onClose","")}>
<Modal.Header closeButton>
  <Modal.Title>Course Resources for {props.name}</Modal.Title>
</Modal.Header>

<Modal.Body>
  {renderButton()}
  <DataTableGrid columns={columns} data={list.data} />
</Modal.Body>

</Modal>;

{showForm.mode > 0 && <ContentForm type="modal" id={showForm.id} onClose={() => setShowForm({...showForm, mode: 0})} onSave={fetchList} />}


};

export default CourseResources;