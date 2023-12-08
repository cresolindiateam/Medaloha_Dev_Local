import React , {Component} from 'react';
//import { useTranslation } from 'react-i18next';
import { withTranslation } from 'react-i18next';
import i18n from "i18next";
// import settingLanguage from './helper';
import CustomerHeader from './Components/CustomerHeader';
import Footer from './Components/Footer';
import axios from 'axios';

import { Redirect } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import GoToSection from './Components/Gotosections';
import ConfirmBookingCalendar from './Components/ConfirmBookingCalendar';
// const { t, i18n } = useTranslation(); 
import moment from 'moment';
import queryString from 'query-string';
require('dotenv').config();



function settingLanguage(lang){ 
     i18n.changeLanguage(lang);
 }

class Bookingvideoconsultation extends React.Component {   
    
    constructor(props) {
        super(props);
       // this.state = { checked: false };
        this.handleChange = this.handleChange.bind(this);
        this.state = { 
		   profileimage:"",
           name : "",
           title : "",
           category : "",
           experience : "",
           SpecialistCountry:"",
           SpecialistCity:"",
           SpecialistActivityImg1:"",
           SpecialistActivityImg2:"",
           SpecialistActivityImg3:"",
           SpecialistActivityImg4:"",
           message:"",
           messagePart:"",
           aboutme:"",
           specialistHolesticExp:"",
           specialistEducation:"",
           specialistWorkingExperienceDetails:"",
           specialistVedioUrl1:"",
           specialistVedioUrl2:"",
           specialistAvaLanguage:"",
           specialistOtherContribution:"",
           specialistMission:"",
           specialistOtherComments:"",
           specialistOtherTags:"",
           DegreeInformation : [],
           confirmationPath : "javascript:void(0)",
           checked:true ,
		   specialistId :'',
           specialistHolesticCenter:"",
           specialistHolesticLocation:"",
           userId:0,
           specialistCalendar : true,
           userCalendar: false,
           reviewStart:'', 
		   ratingCount :0,
		   ratingAvg:0,
           ConfirmButton:false
        };   
    }  

	//localStorage.setItem("customer_id",res.data.MemberId);
	
     fileChangedHandlerID1 = event => {
        this.setState({ idfront: event.target.files[0] })
      } 

      fileChangedHandlerID2 = event => {
          console.log(event.target.files);
        this.setState({ idback: event.target.files[0] })
      } 
      
      handleChange(e) {
         alert(this.state.checked);
        this.setState({ checked: !this.state.checked });
        this.setState({confirmationPath:'bookingmessageconsultation'});

    }
      

	  printReviewStar = (review) => {
		const row = [];
		for (var i = 0; i < review; i++) {
		  row.push(<i class="fas fa-star filled"></i>);
		}
		  for (var i = 0; i < (5-review); i++) {
		  row.push(<i class="fas fa-star "></i>);
		}
		return row;
	  };


