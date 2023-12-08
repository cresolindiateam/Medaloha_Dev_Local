import React , {Component,useEffect} from 'react';
//import { useTranslation } from 'react-i18next';
import { withTranslation } from 'react-i18next';
import i18n from "i18next";
// import settingLanguage from './helper';
import LoginHeader from './Components/LoginHeader';
import Footer from './Components/Footer';
import axios from 'axios';
import { Redirect } from 'react-router-dom'

function settingLanguage(lang){ 
     i18n.changeLanguage(lang);
 }
 
class Register extends React.Component {  

    constructor(props) {
        super(props); 
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
										<img src="assets\icon\olistica.png" class="img-fluid  w-25 " alt="" />		
									</center>
								</div>

								<div class="col-md-6 col-lg-6 login-right mt-5 mb-5" style={{"boxShadow": "0 3px 10px rgb(0 0 0 / 0.2"}}>
									<div class="row mb-4">
										<div class="col-md-6">
											<div class="login-header">
												<h3 class="color-cus1">Join <span class="font-weight-bold">MedAloha</span></h3>
											</div>
										</div>  
									</div>


								 
									<form action="#">

										<div class="row">
										
										
										</div>


										
										
									

 <div class="jumbotron text-center bg-white thanksjumbo">
 <div class="text-primary mb-2 display-3"><strong>Success</strong></div>
  <h4 class="display-3" > Thank You! for Registration</h4>
  <p class="lead">Please check your email for further instructions on how to complete your account setup.</p>
  <hr />
  <p>
    Having trouble? <a href="/about">Contact us</a>
  </p>
  <p class="lead">
    <a class="btn btn-primary btn-sm" href="/login" role="button">Login</a>
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
