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
import BookingCalendar from '../Components/BookingCalendar';
import SpecialistBookingHistory from '../Components/SpecialistBookingHistory';
// const { t, i18n } = useTranslation(); 
import moment from 'moment';
import ChatScreen from "../Components/ChatScreen";
require('dotenv').config();

function settingLanguage(lang){ 
     i18n.changeLanguage(lang);
 }

class PrivateSetting extends React.Component {   
    
    constructor(props) {
        super(props);
        this.state = {
           name: "" ,
           surname : "",
           email: "" ,
           country :"",
           placeofbirth:"",
           password:"",
           cpassword:"", 
		   countryData : [],
		   Consultation:[],
		   reviewData : [],
		   cityData : [],
		   redirect:false,
           stdcode:"",
           mobile:"",
           dob:"",
           other:"",
           healthcare:0,
           university: 0, 
		   idfront:null,
		   idback:null,
           medicaldegree:null,
		   universitydegree:null,
		   additionaldegree:null,
		   extrainfo:null ,
           currentpassword:"",
           newpassword:"",
           confirmpassword:"",
           accountholder:"",
           iban:"",
           bic:"",
		   language:1,
		   calendarBox:false,
		   settingBox:true,
		   reviewBox:false,
		   messageBox:false, 
		   booking_chat_channel:[],
		   chatmasterName:'',
		   hidemessage:'block',
		   getreplyData:[],
		   bookingactive:'',
		   messageactive:'',
		   settingactive:'', 
		   c_name: "" ,
           c_surname : "",
           c_image:"assets/img/doctors/doctor-thumb-02.jpg", 
           spec_image:"",
		   searchvalue:"",
		   booking_history:[],
		   fileidfront:null,
		   fileidback:null,
		   filemedicaldegree:null ,
		   fileuniversitydegree:null,
		   fileadditionaldegree:null,

		   deleteuniversitydegree:false,
		   deletemedicaldegree:false,
		   deletefileadditionaldegree:false,
		   consultColorArray:['','','','','legend-video','legend-video-part','legend-video-full','legend-video','legend-video-part','legend-video-full','legend-inperson','legend-inperson-part','legend-inperson-full']
        };   

         this.fileChangedCloseHandlerID3 = this.fileChangedCloseHandlerID3.bind(this);
         this.fileChangedCloseHandlerID4 = this.fileChangedCloseHandlerID4.bind(this);
          this.fileChangedCloseHandlerID31 = this.fileChangedCloseHandlerID31.bind(this);
         this.fileChangedCloseHandlerID41 = this.fileChangedCloseHandlerID41.bind(this);

         this.fileChangedCloseHandlerID51 = this.fileChangedCloseHandlerID51.bind(this);
         this.fileChangedCloseHandlerID5 = this.fileChangedCloseHandlerID5.bind(this);
    }  


	handleInputChanged(event) {
		this.setState({
		  reply_content: event.target.value
		});
	  }
	  
