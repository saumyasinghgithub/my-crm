import _ from 'lodash';
import React,{useEffect, useContext, useState, Component} from 'react';
import {Container, Tab, Nav, Row, Col,Button} from 'react-bootstrap';
import CourseCom from '../components/courses';
import DataTableGrid from '../components/DataTableGrid';
import UserContext from './../contexts/UserContext';


const MyCourse = (props) => {
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

    useEffect(window.scrollEffect,[]);
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
            <Row>
                <Col sm={12}>
                {renderDT()}
                </Col>
            </Row>
        </Tab.Container>


        
    </div>
</div>
</Container>
</>);
}; 

export default MyCourse;