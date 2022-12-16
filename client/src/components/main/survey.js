import React, { useRef, useEffect, useReducer, useContext } from 'react';
import Input from '../UI/input';
import { NavLink, useNavigate, useLocation, useParams } from "react-router-dom";
import useData from "../../hooks/useData";
import AuthContext from "../../store/authContext";
import HomeContext from "../../store/homeContext";
import Modal from "../UI/modal";
import homeReducer from "../../reducer/homeReducer";

function Survey()	{
	let isInitial = true;

	const { id } = useParams();
	console.log(id)
	console.log("id")
	const ctxUser = useContext(AuthContext);
	const ctxHome = useContext(HomeContext);
	const location = useLocation();

	const initialHomeState = { family_members:{}, error: false, errorMessage: []};
  const [homeState, dispatch] = useReducer(homeReducer, initialHomeState);
	
	const {fetchDataHandler: sendData, loading: homeLoading} = useData();
  
  const getAuthData = async(data) => {
  	console.log(data)
  	console.log("data")
  	if (data.error) {
  		dispatch({type: "SERVER_ERROR", error: true, errorMessage:data.error});
  		return;
  	}
  	if (!data.data) {
  		dispatch({type: "SERVER_ERROR", error: true, errorMessage:data.message})
  	}
  	if (data.status == "400") {
  		dispatch({type: "SERVER_ERROR", error: true, errorMessage:data.status.message})
  	}
  	if(data.length > 0){
  		await ctxHome.getSurveyByMember(data);
    	// navigateHandler('/');
  	}
  }

	useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    if(!isInitial) {
      if (ctxUser.id !== '') {
      	sendData(`${process.env.REACT_APP_SERVER_URL}api/v1/family_members/${id}`, {
	      method: 'GET',
			  headers: {
			    "Content-Type": "application/json",
			    Authorization: localStorage.getItem("token"),
			  },
			},
		  getAuthData);
      	// navigateHandler('/main');
      }
    }
  }, [homeState, sendData])

	return (
		<div>
			<h1>Survey</h1>
			{ctxHome.survey.length > 0 &&
				ctxHome.survey.map(sur =>
					<>
						<p>{sur.question_text}</p><br/>
					</>
				)
			}	
		</div>
	)
}

export default Survey;