import React, { useRef, useEffect, useReducer, useContext } from 'react';
import Input from '../UI/Input';
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import useData from "../../hooks/useData";
import AuthContext from "../../store/auth-context";
import Modal from "../UI/Modal";
import loginReducer from "../../reducer/loginReducer";

let isInitial = true;

function Login(props) {
	const ctxAuth = useContext(AuthContext);
	const emailRef = useRef();
	const passwordRef = useRef();
	const navigate = useNavigate();
	const location = useLocation();
	
	const navigateHandler = (e) => {
		navigate(e);
	}

	const initialAuthState = { email: "", password:"", error: false, errorMessage: []};
  const [authState, dispatch] = useReducer(loginReducer, initialAuthState);
	
	const submitHandler = async(e) => {
    e.preventDefault();
    await dispatch({type:"SUBMIT", email: emailRef.current.value, password: passwordRef.current.value });
  }

  const {fetchDataHandler: sendData, loading: authLoading} = useData();
  const getAuthData = async(data) => {
  	if (data.error) {
  		dispatch({type: "SERVER_ERROR", error: true, errorMessage:data.error});
  		return;
  	}
  	if (!data.data) {
  		dispatch({type: "SERVER_ERROR", error: true, errorMessage:data.message})
  	}
  	else{
  		await ctxAuth.login({"name": data.data.firstname+" "+data.data.last_name, "email": data.data.email});
    	navigateHandler('/');
  	}
  }

	useEffect(() => {
		emailRef.current.focus();
    if (isInitial) {
      isInitial = false;
      return;
    }
    if(!isInitial) {
      if (!authState.error && authState.email !== '' && authState.password !== '') {
      	// https://546e799e-fed6-4bf3-8232-c0d30e244571.mock.pstmn.io/user/get
      	sendData(`${process.env.REACT_APP_SERVER_URL}users/sign_in`, {
	      method: 'POST',
			  body: JSON.stringify({"user":{"email":emailRef.current.value, "password":passwordRef.current.value}}),
			  headers: {
			    'Content-Type': 'application/json',
			    'x-mock-match-request-body': true,
			  }
			},
		  getAuthData);
      	// navigateHandler('/main');
      }
    }
  }, [authState, sendData])


	return (
		<section id="content" className="bg-info dker wrapper-md animated fadeInUp" style={{"height":"100vh"}}>    
	    {authLoading && <Modal>Please Wait ...</Modal>}
	    <div className="container aside-xl">
	      <section className="m-b-lg">
	        <header className="wrapper text-center">
	          <strong>
	          	Sign in
	          </strong>
	        </header>
	        <form onSubmit={submitHandler}>
		        {authState.error && 
	            <ul className="text-danger list-group">
	              {authState.errorMessage.map((eachMessage, index) => (
	                <li className="list-group-item list-group-item-danger" key={index}>{eachMessage}</li>
	                ))}
	            </ul>
	          }
	        	<Input ref={emailRef} input={{"type":"email", "placeholder":"Email", 
	        		"className":"form-control rounded input-lg text-center no-border"}}/>
	        	<Input ref={passwordRef} input={{"type":"password", "placeholder":"Password",
	        		 "className":"form-control rounded input-lg text-center no-border"}}/>
	          <button type="submit" 
	          	className="btn btn-lg btn-warning lt b-white b-2x btn-block btn-rounded">
	          	<i className="icon-arrow-right pull-right"></i><span className="m-r-n-lg">Sign in</span>
          	</button>
	          <div className="text-center m-t m-b">
	          	<NavLink to="/forgot">
	          		<small>Forgot password?</small>
	          	</NavLink>
          	</div>
	          <div className="line line-dashed"></div>
	          <p className="text-muted text-center"><small>Do not have an account?</small></p>
	          <NavLink className="btn btn-lg btn-info btn-block rounded" to="/signup">
	          	Create an account
          	</NavLink>
	        </form>
	      </section>
	    </div>
	  </section>
	)
}

export default Login;