    componentDidMount() {

         var specialist_id = this.props.match.params.id;

         localStorage.setItem('Rebooking',false);
         localStorage.setItem('bookingID',0);

 
         var bookingID = queryString.parse(window.location.search);
         console.log('bookingID'); 
         console.log(bookingID.bookingId);

         
         console.log('bookingIDStart'); 
         axios.get(process.env.REACT_APP_BASE_URL+`/customerAPI/GetBookingInformationByID?bookingID=`+bookingID.bookingId)
         .then(res => {
            console.log('res.w22');  
            if(res.data.length>0){
                console.log('going to free booking');
                console.log(res.data[0]['id']);

                // Valid Rebooking Session 
                localStorage.setItem('value',0);
                localStorage.setItem('legend',res.data[0]['legend_id']);
                localStorage.setItem('Rebooking',true);
                localStorage.setItem('bookingID',bookingID.bookingId); 
            }

            console.log('booking page session');
            console.log(localStorage.getItem('legend'));
           
         });  

         

		  
         axios.get(process.env.REACT_APP_BASE_URL+`/specilistAPI/GetFeaturedSpecialistFullDetails?specialist_id=`+specialist_id+'&language_id='+localStorage.getItem('i18nextLng'))
         .then(res => {
            console.log('res.data222'); 
            console.log(localStorage.getItem('i18nextLng'));
            
             if(res.data['Status']){
                this.setState({profileimage : res.data['Result'][0].SpecialistPic});
                this.setState({name : res.data['Result'][0].SpecialistName});
                this.setState({title:res.data['Result'][0].SpecialistTitle});
                this.setState({category : res.data['Result'][0].SpecialistHolestic});
                this.setState({experience :res.data['Result'][0].SpecialistWorkingExperience});
                this.setState({SpecialistCountry :res.data['Result'][0].SpecialistCountry});
                this.setState({SpecialistCity :res.data['Result'][0].SpecialistCity});

                this.setState({SpecialistActivityImg1 :res.data['Result'][0].SpecialistActivityImg1});
                this.setState({SpecialistActivityImg2 :res.data['Result'][0].SpecialistActivityImg2});
                this.setState({SpecialistActivityImg3 :res.data['Result'][0].SpecialistActivityImg3});
                this.setState({SpecialistActivityImg4 :res.data['Result'][0].SpecialistActivityImg4});

                this.setState({message :res.data['Result'][0].SpecialistMessage});
                this.setState({messagePart :res.data['Result'][0].SpecialistMessagePart});
                this.setState({aboutme :res.data['Result'][0].SpecialistAbout});
                this.setState({specialistHolesticExp :res.data['Result'][0].SpecialistHolesticExp});
                this.setState({specialistEducation :res.data['Result'][0].SpecialistEducation});
                this.setState({specialistWorkingExperienceDetails :res.data['Result'][0].SpecialistWorkingExperienceDetails});
                this.setState({specialistVedioUrl1 :res.data['Result'][0].SpecialistVedioUrl1});
                this.setState({specialistVedioUrl2 :res.data['Result'][0].SpecialistVedioUrl2});
                this.setState({specialistAvaLanguage :res.data['Result'][0].SpecialistAvaLanguage});
                this.setState({specialistOtherContribution :res.data['Result'][0].SpecialistOtherContribution});
                this.setState({specialistMission :res.data['Result'][0].SpecialistMission});
                this.setState({specialistOtherComments :res.data['Result'][0].SpecialistOtherComments});
                this.setState({specialistOtherTags :res.data['Result'][0].SpecialistOtherTags});
               
                this.setState({specialistHolesticCenter :res.data['Result'][0].Holisticcenter});
                this.setState({specialistHolesticLocation :res.data['Result'][0].Holisticlocation});

                this.setState({reviewStart :res.data['Result'][0].SpecilistRatingAvg});
                this.setState({ratingCount :res.data['Result'][0].SpecilistRatingCount});
				this.setState({ratingAvg :res.data['Result'][0].SpecilistRatingAvgPer});
                
             } 
         });   

       

         axios.get(process.env.REACT_APP_BASE_URL+`/specilistAPI/GetSpecialistDegreeByID?specialist_id=`+specialist_id)
         .then(res => {
            console.log('res.w'); 
             if(res.data['Status']){ 
                console.log(res.data['Result']); 
                this.setState({DegreeInformation:res.data['Result']});  
             } 
         }); 
         
         

         axios.get(process.env.REACT_APP_BASE_URL+`/specilistAPI/GetConfirmCondition?specialist_id=`+specialist_id)
         .then(res => { 
             if(res.data){ 
                 console.log('confirmation button');
                console.log(res.data); 
                this.setState({ConfirmButton:res.data});  
             } 
         });  
         
         
	  } 
 

    setUserId(){
        this.setState({specialistCalendar:false});
        this.setState({userCalendar:true});
       // this.setState({userId:19})
    }

