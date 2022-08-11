import React,{useEffect, useState, useContext} from "react";
import UserContext from './../contexts/UserContext'; 

const LoginModal = (props) => {

    const [loginResp, setLoginResp] = useState({success:false, message: ''});
    const [logining, setLogining] = useState(false);
    const {goLogin} = useContext(UserContext);

    const $ = window.$;
        
    useEffect(()=>{
        $('.modal').on('show.bs.modal', function (e) {
            $('.modal .modal-dialog').attr('class', 'modal-dialog modal-full  zoomIn  animated');
        });
        $('.modal').on('hide.bs.modal', function (e) {
            $('.modal .modal-dialog').attr('class', 'modal-dialog  zoomOut modal-full  animated');
        });
    },[]);

    const onLogin = (e) => {
        const frm = e.currentTarget;
        e.preventDefault();

        setLogining(true);

        setLoginResp({...loginResp, message: ''});

        const data = {
            email: frm.email.value,
            pass: frm.pass.value
        };

        goLogin(data,(success,message)=>{
            setLogining(false);
            setLoginResp({success: success, message: message});
            if(success){
                window.setTimeout(() => {window.location.reload();}, 2000);
            }
        })

        return false;
    }

    return(<>
    <div className="modal" id="loginModal" >
    <div className="modal-dialog modal-full" >
        <div className="modal-content">
                <div className="overlay"></div>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <img className="img-fluid" src="/assets/images/close-circle.png" />
                </button>
                {logining && <div className="alert alert-info p-5 m-5">
                    Trying to login...
                    <div className="progress">
                        <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" style={{"width": "100%"}}></div>
                    </div>
                </div>}
                {!logining && <div className="loginWrapper">
                    <h3>Log In to see <br /> the latest updates</h3>
                    {loginResp.message!=='' && <div className={`alert alert-${loginResp.success? 'info' : 'danger'} p-5`}>
                        {loginResp.message}
                        {loginResp.success && <div className="pt-3">Redirecting to your login area..</div>}
                    </div>}
                    <form onSubmit={onLogin}>
                        <div className="form-group">
                            <input className="form-control" name="email" placeholder="Email" type="text" />
                        </div>
                        <div className="form-group">
                            <input className="form-control" name="pass" placeholder="Password" type="password" />
                        </div>
                        <button type="submit" className="btn btnSubmit">Log In</button>                        
                    </form>
                    <p>Forgot password ? <a href="">Click here!</a></p>
                    <p>By signing up, you agree to our Terms of Use and Privacy Policy.</p>
                    <ul>
                        <li><a  href="#signUpTrainer"  data-toggle="modal" data-dismiss="modal" >Join as a Trainer</a></li>
                        <li><a  href="#signUpStudent"  data-toggle="modal" data-dismiss="modal" >Join as a Student</a></li>
                    </ul>
                </div>}           
        </div>
    </div>
</div>

    </>);
}

export default LoginModal;