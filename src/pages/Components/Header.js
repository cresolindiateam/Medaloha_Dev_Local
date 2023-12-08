import React, {Component} from 'react';
import { useLocation } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import i18n from "i18next";
import { Redirect} from 'react-router-dom';
import axios from 'axios';
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
    i18n.changeLanguage(lang);  
	localStorage.setItem("onchangeLanguageURL",url);
	window.location.reload();
} 

class Header extends React.Component{   
	constructor(props) {
		super(props);
		this.state = {
			chooseImageURL : '/assets/images/choose-gray.png',
			howImageURL : '/assets/images/how-gray.png',
			extraImageURL : '/assets/images/about-gray.png', 
			chooseClass: 'nav d-flex header-navbar-rht justify-content-center',
			howClass: 'nav d-flex header-navbar-rht justify-content-center bor-0',
			extraClass: 'nav d-flex header-navbar-rht justify-content-center bor-0',
			chooseTextClass:'text-muted1 choose_icon_size',
			howTextClass:'text-muted1 how_icon_size',
			extraTextClass:'text-muted1 about_icon_size',
			reviewCount:0,
			 favCount:0,
			 bookingCount:0, 
		} 
	 
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

//  notification counting 
  runScriptMethods(){
	console.log("alignment");
     var alignP=0; 
    for(var i=0; i<document.getElementsByClassName("has-badge-data").length;i++){
      alignP += parseInt(document.getElementsByClassName("has-badge-data")[i].getAttribute("data-count"));
     }  
    if(document.getElementById("total_count")!=null){
		if(alignP!=0)
        document.getElementById("total_count").setAttribute('data-count',alignP);
    }  
   console.log(alignP); 
  }

FindLanguageID(countryCode){
		axios.get(process.env.REACT_APP_BASE_URL+`/medalohaAPI/GetLanguageIdByCountryCode?countryCode=`+countryCode)
		.then(res => { 
			   settingLanguage(res.data.LanguageCode);
         });  
	} 

	componentDidMount(){

		var ct_id = localStorage.getItem('customer_id');
        var sp_id = localStorage.getItem('specialist_id'); 
		//settingLanguageOnchange('eng','EN_last2.png'); 
		var onchangeLanguage = localStorage.getItem('onchangeLanguage');  
		var triggerValue = true; 
		if (ct_id!=null || sp_id!=null){
			triggerValue  = false;
		} 
        if(triggerValue){ 
			if(onchangeLanguage==null){
				axios.get(`http://ip-api.com/json/`)
				.then(res => {
					  console.log(res.data.countryCode); 
					  this.FindLanguageID(res.data.countryCode); 
				 });  
			} 
		}  

		// Notification calling 
		this.interval = setInterval(() => this.notifications(), 1000);

	   // Notification counting 
        this.interval = setInterval(() => this.runScriptMethods(), 2000);


	}

	componentWillMount(){
 

		if(window.location.pathname=="/"){ 
			this.setState({chooseImageURL:'/assets/images/choose1-blue.png'});
			this.setState({chooseClass:'nav d-flex header-navbar-rht justify-content-center nav-inner-ul'});
			this.setState({chooseTextClass:'choose_icon_size'});
	
		} 


		if(window.location.pathname=="/howitworks"){ 
			this.setState({howImageURL:'/assets/images/how1-blue.png'});
			this.setState({howClass:'nav d-flex header-navbar-rht justify-content-center nav-inner-ul'});
			this.setState({howTextClass:'how_icon_size'});
	
		} 

		if(window.location.pathname=="/about"){ 
			this.setState({extraImageURL:'/assets/images/contacts1-blue.png'});
			this.setState({extraClass:'nav d-flex header-navbar-rht justify-content-center nav-inner-ul'});
			this.setState({extraTextClass:'about_icon_size'});
	
		} 
	}

	
	logOut=(e)=>{
		window.localStorage.clear();
		window.location.reload();
		settingLanguageOnchange('eng','EN_last2.png');
		window.location.href ="/"
	} 

    render(){ 
        const { t } = this.props;  
		var ct_id = localStorage.getItem('customer_id');
        var sp_id = localStorage.getItem('specialist_id');
		console.log(ct_id);	console.log(sp_id);
		var triggerValue = false; 
		if (ct_id!=null || sp_id!=null){
			triggerValue  = true;
		} 
		console.log(triggerValue); 
		var bookingpage = ''; 
		if(ct_id!=null){
			bookingpage='/customerdashboard';
		}

		if(sp_id!=null){
			bookingpage='/privatesetting';
		}



		
        return (

			
            <React.Fragment>
		  <div class="main-wrapper">  
               <header class="header hidden-xs hidden-sm border-bottom header-sec"> 
         <div class="row hidden-xs hidden-sm logo-sec">
			<div class="col-md-3 col-2 pr-0 logo-inner">
				<a href="/">
					<img src="\assets\img\logo.png"   style={{'height':'65px'}} class="img-fluid" alt="Logo1" />
				</a>
			</div>
			<div class="col-md-5">
				<div class="row">
					<div class="col-md-4 col-4 nav-inner">
						<ul class={this.state.chooseClass} >
							<li class="nav-item">
								<a class="nav-link header-login border-0 nav-inner-li" href="/" >
									<img src={this.state.chooseImageURL}  class="img-fluid choose_icon" alt="choose" />&nbsp;&nbsp;
									<span class={this.state.chooseTextClass}>{t('Choose')}</span>
								</a>
							</li>
						</ul>
					</div>
					<div class="col-md-4 col-4 nav-inner" >
						<ul class={this.state.howClass}>
							<li class="nav-item">
								<a class="nav-link header-login border-0 how_section_top" href="/howitworks"   onmouseover="hover();" onmouseout="unhover();">
									<img src={this.state.howImageURL}  class="img-fluid how_icon " alt="how"  />&nbsp;&nbsp;
									<span class={this.state.howTextClass} >{t('How')}</span>
								</a>
							</li>
						</ul>
					</div>
				
						 <div class="col-md-4 col-4 nav-inner" >
						 	<ul class={this.state.extraClass}>
						 		<li class="nav-item">
						 			<a onmouseover="hover1();" onmouseout="unhover1();" class="nav-link    border-0 nav-inner-li about_section_top" href="/about">
									  <img src={this.state.extraImageURL}  class="img-fluid about_icon " alt="contacts" />&nbsp;&nbsp; 
									  <span class={this.state.extraTextClass} >{t('Extra')}</span>
									</a>
								</li>
							</ul>
						</div>
					</div></div>
					<div class="col-md-4 col-4 ">
						<ul class="nav d-flex flex-content header-navbar-rht ">
						{triggerValue==false ?
							<li class="nav-item hidden-xs hidden-sm ">
								<button  class="nav-link header-login btn btn-success bg-transparent text-dark spanish-section-1 header-login" >
									<a href={process.env.REACT_APP_URL+"/login"} class="">LOGIN</a> <span class="text-muted">| </span>
									<a href={process.env.REACT_APP_URL+"/register"}  class="">REGISTER </a>
								</button>
							</li> : 
							<li class="nav-item dropdown has-arrow logged-item m-t-9">
								<a  href="#" class="pad-0 dropdown-toggle nav-link" data-toggle="dropdown" aria-expanded="false">
									<span class="user-img">
								        <span class="fa-stack2 fa-1x has-badge"  id="total_count" > </span>
										<img class="rounded-circle" src={localStorage.getItem('UserProfileImage')} width="31" alt="Darren Elder" />
									</span>
								</a>
								<div class="dropdown-menu dropdown-menu-right">
									<div class="user-header"> 	
										<div class="user-text">
											<h6 class='color1'>{localStorage.getItem('LoginName')}</h6>
											  {sp_id!=null ?
											   <p class="text-muted mb-0">Specialist</p> 
											  : null 
											  }
										</div>
									</div>
									<a class="dropdown-item" href={bookingpage+'?pat_setting'} >
										<i class="fas fas1 fa-user-cog" style={{marginRight:'6px'}}></i>
										<span>Settings</span>  
                                    </a>
									<a class="dropdown-item" href={bookingpage +'?pat_appointments'}>
										<i class="fas fas1 fa-calendar-check fa-stack fa-1x has-badge has-badge-data" style={{marginRight:'6px'}} data-count={this.state.bookingCount}>
										</i>
									    <span>Bookings</span> 
									 </a> 
									<a class="dropdown-item" href={bookingpage+'?pat_message'}>
                                      <i class="fas fas1 fa-comments fa-stack fa-1x "  style={{marginRight:'6px'}}></i>
                                      <span>Messages</span>
								   </a> 
									
									<a class="dropdown-item" href={bookingpage+'?pat_review'}>
                                      <i class="fas fas1 fa-star fa-stack fa-1x has-badge has-badge-data" data-count={this.state.reviewCount} style={{marginRight:'6px'}}></i>
	                                   <span>Reviews</span>
								    </a>
									
								

									<a class="dropdown-item" onClick={this.logOut}  href="#">
									<i class="fas fas1 fa-sign-out-alt" style={{marginRight:'6px'}}></i>
									<span>LOGOUT</span>
								 
								</a>
								</div>
							</li>

		}


							<li class="nav-item dropdown has-arrow has-arrow1 logged-item hidden-xs hidden-md m-t-9">
								<a href="#" class="dropdown-toggle nav-link" data-toggle="dropdown" aria-expanded="false">
									<span class="user-img user-img1">
										<img src={"/assets/icon/"+localStorage.getItem('onchangeLanguageURL')} id="SelectedLanguage" alt="User Image" class="avatar-img width-45" />
									</span>
								</a> 
								<div class="dropdown-menu dropdown-menu-right min-width-70" > 
									<a class="dropdown-item" href="#" onClick={()=>settingLanguageOnchange('eng','EN_last2.png')}>
										<span class="user-img user-img1">
											<img src="/assets/icon/EN_last2.png" alt="User Image" class="width-45" />
										</span>
									</a>
									<a class="dropdown-item" href="#" onClick={()=>settingLanguageOnchange('itanian','IT_last2.png')}> 
										<span class="user-img user-img1">
											<img src="/assets/icon/IT_last2.png" alt="User Image" class="width-46" />
										</span>
									</a> 
									<a class="dropdown-item" href="#" onClick={()=>settingLanguageOnchange('spanis','ES_last2.png')}>
										<span class="user-img user-img1">
											<img src="/assets/icon/ES_last2.png" alt="User Image" class="width-46" />
										</span>
									</a> 
								</div>
							</li>
						</ul> 
			 </div> 
      </div>  
</header> 
           </div>
<header class="header">
	<nav class="navbar navbar-expand-lg header-nav hidden-md hidden-lg bg-white" >
		<div class="row w-100 marg-0" >
			<div class="col-md-3 col-3">
				<div class="navbar-header mt-5">
					<a id="mobile_btn" href="javascript:void(0);">
						<span class="bar-icon">
							<span></span>
							<span></span>
							<span></span>
						</span>
					</a>

				</div>
			</div>

			<div class="col-md-6 col-6 hidden-lg hidden-md mt-3">
				<center>
					<a href="/" class="menu-logo hidden-lg hidden-md">
						<img src="\assets\img\logo.png" class=" img-fluid" alt="Logo" style={{"height":"55px"}} />
					</a>
				</center> 
			</div> 
			<div class="col-md-3 col-3 pr-1 pt-1 hidden-md hidden-lg">
				<ul class="nav d-flex header-navbar-rht float-right"> 
				{localStorage.getItem('customer_id')==null ?	
					<li class="nav-item hidden-xs hidden-sm">
						<button class="nav-link header-login btn btn-success bg-transparent text-dark spanish-section-1">
							<a href="/login" class="">LOGIN</a> /
							<a href="/register" class="">REGISTER </a>
						</button>
					</li>:  
					<li class="nav-item dropdown has-arrow logged-item">
						<a href="#" class="dropdown-toggle nav-link" data-toggle="dropdown" style={{marginRight: '-20px !important'}}>
							<span class="user-img">
								<img class="rounded-circle" src="\assets\img\doctors\doctor-thumb-02.jpg" width="31" alt="Darren Elder" />
							</span>
						</a>
						<div class="dropdown-menu dropdown-menu-right">
							<div class="user-header">
								<div class="avatar avatar-sm">
									<img src="\assets\img\doctors\doctor-thumb-02.jpg" alt="User Image" class="avatar-img rounded-circle" />
								</div>
								<div class="user-text">
									<h6>Ellisa Alloa</h6>
									<p class="text-muted mb-0">Specialist</p>
								</div>
							</div>
							<a class="dropdown-item" href="personal-profile.html">
								<i class="fas fa-user-cog"></i> &nbsp; Settings 
							</a>
							<a class="dropdown-item" href="personal-profile.html"><i class="fas fa-calendar-check"></i>&nbsp; Bookings
							</a>
							<a class="dropdown-item" href="personal-profile.html"><i class="fas fa-comments"></i> &nbsp; Messages

							</a>
							<a class="dropdown-item" href="personal-profile.html"><i class="fas fa-heart"></i> &nbsp; Favourites

							</a>
							<a class="dropdown-item" href="personal-profile.html"><i class="fas fa-star"></i> &nbsp; Reviews

							</a>
							<a class="dropdown-item" href="#" onClick={this.logOut}><i class="fas fa-sign-out-alt"></i>&nbsp; LOGOUT

							</a>
						</div>
					</li>
	           }
				</ul>
				
				

			</div>

		</div>



		<div class="main-menu-wrapper">
			<div class="menu-header">
				<a href="index.html" class="menu-logo">
					<img src="\assets\img\logo.png"  style={{"height":"55px"}} class="img-fluid" alt="Logo1" />
				</a>
				<a id="menu_close" class="menu-close" href="javascript:void(0);">
					<i class="fas fa-times"></i>
				</a>

			</div>

		 
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

{(triggerValue==false)?
        						<li class="login-link">
        							<a href="/login">LOGIN / REGISTER</a>
        						</li>:""}

        						<li class="login-link">
        							<a href="/"><img class="width-26 padding-left-2 margin-top-4" src="/assets/images/choose-white.png" /><span class="margin-left-12">Choose</span></a>
        						</li>
        						<li class="login-link">
        							<a href="/howitworks"><img class="width-27" src="/assets/images/how-white.png" /><span class="margin-left-12">How</span></a>
        						</li>
						
							<li class="login-link"> 
								<a href="/about"><img class="width-26 padding-left-2" src="/assets/images/about-white.png" /><span class="margin-left-12">Extra</span></a>
							</li>

						{/*	<li class="login-link">

								<a href="about.html#faq">FAQ</a>
							</li>*/}

                {(triggerValue==true)?
							  <li class="login-link">
								   <a href={bookingpage+'?pat_appointments'}><span class="margin-left-5"><i class="fas fa-calendar-check text-center width-28" style={{"fontSize":"20px"}}></i></span><span class="
									   margin-left-16">Bookings</span></a>
								   </li>:""}
								   



								
				
								 



                   {(triggerValue==true)?
								   <li class="login-link">
									   <a href={bookingpage+"?pat_message"}><span class="margin-left-6"><i class="fas fa-comments text-center width-28" style={{"fontSize":"20px"}}></i></span><span class="
										   margin-left-16">Messages</span></a>
									   </li>:""}
									 

									   {/*<li class="login-link">
										   <a href="login.html"><span><i class="fas fa-heart text-center width-28" style={{"fontSize":"20px"}}></i></span><span class="
											   margin-left-13
											   ">Favourites</span></a>
										   </li>*/}
										  
										  {(triggerValue==true)?
										   <li class="login-link">
											   <a href={bookingpage+'?pat_review'} ><span><i class="fas fa-star text-center width-28" style={{"fontSize":"20px"}}></i></span><span class="
												   margin-left-16">Reviews</span></a>
											   </li>:""}

{(triggerValue==true)?
											   <li class="login-link">
												   <a href={bookingpage+"?pat_setting"}> 
													   <span ><i class="fas fa-user-cog text-center width-28" style={{"fontSize":"20px"}}></i></span><span class="
													   margin-left-13
													   ">Settings</span></a>
												   </li>:"" }


												   {(triggerValue==true)?
												  <li class="login-link">
													   <a href="#" onClick={this.logOut}><span><i class="fas fas1 fa-sign-out-alt text-center width-28" style={{"fontSize":"20px"}}></i></span><span class="
														   margin-left-16
														   ">LOGOUT</span></a></li>:""
                                }

						</ul>
					 
					</div>
				</nav> 
			</header>
	 </React.Fragment>
        )
    }
}

export default withTranslation()(Header);