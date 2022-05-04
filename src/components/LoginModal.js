import React from "react";

const LoginModal = (props) => {
    return(<>
    <div className="modal fade show" id="loginModal" >
    <div className="modal-dialog modal-full" >
        <div className="modal-content">
                <div className="overlay"></div>
                <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                    <img className="img-fluid" src="assets/images/close-circle.png" />
                    </button>
                <div className="loginWrapper">
                    <h3>Log In to see <br /> the latest updates</h3>
                    <form>
                        <div className="form-group">
                            <input className="form-control" placeholder="Email or username" type="text" />
                        </div>
                        <div className="form-group">
                            <input className="form-control" placeholder="Password" type="password" />
                        </div>
                        <button type="submit" className="btn btnSubmit">Log In</button>                        
                    </form>
                    <p>Forgot password ? <a href="">Click here!</a></p>
                    <p>By signing up, you agree to our Terms of Use and Privacy Policy.</p>
                    <ul>
                        <li><a  href="#signUpTrainer"  data-bs-toggle="modal" data-bs-dismiss="modal" >Join as a Trainer</a></li>
                        <li><a  href="#signUpStudent"  data-bs-toggle="modal" data-bs-dismiss="modal" >Join as a Student</a></li>
                    </ul>
                </div>           
        </div>
    </div>
</div>
    </>);
}

export default LoginModal;