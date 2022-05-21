import React,{useState, useEffect, useRef} from 'react';
import Utils from './../Utils';
import axios from 'axios';
import _ from 'lodash';

const JoinAsTrainer = (props) => {

    const frmRef = useRef('trainerForm');
 
    const [showMessage,setShowMessage] = useState(false);
    const $ = window.$;
    const [error,setError] = useState(false);
    
    const submitForm = (e) => {
        
       const frm = frmRef.current;
       e.preventDefault();
       console.log(frm.checkValidity());
       frm.classList.add('was-validated');
       if (frm.checkValidity() === false) {
        return false;
      }
       setError(false);
       setShowMessage(false);
       let frmdata = new FormData(frm);
  
       if(_.get(frm,'password.value',false)){
          if(frm.password.value!==frm.conf_password.value){
            setError("Password verification failed, please verify your password correctly!");
            return false;
          }
       }
       axios.post(Utils.apiUrl(`user/add`),frmdata,Utils.apiHeaders())
       .then(res => {
          if(res.data.success){
             setShowMessage(true);
          }else{
             throw(res.data);
          }
          
       }).catch(err  => {
           setError(err.message)
           //console.log(err);
       }
           ) 
   
     };  

    const validatePassword = () => {
        const frm = frmRef.current;
        if(frm.password.value != frm.conf_password.value) {
            frm.conf_password.setCustomValidity("Passwords Don't Match");
        } else {
            frm.conf_password.setCustomValidity('');
        }
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
<div className="modal" id="signUpTrainer" tabIndex="-1" role="dialog" aria-hidden="true">
        <div className="modal-dialog modal-full" role="document">
            <div className="modal-content">
                <div className="overlay"></div>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <img className="img-fluid" src="assets/images/close-circle.png" alt="AD closed"/>
                </button> 
                <div className="modal-body p-4">
                    <div className="container">
                        <div className="loginWrapper signupWrapper">
                            <h3>Join in NOW TO START your digital business</h3>
                            <ul>
                                <li>Sign Up with</li>
                                <li><a href=""><img className="img-fluid" src="assets/images/fb.png" alt="AD on FB"/></a></li>
                                <li>or</li>
                                <li><a href=""><img className="img-fluid" src="assets/images/google-plus.png" alt="AD on Google"/></a></li>
                                <li>or</li>
                                <li><a href=""><img className="img-fluid" src="assets/images/linkedin.png" alt="AD on LinkedIn"/></a></li>
                                <li>or</li>
                                <li><a href=""><img className="img-fluid" src="assets/images/mail.png" alt="AD on Email" /></a></li>
                            </ul>
                            <form ref={frmRef} method="post" className="needs-validation" noValidate onSubmit={submitForm}>
                                { showMessage &&  
                                        <div className='alert alert-info p-3'>
                                            
                                                <strong>Record saved successfully!</strong>
                                          
                                        </div>
                                }
                                 { error !== false && 
                                        <div className='alert alert-danger p-3'>
                                           
                                                <strong>{error}</strong>
                                           
                                        </div>
                                }
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <input className="form-control" name="firstname" placeholder="First name" type="text" required />
                                            <div className="invalid-feedback">First name is required!</div>
                                        </div>
                                        <div className="form-group">
                                            <input className="form-control" name="middlename" placeholder="Middle name" type="text"/>
                                            <div className="invalid-feedback"></div>
                                        </div>
                                        <div className="form-group">
                                            <input className="form-control" name="lastname" placeholder="Last name" type="text" required />
                                            <div className="invalid-feedback">Last name is required!</div>
                                        </div>
                                        <div className="form-group downArrow">
                                            <input className="form-control" name="country" placeholder="country" type="text" required />
                                            <div className="invalid-feedback">Contry name required!</div>
                                        </div>
                                        <div className="form-group">
                                            <input className="form-control" name="address" placeholder="Address" type="text"/>
                                        </div>
                                        <div className="form-group width50">
                                            <input className="form-control" name="zipcode" placeholder="Pin Code" type="text"/>
                                        </div>
                                        <div className="form-group width50 width50R downArrow">
                                            <input className="form-control" name="state" placeholder="State" type="text"/>
                                        </div>                                    
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <input className="form-control" name="mobile" placeholder="Phone" type="text" required />
                                            <div className="invalid-feedback">Phone cannot be empty!</div>
                                        </div>
                                        <div className="form-group">
                                            <input className="form-control" name="email" placeholder="Email" type="email" required />
                                            <div className="invalid-feedback">Email cannot be empty!</div>
                                        </div>
                                        <div className="form-group">
                                            <input className="form-control" name="password" onChange={validatePassword} placeholder="Password" type="password" required />
                                        </div>
                                        <div className="form-group">
                                            <input className="form-control" name="conf_password" onKeyUp={validatePassword} placeholder="Re-enter Password" type="password" />
                                            <div className="invalid-feedback">Passwords Don't Match</div>
                                        </div>
                                        <div className="form-group">
                                            <input type="hidden" name="role"  value="4"  />
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

export default JoinAsTrainer;