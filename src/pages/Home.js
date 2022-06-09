import _ from 'lodash';
import React,{useEffect, useContext, useState} from 'react';

import UserContext from './../contexts/UserContext';

import Utils from './../Utils';

const Home = (props) => {

	const [pa,setPA] = useState([]);
	const {getServerData} = useContext(UserContext);

	useEffect(() => {
		getServerData('profile_attributes')
		.then(setPA)
		.catch(err => console.log(err));
	},[]);

	useEffect(window.drumEffect,[pa]);

    const searchTrainers = (e) => {
        const frm = e.currentTarget;
        e.preventDefault();

        const fd = new FormData(frm);

        var data = {};
        fd.forEach((value, key) => {
            if(value!=''){
                data[key] = parseInt(value);
            }
        });

        Utils.addToUserData({calibs: data});
        window.location.href = '/search-results';
        
    }

	const renderPA = () => {
		return pa.map(p => <div className="col-md-3" key={p.title}>
			<div className="alert bg-light text-dark"><b>{p.title}</b></div>
			<select name={`pa[${p.id}]`}>
                <option value="">{p.title}</option>
				{_.get(p,'children.length',0) > 0 && p.children.map(pc => <option key={pc.id} value={pc.id}>{pc.title}</option>)}
			</select>
		</div>)
	};

    return(<>
        <section className="home-wrapper">
        <div className="container-fluid">
            <div className="bannerText">
                WORLD'S TOP BRANDED CORPORATE 
                TRAINERS TO TRANSFORM 
                YOUR PROFESSIONAL CAREER
            </div>
            <div className="bannerBottomtext clearfix">
                <ul>
                    <li><a href="#signUpTrainer"  data-toggle="modal" data-dismiss="modal">Join as a Trainer</a></li>
                    <li><a  href="#signUpStudent"  data-toggle="modal" data-dismiss="modal">Join as a Student</a></li>
                </ul>
                <div className="whyAD">
                    <img className="img-fluid" src="assets/images/why_ad.png" alt="Autodidact" />
                </div>
            </div>
        </div>
       
    </section>
    <div className="findBox">
        <div className="container">
            <h2>Find the ONE for you!</h2>
			{_.get(pa,'length',0) === 0 && <div className="progress-bar bg-warning text-dark progress-bar-striped progress-bar-animated">Loading Profile Attributes</div>}
			{_.get(pa,'length',0) > 0 && <div className="mySlides fade">
				<form onSubmit={searchTrainers}>
                <div className="row">
					{renderPA()}
				</div>

				<div className="text-center">
                    <button type='submit' className="btn btn-warning px-5 py-3 btn-search">Search Trainers</button>
                </div> 
                </form>
			</div>}
			
				
			
		</div>
		           
    </div>       

    
    </>);
}; 

export default Home;