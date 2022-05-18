import React,{useState, useEffect} from 'react';
import Utils from './../Utils';
import axios from 'axios';
import _ from 'lodash';

const JoinAsStudent = (props) => {

    const $ = window.$;
    const [setError] = useState(false);
    const submitForm = (e) => {

        setError(false);
       const frm = e.currentTarget;
       e.preventDefault();
   
       let frmdata = new FormData(frm);
  
       if(_.get(frm,'password.value',false)){
          if(frm.password.value!==frm.conf_password.value){
            setError("Password verification failed, please verify your password correctly!");
            return false;
          }
       }
       axios.post(Utils.apiUrl(`admin/add`),frmdata,Utils.apiHeaders())
       .then(res => {
          if(res.data.success){
             window.alert("Record saved successfully!");
             props.onSubmit();
             props.onClose();
          }else{
             window.alert(res.data.message);
          }
       }) 
   
     };    
    useEffect(()=>{
        $('.modal').on('show.bs.modal', function (e) {
            $('.modal .modal-dialog').attr('class', 'modal-dialog modal-full  zoomIn  animated');
        });
        $('.modal').on('hide.bs.modal', function (e) {
            $('.modal .modal-dialog').attr('class', 'modal-dialog  zoomOut modal-full  animated');
        });
    },[]);

    return(<>
    <div className="modal" id="signUpStudent" tabIndex="-1" role="dialog" aria-hidden="true">
        <div className="modal-dialog modal-full" role="document">
            <div className="modal-content">
                <div className="overlay"></div>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <img className="img-fluid" src="assets/images/close-circle.png" alt="AD closed" />
                </button> 
                <div className="modal-body p-4">
                    <div className="container">
                        <div className="loginWrapper signupWrapper">
                            <h3>Join in NOW TO CONNECT with <br />the world's top branded trainers</h3>
                            <ul>
                                <li>Sign Up with</li>
                                <li><a href=""><img className="img-fluid" src="assets/images/fb.png" alt="AD on FB" /></a></li>
                                <li>or</li>
                                <li><a href=""><img className="img-fluid" src="assets/images/google-plus.png" alt="AD on google" /></a></li>
                                <li>or</li>
                                <li><a href=""><img className="img-fluid" src="assets/images/linkedin.png" alt="AD on LinkedIn" /></a></li>
                                <li>or</li>
                                <li><a href=""><img className="img-fluid" src="assets/images/mail.png" alt="AD on Email" /></a></li>
                            </ul>
                            <form onSubmit={submitForm}>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <input className="form-control" name="firstname" placeholder="First name" type="text"/>
                                        </div>
                                        <div className="form-group">
                                            <input className="form-control" name="middlename" placeholder="Middle name" type="text"/>
                                        </div>
                                        <div className="form-group">
                                            <input className="form-control" name="lastname" placeholder="Last name" type="text"/>
                                        </div>
                                        <div className="form-group downArrow">
                                            <input className="form-control" name="country" placeholder="country" type="text"/>
                                        </div>
                                        <div className="form-group">
                                            <input className="form-control" name="address" placeholder="Address" type="text"/>
                                        </div>
                                        <div className="form-group width50">
                                            <input className="form-control" name="zip" placeholder="Pin Code" type="text"/>
                                        </div>
                                        <div className="form-group width50 width50R downArrow">
                                            <input className="form-control" name="state" placeholder="State" type="text"/>
                                        </div>                                    
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <input className="form-control" name="phone" placeholder="Phone" type="text"/>
                                        </div>
                                        <div className="form-group">
                                            <input className="form-control" name="email" placeholder="Email" type="email"/>
                                        </div>
                                        <div className="form-group">
                                            <input className="form-control" name="password" placeholder="Password" type="password" />
                                        </div>
                                        <div className="form-group">
                                            <input className="form-control" name="conf_password" placeholder="Re-enter Password" type="password" />
                                        </div>
                                        <div className="form-group clearfix">
                                        <div className="custom-control custom-checkbox">
                                            <input type="checkbox" name="role" className="custom-control-input" value="3" id="customCheck1" checked />
                                            <label className="custom-control-label" for="customCheck1">Role Active</label>
                                        </div> 
                                        </div>
                                        <button type="submit" className="btn btnSubmit btnSubmitRed">Sign Up</button>
                                        <p>By signing up, you agree to our Terms of Use and Privacy Policy.</p>
                                         <p>Already have an account? <a href="" data-toggle="modal" data-target="#loginModal" data-dismiss="modal">Log In</a></p>
                                    </div>
                                </div>
                                
                            </form>
                        </div> 
                    </div>
                </div>
            </div>
        </div>
    </div>

    </>);
}

export default JoinAsStudent;