import _ from 'lodash';
import React,{useEffect, useContext, useState} from 'react';

import UserContext from './../contexts/UserContext';

const Home = (props) => {

	const [pa,setPA] = useState([]);
	const {getServerData} = useContext(UserContext);

	useEffect(() => {
		getServerData('profile_attributes')
		.then(setPA)
		.catch(err => console.log(err));
	},[]);

	useEffect(window.drumEffect,[pa]);


	const renderPA = () => {
		return pa.map(p => <div className="col-md-3" key={p.title}>
			<div className="alert bg-light text-dark"><b>{p.title}</b></div>
			<select>
				{_.get(p,'children.length',0) > 0 && p.children.map(pc => <option key={pc.id} value={pc.id}>{pc.title}</option>)}
			</select>
		</div>)
	};

    return(<>
        <section className="home-wrapper">
        <div className="container-fluid">
            <div className="bannerText">
                WORLD’S TOP BRANDED CORPORATE 
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
				<div className="row">
					{renderPA()}
				</div>

				<div className="doneText"><a href="home-result.php">Done</a></div> 
			</div>}
			
				
			
		</div>
		           
    </div>       

    
    </>);
}; 

export default Home;