    setSpecialistId(){
        this.setState({specialistCalendar:true});
        this.setState({userCalendar:false});
       // this.setState({userId:19})
    }

    render(){
        const { t } = this.props;

        if(localStorage.getItem('customer_id')==null){
			return	<Redirect to="/login"/>
		} 

        
		 
        return ( 
	          <div class="main-wrapper">  
                <CustomerHeader/> 
                <div class="breadcrumb-bar bg-cus">
			    	<div class="container-fluid">
					  <div class="row align-items-center">
						  <div class="col-md-12 col-12">
							<h2 class="breadcrumb-title">Booking for Audio/Video Consultation</h2>
						 </div>
					  </div>
				  </div>
			     </div>
                 <div class="content bg-theme pb-5">

                 <div class="container"> 
					<div class="row">
						<div class="col-12"> 
							<div class="card">
								<div class="card-body">
									<div class="booking-doc-info">
										<a href="#" class="booking-doc-img">
											<img src={this.state.profileimage} alt="User Image" />
										</a>
										<div class="booking-info">
											<h4><a href="#">{this.state.name}</a></h4>
											<div class="rating">
                                             {
												 this.printReviewStar(this.state.reviewStart)
										     } 
												<span class="d-inline-block average-rating">({this.state.ratingCount})</span>
											</div>
											<p class="text-muted mb-0">
												<b>Location for your In-person consultation:</b>
													  <br />
													{this.state.specialistHolesticCenter}, {this.state.specialistHolesticLocation}
										 
												<span class="text-info font-weight-bold">-Get Directions</span>
										     </p>
											<p class="text-muted mb-0"><i class="fas fa-map-marker-alt"></i> {this.state.SpecialistCountry} , {this.state.SpecialistCity}</p>
										</div>
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-12 col-sm-4 col-md-2">
									<h4 class="mb-1">{moment().format('D MMMM Y')}</h4>
									<p class="text-muted">{moment().format('dddd')}</p>
								</div>
								<div class="col-md-5">
									<div class="row" >
										<div class="col-md-6 col-6"> 
											<button class="h6 btn btn-lg text-white font-weight-bold float-right bg-cus"  onClick={() => this.setUserId()}>
										 	Your Time Zone <br />Calendar 
										 </button>
										</div>
										<div class="col-md-6 col-6">
										 <button class="btn btn-lg btn-light h6 font-weight-bold "  onClick={() => this.setSpecialistId()}>
									 	     Specialist Time Zone <br /> Calendar
									 </button>
										</div> 
									</div>
								</div>
								   
							
								<div class="col-4 col-sm-3 col-md-5 text-sm-right" style={{display:'none'}}> 
									<div class="bookingrange btn btn-white btn-sm mb-3">
										<i class="far fa-calendar-alt mr-2"></i> 
										<i class="fas fa-chevron-down ml-2"></i>
									</div>
								</div>

							 
                            </div>
						 
							<div class="card booking-schedule schedule-widget"> 
                            { this.state.specialistCalendar && <ConfirmBookingCalendar specialistid={this.props.match.params.id} userId={this.state.userId}  /> }
                            { this.state.userCalendar && <ConfirmBookingCalendar specialistid={this.props.match.params.id} userId={localStorage.getItem("customer_id")}  /> }
							   
							</div> 
 
								 <div class="row pl-2 mb-5">
								 	<div class="col-md-8">
								 		<b>Selected:</b> 
								 	 	<div class="p-2">{


(localStorage.getItem('selectedTime'))?moment(localStorage.getItem('selectedTime')).format('ddd,D MMM YYYY h:mm A'):''
                                     }</div> 
								 	</div>
								 	<div class="col-md-4">
										 <div class="submit-section proceed-btn text-right"> 
								          {localStorage.getItem('selectedTime')!=null ? <a href="/checkout" class="btn btn-primary submit-btn">Confirm</a>  : ''}
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


export default withTranslation()(Bookingvideoconsultation);
