import React,{useState,useEffect} from 'react';
import _ from 'lodash';
import {Container, Tab, Row, Col} from 'react-bootstrap';
import CreactCourse from './CreactCourse';
import DataTableGrid from '../components/DataTableGrid';
import axios from 'axios';
import Utils from '../Utils';

const MyCourse = (props) => {
    const [list,setList] = useState({loading: false, error: false, pageInfo: {}, data: []});
    const [showForm,setShowForm] = useState({id: false, mode: 0}); // 0=do not show, 1=add, 2=edit

    const columns = [
        {
            name: '#ID',
            selector: row => row.id,
            sortable: true,
        },
        {
            name: 'Course Title',
            selector: row => row.title,
            sortable: true,
        },
        {
            name: 'SKU',
            selector: row => row.sku,
            sortable: true,
        },
        {
            name: 'Price',
            selector: row => row.price,
            sortable: true,
        },
        {
            name: 'Short Description',
            selector: row => row.shortDesc,
            sortable: true,
        },
        {
            name: 'Description',
            selector: row => row.desc,
            sortable: true,
        },
        {
            name: 'Requirements',
            selector: row => row.req,
            sortable: true,
        },
        {
            name: 'Quantity',
            selector: row => row.qnty,
            sortable: true,
        },
    ];
    const data = [
        {
            id: 1,
            title: 'Demo Course',
            year: '1984',
            sku: 'demo1023',
            price: '200',
            shortDesc: 'Here is the short description of course',
            desc: 'Here is the description of course',
            req: 'Here is the course requiremnet',
            qnty: '50'

        },
        {
            id: 2,
            title: 'Test Course ',
            year: '1984',
            sku: 'test1023',
            price: '280',
            shortDesc: 'Here is the short description of course',
            desc: 'Here is the description of course',
            req: 'Here is the course requiremnet',
            qnty: '40'
        },
        

    ];
    // Blatant "inspiration" from https://codepen.io/Jacqueline34/pen/pyVoWr
    const fetchList = () => {
        setList({...list, loading: true})
        axios.get(Utils.apiUrl('trainer/my-courses'),Utils.apiHeaders())
        .then(res => {
          if(res.data.success){
            setList({...list, loading: false, error: false, pageInfo: res.data.pageInfo, data: res.data.data});
          }else{
            setList({...list, loading: false, error: res.data.message, pageInfo: {}, data: []});
          }
        })
      };
    useEffect(window.scrollEffect,[]);
    useEffect(fetchList,[]);
  const renderDT = () => {
    return (<>
    <DataTableGrid
            columns={columns}
            data={data}
            
        />
    </>)
  };

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
                {renderDT()}
                </Col>
            </Row>
        </Tab.Container>

        {showForm.mode > 0 && <CreactCourse mode={showForm.mode} id={showForm.id} onClose={() => setShowForm({...showForm, mode: 0})} />}
        
    </div>
</div>
</Container>
</>);
}; 

export default MyCourse;