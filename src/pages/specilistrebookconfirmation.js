import React , {Component,useEffect} from 'react';
//import { useTranslation } from 'react-i18next';
import { withTranslation } from 'react-i18next';
import i18n from "i18next";
// import settingLanguage from './helper';
import LoginHeader from './Components/LoginHeader';
import Footer from './Components/Footer';
import axios from 'axios';
import { Redirect } from 'react-router-dom'
require('dotenv').config();


function settingLanguage(lang){ 
     i18n.changeLanguage(lang);
 }
 
class Register extends React.Component {  

    constructor(props) {
        super(props); 
       
      }  

      componentDidMount(){  
        const queryParams = new URLSearchParams(window.location.search);
         console.log(queryParams.get('str'));
		 console.log(queryParams.get('strMatch'));

		if(queryParams.get('str')!=null){
			axios.get(process.env.REACT_APP_BASE_URL+`/authenticationAPI/Specilistconfirmation`,{ params: { str: queryParams.get('str') } })
			.then(res => {
				//this.setState({cityData : res.data});
			   console.log(res.data);
			   if(res.data.Status){
				   window.location.href = '/'
			   }
			}); 
		}

		if(queryParams.get('strMatch')!=null){
			axios.get(process.env.REACT_APP_BASE_URL+`/authenticationAPI/SpecilistBookingconfirmation`,{ params: { str: queryParams.get('str') } })
			.then(res => {
				//this.setState({cityData : res.data});
			   console.log(res.data);
			   if(res.data.Status){
				   window.location.href = '/'
			   }
			}); 
		}
     
      }

    render(){
		//console.log(this.state.countryData); 
        const { t } = this.props;
        return ( 
	       <div class="main-wrapper">  
	          <LoginHeader/> 
               
	<div class="content pb-0">
		<div class="">
			<div class="card border-0 mb-0">
				 
			</div>

		</div>

		<div class="bg-theme">
			<div class="container-fluid">
				<div class="row">
					<div class="col-md-12">
						{/* <!-- Register Content --> */}
                        <div class="account-content">
							<div class="row align-items-center justify-content-center">
								<div class="col-md-6 col-lg-6 hidden-xs hidden-sm">
									<center>
										<img src="assets\icon\olistica.png" class="img-fluid  w-25 mt-245" alt="" />		
									</center>
								</div>

								<div class="col-md-6 col-lg-6 login-right mt-5 mb-5">
									<div class="row mb-4">
										<div class="col-md-6">
											<div class="login-header">
												<h3 class="color-cus1">Join <span class="font-weight-bold">MedAloha</span></h3>
											</div>
										</div>  
									</div>


								 
									<form action="doctor-dashboard.html">

										<div class="row">
										
										
										</div>


										
										
									

 <div class="jumbotron text-center bg-white">
  <h4 class="display-3" ><span class="text-green">Success</span> Thank You! for Registration</h4>
  <p class="lead"><strong>Please check your email</strong> for further instructions on how to complete your account setup.</p>
  <hr />
  <p>
    Having trouble? <a href="">Contact us</a>
  </p>
  <p class="lead">
    <a class="btn btn-primary btn-sm" href="http://medaloha.com/thanks.html" role="button">Login</a>
  </p> 								
</div>
 </form>
									 
										
									</div>
								</div>
							</div>
							{/* <!-- /Register Content --> */}

						</div>
					</div>
				</div>
			</div>

		</div>		
		{/* <!-- /Page Content --> */} 
        <Footer/>
    </div> 
        )
    }

}

export default withTranslation()(Register);
