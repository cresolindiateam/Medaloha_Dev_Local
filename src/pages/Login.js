import React , {Component,useEffect} from 'react';
//import { useTranslation } from 'react-i18next';
import { withTranslation } from 'react-i18next';
import i18n from "i18next";
// import settingLanguage from './helper';
import LoginHeader from './Components/LoginHeader';
import Footer from './Components/Footer';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
require('dotenv').config();

function settingLanguage(lang){ 
    i18n.changeLanguage(lang);  
	if(lang=='eng')
	{  var url = 'EN_last2.png'; 
	}  else  if(lang=='itanian'){
		var url = 'IT_last2.png';
	} else  if(lang=='spanis'){
		var url = 'ES_last2.png';
	} 
	settingLanguageOnchange(lang,url);
} 


function settingLanguageOnchange(lang,url){ 
	localStorage.setItem("onchangeLanguage",lang);
   // i18n.changeLanguage(lang);  
	localStorage.setItem("onchangeLanguageURL",url);
	//window.location.reload();
} 

 
class Login extends React.Component {  

	constructor(props) {
        super(props);
        this.state = {
           email: "" ,
           password : "",
		   redirect:false,
		   specialistredirect:false,
		   rememberMe:false,
		   specialistredirectBooking:false, 
		   redirectBooking:false,
		   reemail:'',
		   repassword:''

        }
    } 

	
	FindLanguageID(countryCode){
		axios.get(process.env.REACT_APP_BASE_URL+`/medalohaAPI/GetLanguageIdByCountryCode?countryCode=`+countryCode)
		.then(res => { 
			   settingLanguage(res.data.LanguageCode);
         });  
	 } 

	 handleChange = (event) => {
		const input = event.target;
		const value = input.type === 'checkbox' ? input.checked : ''; 

		console.log(input.checked);

		if(input.checked===false){
			 localStorage.setItem('repassword','');
			 localStorage.setItem('reemail','');
			 localStorage.setItem('rememberMe','');
			 this.setState({ 'rememberMe': '' });
		} else {
			this.setState({ 'rememberMe': value });
		} 
	  };

	  emailValue(e){  
		localStorage.setItem('reemail','');
		localStorage.setItem('rememberMe','');
		this.setState({ 'rememberMe': '' });
		this.setState({email: e.target.value}) ;
	  }

	 

	  passwordValue(e){
		localStorage.setItem('repassword',''); 
		 localStorage.setItem('rememberMe','');
		 this.setState({ 'rememberMe': '' });
		this.setState({password: e.target.value})
	  }
	 


