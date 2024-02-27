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
 }
 
class Applyspecialist extends React.Component {  

    constructor(props) {
        super(props);
        this.state = {
           name: "" ,
           surname : "",
           email: "" ,
           country :"",
           city:"",
           password:"",
           cpassword:"",
           newsletter:false,
           signupvalidation:false,
		   countryData : [],
		   cityData : [],
		   redirect:false,
           stdcode:"",
           mobilenumber:""
        }; 
     
		console.log('start'); 

      } 


	  componentDidMount() {
		axios.get(process.env.REACT_APP_BASE_URL+`/authenticationAPI/GetAllCountry`)
		.then(res => {

			this.setState({countryData : res.data});
		    console.log('countryData');
		    console.log(res.data);
		});  
	  }

	  countrydropdown(countryvalue){
		this.setState({ country: countryvalue});

		axios.get(process.env.REACT_APP_BASE_URL+`/authenticationAPI/GetAllCityByCountryID?country_id=`+countryvalue)
		.then(res => {
			this.setState({cityData : res.data});
		   // console.log(res.data);
		}); 
	  }
	 

    formvalidation =(e) => {
          e.preventDefault();   

		 // console.log(this.state);

          if(this.state.name==""){
             alert('Please enter first name.');
             return false;
          }
          if(this.state.surname==""){
            alert('Please enter surname.');
            return false;
         }

         if(this.state.email==""){
            alert('Please enter email.');
            return false;
         }

		 let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
		 if (reg.test(this.state.email) === false) {
			 alert('Please enter correct email.');
			  return false;
		 }

         if(this.state.country==""){
            alert('Please select country.');
            return false;
         }

         if(this.state.city==""){
            alert('Please select city.');
            return false;
         }

         if(this.state.mobilenumber==""){
            alert('Please enter mobilenumber.');
            return false;
         }

         if(this.state.password==""){
            alert('Please enter password.');
            return false;
         }

         if(this.state.cpassword==""){
            alert('Please enter confirm password.');
            return false;
         }

		  var Varnewsletter = 0;
		 if(this.state.newsletter){
             Varnewsletter = 1;
         }

         if(this.state.password!=this.state.cpassword){
            alert("Password didn't matched enter correct password");
            return false;
         } 

         if(this.state.signupvalidation==false){
            alert('Please choose singup.');
            return false;
         }
      
          const SpecialistData = {name :this.state.name , surname : this.state.surname, email : this.state.email , country : this.state.country , city : this.state.city , password:this.state.password,stdcode:this.state.stdcode,mobilenumber:this.state.mobilenumber,newsletter:Varnewsletter}
          console.log(SpecialistData);

	   axios.post(process.env.REACT_APP_BASE_URL+`/authenticationAPI/SpecialistRegistraion`,SpecialistData)
		.then(res => {
			 //this.setState({countryData : res.data});
		    console.log(res.data);
			//this.setState({redirect:true}); 
			if(res.data.Status)
			this.setState({redirect:true});
			else 
			alert(res.data.Message);

			
		}).catch(function (error) {
			console.log(error);
		  }); 


      }

	 

