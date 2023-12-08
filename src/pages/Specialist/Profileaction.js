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
// const { t, i18n } = useTranslation(); 
import BookingCalendar from '../Components/BookingCalendar';
import ChatScreen from "../Components/ChatScreen";
import SpecialistBookingHistory from '../Components/SpecialistBookingHistory';
require('dotenv').config();

function settingLanguage(lang){ 
     i18n.changeLanguage(lang);
 }

class Profileaction extends React.Component {   
    
    constructor(props) { 
        super(props);
        this.state = {
            id:0,
            title: "" ,
            year:"",
            institute : "",  
            details:"",
            otherinformation:"",
            document:null,
			calendarBox:false,
			settingBox:true,
			reviewBox:false,
			messageBox:false, 
			booking_history:[],
			profileurl :'/specialistDetails/'+localStorage.getItem('specialist_id'),
			c_name: "" ,
			c_surname : "",
			c_image:"assets/img/doctors/doctor-thumb-02.jpg", 
			spec_image:"",
			name: "" ,
			surname : "",
			reviewdata:[],
				   	Consultation:[],
            consultColorArray:['','','','','legend-video','legend-video-part','legend-video-full','legend-video','legend-video-part','legend-video-full','legend-inperson','legend-inperson-part','legend-inperson-full']
    

        };   
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
					// alert(res.data.Message); 
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


	
        fileChangedHandler = event => {
            console.log(event.target.files);
            this.setState({ document: event.target.files[0] })
        } 
 
			 


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
		 
		console.log("consulation main"+localStorage.getItem('ConsulationMainLang'))

		axios.get(process.env.REACT_APP_BASE_URL+`/specilistAPI/GetSpecialistBooking?specialist_id=`+localStorage.getItem('specialist_id'))
		.then(res => {
			 
			   console.log(res.data);  
			   this.setState({booking_history : res.data}); 
         }); 

		 axios.get(process.env.REACT_APP_BASE_URL+`/specilistAPI/userSpecialistReviewListing?specialist_id=`+localStorage.getItem('specialist_id'))
		 .then(res => {
			 this.setState({reviewData : res.data.Data});
			  console.log(res.data.Data);
		 });   

		 

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


        axios.get(process.env.REACT_APP_BASE_URL+`/specilistAPI/GetSpecialistPublicDegreeByID?specialist_id=`+localStorage.getItem('specialist_id')+'&language_code='+localStorage.getItem('i18nextLng')+'&seetingLanguage='+localStorage.getItem('SettingLanguage'))
	  	 .then(res => {
			//this.setState({countryData : res.data});  
			 this.setState({id:res.data[0]['id']});  
			 this.setState({title:res.data[0]['degree_title']});
			 this.setState({institute:res.data[0]['institute']});
			 this.setState({year:res.data[0]['year']});
			 this.setState({details:res.data[0]['details']});
			 this.setState({otherinformation:res.data[0]['other_information']});
			 this.setState({document:process.env.REACT_APP_BASE_URL+"/public/uploads/docs/"+res.data[0]['document_file']});
		 }); 
	  } 


	  chooseLanguage= (language)=> {
		 console.log(language);
		 localStorage.setItem('SettingLanguage',language);
		 localStorage.setItem("ConsulationMainLang",language);  
		 window.location.href  ='/publicintro'; 
	  }

	  publicProfile =()=>{
		if (window.confirm("Are you sure ?")) {
			axios.get(process.env.REACT_APP_BASE_URL+`/specilistAPI/UpdatePublishSpecialistProfile?specialist_id=`+localStorage.getItem('specialist_id'))
			.then(res => {
			 //this.setState({countryData : res.data['Status']});  

			 if(res.data['Status']){
					alert('Welcome to Medeloha group.');
			 }
			 
		  }); 
		}
	  }

	  hideProfile =()=>{
		if (window.confirm("Are you sure ?")) {
			axios.get(process.env.REACT_APP_BASE_URL+`/specilistAPI/UpdateHideSpecialistProfile?specialist_id=`+localStorage.getItem('specialist_id'))
			.then(res => {
			 //this.setState({countryData : res.data['Status']});  

			 if(res.data['Status']){
					alert('Hide your profile.');
			 }
			 
		  }); 
		}
	  }