	handleButtonClicked(reviewid,u_email) {
		console.log(reviewid);
		var review_id = reviewid;
		var specialistid = localStorage.getItem('specialist_id');
		var reply_desc = this.state.reply_content; 
		 var reviewData = {specialist_id:specialistid,reply_desc:reply_desc,review_id:review_id,u_email:u_email}
	
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

	fileChangedCloseHandlerID1 = event =>
	{
		this.setState({ idfront: '' });
		this.setState({ fileidfront: '' });
	}

	fileChangedCloseHandlerID2 = event =>
	{
		this.setState({ idback: '' });
		this.setState({ fileidback: '' });
	}

fileChangedCloseHandlerID3 = event =>
	{
		// this.setState({ medicaldegree: null });
		 this.setState({ filemedicaldegree: null });
		 	this.setState({ deletemedicaldegree: true });
	}


	fileChangedCloseHandlerID31 = event =>
	{
		 this.setState({ medicaldegree: null });
		 	this.setState({ deletemedicaldegree: true });
		 // this.setState({ filemedicaldegree: null });
	}

	fileChangedCloseHandlerID4 = event =>
	{
		// this.setState({ universitydegree: null });
		 this.setState({ fileuniversitydegree: null });
		 this.setState({ deleteuniversitydegree: true });
		 
	}
	

	fileChangedCloseHandlerID41 = event =>
	{
		this.setState({ universitydegree: null });

this.setState({ deleteuniversitydegree: true });
		
		 // this.setState({ fileuniversitydegree: null });
	}




fileChangedCloseHandlerID5 = event =>
	{
		// this.setState({ universitydegree: null });
		 this.setState({ fileadditionaldegree: null });
		 this.setState({ deletefileadditionaldegree: true });
		 
	}
	

	fileChangedCloseHandlerID51 = event =>
	{
		this.setState({ additionaldegree: null });

this.setState({ deletefileadditionaldegree: true });
		
		 // this.setState({ fileuniversitydegree: null });
	}


	
     fileChangedHandlerID1 = event => {
        this.setState({ idfront: event.target.files[0] })
		this.setState({
			fileidfront: URL.createObjectURL(event.target.files[0])
		  })
      } 
	  
      fileChangedHandlerID2 = event => { 
        this.setState({ idback: event.target.files[0] })
		this.setState({
			fileidback: URL.createObjectURL(event.target.files[0])
		  })
      } 

	  fileChangedHandlerID3 = event => {
        this.setState({ medicaldegree: event.target.files[0] });
		this.setState({
			filemedicaldegree: URL.createObjectURL(event.target.files[0])
		  })
      } 

	  fileChangedHandlerID4 = event => {
        this.setState({ universitydegree: event.target.files[0] })
		this.setState({
			fileuniversitydegree: URL.createObjectURL(event.target.files[0])
		  })
      } 
	  fileChangedHandlerID5 = event => { 
        this.setState({ additionaldegree: event.target.files[0] })
		this.setState({
			fileadditionaldegree: URL.createObjectURL(event.target.files[0])
		  })
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



	handleChange(event) {
		this.setState({searchvalue: event.target.value});
	  }
      
    componentDidMount() { 



		axios.get(process.env.REACT_APP_BASE_URL+`/specilistAPI/GetSpecialistBooking?specialist_id=`+localStorage.getItem('specialist_id'))
		.then(res => {
			   console.log('booking start'); 
			   console.log(res.data);  
			   this.setState({booking_history : res.data}); 
         }); 

		 axios.get(process.env.REACT_APP_BASE_URL+'/specilistAPI/GetSpecialistConsultation?specialist_id='+localStorage.getItem('specialist_id'))
		 .then(res => {
		   this.setState({Consultation : res.data});
		   console.log('res.data');
		   console.log(res.data);
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

		//this.props.match.params.id;
		console.log('this.props.match.params');
		console.log(this.props.location.search);

		if(this.props.location.search==''){
			this.setState({settingactive:'active'});
		}

		if(this.props.location.search=='?pat_message'){
		this.setState({ calendarBox:false });
		this.setState({ settingBox:false }); 
		this.setState({ reviewBox:false });
		this.setState({ messageBox:true });
		this.setState({messageactive:'active'}); 
		}
		


		if(this.props.location.search=='?pat_appointments'){
			this.setState({ calendarBox:true });
			this.setState({ settingBox:false }); 
			this.setState({ reviewBox:false });
			this.setState({ messageBox:false });
			this.setState({bookingactive:'active'});
		}

		if(this.props.location.search=='?pat_setting'){
			this.setState({ settingBox:true });
			this.setState({ calendarBox:false });  
			this.setState({ reviewBox:false });
			this.setState({ messageBox:false });
			this.setState({settingactive:'active'});
		}

		

		axios.get(process.env.REACT_APP_BASE_URL+`/authenticationAPI/GetAllCountry`)
		.then(res => {
			this.setState({countryData : res.data});
		     console.log(res.data);
		});   


		axios.get(process.env.REACT_APP_BASE_URL+`/specilistAPI/getReply?specialist_id=`+localStorage.getItem('specialist_id'))
		.then(res => { 
			this.setState({getreplyData : res.data.Data}); 
		}); 

		axios.get(process.env.REACT_APP_BASE_URL+`/specilistAPI/userSpecialistReviewListing?specialist_id=`+localStorage.getItem('specialist_id'))
		.then(res => {
			this.setState({reviewData : res.data.Data});
			console.log('reviewdata');
		     console.log(res.data.Data);
		});   
		

		axios.get(process.env.REACT_APP_BASE_URL+`/specilistAPI/GetSpecialistChatChannel?specialist_id=`+localStorage.getItem('specialist_id'))
		.then(res => {
		   console.log('22222222222');  console.log(res);
			   this.setState({booking_chat_channel : res.data}); 

			   if(res.data){
				   localStorage.setItem('Channel',res.data[0]['payment_stripe_id']);
				   this.setState({chatmasterName:'Dr.' +res.data[0]['first_name']+' '+res.data[0]['last_name']})
				   
			   }
		 });  

 
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

			 if(res.data[0]['other_text']!='null')
             this.setState({other : res.data[0]['other_text']});  
             this.setState({healthcare :  res.data[0]['healthcare_university_degree']});
             this.setState({university :  res.data[0]['university_degree']});  
             this.setState({accountholder:res.data[0]['account_holder']});
             this.setState({iban:res.data[0]['iban']});
             this.setState({bic:res.data[0]['bic']}); 
			 this.setState({language:res.data[0]['main_consult_language']}); 
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

	 

	  }



	  countrydropdown(countryvalue){
		this.setState({ country: countryvalue});
	  } 

      placeofbirthdropdown(countryvalue){
		this.setState({ placeofbirth: countryvalue});
	  } 

	  printReviewStar = (review) => {
		const row = [];
		for (var i = 0; i < review; i++) {
		  row.push(<i className="fas fa-star filled"/>);
		}
		  for (var i = 0; i < (5-review); i++) {
		  row.push(<i className="fas fa-star "/>);
		}
		return row;
	  };
	
	

      privateProfileUpdate =(e) => {
        e.preventDefault();  
		 
        if(this.state.name==""){
            alert('Please enter name.');
            return false;
        }

        if(this.state.surname==""){
            alert('Please enter name.');
            return false;
        }

        if(this.state.email==""){
            alert('Please enter email.');
            return false;
         }


		 if(this.state.mobile==""){
            alert('Please enter mobile.');
            return false;
         }


         if(this.state.country==""){
            alert('Please enter country.');
            return false;
         }
 
         if(this.state.placeofbirth==""){
            alert('Please enter place of birth.');
            return false;
         }
		  

		 if(this.state.dob==""){
            alert('Please enter DOB.');
            return false;	
         }


		 if(this.state.language==""){
            alert('Please select language.');
            return false;	
         }

		 if(this.state.idfront==""){
            alert('Please upload Front Documents');
            return false;
         }
		  
		 if(this.state.idback==""){
            alert('Please upload Back Documents.');
            return false;
         }
		  

         var healthcareValue = 0;
		 if(this.state.healthcare){
             healthcareValue = 1;
         }

         var universityValue = 0;
		 if(this.state.university){
            universityValue = 1;
         } 

         const customerData = {customer_id:localStorage.getItem('customer_id'),name :this.state.name , surname : this.state.surname, email : this.state.email , country : this.state.country ,  stdcode : this.state.stdcode  , mobile : this.state.mobile , city : this.state.city, dob : this.state.dob, streetaddress : this.state.streetaddress, zipcode : this.state.zipcode, consultationlanguage:this.state.language}
         console.log(this.state.idback);

         const data = new FormData(); 
         data.append('idfront',this.state.idfront); 
         data.append('idback',this.state.idback); 



data.append('medicaldegree',this.state.medicaldegree); 	
data.append('deletemedicaldegree',this.state.deletemedicaldegree); 	
data.append('deletefileadditionaldegree',this.state.deletefileadditionaldegree); 



data.append('universitydegree',this.state.universitydegree); 	


         
		 data.append('additionaldegree',this.state.additionaldegree);
		 
  
         data.append('specialist_id',localStorage.getItem('specialist_id'));
         data.append('name',this.state.name);
         data.append('surname',this.state.surname);
         data.append('email',this.state.email);
         data.append('mobile',this.state.mobile);
         data.append('stdcode',this.state.stdcode);
         data.append('country',this.state.country);
         data.append('placeofbirth',this.state.placeofbirth);
         data.append('other',this.state.other);
         data.append('dob',this.state.dob); 
         data.append('healthcare',healthcareValue);
         data.append('university',universityValue);
		 data.append('language',this.state.language);
		 console.log('data coming')
         console.log(data);
 console.log('data coming2') 

		 axios.post(process.env.REACT_APP_BASE_URL+`/specilistAPI/updatePrivateSetting`,data)
		 .then(res => {
			 //this.setState({countryData : res.data});
		    console.log(res.data);
			
			if(res.data.Status) 
			{ 
				localStorage.setItem("ConsulationMainLang",this.state.language);  
				alert('Update successfully');
			}
			
			
	    	}).catch(function (error) {
			console.log(error);
		  });   
      }

      paymentInformation=(e)=>{
          e.preventDefault();

          if(this.state.accountholder==""){
            alert('Please enter current Account holder name.');
            return false;
         }

		 if(this.state.iban==""){
            alert('Please enter IBAC.');
            return false;
         }

		 if(this.state.bic==""){
            alert('Please enter BIC.');
            return false;
         }


         var paymentData = {accountholder:this.state.accountholder,iban:this.state.iban,bic:this.state.bic,specialist_id:localStorage.getItem('specialist_id')}

		 axios.post(process.env.REACT_APP_BASE_URL+`/specilistAPI/Updatepayment`,paymentData)
		 .then(res => {
			 //this.setState({countryData : res.data});
		    console.log(res.data);
			
			if(res.data.Status) 
			{  
				alert('Payment Information update successfully'); 
			}
			else 
			alert(res.data.Message);
			
	    	}).catch(function (error) {
			console.log(error);
		  });   


      }


	  createchannel=(Channel,mastername)=>{ 
		console.log('running'+Channel);
		localStorage.setItem('Channel',Channel);
		 this.setState({chatmasterName: 'Dr ' + mastername});
		 window.alertHello(); 
    }


	changepassword=(e)=>{
		e.preventDefault(); 
		if(this.state.currentpassword==""){
            alert('Please enter current password.');
            return false;
         }

		 if(this.state.newpassword==""){
            alert('Please enter newpassword.');
            return false;
         }

		 if(this.state.confirmpassword==""){
            alert('Please enter confirm password.');
            return false;
         }

		 if(this.state.newpassword!=this.state.confirmpassword){
            alert('Please enter right confirm password.');
            return false;
         }
 
        
		 var passwordData = {currentpassword:this.state.currentpassword,newpassword:this.state.newpassword,confirmpassword:this.state.confirmpassword,specialist_id:localStorage.getItem('specialist_id')}

		 axios.post(process.env.REACT_APP_BASE_URL+`/specilistAPI/ChangePassword`,passwordData)
		 .then(res => {
			 //this.setState({countryData : res.data});
		    console.log(res.data);
			
			if(res.data.Status) 
			{  
				alert('Password update successfully'); 
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

        return ( 
	          <div className="main-wrapper">  
                <CustomerHeader/> 
                <div className="breadcrumb-bar bg-cus">
			    	<div className="container-fluid">
					  <div className="row align-items-center">
						  <div className="col-md-12 col-12">
							<h2 className="breadcrumb-title">Profile</h2>
						 </div>
					  </div>
				  </div>
			     </div>


            <div className="content bg-theme">
				<div className="container-fluid"> 
					<div className="row"> 
						<div className="col-md-12 col-lg-12 col-xl-12 dct-appoinment">
							<div className="card">
								<div className="card-body pt-0">
									<div className="user-tabs">
										<ul className="nav nav-tabs nav-tabs-bottom nav-justified flex-wrap"> 
											<li className="nav-item">
												<a className={"nav-link "+this.state.bookingactive}  href="#pat_appointments" data-toggle="tab" onClick={this.showcalendar}>

						


																<div className="search-event-block-subtitle2">
                                                                                     <i className="fas fa-calendar-check icon-basket search-event-icon-right-size"></i>
                                                                                        <label className="search-event-block-padding">{t('SpecTabText1')}</label>

                                                                                    </div>

												</a>
											</li> 
											<li className="nav-item">
												<a className={"nav-link "+this.state.messageactive} href="#pres"  data-toggle="tab" onClick={this.showmessage} >

	<div className="search-event-block-subtitle">
                                                                                     <i className="fas fa-comments icon-basket search-event-icon-right-size"></i>
                                                                                        <label className="search-event-block-padding">{t('SpecTabText2')}</label>

                                                                                    </div>
</a>

											</li> 
							 
											<li className="nav-item">
												<a className="nav-link" href="#billing" data-toggle="tab" onClick={this.showreview}>

												

<div className="search-event-block-subtitle1">
                                                                                     <i className="fas fa-star icon-basket search-event-icon-right-size"></i>
                                                                                        <label className="search-event-block-padding">{t('SpecTabText3')}</label>

                                                                                    </div>
												
</a>
											
											</li> 

											<li className="nav-item">
												<a className={"nav-link "+this.state.settingactive} href="#pro-setting" data-toggle="tab" onClick={this.showsetting}>
								


<div className="search-event-block-subtitle3"><i className="fas fa-user-cog icon-basket search-event-icon-right-size"></i><label className="search-event-block-padding">{t('SpecTabText4')}</label></div>
												 </a>
											</li>
										</ul>
									</div>
									<div className="tab-content"> 
					 {this.state.settingBox &&
										<div id="pro-setting"  className={"tab-pane show  "+this.state.settingactive}  >
											<div className="card">
												<div className="card-body">
													<h3 className="text-center">{t('SpecMainTitleSetting')}</h3> 


									 <div className="pdf_download">
										<p className="text-center">{t('SpecSubTitleSetting')}{t('SpecSubTitleSettingMandatory')}
										</p>
										<button id="pdf" className="button-container instruct-btn" >
											<i className="fa fa-download"></i> {t('SpecInstructionSettingButton')}
										</button></div>

										<h4 className="text-center hidden-md hidden-lg font-weight-bold">{t('SpecText1')}</h4>
                                        <GoToSection setName="private"/> 
											 
											<form>
												<h2 className="text-center  border-bottom">PRIVATE</h2>
												<p className="text-center mb-5">{t('SpecText2')}
												</p>
												<div className="row form-row">

													<div className="col-12 col-md-6">
														<div className="form-group">
															<label>First Name *</label>
															<input type="text" className="form-control"  value={this.state.name} onChange={(e)=> this.setState({ name: e.target.value})} readOnly/>
														</div>
													</div>

													<div className="col-12 col-md-6">
														<div className="form-group">
															<label>Surname *</label>
															<input type="text" className="form-control" value={this.state.surname} onChange={(e)=> this.setState({ surname: e.target.value})} readOnly/>
														</div>
													</div>
													<div className="col-12 col-md-6">
														<div className="form-group">
															<label>Email ID *</label>
															<input type="email" className="form-control" value={this.state.email} onChange={(e)=> this.setState({ email: e.target.value})}  readOnly/>
														</div>
													</div>
													<div className="col-12 col-md-6">
														<div className="form-group">
															<label>Mobile *</label>
															<div className="input-group">
																<div className="input-group-prepend">
																	<select value={this.state.stdcode} onChange={(e)=> this.setState({stdcode:e.target.value})}>
																		<option selected={this.state.stdcode=='+91'?'selected':null}>+91</option>
																		<option selected={this.state.stdcode=='+01'?'selected':null}>+01</option>
																		<option selected={this.state.stdcode=='+44'?'selected':null}>+44</option>
																	</select>
																</div>
																<input type="number" className="form-control"  placeholder="Mobile Number" value={this.state.mobile} onChange={(e)=> this.setState({ mobile: e.target.value})} />


															</div>
														</div> 
										     </div>  
											<div className="col-12 col-md-6">
												<div className="form-group"> 
													<label>Place of Residence *</label>
													<select className="form-control" value={this.state.country}  onChange={(e)=> this.countrydropdown(e.target.value) }>
														<option value="">Select Country</option>
														{this.state.countryData.map( (country)=> (
														   <option value={country.id}>{country.name}</option> 
														))} 
						                            </select>
												</div>
											</div>
											<div className="col-12 col-md-6">
												<div className="form-group">
													<label>Place of Birth *</label>
                                                    <select className="form-control" value={this.state.placeofbirth}  onChange={(e)=> this.placeofbirthdropdown(e.target.value) }>
														<option value="">Select Country</option>
														{this.state.countryData.map( (country)=> (
														   <option value={country.id}>{country.name}</option> 
														))} 
						                            </select>
												</div>
											</div>
											<div className="col-12 col-md-6">
												<div className="form-group"> 
													<label >ID Documents *</label>
													 <div className="row">
														<div className="col-md-6">
															<div className="upload-img"> 
																<div className="change-photo-btn">
																	<span><i className="fa fa-upload"></i> Identity Document *</span>
																	<input type="file" className="upload" onChange={this.fileChangedHandlerID1} />
																</div>
																<small className="form-text text-muted text-center"><b>  Front Side Image * </b> </small>
																   {this.state.fileidfront!=null ? <img src={this.state.fileidfront}  style={{"width" : "20%"}} />:
																    <img src={this.state.idfront} style={{"width" : "20%"}}  />	  
																   }
																    {this.state.idfront && (
          <button
            onClick={this.fileChangedCloseHandlerID1}
            style={{
              position: 'absolute',
              top: '45px',
              left: 0,
              backgroundColor: '#20c0f3',
              border: 'none',
              cursor: 'pointer',
             borderRadius: '50%',
             border: '1px solid',
             zIndex: '10000000000',
              color: 'white'
            }}
          >
          
            X
          </button>
        )}

        {this.state.idfrontback && (
          <button
            onClick={this.fileChangedCloseHandlerID1}
            style={{
              position: 'absolute',
              top: '45px',
              left: 0,
              backgroundColor: '#20c0f3',
              border: 'none',
              cursor: 'pointer',
             borderRadius: '50%',
             border: '1px solid',
             zIndex: '10000000000',
              color: 'white'
            }}
          >
          
            X
          </button>
        )}
																        
															</div>
														</div>
														<div className="col-md-6">
															<div className="upload-img"> 
																<div className="change-photo-btn">
																	<span><i className="fa fa-upload"></i> Identity Document *</span>
																	<input type="file" className="upload" onChange={this.fileChangedHandlerID2} />
																</div>
																<small className="form-text text-muted text-center"><b> Back Side Image *</b></small>
															     

{this.state.fileidback!=null ? <img src={this.state.fileidback}  style={{"width" : "20%"}} />:
																    <img src={this.state.idback} style={{"width" : "20%"}}  />	  
																   }

																    {this.state.idback && (
          <button
            onClick={this.fileChangedCloseHandlerID2}
            style={{
              position: 'absolute',
              top: '45px',
              left: 0,
              backgroundColor: '#20c0f3',
              border: 'none',
              cursor: 'pointer',
             borderRadius: '50%',
             border: '1px solid',
             zIndex: '10000000000',
              color: 'white'
            }}
          >
          
            X
          </button>
        )}


        			    {this.state.fileidback && (
          <button
            onClick={this.fileChangedCloseHandlerID2}
            style={{
              position: 'absolute',
              top: '45px',
              left: 0,
              backgroundColor: '#20c0f3',
              border: 'none',
              cursor: 'pointer',
             borderRadius: '50%',
             border: '1px solid',
             zIndex: '10000000000',
              color: 'white'
            }}
          >
          
            X
          </button>
        )}
															</div>
														</div>
														<div className="text-center" >
															<small className="form-text text-muted">Allowed PDF, JPG, GIF or PNG. Max size of 2MB</small></div>


														</div>
													</div>

												</div>
												<div className="col-12 col-md-3">
													<div className="form-group">
														<label>Date of Birth *</label>
														<div className="cal-icon">
                                                          <DatePicker selected={this.state.dob!=""?this.state.dob:''} className="form-control dropdownwidth2"  showMonthDropdown
      showYearDropdown
        onChange={(date)=> this.setState({dob:date})} />
														</div>
													</div>
											    </div>	
												
												<div className="col-12 col-md-3">
													<div className="form-group">
														<label> Main Consulting language * </label> 
                                                          <select className="form-control" value={this.state.language}  onChange={(e)=> this.setState({language:e.target.value}) }>
															  <option value="">please choose</option>
															  <option selected={this.state.language==1?'selected':null} value="1">English</option>
															  <option selected={this.state.language==2?'selected':null} value="2" >Itanian</option>
															  <option selected={this.state.language==3?'selected':null} value="3">Spanish</option>
														  </select> 
													</div>
												</div>


											</div>
								
										<div >
										<label>Qualifications</label>
										<small className="form-text text-muted">Our qualifications will be checked by the MedAloha staff. No document uploaded in this section will appear (just the relative icon). If you have already an Healthcare University Degree, the University Degree document is not needed to be uploaded anymore and the University Degree icon will not appear.</small></div>


										

										<div className="row"><div className="col-md-6"> 
											<div className="row">
												<div className="col-md-6">
													<label>&nbsp;</label>
													<div className="dont-have">
														<input type="checkbox" className="healthcheck"  checked={this.state.healthcare} onChange={(e)=> this.setState({ healthcare: e.target.checked})}  />
														  I have an Healthcare University Degree
														<br />	
														<img src="assets/icon/medicine.png" className="width-30" />
														<span className="dont-have">
															Medicine icon will appear
															publicly  
														</span>  

													</div>
												</div>
												<div className="col-md-6" >
												<div className="upload-img">
													<label className="hidden-xs">&nbsp;</label>
													<div className="change-photo-btn">
														<span><i className="fa fa-upload"></i> 	Medicine Degree</span>
														<input type="file" className="upload" onChange={this.fileChangedHandlerID3}  />
														{this.state.filemedicaldegree !=null ? 
																		<img src={this.state.filemedicaldegree} style={{"width" : "20%"}}  />	
																		:  <img src={this.state.medicaldegree} style={{"width" : "20%"}}  />  
																		}

 {this.state.filemedicaldegree!=null   && (
          <button
            onClick={this.fileChangedCloseHandlerID3}
            style={{
              position: 'absolute',
              top: '0px',
              right: '15px',
              backgroundColor: '#20c0f3',
              border: 'none',
              cursor: 'pointer',
             borderRadius: '50%',
             border: '1px solid',
             zIndex: '10000000000',
              color: 'black'
            }}
          >
          
            X
          </button>
        )}


        {this.state.medicaldegree!=null   && (
          <button
            onClick={this.fileChangedCloseHandlerID31}
            style={{
              position: 'absolute',
              top: '0px',
              right: '15px',
              backgroundColor: '#20c0f3',
              border: 'none',
              cursor: 'pointer',
             borderRadius: '50%',
             border: '1px solid',
             zIndex: '10000000000',
              color: 'black'
            }}
          >
          
            X
          </button>
        )}


       


													</div>
													<small className="form-text text-muted"></small> 
													<small className="form-text text-muted text-center" ><b>
													Upload  file with medical, pharmaceutical, biomedical degree, university exams, professional qualification and other relevant information.</b></small>

												</div>
											</div>

										</div>
									</div><div className="col-md-6"> 
										<div className="row">
											<div className="col-md-6">
												<label>&nbsp;</label>
												<div className="dont-have">
													<input type="checkbox" className="universitycheck" name="" checked={this.state.university} onChange={(e)=> this.setState({ university: e.target.checked})}  />
													I have a University Degree 

													<br />	
													<div className="margin-top-7">
														<img src="assets/icon/University_degree.png" className="width-30" />
														<span className="dont-have">Graduation icon will appear publicly
														</span>  
													</div>

												</div>
											</div>
											<div className="col-md-6">
												<div className="upload-img">
													<label className="hidden-xs">&nbsp;</label>
													<div className="change-photo-btn">
														<span><i className="fa fa-upload"></i>University Degree</span>
														<input type="file" className="upload"  onChange={this.fileChangedHandlerID4} />
														{this.state.fileuniversitydegree !=null ? 
																		<img src={this.state.fileuniversitydegree} style={{"width" : "20%"}}  />	
																		:  <img src={this.state.universitydegree} style={{"width" : "20%"}}  />	  
																		}


 {this.state.universitydegree!=null  && (
          <button
            onClick={this.fileChangedCloseHandlerID41}
            style={{
              position: 'absolute',
              top: '0px',
              right: '15px',
              backgroundColor: '#20c0f3',
              border: 'none',
              cursor: 'pointer',
             borderRadius: '50%',
             border: '1px solid',
             zIndex: '10000000000',
              color: 'black'
            }}
          >
          
            X
          </button>
        )}


{this.state.fileuniversitydegree!=null   && (
          <button
            onClick={this.fileChangedCloseHandlerID4}
            style={{
              position: 'absolute',
              top: '0px',
              right: '15px',
              backgroundColor: '#20c0f3',
              border: 'none',
              cursor: 'pointer',
             borderRadius: '50%',
             border: '1px solid',
             zIndex: '10000000000',
              color: 'black'
            }}
          >
          
            X
          </button>
        )}


													</div>
													

													<small className="form-text text-muted text-center"><b>
													Upload file with university degree, exams, professional qualification and other relevant information.</b>
													</small>
												</div>
											</div>

										</div>
									 </div></div>

								 	 <div className="text-center"><small className="form-text text-muted">Allowed PDF, JPG, GIF or PNG. Max size of 5MB</small></div>



									

										<div className="row margin-top-20"><div className="col-12 col-md-1 margin-top-10">
											
												<label>Other</label> 

											</div><div className="col-12 col-md-5">
												<div className="form-group"> 
													<input type="text" className="form-control" placeholder="Additional information to your MedAloha application"  value={this.state.other}  onChange={(e)=> this.setState({ other: e.target.value})}/>
												</div>

												

												</div><div className="col-md-6 col-12 text-center">
												<div className="upload-img text-center"> 
													<div className="change-photo-btn">
														<span><i className="fa fa-upload"></i>Additional info to upload</span>
														<input type="file" className="upload" onChange={this.fileChangedHandlerID5}  />
														{this.state.fileadditionaldegree !=null ? 
																		<img src={this.state.fileadditionaldegree} style={{"width" : "20%"}}  />	
																		:  <img src={this.state.additionaldegree} style={{"width" : "20%"}}  />	  
																		}


 {this.state.additionaldegree!=null  && (
          <button
            onClick={this.fileChangedCloseHandlerID51}
            style={{
              position: 'absolute',
              top: '0px',
              right: '15px',
              backgroundColor: '#20c0f3',
              border: 'none',
              cursor: 'pointer',
             borderRadius: '50%',
             border: '1px solid',
             zIndex: '10000000000',
              color: 'black'
            }}
          >
          
            X
          </button>
        )}


{this.state.fileadditionaldegree!=null   && (
          <button
            onClick={this.fileChangedCloseHandlerID5}
            style={{
              position: 'absolute',
              top: '0px',
              right: '15px',
              backgroundColor: '#20c0f3',
              border: 'none',
              cursor: 'pointer',
             borderRadius: '50%',
             border: '1px solid',
             zIndex: '10000000000',
              color: 'red'
            }}
          >
          
            X
          </button>
        )}




													</div>

												</div>
												<small className="form-text text-muted text-center">Allowed PDF, JPG, GIF or PNG. Max size of 5MB</small></div></div>

												<div className="row "> 
													<div className="col-md-12 mb-4">
														<div className="submit-section">
															<center>
																<button type="submit" className="btn btn-primary submit-btn mt-3" onClick={this.privateProfileUpdate}>Save Changes</button>
															</center>
														</div>
													</div>

													<div className="col-md-6">
														<div className="card border rounded p-2">
															<div className="card-title border-bottom p-3">
																Your Payment Account Information
															</div>
															<div className="card-body">
																<form>
																	<div className="row mb-4">
																		<div className="col-md-4" >
																			<label className=" mt-2 font-weight-bold" >Holder Name</label>
																		</div>
																		<div className="col-md-8">
																			<input type="text" placeholder="" className="form-control ml-3 w-100"  value={this.state.accountholder} onChange={(e)=> this.setState({ accountholder: e.target.value})} />
																		</div>

																	</div>
																	<div className="row mb-4">
																		<div className="col-md-4">
																			<label className=" mt-2 font-weight-bold">IBAN</label>
																		</div>
																		<div className="col-md-8">
																			<input type="text" placeholder="" className="form-control ml-3 w-100"  value={this.state.iban} onChange={(e)=> this.setState({ iban : e.target.value})} />
																		</div>  
																	</div>
																	<div className="row">
																		<div className="col-md-4">
																			<label className="mt-2 font-weight-bold">BIC</label>
																		</div>
																		<div className="col-md-8">
																			<input type="text" placeholder="" className="form-control ml-3 w-100" value={this.state.bic} onChange={(e)=> this.setState({ bic : e.target.value})} />
																		</div>

																	</div>

																	<div className="submit-section mt-3 col-md-12">
																		<button type="submit" className=" offset-md-3 btn btn-primary submit-btn" onClick={this.paymentInformation} >Save Changes</button>
																	</div>
																</form>
															</div>
														</div>
													</div>
													<div className="col-md-6">
														<div className="card border rounded p-2">
															<div className="card-title border-bottom p-3">
																Change Password
															</div>
															<div className="card-body">
																<form>
																	<div className="row mb-4">
																		<div className="col-md-4">
																			<label className=" mt-2 font-weight-bold">Current *</label>
																		</div>
																		<div className="col-md-8">
																			<input type="password" placeholder="******" className="form-control ml-3 w-100" value={this.state.currentpassword}  onChange={(e)=>this.setState({currentpassword:e.target.value})}/>
																		</div>

																	</div>
																	<div className="row mb-4">
																		<div className="col-md-4">
																			<label className=" mt-2 font-weight-bold">New</label>
																		</div>
																		<div className="col-md-8">
																			<input type="password" placeholder="" className="form-control ml-3 w-100" value={this.state.newpassword}  onChange={(e)=>this.setState({newpassword:e.target.value})} />
																		</div>

																	</div>
																	<div className="row">
																		<div className="col-md-4">
																			<label className="mt-2 font-weight-bold">Re-Type New</label>
																		</div>
																		<div className="col-md-8">
																			<input type="password" placeholder="" className="form-control ml-3 w-100" value={this.state.confirmpassword}  onChange={(e)=>this.setState({confirmpassword:e.target.value})} />
																		</div>

																	</div>

																	<div className="submit-section mt-3 col-md-12">
																		<button type="submit" className=" offset-md-3 btn btn-primary submit-btn" onClick={this.changepassword}> Change Password</button>
																	</div>
																</form>
															</div>
														</div>
													</div>
												</div>

											</form> 

										</div>
									</div>
								        </div>
								  }
								  
								{this.state.calendarBox &&
								<div id="pat_appointments"  className={"tab-pane  search-box "+this.state.bookingactive} >
								 	<div className="row">



<div className="col-12 text-sm-right hidden-md hidden-lg">
 		<button type="button" className="mb-2 btn btn-info btn-sm" data-toggle="collapse" data-target="#lege" aria-expanded="true">Legend 
 		   <i className="fas fa-chevron-down ml-2"></i>
 							</button> 
							  <div id="lege" className="collapse show"> 
							     <div className="row">
								 	<div className=" d-flex">
								 		<div style={{height:'30px',width: '30px',backgroundColor:'#ffffc6'}}>
 										</div>
 										<span className="p-2 pb-0">Video</span>
								 	</div>
								</div>
					
					
 									<hr style={{marginTop:'0.5rem!important', marginBottom:'0.5rem!important'}}/>

								 <div className="row">
								 	<div className=" d-flex">
								 		<div style={{height:'30px',width: '30px',backgroundColor:'#f4c15080'}}>
 										</div>
 										<span className="p-2 pb-0">Video PART</span>
								 	</div>
								</div>
							


 									<hr style={{marginTop:'0.5rem!important', marginBottom:'0.5rem!important'}}/>


									<div className="row d-flex">
								 	 <div className=" d-flex">
 											<div style={{height:'30px',width: '30px',backgroundColor:'orange'}}>
 											</div>
 											<span className="p-2 pb-0">Video FULL </span>
 						     				</div>
 									</div>
 							

 									<hr style={{marginTop:'0.5rem!important', marginBottom:'0.5rem!important'}}/>


 									 <div className="row d-flex">
								 		<div className=" d-flex"> 
 											<div style={{height:'30px',width: '30px',backgroundColor:'#e6f1fb'}}>
 											</div>
 										<span className="p-2 pb-0">In-person</span>
 										</div>
 									</div>

 									<hr style={{marginTop:'0.5rem!important', marginBottom:'0.5rem!important'}}/>
 									 

 									 <div className="row d-flex">
								 		<div className=" d-flex"> 
 											<div style={{height:'30px',width: '30px',backgroundColor:'#abd0f5'}}>
 											</div>
 										<span className="p-2 pb-0">In-person PART</span>
 										</div>
 									</div>

 								
 									<hr style={{marginTop:'0.5rem!important', marginBottom:'0.5rem!important'}}/>
 									 <div className="row d-flex">
								 		<div className=" d-flex"> 
 											<div style={{height:'30px',width: '30px',backgroundColor:'#a3a3f9'}}>
 											</div>
 										<span className="p-2 pb-0" >In-person FULL</span>
 										</div>
 									</div>
 									
 							
						</div>	
						</div>	



















										<div className="col-md-9 col-12">
											   <h3 className="text-center text-dark mb-4">AGENDA SCHEDULING</h3> 
										        <BookingCalendar/> 
										</div> 
										<div className="col-md-3"> 
											<div className="hidden-xs hidden-sm">
												<h4 className="mb-4">Legend:</h4>
             {this.state.Consultation.map( (consult)=> (
                        <>
						<div className="row">
							<div className="d-flex">
								<div className={this.state.consultColorArray[consult.id] + '-div'}>
								</div>
								<span className={this.state.consultColorArray[consult.id] + ' p-2'}>{consult.legend_name}</span>
							</div>
						</div>
						<hr className="custom-hr" />  
                        </>
              ))} 
			 
												 

 
									 <div className="row">
									 	   <div className=" mb-5">
									 		<span className="p-2"> &nbsp;  </span>
									 		</div>
									 	</div>
									 
								 
									<div id="modal1" className="modal">
										<div className="modal-content">
											<a href="#!" className=" text-right modal-action modal-close waves-effect waves-green btn-flat">Close</a>
											<h4 className="text-muted text-center">Add Slot</h4>

											<p>Slot*</p>
											<form className="d-block">

												<div className="form-group form-focus focused">
													<input  required type="date" className="w-100 form-control floating datepicker" />
													<label className="focus-label">Date </label>
												</div>
												<div className="form-group form-focus focused">
													<input className="w-100"required type="time" className="form-control floating timepicker" />
													<label className="focus-label">Time </label>
												</div>
												<button className="btn btn-primary btn-block " type="submit">Send</button>
											</form>

										</div>

									</div> 
							 

							 
						</div>
					                      </div>
			                         </div>

									 <div className="row">
									 <div className="col-md-12"> 
											<div className=""> 
								<div className="card card-table mb-0">
									<div className="card-body ">  

 {this.state.booking_history=='' &&
<tr><td colSpan='9'><p style={{textAlign:'center',color:'red'}}>Data not found</p></td></tr>
}

{this.state.booking_history!='' &&
    <SpecialistBookingHistory/>
}
						</div>
						</div>

						</div>
					                      </div>
									 </div>
                                 </div> 
	                            }

{this.state.messageBox &&
<div   id="pres" className={"tab-pane  search-box "+this.state.messageactive}> 
	<div className="col-xl-12">
	<div className="chat-window"> 
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
				 <div className="tab-pane" id="billing"> 
				 <div className="widget review-listing mt-3">
					<h2 className="text-center">Reviews  :</h2>
					<ul className="comments-list"> 
					 
{this.state.reviewData && this.state.reviewData.length!=0?
this.state.reviewData.map( (review)=> ( 	   
					     	<li>
							<div className="comment">
							<img className="avatar avatar-sm rounded-circle" alt="User Image" src={(review.u_image===null)?process.env.REACT_APP_URL+'/assets/img/doctors/doctor-thumb-02.jpg':`${process.env.REACT_APP_BASE_URL}/public/uploads/profile/${review.u_image}`}  />
								<div className="comment-body">
									<div className="meta-data">
										<span className="comment-author">{review.u_first_name+' '+review.u_last_name}</span>
										<span className="comment-date"> {this.convert(review.created_at)} , Message Consultation</span>
										

										{(review.recommend_status==1)?<p className="recommended"><i className="far fa-thumbs-up font-size-20"></i> I recommend this Specialist</p>:<p className="comment-content">
						<span className="text-danger"><i className="far fa-thumbs-down text-danger font-size-20"></i> I do not recommend this Specialist</span></p>}
											<div className="review-count rating">
													{
												     this.printReviewStar(review.review_star)
												    } 
											</div>
										</div>
										<p className="comment-content">
											{review.review_desc}
										</p>

									</div>
								</div>
								<div className="container">
									<div className="row">
										<div className="col-md-2">&nbsp;</div>
										<div className="col-md-8">
											<div className="comment">
												<img className="avatar avatar-sm rounded-circle" alt="User Image" src={`${process.env.REACT_APP_BASE_URL}/public/uploads/docs/${review.profile_photo}`}  />
								<div className="comment-body w-100">
													<div className="meta-data">
														<span className="comment-author">{review.first_name+' '+review.last_name} </span>
														<span className="comment-date">Specialist</span>
													</div>
													{this.state.getreplyData.map( (reply)=> (
												    	<p className="comment-content">{reply.reply_desc}</p>
													 ))}
											     	{(this.state.getreplyData.length>0)?'':<textarea className="form-control w-100"  onChange={this.handleInputChanged.bind(this)}></textarea>}
												</div>
											</div>
										</div>
										<div className="col-md-2">
											<h4>&nbsp;</h4>
											{(this.state.getreplyData.length>0)?'':<button className="btn btn-info mt-5" onClick={() => this.handleButtonClicked(review.review_id,review.u_email)}>Reply</button>}
										</div>
									</div>
								</div> 
							</li> 
							)) : <li style={{textAlign:"center",color:'red'}}>Review Not found.</li>} 

							</ul>

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


export default withTranslation()(PrivateSetting);
