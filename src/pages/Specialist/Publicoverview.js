import React , {Component} from 'react';
//import { useTranslation } from 'react-i18next';
import { withTranslation } from 'react-i18next';
import i18n from "i18next";
// import settingLanguage from './helper';
import CustomerHeader from '../Components/CustomerHeader';
import Footer from '../Components/Footer';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import GoToSection from '../Components/Gotosections';
import InnerPagesLinks from '../Components/Innerpageslinks';
import BookingCalendar from '../Components/BookingCalendar';
import ChatScreen from "../Components/ChatScreen";
import SpecialistBookingHistory from '../Components/SpecialistBookingHistory';
require('dotenv').config();



// const { t, i18n } = useTranslation(); 

function settingLanguage(lang){ 
     i18n.changeLanguage(lang);
 }

class Publicoverview extends React.Component {   
    
    constructor(props) {  
        super(props); 
         this.state = {
			public_intro_id:0,
            message: "" ,
            messsagepart  : "",   
			messagefull:"",
			video:"",
			videopart:"",
			videopart:"",
			audio:"",
			audiopart:"",
		
			audiofull:"",
			vivo:"",
			vivofull:"",
			vivopart:"", 
		   aboutme:"",
		   holisticexperience:"",
		   education:"",
		   workexperience:"",
		   videourl1:"",
           videourl2:"",
           languagedetails:"",
           othercontribution:"",
           mission:"",
           Comment:"",
		   calendarBox:false,
				settingBox:true,
				reviewBox:false,
				messageBox:false, 
				lanaguageInfo:"",
				getreplyData:[],
				booking_history:[],
				c_name: "" ,
				c_surname : "",
				c_image:"assets/img/doctors/doctor-thumb-02.jpg", 
				spec_image:"",
				name: "" ,
				surname : "",
				reviewdata:[],
				consulationArray:'',
				message_trigger: false ,
				message_part_trigger  : false,   
				message_full_trigger: false,
				video_trigger: false ,
				video_part_trigger  : false,   
				video_full_trigger: false,
				inperson_trigger: false ,
				inperson_part_trigger  : false,   
				inperson_full_trigger: false,
				audio_only_trigger:false ,
				audio_only_part_trigger:false ,
				audio_only_full_trigger:false ,
					Consultation:[],
            consultColorArray:['','','','','legend-video','legend-video-part','legend-video-full','legend-video','legend-video-part','legend-video-full','legend-inperson','legend-inperson-part','legend-inperson-full']
        
         };   
     }   
  


	 handleInputChanged(event) {
		this.setState({
		  reply_content: event.target.value
		});
	  }
	  
	handleButtonClicked(reviewid) {
		console.log(reviewid);
		var review_id = reviewid;
		var specialistid = localStorage.getItem('specialist_id');
		var reply_desc = this.state.reply_content; 
		 var reviewData = {specialist_id:specialistid,reply_desc:reply_desc,review_id:review_id}
	
			 axios.post(process.env.REACT_APP_BASE_URL+`/specilistAPI/addReply`,reviewData)
			 .then(res => {
				 //this.setState({countryData : res.data});
				console.log(res.data);
				
				if(res.data.Message) 
				{  
					 alert(res.data.Message); 
					//window.location.reload();

         axios.get(process.env.REACT_APP_BASE_URL+`/specilistAPI/getReply?specialist_id=`+localStorage.getItem('specialist_id'))
		.then(res => {
			// console.log('ajay');
			this.setState({getreplyData : res.data.Data});
		    // console.log(res);
		    // console.log('getreplyData');
		});


				}
				else {
				console.log(res.data.Message);
				}
				}).catch(function (error) {
				console.log(error);
			  }); 
	
	   
	  }