	userlogin =(e) => {
		     e.preventDefault();    
			if(localStorage.getItem('rememberMe') === 'true')
			{
			  this.state.email=   localStorage.getItem('reemail');  
			}
			else
			{
				 if(this.state.email==""){
						alert('Please enter email.');
						return false;
					}

					let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
					if (reg.test(this.state.email) === false) {
						alert('Please enter correct email.');
					     return false;
					}

			}

			if(localStorage.getItem('rememberMe') === 'true')
			{
			  this.state.password=localStorage.getItem('repassword');  
			}
			else
			{
				if(this.state.password==""){
						alert('Please enter password.');
						return false;
					}

			}
			


 const rememberMe = this.state.rememberMe;
 
 localStorage.setItem('rememberMe', rememberMe);
   
 
   localStorage.setItem('reemail', rememberMe ? this.state.email : '');
   localStorage.setItem('repassword', rememberMe ? this.state.password : '');


   const rememberMe1 = localStorage.getItem('rememberMe') === 'true';
   const reemail = rememberMe1 ? localStorage.getItem('reemail') : '';
   const repassword = rememberMe1 ? localStorage.getItem('repassword') : '';
   
 
   this.setState({reemail:reemail});
   this.setState({repassword:repassword});
   this.setState({rememberMe1:rememberMe1});

   const clientData = { email : (this.state.rememberMe)?reemail:this.state.email ,  password:(this.state.rememberMe)?repassword:this.state.password}

		// const clientData = { email : this.state.email ,  password:this.state.password}

		 console.log(clientData);

         axios.post(process.env.REACT_APP_BASE_URL+`/authenticationAPI/ClientLogin`,clientData)
		 .then(res => {
			 //this.setState({countryData : res.data});
		    console.log(res.data);
			
			if(res.data.Status) 
			{
				localStorage.setItem("customer_id",res.data.MemberId);
				localStorage.setItem("ChatUniqueID",res.data.MemberId);
			
				localStorage.setItem("LoginName",res.data.LoginName);
			localStorage.setItem("LoginEmail",this.state.email);
				localStorage.setItem("CountryCode",res.data.CountryCode); 
				localStorage.setItem("UserTimezone",res.data.Timezone); 
				//settingLanguage(res.data.CountryCode);
				this.FindLanguageID(res.data.CountryCode);


			 if(res.data.UserImage!=null)
				localStorage.setItem("UserProfileImage",res.data.UserImage);
			  else 
				localStorage.setItem("UserProfileImage",'/assets/img/doctors/doctor-thumb-02.jpg');
			   

				if(res.data.Mobile!=null) 
				this.setState({redirectBooking:true}); 
				else 
				this.setState({redirect:true});   

			}
			else 
			alert(res.data.Message);
			
	  	}).catch(function (error) {
			console.log(error);
		  });  

		  
	}

	
	specialistlogin =(e) => {
		e.preventDefault();    
        	if(localStorage.getItem('rememberMe') === 'true')
			{
			  this.state.email=localStorage.getItem('reemail');  
			}
			else
			{
				  if(this.state.email==""){
						alert('Please enter email.');
						return false;
					}

					let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
					if (reg.test(this.state.email) === false) {
						alert('Please enter correct email.');
					     return false;
					}
					

			}

			if(localStorage.getItem('rememberMe') === 'true')
			{
			this.state.password=localStorage.getItem('repassword');  
			}
			else
			{
				if(this.state.password==""){
						alert('Please enter password.');
						return false;
					}

			}



 const rememberMe = this.state.rememberMe;
 localStorage.setItem('rememberMe', rememberMe);
 localStorage.setItem('reemail', rememberMe ? this.state.email : '');
 localStorage.setItem('repassword', rememberMe ? this.state.password : '');
 
  const rememberMe1 = localStorage.getItem('rememberMe') === 'true';
 const reemail = rememberMe1 ? localStorage.getItem('reemail') : '';
 const repassword = rememberMe1 ? localStorage.getItem('repassword') : '';
 
 this.setState({reemail:reemail});
 this.setState({repassword:repassword});
   this.setState({rememberMe1:rememberMe1});

   const clientData = { email : (this.state.rememberMe)?reemail:this.state.email ,  password:(this.state.rememberMe)?repassword:this.state.password}

 	// const clientData = { email : this.state.email ,  password:this.state.password}

		 console.log(clientData);

         axios.post(process.env.REACT_APP_BASE_URL+`/authenticationAPI/SpecialistLogin`,clientData)
		 .then(res => {
			 //this.setState({countryData : res.data});
		    console.log(res.data); 
			if(res.data.Status)
			 {  
				 localStorage.setItem("specialist_id",res.data.SpecialistId);
				 localStorage.setItem("ChatUniqueID",res.data.SpecialistId);
				 localStorage.setItem("LoginName",res.data.LoginName);
				 localStorage.setItem("CountryCode",res.data.CountryCode); 
				 localStorage.setItem("ConsulationMainLang",res.data.ConsulationMainLang); 
				 localStorage.setItem("SpecialistTimezone",res.data.Timezone); 
				 this.FindLanguageID(res.data.CountryCode); 
				 if(res.data.UserImage!=null)
				  localStorage.setItem("UserProfileImage",res.data.UserImage);
				else 
				  localStorage.setItem("UserProfileImage",'/assets/img/doctors/doctor-thumb-02.jpg');
				 
				 if(res.data.IntroId) 
				 this.setState({specialistredirectBooking:true}); 
				 else 
				 this.setState({specialistredirect:true}); 


			 }
			else 
			alert(res.data.Message);
			
	  	}).catch(function (error) {
			console.log(error);
		  });  
	}


	componentDidMount(){
		if(localStorage.getItem('rememberMe') === 'true')
			{
			  this.setState({rememberMe:localStorage.getItem('rememberMe')}) 
			}
	}

