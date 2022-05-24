import _ from 'lodash';
import React,{useEffect, useContext, useState} from 'react';
import {Container} from 'react-bootstrap';
import UserContext from './../contexts/UserContext';
const AddTrainer = (props) => {
    useEffect(window.scrollEffect,[]);
    const [pa,setPA] = useState([]);
	const {getProfileAttributes} = useContext(UserContext);

	useEffect(() => {
		getProfileAttributes()
		.then(setPA)
		.catch(err => console.log(err));
	},[]);

	const renderPA = () => {
		return pa.map(p => <div className="col-md-6" key={p.title}>
            <div className="form-group">
			<div className=""><b>{p.title}</b></div>
			<select>
				{_.get(p,'children.length',0) > 0 && p.children.map(pc => <option key={pc.id} value={pc.id}>{pc.title}</option>)}
			</select>
		</div></div>)
	};
    return (<>
    <Container fluid className="h-100 p-0">
    <div className="profile-wrapper">
    <div className="container100">
        <h1>Create Trainer Profile </h1>

            <form method="post" className="needs-validation" noValidate >
                <div className="row">
                    <div className="col-sm-6">
                        <div className="form-group">
                            <input className="form-control" name="fullname" placeholder="Name" type="text" required />
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="form-group">
                            <input className="form-control" name="email" placeholder="email" type="email" required />
                        </div>
                    </div>
                </div>
                <div className="row">
                    {renderPA()}
                </div> 

            </form>
    </div>
</div>
</Container>
</>);
}; 

export default AddTrainer;