    render(){
		//console.log(this.state.countryData);
		if(this.state.redirect)
	    return	<Redirect to="/thanks"/>

        const { t } = this.props;
        return ( 
	       <div class="main-wrapper">  
	          <LoginHeader/> 
               
	<div class="content pb-0">
		<div class="">
			<div class="card border-0 mb-0">
				<div class="row border-bottom">
					<div class="col-md-6 col-6 text-right mb-3">
                        <a href="/login">Login</a></div>
					<div class="col-md-6 col-6 text-left text-danger mb-3">
						<a href="/register">
							<span class="reg-text">
								Apply Specialist
							</span>
						</a>
					</div>
				</div>
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

								<div class="col-md-6 col-lg-6 mt-5 mb-5">
                                            <h6 class="text-center">
											People are looking for the right Specialist on MedAloha
												<br/> Let’s take the first step and create an account	  
											</h6>
                                    <div class="login-right">
									<div class="row mb-4"> 
										<div class="col-md-6"> 
											<div class="login-header">
												<h3 class="color-cus1">Join <span class="font-weight-bold">MedAloha</span></h3>
											</div>
										</div> 
										<div class="col-md-6 register-sub"> 
											<h6>Already have an account? <a href="/login" class="text-primary">Login</a></h6> 
										</div> 
									</div>


									{/* <!-- Register Form --> */}
									<form  action="" method="POST"> 
										<div class="row">
											<div class="col-md-6">
												<lebel>Name</lebel>
												<div class="form-group form-focus focused">
													<input type="text" class="form-control"  placeholder="Name"  value={this.state.name}  onChange={(e)=> this.setState({ name: e.target.value})} />
													{/*<label class="focus-label">Name : </label>*/}
												</div>
											</div>
											<div class="col-md-6">
												<lebel>Surname</lebel>
												<div class="form-group form-focus focused">
													<input type="text" class="form-control"  placeholder="Surname" value={this.state.surname}  onChange={(e)=> this.setState({ surname: e.target.value})} /> 
												{/*	<label class="focus-label">Surname</label>*/}
												</div>
											</div>
										</div>


										<lebel>Email address</lebel>
										<div class="form-group form-focus focused">
											<input type="email" class="form-control" placeholder="Email" value={this.state.email}  onChange={(e)=> this.setState({ email: e.target.value})} />
											{/*<label class="focus-label">Email</label>*/}
										</div>
										<div class="row">
											<div class="col-md-6">
												<lebel>
													{/* <!--fa fa-street-view--> */}
													Country 			 
												</lebel>
												<div class="form-group form-focus">
													<select class="form-control"  onChange={(e)=> this.countrydropdown(e.target.value) }>
														<option>Select Country</option>
														{this.state.countryData.map( (country)=> (
														   <option value={country.id}>{country.name}</option> 
														))} 
													</select>

												</div>
											</div>
											<div class="col-md-6">
												<lebel>City</lebel>
												<div class="form-group form-focus">
													<select class="form-control" onChange={(e)=> this.setState({ city: e.target.value})}>
														<option>Select City</option>
														{this.state.cityData.map( (city)=> (
														   <option value={city.id}>{city.name}</option> 
														))} 
													</select> 
												</div>
											</div>
                                            </div>
                                            <div class="row">
												<div class="col-md-4 col-6">
													<lebel>Mobile Number</lebel>  
													<div class="form-group form-focus">
                                                            <select class="form-control"  onChange={(e)=> this.setState({ stdcode: e.target.value})}>
                                                            

                                                  
                                                            	{ this.state.countryData.filter(function (e) {
        return e.std_code_number > 0;
    }).map( (country)=> (


														   <option value={country.std_code_number}>{country.std_code_number}</option> 
														))} 
                                                            </select> 
													</div>
												</div>
                                                    <div class="col-md-8 col-6 pl"> 
                                                            <div class="form-group form-focus focused"> 
                                                                    <input type="number" class="form-control floating mar"  placeholder="Mobile Number" value={this.state.mobilenumber}  onChange={(e)=> this.setState({ mobilenumber: e.target.value})} />
                                                                    {/*<label class="focus-label"> Mobile Number</label>*/}
                                                                </div>
                                                        </div>
											</div>

									

										<lebel>Create Password</lebel>
										<div class="form-group form-focus focused">
											<input type="password" class="form-control"  placeholder="Password" value={this.state.password}   onChange={(e)=> this.setState({password: e.target.value})}   />
											{/*<label class="focus-label"> Password</label>*/}
										</div>
										<div class="form-group form-focus focused">
											<input type="password" class="form-control" placeholder="Confirm Password"  value={this.state.cpassword}   onChange={(e)=> this.setState({cpassword: e.target.value})} />
											{/*<label class="focus-label">Confirm Password</label>*/}
										</div>

										<div class="text-left">
											<input  class="v-a-m" type="checkbox" class=""  value="yes" onChange={(e)=> this.setState({ newsletter:e.target.checked})} />
											<span class="forgot-link1 ml-2" >Receive our newsletter</span>
										</div> 
										<div class="text-left mar-bot-5 dis"> <div>
											<input type="checkbox" class="v-a-m" value="yes" onChange={(e)=> this.setState({ signupvalidation: e.target.checked})} />
										</div>
										<div class="ml-2">
											<span class="forgot-link1 mb-0"> By signing up, I agree to </span> 

											<span class="forgot-link1"><a href="/privacy-policy" class="text-danger">Privacy Policy</a>,</span>


											<span class="forgot-link1">
												<a href="/cookie-policy" class="text-danger">Cookie Policy</a></span>

												<span class="forgot-link1"> & </span> <span class="forgot-link1" ><a href="/term-condition" class="text-danger">Terms and Conditions</a></span>
											</div>
										</div>
										<button class="btn btn-primary btn-block btn-lg login-btn" type="submit" onClick={this.formvalidation}>Register</button>
											 
										</form>
										{/* <!-- /Register Form --> */}
										
                                    
                                        </div>
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

export default withTranslation()(Applyspecialist);


 