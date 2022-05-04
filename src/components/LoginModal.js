import React,{useEffect} from "react";

const LoginModal = (props) => {

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
    <div className="modal" id="loginModal" >
    <div className="modal-dialog modal-full" >
        <div className="modal-content">
                <div className="overlay"></div>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
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
                        <li><a  href="#signUpTrainer"  data-toggle="modal" data-dismiss="modal" >Join as a Trainer</a></li>
                        <li><a  href="#signUpStudent"  data-toggle="modal" data-dismiss="modal" >Join as a Student</a></li>
                    </ul>
                </div>           
        </div>
    </div>
</div>

    </>);
}

export default LoginModal;