import React,{useState,useEffect} from 'react';
import _ from 'lodash';
import {Container, Tab, Row, Col, Button} from 'react-bootstrap';
import {CourseForm, CourseResources, CourseContents} from '../components/courses';
import DataTableGrid from '../components/DataTableGrid';
import axios from 'axios';
import Utils from '../Utils';

const MyCourse = (props) => {

   
    const [showmc, setShowmc] = useState({show: false, row: null, type: null});

    const [list,setList] = useState({loading: false, error: false, pageInfo: {}, data: []});
    const [showForm,setShowForm] = useState({id: false, mode: 0}); // 0=do not show, 1=add, 2=edit
    
    const listColumns = ['id','name','sku','slug','price','short_description','description','learn_brief','requirements','stock_qnty','level','language','duration','lectures','created_at'];

    const columns = listColumns.map(v => ({
        name: v.toUpperCase(),
        selector: row => row[v],
        sortable: true
    }));

    columns.push({
        name: "Action",
        cell: row => <>
            <Button size='sm' variant="light" className="mr-1" onClick={() => setShowmc({show: true, row: row, type: 'resource'})}><i className="fas fa-suitcase" /></Button>
            <Button size='sm' variant="light" className="mr-1" onClick={() => setShowmc({show: true, row: row, type: 'content'})}><i className="fa fa-book" /></Button>
            <Button size='sm' variant="light" className="mr-1" onClick={()=>setShowForm({mode: 2, id: row.id})}><i className="fa fa-edit" /></Button>
            <Button size='sm' variant="light" className="mr-1" onClick={deleteRecord(row.id)}><i className="fa fa-trash text-danger" /></Button>
        </>,
        sortable: false
    });

    const deleteRecord = (id)  => (e) => {
      if(window.confirm("You are going to delete record, are you sure?")){
          axios.delete(Utils.apiUrl(`trainer/my-courses/${id}`),Utils.apiHeaders())
          .then(res => {
            fetchList();
            window.alert(res.data.message);
          })
        }
      }; 

    const fetchList = () => {
        setList({...list, loading: true})
        axios.get(Utils.apiUrl('trainer/my-courses'),Utils.apiHeaders())
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

    return (<>
    <Container fluid className="h-100 p-0">
    <div className="profile-wrapper">
    <div className="container100">
        <h1>My Course </h1>
        
        <Tab.Container id="left-tabs-example">
        <div className="card-header ui-sortable-handle" >
            <h3 className="card-title">Course List #</h3>
            <span className="btn float-right">
                <button className="btn btn-success btn-sm" onClick={()=>setShowForm({mode: 1, id: false})}>Add Course <i className="fas fa-plus"></i></button>
                </span>
        </div>
            <Row>
                <Col sm={12}>
                  <DataTableGrid columns={columns} data={list.data} />
                </Col>
            </Row>
        </Tab.Container>

        {showForm.mode > 0 && <CourseForm type="modal" id={showForm.id} onClose={() => setShowForm({...showForm, mode: 0})} onSave={fetchList} />}
        {showmc.show && showmc.type==='resource' && <CourseResources type="modal" id={showmc.row.id} name={showmc.row.name} onClose={() => setShowmc({...showmc, show: false})} />}
        {showmc.show && showmc.type==='content' && <CourseContents type="modal" id={showmc.row.id} name={showmc.row.name} onClose={() => setShowmc({...showmc, show: false})} />}
    </div>
</div>
</Container>
</>);
}; 

export default MyCourse;