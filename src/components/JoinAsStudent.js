import React,{useEffect} from "react";

const JoinAsStudent = (props) => {

    const $ = window.$;
        
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
                            <form>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <input className="form-control" placeholder="First name" type="text"/>
                                        </div>
                                        <div className="form-group">
                                            <input className="form-control" placeholder="Middle name" type="text"/>
                                        </div>
                                        <div className="form-group">
                                            <input className="form-control" placeholder="Last name" type="text"/>
                                        </div>
                                        <div className="form-group downArrow">
                                            <input className="form-control" placeholder="country" type="text"/>
                                        </div>
                                        <div className="form-group">
                                            <input className="form-control" placeholder="Address" type="text"/>
                                        </div>
                                        <div className="form-group width50">
                                            <input className="form-control" placeholder="Pin Code" type="text"/>
                                        </div>
                                        <div className="form-group width50 width50R downArrow">
                                            <input className="form-control" placeholder="State" type="text"/>
                                        </div>                                    
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <input className="form-control" placeholder="Phone" type="text"/>
                                        </div>
                                        <div className="form-group">
                                            <input className="form-control" placeholder="Email" type="email"/>
                                        </div>
                                        <div className="form-group">
                                            <input className="form-control" placeholder="Password" type="password" />
                                        </div>
                                        <div className="form-group">
                                            <input className="form-control" placeholder="Re-enter Password" type="password" />
                                        </div>
                                        <a  className="btn btnSubmit btnSubmitRed" href="my-profile-edit.php">Sign Up</a>
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