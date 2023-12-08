import React, {Component} from 'react';
import { withTranslation } from 'react-i18next';
import i18n from "i18next";

import axios from 'axios';
function settingLanguage(lang){ 
	i18n.changeLanguage(lang);
}




function settingLanguageOnchange(lang,url){ 
	localStorage.setItem("onchangeLanguage",lang);
    i18n.changeLanguage(lang);  
	localStorage.setItem("onchangeLanguageURL",url);
	window.location.reload();
} 

class CustomerHeader extends React.Component{
   constructor(props) {
	   super(props);
   

	   this.state = {
	   
			reviewCount:0,
			favCount:0,
			bookingCount:0,

	   } 
	
   }
   logOut=(e)=>{ 
	   var remme=localStorage.getItem('rememberMe');
	   var reemail=localStorage.getItem('reemail');
	   var repass=localStorage.getItem('repassword'); 
	  // localStorage.clear(); 

	    window.localStorage.clear();
	
	  settingLanguageOnchange('eng','EN_last2.png');
	  


	   localStorage.setItem('rememberMe',remme); 
	   localStorage.setItem('reemail',reemail);   
	   localStorage.setItem('repassword',repass); 
	   window.location.reload();
	   window.location.href ="/";

   } 



 
  // fetch notification from db
notifications() {

	this.setState(state => ({
		 seconds: state.seconds + 1
	   }));

	   console.log(localStorage.getItem('specialist_id'))
	   console.log(localStorage.getItem('customer_id'))

	if(localStorage.getItem('specialist_id')){ 
		axios.get(process.env.REACT_APP_BASE_URL+`/specilistAPI/specialistNotifications?specialist_id=`+localStorage.getItem('specialist_id'))
	   .then(res => {
	        console.log('res.data')
		   //console.log(res.data.Data.BookingData[0].booking_history_id)
		   console.log('notification')

		    console.log('notification1')
		  
		   //this.setState({reviewCount : res.data.Data.length});  
	   if(res.data.Data[0]!=undefined || res.data.Data[0]!=null)
	   { 


			 var review_id=res.data.Data[0].review_id;
			   if(window.location.search=='?pat_review'){ 
				   axios.get(process.env.REACT_APP_BASE_URL+`/specilistAPI/SpecialistReadReviewNotification?review_id=`+review_id)
				   .then(res => {
					   console.log('res.data')
					   console.log(res.data)
					   console.log('update read status for review notification');
				   }); 
			   } else {
				   this.setState({reviewCount : res.data.Data.length});
		}  
	}

   this.setState({favCount : res.data.favData.length}); 
   if(res.data.bookingData[0]!=undefined ||  res.data.bookingData[0]!=null)
   {

   	console.log("booking data on tab");
	   var booking_history_id=res.data.bookingData[0].booking_history_id;
	   if(window.location.search=='?pat_appointments'){ 
	   axios.get(process.env.REACT_APP_BASE_URL+`/specilistAPI/SpecialistReadBookingNotification?history_id=`+booking_history_id)
	   .then(res => {
		   console.log('res.data');
		   console.log(res.data)
		   console.log('update read status notification'); 
	   });
	   } else{ 
		   this.setState({bookingCount : res.data.bookingData.length});
	   } 
	   }
 });  // End of specialist

}

// start for users notifications
if(localStorage.getItem('customer_id')){ 
   axios.get(process.env.REACT_APP_BASE_URL+`/specilistAPI/userNotifications?user_id=`+localStorage.getItem('customer_id'))
  .then(res => {
  console.log('res.data')
	  //console.log(res.data.Data.BookingData[0].booking_history_id)
	  console.log('notification')
	  //this.setState({reviewCount : res.data.Data.length}); 

  if(res.data.Data[0]!=undefined || res.data.Data[0]!=null)
  { 
		  var review_id=res.data.Data[0].review_id;
		  if(window.location.search=='?pat_review'){ 
			  axios.get(process.env.REACT_APP_BASE_URL+`/specilistAPI/UserReadReviewNotification?review_id=`+review_id)
			  .then(res => {
				  console.log('res.data')
				  console.log(res.data)
				  console.log('update read status for review notification');
			  }); 
		  } else {
			  this.setState({reviewCount : res.data.Data.length});
		  }  
  }


this.setState({favCount : res.data.favData.length}); 
if(res.data.bookingData[0]!=undefined ||  res.data.bookingData[0]!=null)
{
console.log("booking tab")

  var booking_history_id=res.data.bookingData[0].booking_history_id;
  if(window.location.search=='?pat_appointments'){ 
  axios.get(process.env.REACT_APP_BASE_URL+`/specilistAPI/UserReadBookingNotification?history_id=`+booking_history_id)
  .then(res => {
	  console.log('res.data');
	  console.log(res.data)
	  console.log('update read status notification'); 
  });
  } else{ 
	  this.setState({bookingCount : res.data.bookingData.length});
  } 
  }
});  // End of specialist

}


 }