	 convert(str) {
	  var date = new Date(str),
		mnth = ("0" + (date.getMonth() + 1)).slice(-2),
		day = ("0" + date.getDate()).slice(-2),                                                                        
		monthNames = [ "January", "February", "March", "April", "May", "June", 
						   "July", "August", "September", "October", "November", "December" ];
		
	  return [ monthNames[mnth],date.getFullYear()].join(" ");
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
	



	 showmessage= event => {   
		this.setState({ messageBox:true });
		this.setState({ settingBox:false }); 
		this.setState({ reviewBox:false });
		this.setState({ calendarBox:false });
		this.setState({hidemessage:'block'})
		//window.alertHello(); 
	}
	  showcalendar= event => { 
		 this.setState({ calendarBox:true });
		 this.setState({ settingBox:false }); 
		 this.setState({ reviewBox:false });
		 this.setState({ messageBox:false });
	 }

	 showsetting= event => { 
		this.setState({ settingBox:true });
		this.setState({ calendarBox:false });  
		this.setState({ reviewBox:false });
		this.setState({ messageBox:false });
	}

	showreview = event => { 
		this.setState({ calendarBox:false });
		this.setState({ settingBox:false }); 
		this.setState({ reviewBox:true });
		this.setState({ messageBox:false });
	}
  


 componentDidMount() {




axios.get(process.env.REACT_APP_BASE_URL+'/specilistAPI/GetSpecialistConsultation?specialist_id='+localStorage.getItem('specialist_id'))
		 .then(res => {
		   this.setState({Consultation : res.data});
		   console.log('res.data');
		   console.log(res.data);
		 });  
	axios.get(process.env.REACT_APP_BASE_URL+`/specilistAPI/GetSpecialistBooking?specialist_id=`+localStorage.getItem('specialist_id'))
		.then(res => {
			   console.log('booking start'); 
			   console.log(res.data);  
			   this.setState({booking_history : res.data}); 
         }); 

	axios.get(process.env.REACT_APP_BASE_URL+`/specilistAPI/getReply?specialist_id=`+localStorage.getItem('specialist_id'))
	.then(res => { 
		this.setState({getreplyData : res.data.Data}); 
	}); 

	axios.get(process.env.REACT_APP_BASE_URL+`/specilistAPI/userSpecialistReviewListing?specialist_id=`+localStorage.getItem('specialist_id'))
	.then(res => {
		this.setState({reviewData : res.data.Data});
		 console.log(res.data.Data);
	});  

	axios.get(process.env.REACT_APP_BASE_URL+`/specilistAPI/GetSpecialistConsultationByID?specialist_id=`+localStorage.getItem('specialist_id'))
	.then(res => {
		console.log('consulationArray');console.log(res.data);
		this.setState({consulationArray : res.data}); 

		res.data.forEach(element => {
			//1- Message 2message short , 3 full message ,
			// 4 video , 5 short video , 6 full video ,
			// 7 audio ,8 short audio , 9 full audio ,
			// 10 in-person , 11 in person short , 12 in person full
			if(element['provided_type']==1){
				this.setState({message_trigger:true});
				

			} 
			if(element['provided_type']==2){
				this.setState({message_part_trigger:true});
				
			}
			if(element['provided_type']==3){
				this.setState({message_full_trigger:true});
				
			}

			if(element['provided_type']==4){
				this.setState({video_trigger:true});
					
			} 
			if(element['provided_type']==5){
				this.setState({video_part_trigger:true});
				
			}
			if(element['provided_type']==6){
				this.setState({video_full_trigger:true});
				
			}

			if(element['provided_type']==7){
				this.setState({audio_only_trigger:true});
				
			} 
			if(element['provided_type']==8){
				this.setState({audio_only_part_trigger:true});
			

			}
			if(element['provided_type']==9){
				
				this.setState({audio_only_full_trigger:true});
				
			}

			if(element['provided_type']==10){
				this.setState({inperson_trigger:true});
				
			} 
			if(element['provided_type']==11){
				this.setState({inperson_part_trigger:true});
				
			}
			if(element['provided_type']==12){
				this.setState({inperson_full_trigger:true});
			
			}

		});

		  
 
			 
		
	});   

	
	// choose by specilist under Action tab 
	if(localStorage.getItem('SettingLanguage') != null ){
		console.log(`/authenticationAPI/GetLanguageInfo?language_id=`+localStorage.getItem('SettingLanguage'));
		axios.get(process.env.REACT_APP_BASE_URL+`/authenticationAPI/GetLanguageInfo?language_id=`+localStorage.getItem('SettingLanguage'))
		.then(res => {
			console.log(res.data);
			this.setState({lanaguageInfo : res.data[0]['language_name']});
			 console.log(res.data);
		}); 
	}

	var string = localStorage.getItem("onChangeId");
		console.log('booking string' + string); 
		if(string){
			   var string_first_concate=string.toString().split("_")[0];
			   var string_last_concate=string.toString().split("_")[1];
			   axios.get(process.env.REACT_APP_BASE_URL+`/customerAPI/GetCustomerDetailsByID?customer_id=`+parseInt(string_last_concate))
			   .then(res => {
				   console.log(res.data);
				   this.setState({c_name :res.data[0]['first_name']});
				   this.setState({c_surname :res.data[0]['last_name']});
				   if(res.data[0]['user_image']!=null)
				   this.setState({c_image:process.env.REACT_APP_BASE_URL+'/public/uploads/profile/'+res.data[0]['user_image']});
			 });  
		   }


		   axios.get(process.env.REACT_APP_BASE_URL+`/specilistAPI/GetSpecialistPrivateDetailsByID?specialist_id=`+localStorage.getItem('specialist_id'))
		   .then(res => {
			//this.setState({countryData : res.data});
			 console.log(res.data[0]['dob']);
			 this.setState({name:res.data[0]['first_name']});
			 this.setState({surname:res.data[0]['last_name']});
			 this.setState({email:res.data[0]['email']});
			 this.setState({stdcode:res.data[0]['std_code']});
			 this.setState({mobile:res.data[0]['mobile']}); 
			 this.setState({country:res.data[0]['country_id']});
			 this.setState({placeofbirth:res.data[0]['place_birth']}); 

 if(res.data[0]['dob']=="" ||  res.data[0]['dob']=="0000-00-00" || res.data[0]['dob']==null)
			 this.setState({dob : ""});
			  else 
			 this.setState({dob : new Date(res.data[0]['dob'])}); 

			 this.setState({other :  res.data[0]['other_text']});  
			 this.setState({healthcare :  res.data[0]['healthcare_university_degree']});
			 this.setState({university :  res.data[0]['university_degree']});  
			 this.setState({accountholder:res.data[0]['account_holder']});
			 this.setState({iban:res.data[0]['iban']});
			 this.setState({bic:res.data[0]['bic']}); 
			 if(res.data[0]['id_document_front'])
			 this.setState({idfront: process.env.REACT_APP_BASE_URL+"/public/uploads/docs/"+res.data[0]['id_document_front']});
			 if(res.data[0]['id_document_back'])
			 this.setState({idback: process.env.REACT_APP_BASE_URL+"/public/uploads/docs/"+res.data[0]['id_document_back']});

			 if(res.data[0]['healthcare_documents'])
			 this.setState({medicaldegree: process.env.REACT_APP_BASE_URL+"/public/uploads/docs/"+res.data[0]['healthcare_documents']});

			 if(res.data[0]['university_documents'])
			 this.setState({universitydegree: process.env.REACT_APP_BASE_URL+"/public/uploads/docs/"+res.data[0]['university_documents']});

			 if(res.data[0]['other_documents'])
			 this.setState({additionaldegree: process.env.REACT_APP_BASE_URL+"/public/uploads/docs/"+res.data[0]['other_documents']});

			 
			 this.setState({spec_image : process.env.REACT_APP_BASE_URL+'/public/uploads/docs/profileresize/'+res.data[0]['profile_photo']});
		 });  
		 
		 axios.get(process.env.REACT_APP_BASE_URL+`/specilistAPI/GetspecialistOverView?specialist_id=`+localStorage.getItem('specialist_id')+'&language_code='+localStorage.getItem('i18nextLng')+'&seetingLanguage='+localStorage.getItem('SettingLanguage'))
		 .then(res => {
			console.log('overveiw list'); 
			console.log(res.data);
			res.data.forEach(element => {
				if(element['consultation_id']==1){
					

if(this.state.message_trigger==false)
                           {
	                        
	                        this.setState({ message:'' });
                            }
                           else{

					this.setState({message:element['overview_data']}); 
					} 


				} 
				if(element['consultation_id']==2){
					


if(this.state.message_part_trigger==false)
                           {
	                        
	                        this.setState({ messsagepart:'' });
                            }
                           else{

					this.setState({messsagepart:element['overview_data']}); 
					} 



				}
				if(element['consultation_id']==3){
					this.setState({messagefull:element['overview_data']});  



if(this.state.message_full_trigger==false)
                           {
	                        
	                        this.setState({ messagefull:'' });
                            }
                           else{

					this.setState({messagefull:element['overview_data']}); 
					} 

				}


				if(element['consultation_id']==4){
				


if(this.state.video_trigger==false)
                           {
	                        
	                        this.setState({ video:'' });
                            }
                           else{

					this.setState({video:element['overview_data']}); 
					} 


				} 
				if(element['consultation_id']==5){

					

if(this.state.video_part_trigger==false)
                           {
	                        
	                        this.setState({ videopart:'' });
                            }
                           else{

					this.setState({videopart:element['overview_data']}); 
					} 



				}
				if(element['consultation_id']==6){


if(this.state.video_full_trigger==false)
                           {
	                        
	                        this.setState({ videofull:'' });
                            }
                           else{

					this.setState({videofull:element['overview_data']}); 
					} 



					 
				}
				if(element['consultation_id']==7){

                     if(this.state.audio_only_trigger==false)
                           {
	                        
	                        this.setState({ audio:'' });
                            }
                           else{

					this.setState({audio:element['overview_data']}); 
					} 

					
				} 
				if(element['consultation_id']==8){


                    if(this.state.audio_only_part_trigger==false)
                           {
	                        
	                        this.setState({ audiopart:'' });
                            }
                           else{

					this.setState({audiopart:element['overview_data']}); 
					} 
				}
				if(element['consultation_id']==9){

                     if(this.state.audio_only_full_trigger==false)
                           {
	                        
	                        this.setState({ audiofull:'' });
                            }
                           else{

					this.setState({audiofull:element['overview_data']}); 
					} 

					
				}

				if(element['consultation_id']==10){
					this.setState({vivo:element['overview_data']});  
				} 
				if(element['consultation_id']==11){
					this.setState({vivopart:element['overview_data']});  
				}
				if(element['consultation_id']==12){
					this.setState({vivofull:element['overview_data']});  
				}

			});
		 });






        axios.get(process.env.REACT_APP_BASE_URL+`/specilistAPI/GetSpecialistPublicOverViewByID?specialist_id=`+localStorage.getItem('specialist_id')+'&language_code='+localStorage.getItem('i18nextLng')+'&seetingLanguage='+localStorage.getItem('SettingLanguage'))
	  	 .then(res => {
			  console.log('res.data over view'); 
			  console.log(res.data);
			//this.setState({countryData : res.data}); 
            // this.setState({fullname:res.data[0]['first_name'] + " "+ res.data[0]['last_name']});
             // this.setState({surname:res.data[0]['last_name']});
            // this.setState({message:res.data[0]['consultation_description_message']});  
			// this.setState({messsagepart:res.data[0]['consultation_description_message_part']});  
			 this.setState({aboutme:res.data[0]['about_me']});
			 this.setState({holisticexperience:res.data[0]['holistic_expertise']});
			 this.setState({education:res.data[0]['education']});
			 this.setState({workexperience:res.data[0]['work_experience_detail']});
			 this.setState({videourl1:res.data[0]['presentation_video_url1']});
             this.setState({videourl2:res.data[0]['presentation_video_url2']});
			 this.setState({languagedetails:res.data[0]['available_languages']});

             this.setState({othercontribution:res.data[0]['other_contribution']});
             this.setState({mission:res.data[0]['mission']});
			 this.setState({Comment:res.data[0]['comments']});
             this.setState({public_intro_id:res.data[0]['id']});
			 //this.setState({lanaguageInfo:res.data[0]['language_id']});

			 if(res.data[0]['language_id']!='null'){
				axios.get(process.env.REACT_APP_BASE_URL+`/authenticationAPI/GetLanguageInfo?language_id=`+res.data[0]['language_id'])
				.then(res => {
					console.log(res.data);
					this.setState({lanaguageInfo : res.data[0]['language_name']});
					console.log(res.data);
				}); 

			 }
			
		 }); 
		 
		
	  }
 
 

	  SavePublicIntroInformation =(e) => { 
        e.preventDefault();   

		console.warn(this.state);
		
        if(this.state.messsage && this.state.message==""){
            alert('Please enter Message.');
            return false;
        }

		  if(this.state.messsagepart  && this.state.messsagepart==""){
			alert('Please enter Message Part.');
            return false;
		  }

		  if(this.state.messagefull  && this.state.messagefull==""){
			alert('Please enter Message Full.');
            return false;
		  }
		  
		  if(this.state.video &&  this.state.video==""){
			alert('Please enter Video.');
            return false;
		  }

		  if(this.state.videofull  && this.state.videofull==""){
			alert('Please enter Video Full.');
            return false;
		  }

		  if(this.state.videopart  && this.state.videopart==""){
			alert('Please enter Video Part.');
            return false;
		  }


		  if(this.state.audio &&  this.state.audio==""){
			alert('Please enter Audio.');
            return false;
		  }

		  if(this.state.audiofull  && this.state.audiofull==""){
			alert('Please enter Audio Full.');
            return false;
		  }

		  if(this.state.audiopart  && this.state.audiopart==""){
			alert('Please enter Audio Part.');
            return false;
		  }

		  if(this.state.vivo &&  this.state.vivo==""){
			alert('Please enter Vivo.');
            return false;
		  }

		  if(this.state.vivofull  && this.state.vivofull==""){
			alert('Please enter Vivo Full.');
            return false;
		  }

		  if(this.state.vivopart  && this.state.vivopart==""){
			alert('Please enter Vivo Part.');
            return false;
		  }








        if(this.state.holisticexperience==""){
            alert('Please enter your Holistic Experience.');
            return false;
        }

        if(this.state.education==""){
            alert('Please enter Education.');
            return false;
         }

         if(this.state.workexperience==""){
            alert('Please enter Work Experience.');
            return false;
         }  

 

		  if(this.state.message &&  this.state.message.length>500){
			alert('Please enter 500 Max Consultation Description (Message).');
            return false;
		  }

		  if(this.state.messsagepart  && this.state.messsagepart.length>500){
			alert('Please enter 500 Max Consultation Description (Message Part).');
            return false;
		  }

		  if(this.state.messagefull  && this.state.messagefull.length>500){
			alert('Please enter 500 Max Consultation Description (Message Part).');
            return false;
		  }
		  
		  if(this.state.video &&  this.state.video.length>500){
			alert('Please enter 500 Max Consultation Description (Message).');
            return false;
		  }

		  if(this.state.videofull  && this.state.videofull.length>500){
			alert('Please enter 500 Max Consultation Description (Message Part).');
            return false;
		  }

		  if(this.state.videopart  && this.state.videopart.length>500){
			alert('Please enter 500 Max Consultation Description (Message Part).');
            return false;
		  }


		  if(this.state.audio &&  this.state.audio.length>500){
			alert('Please enter 500 Max Consultation Description (Message).');
            return false;
		  }

		  if(this.state.audiofull  && this.state.audiofull.length>500){
			alert('Please enter 500 Max Consultation Description (Message Part).');
            return false;
		  }

		  if(this.state.audiopart  && this.state.audiopart.length>500){
			alert('Please enter 500 Max Consultation Description (Message Part).');
            return false;
		  }

		  if(this.state.vivo &&  this.state.vivo.length>500){
			alert('Please enter 500 Max Consultation Description (Message).');
            return false;
		  }

		  if(this.state.vivofull  && this.state.vivofull.length>500){
			alert('Please enter 500 Max Consultation Description (Message Part).');
            return false;
		  }

		  if(this.state.vivopart  && this.state.vivopart.length>500){
			alert('Please enter 500 Max Consultation Description (Message Part).');
            return false;
		  }

		  if(this.state.aboutme  && this.state.aboutme.length>1000){
			alert('Please enter 1000 Max Consultation Description (About).');
            return false;
		  }

		  if(this.state.holisticexperience && this.state.holisticexperience.length>1000){
			alert('Please enter 1000 Max holistic experience .');
            return false;
		  }
		  if(this.state.education  && this.state.education.length>1000){
			alert('Please enter 1000 Max education .');
            return false;
		  }

		  if(this.state.workexperience && this.state.workexperience.length>1000){
			alert('Please enter 1000 Max work experience .');
            return false;
		  }
	 
         const overviewData = {setting_lanaguage_id:localStorage.getItem('SettingLanguage') ,message :this.state.message , messsagepart : this.state.messsagepart, aboutme : this.state.aboutme , holisticexperience : this.state.holisticexperience
             , education : this.state.education , specialist_id:localStorage.getItem('specialist_id')
             ,workexperience:this.state.workexperience,videourl1:this.state.videourl1,videourl2:this.state.videourl2,
             languagedetails:this.state.languagedetails, othercontribution:this.state.othercontribution,
             mission:this.state.mission, comment:this.state.Comment,language_id:localStorage.getItem('i18nextLng')
			 ,public_intro_id:this.state.public_intro_id , messagefull : this.state.messagefull , 
			video:this.state.video , videofull:this.state.videofull , videopart:this.state.videopart,
		audio:this.state.audio, audiofull:this.state.audiofull , audiopart:this.state.audiopart,
	vivo:this.state.vivo , vivofull:this.state.vivofull , vivopart:this.state.vivopart }

         console.log('overviewData'); 
		  console.log(overviewData);

		 axios.post(process.env.REACT_APP_BASE_URL+`/specilistAPI/updatePublicOverview`,overviewData)
		 .then(res => {
			 //this.setState({countryData : res.data});
		    console.log(res.data); 
			if(res.data.Status) 
			{ 
				this.setState({id:res.data.PublicIntro_id});
				alert('Update successfully'); 
			}
			else 
			alert(res.data.Message); 
	    	}).catch(function (error) {
			console.log(error);
		  });   
    } 


    render(){
        const { t } = this.props;
	 
        if(localStorage.getItem('specialist_id')==null){
			return	<Redirect to="/login"/>
		} 


        var expanded = false;
	

        function showCheckboxes() {
		
          var checkboxes = document.getElementById("checkboxes");
          if (!expanded) {
            checkboxes.style.display = "block";
            checkboxes.style.position = "absolute";
            checkboxes.style.width = "97%";
            checkboxes.style.background = "white";  
            expanded = true;
          } else {
            checkboxes.style.display = "none";
            expanded = false;
          }
        }
        
        
        function showCheckboxes1() {
          var checkboxes1 = document.getElementById("checkboxes1");
          if (!expanded) {
            checkboxes1.style.display = "block";
            checkboxes1.style.position = "absolute";
            checkboxes1.style.width = "97%";
            checkboxes1.style.background = "white";  
            expanded = true;
          } else {
            checkboxes1.style.display = "none";
            expanded = false;
          }
        }


	



        return ( 
			
	        <div class="main-wrapper">  
                <CustomerHeader/> 
                <div class="breadcrumb-bar bg-cus">
			    	<div class="container-fluid">
					  <div class="row align-items-center">
						  <div class="col-md-12 col-12">
							<h2 class="breadcrumb-title">Profile</h2>
						 </div>
					  </div>
				  </div>
			     </div> 

    <div class="content  bg-theme">
		<div class="container-fluid"> 
			<div class="row">
				<div class="col-md-12 col-lg-12 col-xl-12 dct-appoinment">
					<div class="card">
						<div class="card-body pt-0">
							<div class="user-tabs">
								<ul class="nav nav-tabs nav-tabs-bottom nav-justified flex-wrap">
								   <li class="nav-item">
									   <a class="nav-link" href="#pat_appointments" data-toggle="tab" onClick={this.showcalendar}><i class="fas fa-calendar-check"></i>&nbsp; Bookings</a>
									</li> 
									<li class="nav-item">
									   <a class="nav-link" href="#pres"  data-toggle="tab" onClick={this.showmessage} ><span><i class="fas fa-comments"></i> &nbsp; Messages</span></a>
									</li>  
									<li class="nav-item">
									   <a class="nav-link" href="#billing" data-toggle="tab" onClick={this.showreview}><span><i class="fas fa-star"></i> &nbsp;Reviews	</span></a>
									</li>  
									<li class="nav-item">
									   <a class="nav-link active" href="#pro-setting" data-toggle="tab" onClick={this.showsetting}> <i class="fas fas fa-user-cog"></i>  &nbsp;Settings</a>
									</li>
								</ul>
							</div>
							<div class="tab-content">

							{this.state.calendarBox &&
	 <div id="pat_appointments" class="tab-pane fade search-box  ">				
	 <div class="row">
		 <div class="col-md-9 col-12">
			 <h3 class="text-center text-dark mb-4">AGENDA SCHEDULING</h3>
			    <BookingCalendar/> 
			 <div class="submit-section proceed-btn text-center">
			   <a href="checkout.html" class="btn btn-primary submit-btn">Save Changes</a>
			 </div> 
		 </div> 
		 <div class="col-md-3">
			
  	<div class="hidden-xs hidden-sm">
												<h4 class="mb-4">Legend:</h4>
             {this.state.Consultation.map( (consult)=> (
                        <>
						<div class="row">
							<div class="d-flex">
								<div class={this.state.consultColorArray[consult.id] + '-div'}>
								</div>
								<span class={this.state.consultColorArray[consult.id] + ' p-2'}>{consult.legend_name}</span>
							</div>
						</div>
						<hr class="custom-hr" />  
                        </>
              ))} 
			 
												 

 
									 <div class="row">
									 	   <div class=" mb-5">
									 		<span class="p-2"> &nbsp;  </span>
									 		</div>
									 	</div>
									 
								 
									<div id="modal1" class="modal">
										<div class="modal-content">
											<a href="#!" class=" text-right modal-action modal-close waves-effect waves-green btn-flat">Close</a>
											<h4 class="text-muted text-center">Add Slot</h4>

											<p>Slot*</p>
											<form class="d-block">

												<div class="form-group form-focus focused">
													<input  required type="date" class="w-100 form-control floating datepicker" />
													<label class="focus-label">Date </label>
												</div>
												<div class="form-group form-focus focused">
													<input class="w-100"required type="time" class="form-control floating timepicker" />
													<label class="focus-label">Time </label>
												</div>
												<button class="btn btn-primary btn-block " type="submit">Send</button>
											</form>

										</div>

									</div> 
							 

							 
						</div>
 </div>
</div>

<div class="card card-table mb-0">
 <div class="card-body"> 
	 {this.state.booking_history=='' &&
 <p style={{textAlign:'center',color:'red'}}>Data not found</p>
}
	    {this.state.booking_history!='' &&
	      <SpecialistBookingHistory/>
		}
	  
   </div>
 </div> 
</div>
}


{this.state.messageBox &&
<div class="tab-pane" id="pres" > 
	<div class="col-xl-12">
	   <div class="chat-window"> 
				{this.state.booking_history=='' &&
				<p style={{textAlign:'center',color:'red'}}>Data not found</p>
				}
				{this.state.booking_history!='' &&
				 <ChatScreen
				 id={localStorage.getItem('specialist_id')}
				 name={this.state.name+' '+this.state.surname}
				 path={this.state.spec_image}
				 c_name={this.state.c_name+' '+this.state.c_surname}
				 c_path={this.state.c_image}  
				/> 
				}
		 </div> 
	</div>
</div>
}
		 
{this.state.reviewBox &&
					  <div class="tab-pane" id="billing"> 
						<div class="widget review-listing mt-3">
							<h2 class="text-center">Reviews:</h2>
							<ul class="comments-list">
							{this.state.reviewData && this.state.reviewData.length!=0?		
							    this.state.reviewData.map( (review)=> ( 
											   <li>
												   <div class="comment">
												   <img class="avatar avatar-sm rounded-circle" alt="User Image" src={(review.u_image===null)?process.env.REACT_APP_URL+'/assets/img/doctors/doctor-thumb-02.jpg':`${process.env.REACT_APP_BASE_URL}/public/uploads/profile/${review.u_image}`}  />
													   <div class="comment-body">
														   <div class="meta-data">
															   <span class="comment-author">{review.u_first_name+' '+review.u_last_name}</span>
															   <span class="comment-date"> {this.convert(review.created_at)} , Message Consultation</span>
															   
					   
															   {(review.recommend_status==1)?<p class="recommended"><i class="far fa-thumbs-up font-size-20"></i> I recommend this Specialist</p>:<p class="comment-content">
											   <span class="text-danger"><i class="far fa-thumbs-down text-danger font-size-20"></i> I do not recommend this Specialist</span></p>}
																   <div class="review-count rating">
																		   {
																		  this.printReviewStar(review.review_star)
																		 }
																		 
																   </div>
															   </div>
															   <p class="comment-content">
																   {review.review_desc}
															   </p>
					   
														   </div>
													   </div>
													   <div class="container">
														   <div class="row">
															   <div class="col-md-2">&nbsp;</div>
															   <div class="col-md-8">
																   <div class="comment">
																	   <img class="avatar avatar-sm rounded-circle" alt="User Image" src={`${process.env.REACT_APP_BASE_URL}/public/uploads/docs/${review.profile_photo}`}  />
													   <div class="comment-body w-100">
																		   <div class="meta-data">
																			   <span class="comment-author">{review.first_name+' '+review.last_name} </span>
																			   <span class="comment-date">Specialist</span>
																		   </div>
																		   {this.state.getreplyData.map( (reply)=> (
																			   <p class="comment-content">{reply.reply_desc}</p>
																			))}
																			{(this.state.getreplyData.length>0)?'':<textarea class="form-control w-100"  onChange={this.handleInputChanged.bind(this)}></textarea>}
																	   </div>
																   </div>
															   </div>
															   <div class="col-md-2">
																   <h4>&nbsp;</h4>
																   {(this.state.getreplyData.length>0)?'':<button class="btn btn-info mt-5" onClick={() => this.handleButtonClicked(review.review_id)}>Reply</button>}
															   </div>
														   </div>
													   </div>
					   
												   </li>
												
												   )) : <li style={{textAlign:"center",color:"red"}}>Not found</li> } 

						 
									</ul>

								</div>

							</div>
	}

	 {this.state.settingBox &&
					  <div class="tab-pane fade show active" id="pro-setting">
								<div class="card">
									<div class="card-body">
									<h3 class="text-center">
										{t('SpecMainTitleSetting')}</h3>
										<p class="text-center">{t('SpecSubTitleSetting')} <br/> {t('SpecSubTitleSettingMandatory')}
										</p>
										<p class="text-center hidden-md hidden-lg font-weight-bold">Go to sections:</p>
										  
                                          <GoToSection setName="publicintro"/> 			
											<h3 class="text-center"> PUBLIC  {this.state.lanaguageInfo && this.state.lanaguageInfo!='null' ?  "For "+ this.state.lanaguageInfo : null }</h3><hr/>
											<p class="text-center">
											 

										   <InnerPagesLinks />

											</p>
											<div class="mt-5" id="overview">
												<h3 class=" mb-2 text-center">OVERVIEW (3/5)</h3>
												<p class="mb-4 text-center">
                                                   {t('SpecOverviewText')}
												</p>
                                               
												<form>
                                                <input type="hidden" name="public_intro_id" value={this.state.id} />
										<div class="row form-row"> 
	                                        <div class="col-12 col-md-12">
												<div class="form-group">
													<label>Consultation Description *</label><br/>
													
													 
													{this.state.message_trigger && this.state.message_trigger==true ? 
													<div class="sub-heading" class="consult-text-desc"> Chat </div>
													: ""}
												     {this.state.message_trigger && this.state.message_trigger==true ? 
													<textarea  class="form-control c-h-5" placeholder="Max 500 characters" onChange={(e)=>this.setState({message:e.target.value})} value={this.state.message} ></textarea>
													: ""}
												 
												    {this.state.message_part_trigger && this.state.message_part_trigger==true ? 
													<div class="sub-heading" class="consult-text-desc"> Chat PART </div>
													: ""}
												     {this.state.message_part_trigger && this.state.message_part_trigger==true ? 
													<textarea  class="form-control c-h-5" placeholder="Max 500 characters" onChange={(e)=>this.setState({messsagepart:e.target.value})} value={this.state.messsagepart} ></textarea>
													: ""}

													{this.state.message_full_trigger && this.state.message_full_trigger==true ? 
													<div class="sub-heading" class="consult-text-desc"> Chat FULL </div>
													: ""}
												     {this.state.message_full_trigger && this.state.message_full_trigger==true ? 
													<textarea  class="form-control c-h-5" placeholder="Max 500 characters" onChange={(e)=>this.setState({messagefull:e.target.value})} value={this.state.messagefull} ></textarea>
													: ""}


													{this.state.video_trigger && this.state.video_trigger==true ? 
													<div class="sub-heading" class="consult-text-desc" style={{color:'orange'}}> Video </div>
													: ""}
												     {this.state.video_trigger && this.state.video_trigger==true ? 
													<textarea  class="form-control c-h-5" placeholder="Max 500 characters" onChange={(e)=>this.setState({video:e.target.value})} value={this.state.video} ></textarea>
													: ""}

													{this.state.video_part_trigger && this.state.video_part_trigger==true ? 
													<div class="sub-heading" class="consult-text-desc " style={{color:'orange'}}> Video PART </div>
													: ""}
												     {this.state.video_part_trigger && this.state.video_part_trigger==true ? 
													<textarea  class="form-control c-h-5" placeholder="Max 500 characters" onChange={(e)=>this.setState({videopart:e.target.value})} value={this.state.videopart} ></textarea>
													: ""}

													{this.state.video_full_trigger && this.state.video_full_trigger==true ? 
													<div class="sub-heading" class="consult-text-desc" style={{color:'orange'}}> Video FULL </div>
													: ""}
												     {this.state.video_full_trigger && this.state.video_full_trigger==true ? 
													<textarea  class="form-control c-h-5" placeholder="Max 500 characters" onChange={(e)=>this.setState({videofull:e.target.value})} value={this.state.videofull} ></textarea>
													: ""}

													 
													{this.state.audio_only_trigger && this.state.audio_only_trigger==true ? 
													<div class="sub-heading" class="consult-text-desc " style={{color:'orange'}}> Audio  </div>
													: ""}
												     {this.state.audio_only_trigger && this.state.audio_only_trigger==true ? 
													<textarea  class="form-control c-h-5" placeholder="Max 500 characters" onChange={(e)=>this.setState({audio:e.target.value})} value={this.state.audio} ></textarea>
													: ""}

													{this.state.audio_only_part_trigger && this.state.audio_only_part_trigger==true ? 
													<div class="sub-heading" class="consult-text-desc " style={{color:'orange'}}> Audio PART </div>
													: ""}
												     {this.state.audio_only_part_trigger && this.state.audio_only_part_trigger==true ? 
													<textarea  class="form-control c-h-5" placeholder="Max 500 characters" onChange={(e)=>this.setState({audiopart:e.target.value})} value={this.state.audiopart} ></textarea>
													: ""}

													{this.state.audio_only_full_trigger && this.state.audio_only_full_trigger==true ? 
													<div class="sub-heading" class="consult-text-desc" style={{color:'orange'}}> Audio FULL </div>
													: ""}
												     {this.state.audio_only_full_trigger && this.state.audio_only_full_trigger==true ? 
													<textarea  class="form-control c-h-5" placeholder="Max 500 characters" onChange={(e)=>this.setState({message:e.target.audiofull})} value={this.state.audiofull} ></textarea>
													: ""}

													{this.state.inperson_trigger && this.state.inperson_trigger==true ? 
													<div class="sub-heading" class="consult-text-desc" style={{color:'blue'}}> Vivo  </div>
													: ""}
												     {this.state.inperson_trigger && this.state.inperson_trigger==true ? 
													<textarea  class="form-control c-h-5" placeholder="Max 500 characters" onChange={(e)=>this.setState({vivo:e.target.value})} value={this.state.vivo} ></textarea>
													: ""}
													

													{this.state.inperson_part_trigger && this.state.inperson_part_trigger==true ? 
													<div class="sub-heading" class="consult-text-desc" style={{color:'blue'}}> Vivo PART </div>
													: ""}
												     {this.state.inperson_part_trigger && this.state.inperson_part_trigger==true ? 
													<textarea  class="form-control c-h-5" placeholder="Max 500 characters" onChange={(e)=>this.setState({vivopart:e.target.value})} value={this.state.vivopart} ></textarea>
													: ""}

													{this.state.inperson_full_trigger && this.state.inperson_full_trigger==true ? 
													<div class="sub-heading" class="consult-text-desc" style={{color:'blue'}}> Vivo FULL </div>
													: ""}
												     {this.state.inperson_full_trigger && this.state.inperson_full_trigger==true ? 
													<textarea  class="form-control c-h-5" placeholder="Max 500 characters" onChange={(e)=>this.setState({vivofull:e.target.value})} value={this.state.vivofull} ></textarea>
													: ""}
												 

													
												</div>
											</div>
											<div class="col-12 col-md-12">
												<div class="form-group">
													<label>About me</label>
													<textarea  class="c-h-10 form-control" placeholder="Max 1000 characters " onChange={(e)=>this.setState({aboutme:e.target.value})} value={this.state.aboutme!='null'?this.state.aboutme:""} ></textarea>
												</div>
											</div>
											<div class="col-12 col-md-12">
												<div class="form-group">
													<label class="">My holistic expertise *</label>
													<textarea class="form-control c-h-10"  placeholder="Max 1000 characters" onChange={(e)=>this.setState({holisticexperience:e.target.value})} value={this.state.holisticexperience!='null'?this.state.holisticexperience:""} ></textarea>
												</div>
											</div>

											<div class="col-12 col-md-12">
												<div class="form-group">
													<label class="">Education *</label>
													<textarea  class="c-h-10 form-control" placeholder="Max 1000 characters" onChange={(e)=>this.setState({education:e.target.value})} value={this.state.education!='null'?this.state.education:""} ></textarea>
												</div>
											</div>


												<div class="col-12 col-md-12">
												<div class="form-group">
													<label class="">Work &amp; Experience *</label>
													<textarea  class="c-h-10 form-control" placeholder="Max 1000 characters" onChange={(e)=>this.setState({workexperience:e.target.value})} value={this.state.workexperience!='null'?this.state.workexperience:""} ></textarea>
												</div>
											</div>
											
										 <div class="col-12 col-md-12"> 
											<div class="row">
												<div class="col-md-4">
													Presentation videos to upload (max 2)
 												</div>
 												<div class="col-md-4 mb-3">
 													<input type="text" placeholder="Paste Link" class="form-control" name="" value={this.state.videourl1} onChange={(e)=>this.setState({videourl1:e.target.value})} />
 												</div>
 												<div class="col-md-4 mb-3">
 													<input type="text" placeholder="Paste Link" class="form-control" name=""  value={this.state.videourl2} onChange={(e)=>this.setState({videourl2:e.target.value})}/>
 												</div>
											</div>
										</div>
											 
											 
											<div class="col-12 col-md-12">
												<div class="form-group">
													<label class="text-dark">Languages available for consultation</label>
													<textarea  class="c-h-10 form-control" placeholder="Max 100 characters" onChange={(e)=>this.setState({languagedetails:e.target.value})} value={this.state.languagedetails!='null'?this.state.languagedetails:""} ></textarea>
												</div>
											</div>
											<div class="col-12 col-md-12">
												<div class="form-group">
													<label class="text-dark">Other Contribution</label>
													<textarea  class="c-h-10 form-control" placeholder="Max 1000 characters" onChange={(e)=>this.setState({othercontribution:e.target.value})} value={this.state.othercontribution!='null'?this.state.othercontribution:""} ></textarea>
												</div>
											</div>
											<div class="col-12 col-md-12">
												<div class="form-group">
													<label class="text-dark">Mission</label>
													<textarea  class="c-h-10 form-control" placeholder="Max 1000 characters" onChange={(e)=>this.setState({mission:e.target.value})} value={this.state.mission!='null'?this.state.mission:""} ></textarea>
												</div>
											</div>
											<div class="col-12 col-md-12">
												<div class="form-group">
													<label class="text-dark">Comment</label>
													<textarea  class="c-h-10 form-control" placeholder="Max 1000 characters" onChange={(e)=>this.setState({Comment:e.target.value})} value={this.state.Comment!='null'?this.state.Comment:""} ></textarea>
												</div>
											</div>


                                            <div class="col-md-12">
									<center>
                                    <button type="submit" class=" mt-5 btn btn-primary btn-lg submit-btn mb-4" onClick={this.SavePublicIntroInformation}>Save Changes</button>
									</center>
								</div>

                                            </div>
												
									</form>

                                    <div class="row">
								<div class="col-md-6 col-6">
									<center>
					 				<a href="/publicconsultation#consult" class=" mt-5 btn  btn-warning btn-sm submit-btn mb-4"> {"<<"} Previous </a>
									</center>
								</div>
								 
								<div class="col-md-6 col-6">
									<center>
					 				<a href="/publicdegree#degree" class=" mt-5 btn  btn-warning btn-sm submit-btn mb-4">Next {">>"}</a>
									</center>
								</div>
							</div>


																			</div>

																		</div>
																	</div>
																</div>
	}


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


export default withTranslation()(Publicoverview);
