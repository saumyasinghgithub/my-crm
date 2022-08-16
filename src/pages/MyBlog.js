import React,{useState,useEffect} from 'react';
import _, { noConflict } from 'lodash';
import {Container, Tab, Row, Col, Button} from 'react-bootstrap';
import BlogForm from '../components/blogs/BlogForm';
import DataTableGrid from '../components/DataTableGrid';
import axios from 'axios';
import Utils from '../Utils';

const MyBlog = (props) => {

   
    const [showmc, setShowmc] = useState({show: false, row: null, type: null});

    const [list,setList] = useState({loading: false, error: false, pageInfo: {}, data: []});
    const [showForm,setShowForm] = useState({id: false, mode: 0}); // 0=do not show, 1=add, 2=edit
    
    const listColumns = ['id','name', 'slug','created_at'];

    const columns = listColumns.map(v => ({
          
        name: v.toUpperCase(),
        selector: row => row[v],
        format: row => {
            return row[v];
        },
        sortable: true,
        width: "200px"
        
    }));
    
    columns.push({
        name: "Action",
        cell: row => <>
            <Button size='sm' variant="light" className="mr-1" onClick={()=>setShowForm({mode: 2, id: row.id})}><i className="fa fa-eye" /></Button>
            <Button size='sm' variant="light" className="mr-1" onClick={()=>setShowForm({mode: 2, id: row.id})}><i className="fa fa-edit" /></Button>
            <Button size='sm' variant="light" className="mr-1" onClick={deleteRecord(row.id)}><i className="fa fa-trash text-danger" /></Button>
        </>,
        sortable: false
    });

    const deleteRecord = (id)  => (e) => {
      if(window.confirm("You are going to delete record, are you sure?")){
          axios.delete(Utils.apiUrl(`trainer/my-blogs/${id}`),Utils.apiHeaders())
          .then(res => {
            fetchList();
            window.alert(res.data.message);
          })
        }
      }; 

    const fetchList = () => {
        setList({...list, loading: true})
        axios.get(Utils.apiUrl('trainer/my-blogs'),Utils.apiHeaders())
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
        <h1>My Blogs </h1>
        
        <Tab.Container id="left-tabs-example">
        <div className="card-header ui-sortable-handle" >
            <h3 className="card-title">Course List #</h3>
            <span className="btn float-right">
                <button className="btn btn-success btn-sm" onClick={()=>setShowForm({mode: 1, id: false})}>Add Blog <i className="fas fa-plus"></i></button>
                </span>
        </div>
            <Row>
                <Col sm={12}>
                  <DataTableGrid columns={columns} data={list.data} />
                </Col>
            </Row>
        </Tab.Container>

        {showForm.mode > 0 && <BlogForm type="modal" id={showForm.id} onClose={() => setShowForm({...showForm, mode: 0})} onSave={fetchList} />}
    </div>
</div>
</Container>
</>);
}; 

export default MyBlog;