    render(){
        const { t } = this.props;
		if(this.state.redirect)
	    return	<Redirect to="/customerdashboard"/>

		if(this.state.redirectBooking)
	    return	<Redirect to="/customerdashboard?pat_message"/>
		
		if(this.state.specialistredirect)
	    return	<Redirect to="/privatesetting?pat_setting"/>

		if(this.state.specialistredirectBooking)
	    return	<Redirect to="/privatesetting?pat_appointments"/>



        return ( 
	<div class="main-wrapper">  
	 <LoginHeader/>
	   <div className="content pb-0">
		<div className="">
			<div className="card border-0 mb-0">
				<div className="row border-bottom">
					<div className="col-md-6 col-6 text-right text-danger mb-3 mr-0">
						<a href="/login"><span className="login-text font-weight-bold">Login</span></a>
					</div>
					<div className="col-md-6 col-6 text-left mb-3"><a href="/register">Register</a></div>
				</div>
			</div>

		</div>


		<div className="container-fluid bg-theme">
			<div className="row">
				<div className="col-md-12">
				 
					<div className="account-content">
						<div className="row align-items-center justify-content-center">
							<div className="col-md-6 col-lg-6 login-right login-right bg-white mt-5 mb-5">
								<div className="login-header">
									<h3 className="login-title color-cus1">Enter 
										<span className="font-weight-bold"> MedAloha</span>
									</h3>
								</div>
								<form action="" method="POST">
									<div className="form-group form-focus focused">
										<input type="email" className="form-control"     placeholder="Email" value={(localStorage.getItem('rememberMe')==='true')?localStorage.getItem('reemail'):this.state.email}    onChange={(e)=> this.emailValue(e)} />
										{/*<label className="focus-label">Email</label>*/}
									</div>
									<div className="form-group form-focus focused">
										<input type="password" className="form-control" placeholder="Password" value={(localStorage.getItem('rememberMe')==='true')?localStorage.getItem('repassword'):this.state.password}   onChange={(e)=> this.passwordValue(e)}  />
										{/*<label className="focus-label">Password</label>*/}
									</div>


									<div className="text-left rem-main-div">
										<a className="btn modal-trigger text-left w-100 pad-0" >
										<span>
										<input type="checkbox" checked={this.state.rememberMe}  onChange={this.handleChange}  id="remember" className="rem-me-input" /> 
											<label for="remember-me" className="color-cus-gray">Remember me</label>
										 </span>
                                        </a>

									</div>

									<div className="text-right for-main-div">

										<a className="btn modal-trigger pad-0" data-target="modal1">
											<span> 
												<label for="remember-me"  className="for-text fp font-weight-bold">Forgot Password ?</label>
											</span>
										</a>
									</div>
									<button className="btn btn-primary btn-block btn-lg login-btn" type="submit" onClick={this.userlogin}>Login User</button> 

									<button className="btn btn-primary btn-block btn-lg login-btn" type="submit" onClick={this.specialistlogin}>Login specialist</button>
									<div className="login-or">
										<span className="or-line"></span>
										<span className="span-or">or</span>
									</div>
										
											<div className="text-center dont-have">
												<h6>Don’t have an account? <a href="/register" className="text-danger">Register</a>
												</h6></div>
								 </form>
											<div id="modal1" className="modal">
												<div className="modal-content">
													<a href="#!" className=" text-right modal-action modal-close waves-effect waves-green btn-flat">Close</a>
													<h4 className="text-muted text-center">Forgot Password</h4>

													<p>Email*</p>
													<form>
														<div className="form-group form-focus focused">
															<input required type="email" className="form-control floating" />
															<label className="focus-label">Email</label>
														</div>
														<button className="btn btn-primary btn-block " type="submit">Submit</button>
													</form>

												</div>

											</div>  
										</div>



										<div className="col-md-6 col-lg-6 mb-5 hidden-sm hidden-xs">
											<center>
                                                <img src="assets\icon\olistica.png" className="img-fluid ml-5 w-25 mt-4" alt="" />	
											</center>
										</div>
									</div>
								</div>
								 
								
							</div>
						</div>
                        </div>
					</div>
               <Footer/>
	        </div> 
        )
    }

}

export default withTranslation()(Login);