	  SavePublicDegreeInformation =(e) => { 
        e.preventDefault();   

		console.warn(this.state);
		
        if(this.state.title==""){
            alert('Please enter title.');
            return false;
        }

        if(this.state.institute==""){
            alert('Please enter institute.');
            return false;
        }

        if(this.state.year==""){
            alert('Please enter year.');
            return false;
        }

        if(this.state.details==""){
            alert('Please enter details.');
            return false;
         }

         if(this.state.otherinformation==""){
            alert('Please enter other information .');
            return false;
         } 
      
         const data = new FormData(); 
         data.append('documentfile',this.state.document);  
         data.append('specialist_id',localStorage.getItem('specialist_id'));
         data.append('title',this.state.title);
         data.append('institute',this.state.institute);
         data.append('year',this.state.year);
         data.append('details',this.state.details);
         data.append('otherinformation',this.state.otherinformation); 
		 data.append('language_id',1); 
		 data.append('public_degree_id',this.state.id); 
         console.log(data); 

		 axios.post(process.env.REACT_APP_BASE_URL+`/specilistAPI/updatePublicDegree`,data)
		 .then(res => {
			 //this.setState({countryData : res.data});
		    console.log(res.data); 
			if(res.data.Status) 
			{ 
				this.setState({id:res.data.Publicdegreeid});
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
												   )) : <li style={{textAlign:"center",color:'red'}}>Review Not found.</li>} 
						 
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
										<p class="text-center">{t('SpecSubTitleSetting')}{t('SpecSubTitleSettingMandatory')}
										</p>
										<p class="text-center hidden-md hidden-lg font-weight-bold">Go to sections:</p>
										  
                                          <GoToSection setName="action"/> 			
											<h3 class="text-center">
                                            ACTIONS </h3><hr/>
										 	<p class="text-center">
                                             Choose action about your public profile.
                                            </p>

                                     <div class="row" style={{justifyContent:'center'}} > 
									 <div class="col-md-3  col-12 mb-3">
									 <center><button style={{color:'#fff'}}   class="btn w-100 btn-warning font-weight-bold btn-lg" onClick={this.hideProfile}>Hide Public Profile</button></center>
											</div>
									 <div class="col-md-3 col-12 mb-3">
									 <center>
										 <a href={this.state.profileurl} target="_blank"><button class="btn w-100 font-weight-bold btn-lg" style={{backgroundColor:'blue',color:'white',borderColor:'blue'}} >See Profile Preview</button></a>
									 </center>
									 </div>
									 <div class="col-md-3 col-12 mb-3">
									      <center>	
										 <button class="border-0 w-100 btn btn-success font-weight-bold btn-lg"  onClick={this.publicProfile}>Submit &amp; Publish</button></center>
											</div>
										</div>

                              <div class="col-md-12 mt-5">
								<div class="offset-md-2">
									<b class="hidden-sm hidden-xs">Can you provide consultations in another language?   </b> <span class="hidden-sm hidden-xs">Complete Profile in: </span>

									<b class="hidden-lg hidden-md text-center" style={{display:'block'}} >Can you provide consultations in another language? </b>
                                     <span class="hidden-lg hidden-md text-center" style={{display:'block' , margin:'8px'}}>Complete Profile in: </span>

						  <button class= {localStorage.getItem('ConsulationMainLang')==1?"ml-2 btn btn-sm btn-secondary  mb-2 ":"ml-2 btn btn-sm btn-outline-secondary mb-2 "} onClick={e=>this.chooseLanguage(1)}> ENGLISH </button>
						  <button  class={localStorage.getItem('ConsulationMainLang')==2?"ml-2 btn btn-sm btn-secondary  mb-2 ":"ml-2 btn btn-sm btn-outline-secondary mb-2 "} onClick={e=>this.chooseLanguage(2)} > ITALIAN </button>
						  <button class= {localStorage.getItem('ConsulationMainLang')==3?"ml-2 btn btn-sm btn-secondary  mb-2 ":"ml-2 btn btn-sm btn-outline-secondary mb-2 "} onClick={e=>this.chooseLanguage(3)}>SPANISH </button>
									 
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

export default withTranslation()(Profileaction);