	componentDidMount() {

	 console.log("test18dec"); 
 this.interval = setInterval(() => this.notifications(), 1000);
 this.interval = setInterval(() => this.runScriptMethods(), 2000); 

 }

   runScriptMethods(){
 console.log("alignment");
var alignP=0;

for(var i=0; i<document.getElementsByClassName("has-badge-data").length;i++){
alignP += parseInt(document.getElementsByClassName("has-badge-data")[i].getAttribute("data-count"));
}



if(document.getElementById("total_count")!=null){
document.getElementById("total_count").setAttribute('data-count',alignP);
}


}

   render(){ 
	   const { t } = this.props;
	   var ct_id = 	localStorage.getItem('customer_id');
	   var sp_id = 	localStorage.getItem('specialist_id');




	   var triggerValue = false;

	   if (ct_id!=null || sp_id!=null){
		   triggerValue  = true;
	   }

	   var bookingpage = '';

	   if(ct_id!=null){
		   bookingpage='/customerdashboard';
	   }

	   if(sp_id!=null){
		   bookingpage='/privatesetting';
	   }


return (
<header class="header">
		   <nav class="navbar navbar-expand-lg header-nav bg-white">
			   <div class="row w-100">
				   <div class="col-md-3 col-3">
					   <div class="navbar-header pt-2 hidden-xs hidden-sm">
						   <a class="mt-5" id="mobile_btn" href="javascript:void(0);">
							   <span class="bar-icon">
								   <span></span>
								   <span></span>
								   <span></span>
							   </span>
						   </a>
						   <a href="/" class="hidden-xs hidden-sm navbar-brand logo">
							   <img src="\assets\img\logo.png" class="img-fluid" alt="Logo" style={{'height':'65px'}} />
						   </a>
					   </div>

					   <div class="navbar-header mt-5 hidden-md hidden-lg">
						   <a class="" id="mobile_btn" href="javascript:void(0);">
							   <span class="bar-icon">
								   <span></span>
								   <span></span>
								   <span></span>
							   </span>
						   </a>
						   <a href="/" class="hidden-xs hidden-sm navbar-brand logo">
							   <img src="\assets\img\logo.png" class="img-fluid" alt="Logo" style={{'height':'65px'}}/>
						   </a>
					   </div>
				   </div>

				   <div class="col-md-5 col-5 mt-2">
					   <center>
						   <a href="/" class="menu-logo hidden-lg hidden-md"  > 
							   <img src="\assets\img\logo.png" class="mt-1  img-fluid" alt="Logo" style={{'height':'65px'}} />
						   </a>
					   </center>
				   </div>

				   <div class="col-md-4 col-4 pr-0 pt-2">
					   <ul class="nav d-flex header-navbar-rht float-right">
					   {triggerValue==false ?
						   <li class="nav-item hidden-xs hidden-sm">
							   <button class="nav-link header-login btn btn-success bg-transparent text-dark">
								   <a href={process.env.REACT_APP_URL+"/login"} class="">LOGIN</a> /
								   <a href={process.env.REACT_APP_URL+"/register"} class="">REGISTER </a>
							   </button>
						   </li> : <li class="nav-item dropdown has-arrow logged-item">
							   <a href="#" class="dropdown-toggle nav-link" data-toggle="dropdown" aria-expanded="true"> 
								   <span class="user-img">
									   <span class="fa-stack2 fa-1x has-badge"  id="total_count" data-count="0"> </span>
									   <img class="rounded-circle" src={localStorage.getItem('UserProfileImage')} width="31" alt="Darren Elder" /> 
								   </span>
							   </a> 
							   <div class="dropdown-menu dropdown-menu-right">
								   <div class="user-header"> 
									   <div class="user-text text-left">
										   <h6 class="color1">{localStorage.getItem('LoginName')}</h6>
											 {sp_id!=null ?
											   <p class="text-muted mb-0">Specialist</p> 
											  : null 
											 }
									   </div>
								   </div> 
								   <a class="dropdown-item" href={bookingpage+"?pat_setting"}>
									   <i class="fas fas1 fa-user-cog margin-right-6" ></i>
									   <span>Settings</span>  
								   </a>
								   <a class="dropdown-item" href={bookingpage+'?pat_appointments'}>
									   <i class="fas fas1 fa-calendar-check fa-stack fa-1x has-badge margin-right-6 has-badge-data" data-count={this.state.bookingCount}></i><span>Bookings</span>  
								   </a>
								   <a class="dropdown-item" href={bookingpage+"?pat_message"}>

									   <i class="fas fas1 fa-comments fa-stack fa-1x  margin-right-6 "  ></i><span>Messages</span>

								   </a>
				   {/*				<a class="dropdown-item" href="#"><i  class="fas fas1 fa-heart margin-right-6"></i><span>Favourites</span>

								   </a>*/}
								   <a class="dropdown-item" href={bookingpage+'?pat_review'}> 
									   <i class="fas fas1 fa-star fa-stack fa-1x has-badge margin-right-6 has-badge-data" data-count={this.state.reviewCount}></i><span >Reviews</span> 
								   </a>
								   <a class="dropdown-item" href="#" onClick={this.logOut}><i class="fas fas1 fa-sign-out-alt margin-right-6" ></i><span>LOGOUT</span>
								   </a>
							   </div>
						   </li> 

						   
					  } 		
					   </ul>

				   </div>

			   </div>

			   <div id="modal1" class="modal">
				   <div class="modal-content">
					   <a href="#!" class=" text-right modal-action modal-close waves-effect waves-green btn-flat">Close</a>
					   <h4 class="text-muted text-center">Notification</h4>

					   <div>
						   <h5> Notification for Specialist Booking</h5>
						   <p> Session 10-11 Booked by demo User of Specialist Test</p>
					   </div>

					   <div>
						   <h5> Notification for Cancel Booking</h5>
						   <p> Session 10-11 Booked by Demo User of Specialist Test</p>
					   </div>
					   <button class="btn btn-primary btn-block " type="submit">All</button>

				   </div>

			   </div> 


			   <div class="main-menu-wrapper">
				   <div class="menu-header">
					   <a href="/" class="menu-logo">
						   <img src="\assets\img\logo.png" class="img-fluid" alt="Logo"  style={{'height':'60px'}} />
					   </a>
					   <a id="menu_close" class="menu-close" href="javascript:void(0);">
						   <i class="fas fa-times"></i>
					   </a>

				   </div>

				   {/* <!--Mobile Menu--> */}



				   <ul class="main-nav">
					   <li class="login-link">
						   <div class="d-flex p-2 "> 
							   <a class="ml-4" href="#"> 
								   <img src="/assets/icon/EN_last2.png " alt="User Image" class="width-46"/>
							   </a>


							   <a class="ml-4" href="#"> 
								   <img src="/assets/icon/IT_last2.png" alt="User Image" class="width-47"/>
							   </a>

							   <a class="ml-4" href="#"> 
								   <img src="/assets/icon/ES_last2.png" alt="User Image" class="width-48 margin-top-1"/>
							   </a>
						   </div>
					   </li> 
						 <li class="login-link testdemo"> 
						   <a href="/"> <img class="width-26 padding-left-2 margin-top-4" src="/assets/images/choose-white.png" /><span class="margin-left-12">Choose</span></a>
						   </li>
						   <li class="login-link"> 
								 <a href="/howitworks">
								   <img class="width-27" src="/assets/images/how-white.png" />
								   <span class="margin-left-10">How</span>
								   </a>
							   </li>

							   <li class="login-link">

								   <a href="/about"> <img class="width-26 padding-left-2" src="/assets/images/about-white.png" /><span class="margin-left-12">Extra</span></a> 
							   </li>

{/*
							   <li class="login-link"> 

								   <a href="/login"> <img class="width-26 padding-left-2" src="/assets/images/about-white.png" /><span class="margin-left-16">FAQ</span></a> 
							   </li>
*/}
							   <li class="login-link">
								   <a href={bookingpage+'?pat_appointments'}><span class="margin-left-5"><i class="fas fa-calendar-check text-center width-28"  style={{"fontSize":"20px"}}></i></span><span class="
									   margin-left-16">Bookings</span></a>
								   </li>



								   <li class="login-link">
									   <a href={bookingpage+'?pat_message'}><span><i class="fas fa-comments text-center width-28" style={{"fontSize":"20px"}}></i></span><span class="
										   margin-left-16">Messages</span></a>
									   </li>
									   {/*<li class="login-link">
										   <a href="login.html"><span><i class="fas fa-heart text-center width-28"></i></span><span class="
											   margin-left-13
											   ">Favourites</span></a>
										   </li>*/}
										   <li class="login-link">
											   <a href={bookingpage+'?pat_review'}><span><i class="fas fa-star text-center width-28" style={{"fontSize":"20px"}}></i></span><span class="
												   margin-left-16">Reviews</span></a>
											   </li>

											   <li class="login-link">
												   <a href={bookingpage+'?pat_setting'}> 

													   <span ><i class="fas fa-user-cog text-center width-28" style={{"fontSize":"20px"}}></i></span><span class="
													   margin-left-13
													   ">Settings</span></a>
												   </li>
												   <li class="login-link">
													   <a href="#" onClick={this.logOut}><span><i class="fas fas1 fa-sign-out-alt text-center width-28" style={{"fontSize":"20px"}}></i></span><span class="
														   margin-left-16
														   ">LOGOUT</span></a>
													   </li>

												   </ul>	 
												   {/* <!--End Mobile Menu--> */}
											   </div>		 


										   </nav>
	   </header>    
		   )
   }
}

export default withTranslation()(CustomerHeader);