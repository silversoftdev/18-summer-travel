import React, { useContext } from 'react';
import Button from '../UI/button';
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import AuthContext from "../../store/authContext";

function Setup({familyMemberState: {family :{first_name, last_name, email, id, token, notification}}})	{
	const ctxAuth = useContext(AuthContext);
	const navigate = useNavigate();
	const navigateHandler = (e) => {
		// navigate(e);
    ctxAuth.signup({"name": first_name+" "+last_name, "email": email, "id": id, "token": token, "notification":notification});

	}
	return (
		<div className="main-wrapper">
	    <div className="welcome-screens">
	      <div className="back-page p-4">
	        <a href="./index.html">
	          <div className="d-flex align-items-center">
	            <div><img src={require('../../assets/images/back-arrow.svg').default} className="img-fluid me-1" alt="" /></div>
	            <div className="back-text">Back</div>
	          </div>
	        </a>
	      </div>
	  
	      <div className="center-content mx-auto">
	        <div className="content-grid">
	          <div className="d-flex justify-content-center flex-column">
	            <h2 className="m-0">
	              Yay! You are all set!
	            </h2>
	            <h2>
	              You will now be able to return to where you left off in the survey!
	            </h2>
	            <div className="mt-4">
	              <Button classes="btn btn-primary" title="Continue" buttonClickHandler={() => navigateHandler('/')}/>
	            </div>
	          </div>
	          <div>
	            <img src={require('../../assets/images/welcome_registration.svg').default} className="img-fluid" alt="" />
	          </div>
	        </div>
	      </div>
	  
	      <div className="footer-links mt-5 px-3">
	        <div className="d-flex align-items-center">
	          <a href="./index.html" className="d-flex align-items-center me-4">
	            <div className="d-flex">
	              <img src={require('../../assets/images/home-icon.svg').default} className="img-fluid me-1" alt="" />
	            </div>
	            Home
	          </a>
	          <a href="" className="d-flex align-items-center">
	            <div className="d-flex">
	              <img src={require('../../assets/images/info-icon.svg').default} className="img-fluid me-1" alt="" />
	            </div>
	            Instructions
	          </a>
	        </div>
	      </div>
	    </div>
	  </div>

	)
}

export default Setup;