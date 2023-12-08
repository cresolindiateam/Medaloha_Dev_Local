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
import SpecialistBookingHistory from '../Components/SpecialistBookingHistory';
// const { t, i18n } = useTranslation(); 
import ChatScreen from "../Components/ChatScreen";
import { red } from '@material-ui/core/colors';
require('dotenv').config();

function settingLanguage(lang){ 
     i18n.changeLanguage(lang);
 }

class Publicintro extends React.Component {   
    
    constructor(props) { 

        super(props);
	  	 this.state = { checked: false };
         this.handleChange = this.handleChange.bind(this);
		 this.state = { checked2: false };
         this.handleChange2 = this.handleChange2.bind(this); 
		 this.checkboxhandleChange = this.checkboxhandleChange.bind(this);
		 this.checkboxhandleChange2 = this.checkboxhandleChange2.bind(this);
         this.state = {
			 id:0,
            title: "" ,
           studies : "", 
		   holisticData : [],
		   tagsData : [],
		   countryData : [],
		   cityData : [],
		   redirect:false,  
           profilepic:null,
		   activityimage1:null,
		   activityimage2:null ,
		   activityimage3:null,
		   activityimage4:null  ,
		   calendarBox:false,
		   settingBox:true,
		   reviewBox:false,
		   messageBox:false, 
		   tagselectedData:[],
		   holisticelectedData:[],
		   experience:"",
		   language_id:"",
		   fullname:"",
		   country:"",
		   city:"",
		   checkedTags:false,
		   lanaguageInfo:'',
		   getreplyData:[],
		   booking_history:[],
		   finalTagData:[],
		   finalTagDataChecked:[],
		   tagsSelectDBData:[],
		   finalTagData4:[],
		   finalTagData4Checked:[],
		   suggest_category:'',
		   suggest_tag:'',
		   c_name: "" ,
			c_surname : "",
			c_image:"assets/img/doctors/doctor-thumb-02.jpg", 
			spec_image:"",
			name: "" ,
			surname : "",
			reviewdata:[],
			fileprofilepic:null,
			fileactivityimage1:null,
			fileactivityimage2:null,
			fileactivityimage3:null,
			fileactivityimage4:null,
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
	


	 checkboxhandleChange(event) {  
		const target = event.target;
		var value = target.value;
		console.log('checkboxhandleChange');
		console.log(value);
		
		console.log(this.state.finalTagDataChecked);
	
		// this.state.finalTagDataChecked.forEach((element, index) => {
		// 	if(element)
		// 	this.state.tagselectedData[index] = index;  
		// });

		// if(target.checked){
		//    this.state.tagselectedData[value] = value;  
		// }else{
		//   this.state.tagselectedData.splice(value, 1);
		// }

		console.log(this.state.tagselectedData);

     }  

	 checkboxhandleChange2(event) {  
		const target = event.target;
		var value = target.value;
		 
		// if(target.checked){
		//    this.state.holisticelectedData[value] = value;  
		// }else{
		//   this.state.holisticelectedData.splice(value, 1);
		// }
     }  

 
	
			fileChangedHandlerID1 = event => {
				console.log(event.target.files);
				this.setState({ profilepic: event.target.files[0] })
				this.setState({
					fileprofilepic: URL.createObjectURL(event.target.files[0])
				  })
			} 

			fileChangedHandlerActivity1 = event => {
				console.log(event.target.files);
				this.setState({ activityimage1: event.target.files[0] })
				this.setState({
					fileactivityimage1: URL.createObjectURL(event.target.files[0])
				  })
			}  

			fileChangedHandlerActivity2 = event => {
				console.log(event.target.files);
				this.setState({ activityimage2: event.target.files[0] })
				this.setState({
					fileactivityimage2: URL.createObjectURL(event.target.files[0])
				  })
			} 

			fileChangedHandlerActivity3 = event => {
				console.log(event.target.files);
				this.setState({ activityimage3: event.target.files[0] })
				this.setState({
					fileactivityimage3: URL.createObjectURL(event.target.files[0])
				  })
			} 

			fileChangedHandlerActivity4 = event => {
				console.log(event.target.files);
				this.setState({ activityimage4: event.target.files[0] })
				this.setState({
					fileactivityimage4: URL.createObjectURL(event.target.files[0])
				  })
			} 
      
				handleChange() {
					this.setState({
					checked: !this.state.checked
					});
				}

				handleChange2() {
					this.setState({
					checked2: !this.state.checked2
					});
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



		console.log(localStorage.getItem('i18nextLng'));

		axios.get(process.env.REACT_APP_BASE_URL+`/specilistAPI/GetSpecialistBooking?specialist_id=`+localStorage.getItem('specialist_id'))
		.then(res => {
			   console.log('booking start'); 
			   console.log(res.data);  
			   this.setState({booking_history : res.data}); 
         }); 

		
		axios.get(process.env.REACT_APP_BASE_URL+`/authenticationAPI/GetAllCountry`)
		.then(res => {
			this.setState({countryData : res.data});
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
		

		axios.get(process.env.REACT_APP_BASE_URL+`/specilistAPI/getReply?specialist_id=`+localStorage.getItem('specialist_id'))
		.then(res => { 
			this.setState({getreplyData : res.data.Data}); 
		}); 

		axios.get(process.env.REACT_APP_BASE_URL+`/specilistAPI/userSpecialistReviewListing?specialist_id=`+localStorage.getItem('specialist_id'))
		.then(res => {
			this.setState({reviewData : res.data.Data});
		     console.log(res.data.Data);
		});   
		
		console.log('res.data------->111');
		axios.get(process.env.REACT_APP_BASE_URL+`/specilistAPI/GetSpecialistTagsByID?specialist_id=`+localStorage.getItem('specialist_id')+'&language_id='+localStorage.getItem('i18nextLng')+'&seetingLanguage='+localStorage.getItem('SettingLanguage'))
		.then(res => {
			console.log('res.data------->');
			console.log(res.data);
			if(res.data['Status']){
			   // var tagsSelectData = res.data['Result'];  
			   // this.setState({tagsData : res.data['GetAllTags']}); 
				var finalTagData2 = [];
				res.data['GetAllTags'].forEach((element, index) => {
				  var checkedv = false;
					  //tagsSelectDBData
					  this.state.finalTagDataChecked[element.id]=false;
					  console.log('finalTagDataChecked');
					  console.log(this.state.tagsSelectDBData); 
					  res.data['SelectedResult'].forEach((Inelement) => {
						   if(parseInt(Inelement.tags)==parseInt(element.id)){
							  this.state.finalTagDataChecked[element.id]=true;
						   }
					  });  
					  finalTagData2.push({'id':element.id,'name':element.tag_name})
					  this.setState({finalTagData : finalTagData2});
				});
			  
				
			} 
		   // this.setState({countryData : res.data});
		}); 

		axios.get(process.env.REACT_APP_BASE_URL+`/specilistAPI/GetSpecialistHolisticByID?specialist_id=`+localStorage.getItem('specialist_id')+'&language_id='+localStorage.getItem('i18nextLng')+'&seetingLanguage='+localStorage.getItem('SettingLanguage'))
		.then(res => {
			console.log('res.data------->2');
			console.log(res.data);
			if(res.data['Status']){
			   // var tagsSelectData = res.data['Result'];  
			   // this.setState({tagsData : res.data['GetAllTags']}); 
				var finalTagData4 = [];
				res.data['GetAllHolistic'].forEach((element, index) => {
				  var checkedv = false;
					  //tagsSelectDBData
					  this.state.finalTagData4Checked[element.id]=false;
					  console.log('finalTagDataChecked44');
					  console.log(res.data['SelectedResult']); 
					  res.data['SelectedResult'].forEach((Inelement2) => {
						   if(parseInt(Inelement2.holistic_name)==parseInt(element.id)){
							  this.state.finalTagData4Checked[element.id]=true;
						   }
					  });  
					  finalTagData4.push({'id':element.id,'name':element.category_name})
					  this.setState({finalTagData4 : finalTagData4});
				});
			  
				
			} 
		   // this.setState({countryData : res.data});
		}); 
	
		 
        axios.get(process.env.REACT_APP_BASE_URL+`/specilistAPI/GetSpecialistPublicIntroByID?specialist_id=`+localStorage.getItem('specialist_id')+'&language_code='+localStorage.getItem('i18nextLng')+'&seetingLanguage='+localStorage.getItem('SettingLanguage'))
	  	 .then(res => {
			
		    	//this.setState({countryData : res.data});
		 
				this.setState({fullname:res.data[0]['first_name'] + " "+ res.data[0]['last_name']});
				if(res.data[0]['profile_photo'])
				{
					this.setState({profilepic: process.env.REACT_APP_BASE_URL+"/public/uploads/docs/"+res.data[0]['profile_photo']});
					localStorage.setItem("UserProfileImage",process.env.REACT_APP_BASE_URL+"/public/uploads/docs/"+res.data[0]['profile_photo']);
				}
			

				this.setState({language_id:res.data[0]['language_id']});  
				this.setState({id:res.data[0]['Spcialist_id']});  
				this.setState({title:res.data[0]['your_title']});
				this.setState({studies:res.data[0]['your_studies']});
				this.setState({experience:res.data[0]['work_experience']});
				this.setState({country:res.data[0]['country_id']}); 
				this.countrydropdown(res.data[0]['country_id']);
				this.setState({city:res.data[0]['city_id']});
				if(res.data[0]['activity_image1'])
				this.setState({activityimage1: process.env.REACT_APP_BASE_URL+"/public/uploads/docs/"+res.data[0]['activity_image1']});
		   
				if(res.data[0]['activity_image2'])
				this.setState({activityimage2: process.env.REACT_APP_BASE_URL+"/public/uploads/docs/"+res.data[0]['activity_image2']});
				
				if(res.data[0]['activity_image3'])
				this.setState({activityimage3: process.env.REACT_APP_BASE_URL+"/public/uploads/docs/"+res.data[0]['activity_image3']});
   
				if(res.data[0]['activity_image4'])
				this.setState({activityimage4: process.env.REACT_APP_BASE_URL+"/public/uploads/docs/"+res.data[0]['activity_image4']});
				  
			

		 });
 

			axios.get(process.env.REACT_APP_BASE_URL+`/authenticationAPI/GetAllCityByCountryID?country_id=`+this.state.country)
			.then(res => {
				this.setState({cityData : res.data});
			// console.log(res.data);
			}); 
		 

	
		 
		 axios.get(process.env.REACT_APP_BASE_URL+`/authenticationAPI/GetAllCategoryByLanguage?language_id=`+this.state.language_id)
		 .then(res => {
			 this.setState({holisticData : res.data});
			// console.log(res.data);
		 });  
	  }
 
	 
	  countrydropdown(countryvalue) {
		this.setState({ country: countryvalue});
		axios.get(process.env.REACT_APP_BASE_URL+`/authenticationAPI/GetAllCityByCountryID?country_id=`+countryvalue)
		.then(res => {
			this.setState({cityData : res.data});
		   // console.log(res.data);
		}); 
	  }

	  

    //  placeofbirthdropdown(countryvalue){
	// 	this.setState({ placeofbirth: countryvalue});
	//   }  
 

	  SavePublicIntroInformation =(e) => { 
        e.preventDefault();   

		console.warn(this.state);
		
        if(this.state.title==""){
            alert('Please enter title.');
            return false;
        }

        if(this.state.studies==""){
            alert('Please enter your studies.');
            return false;
        }

        if(this.state.experience==""){
            alert('Please enter experience.');
            return false;
         }

         if(this.state.country==""){
            alert('Please enter country.');
            return false;
         }

         if(this.state.city==null){
            alert('Please enter place of birth.');
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

		 this.state.finalTagDataChecked.forEach((element, index) => {
			if(element)
			this.state.tagselectedData[index] = index;  
		});


		this.state.finalTagData4Checked.forEach((element, index) => {
			if(element)
			this.state.holisticelectedData[index] = index;  
		});


		if(this.state.holisticelectedData.length==0){
			alert('Please checked Holistic.');
            return false;
		}

		if(this.state.tagselectedData.length==0){
			alert('Please checked Tags.');
            return false;
		}


      if(this.state.profilepic==null){
			alert('Please choose your profile pic.');
            return false;
		} 

         const data = new FormData(); 
         data.append('profilepic',this.state.profilepic); 
         data.append('activityimage1',this.state.activityimage1); 
		 data.append('activityimage2',this.state.activityimage2); 
		 data.append('activityimage3',this.state.activityimage3); 
		 data.append('activityimage4',this.state.activityimage4); 
         data.append('specialist_id',localStorage.getItem('specialist_id'));
         data.append('title',this.state.title);
         data.append('studies',this.state.studies);
         data.append('experience',this.state.experience);
         data.append('holisticData',this.state.holisticelectedData);
         data.append('tagsData',this.state.tagselectedData);
         data.append('country',this.state.country);
         data.append('city',this.state.city); 
		 data.append('language_id',localStorage.getItem('i18nextLng')); 
		 data.append('setting_lanaguage_id',localStorage.getItem('SettingLanguage'));  
		 data.append('public_intro_id',this.state.id); 

		if(this.state.suggest_category!='')
		{
			data.append('suggest_category',this.state.suggest_category); 
		} 
		if(this.state.suggest_tag!='')
		{
			data.append('suggest_tag',this.state.suggest_tag); 
		} 
         console.log(data); 

		 axios.post(process.env.REACT_APP_BASE_URL+`/specilistAPI/updatePublicintro`,data)
		 .then(res => {
			 //this.setState({countryData : res.data});
		    console.log(res.data);
			
			if(res.data.Status) 
			{ 
				this.setState({id:res.data.PublicIntro_id});
				alert('Update successfully'); 
				window.location.reload();
			}
			else 
			alert(res.data.Message);
			
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

							
								<div class="card card-table mb-0">
									<div class="card-body "> 
										 
 {this.state.booking_history=='' &&
 <p style={{textAlign:'center',color:'red'}}>Data not found</p>
}
{this.state.booking_history!='' &&
<SpecialistBookingHistory/>
}
										
										
															</div>
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
											<h3 class="text-center">
											PUBLIC   {this.state.lanaguageInfo && this.state.lanaguageInfo!='null' ?  "For "+ this.state.lanaguageInfo : null }</h3><hr/>
											<p class="text-center"> 
											   <InnerPagesLinks /> 
											</p>
											<div class="mt-5" id="intro">
												<h3 class=" mb-2 text-center">INTRO (1/5)</h3>
												<p class="mb-4 text-center">
												  {t('SpecIntroText1')}
												</p>
											 
												<form>
													<input type="hidden" name="public_intro_id" value={this.state.id} />
													<div class="row form-row"> 
														<div class="col-12 col-md-6">
															<div class="form-group">
																<label>Full Name *</label>
																<input type="text" class="form-control" value={this.state.fullname}  placeholder="Name SURNAME" onChange={(e)=> this.setState({fullname:e.target.value})} disabled />
															</div>
														</div>

														<div class="col-12 col-md-6">
															<div class="form-group">
																<label>Your Title *</label>
																<input type="text" class="form-control" placeholder="Presentation Title (e.g.: Gut Health Naturopath)" value={this.state.title}  onChange={(e)=> this.setState({title:e.target.value})} />
															</div>
														</div>
														<div class="col-12 col-md-8">
															<div class="form-group">
																<label>Your Studies *</label>
																<input type="text" class="form-control" placeholder="Studies (e.g.: MSc Neuroscience, Naturopathy)"  value={this.state.studies}  onChange={(e)=> this.setState({studies:e.target.value})} />
															</div>
														</div>
														<div class="col-12 col-md-4">
															<div class="form-group">
																<label>Year(s) of experience</label>
																<input type="number" class="form-control" placeholder="Number (e.g.: 3)"  value={this.state.experience}  onChange={(e)=> this.setState({experience:e.target.value})} />
															</div>
														</div>


														<div class="col-12 col-md-4">
															<div class="form-group">
																<div class="selectBox" onClick={showCheckboxes1}>
																	<label>Holistic Fields (max. 2) *</label> 
																	<select class="form-control">
																		<option>Choose your fields</option> 
																	</select>  
																	<div class="overSelect1">
																	</div>
																</div>
															 	<div id="checkboxes1">
																		{this.state.finalTagData4.map( (category,index)=> (
																			
																			<label for={category.id}>
																			<input type="checkbox"  checked={this.state.finalTagData4Checked[category.id]}
																		onChange={(e)=> {
																		   let { finalTagData4Checked } = this.state;
																		   finalTagData4Checked[category.id] = !finalTagData4Checked[category.id]; 
																		   this.setState({finalTagData4Checked}); 
																		   this.checkboxhandleChange2(e);
																  }
														  }    value={category.id} /> {category.name}</label>
													 					))}  
																    <label for="sn"> <input type="checkbox" id="sn" checked={ this.state.checked2 }  onChange={ this.handleChange2 } /> OR SUGGEST NEW FIELD</label>
  																</div>
															 </div>
														 </div>
											 

								 { this.state.checked2 &&  							
											<div class="col-12 col-md-4">
												<label>&nbsp;</label>
												<div class="input-group mb-2">
													<input type="text" class="form-control" placeholder="Suggest us a New Field" aria-label="Recipient's username" aria-describedby="basic-addon2" onChange={(e)=> this.setState({suggest_category:e.target.value})} /> 
												</div>
											</div> }


											<div class="col-12 col-md-4">
												<div class="form-group">
													<div class="selectBox" onClick={showCheckboxes}>
														<label>Tags (max. 10)</label>
														<select class="form-control" autocomplete="off">
															<option>Choose your tags</option>
														</select  >
														<div class="overSelect">
														</div>
													</div>
													<div id="checkboxes">
													  {this.state.finalTagData.map( (tags,index)=> (
														 <label for={tags.id}>
															 <input type="checkbox"  checked={this.state.finalTagDataChecked[tags.id]}
														 onChange={(e)=> {
															let { finalTagDataChecked } = this.state;
															finalTagDataChecked[tags.id] = !finalTagDataChecked[tags.id]; 
															this.setState({finalTagDataChecked}); 
															this.checkboxhandleChange(e);
												   }
										   }    value={tags.id} /> {tags.name}</label>
													  ))}  
														
                                      				  <label for="snt"> <input type="checkbox" id="snt"  checked={ this.state.checked }  onChange={ this.handleChange} /> OR SUGGEST NEW TAG</label>
																								</div>
																							</div>
																						</div>

																						{ this.state.checked && 
																							<div class="col-12 col-md-4">
																								<label>&nbsp;</label>
																								<div class="input-group mb-2">
																									<input type="text" class="form-control" placeholder="Suggest us a New Tag" aria-label="Recipient's username" aria-describedby="basic-addon2" onChange={(e)=> this.setState({suggest_tag:e.target.value})} />
																								 
																								</div>
																							</div> 
																						 }

																						<div class="col-12 col-md-5">
																							<div class="">
																								<label>Set your location</label>
																								<select class="form-control" value={this.state.country} onChange={(e)=> this.countrydropdown(e.target.value) }>
																								<option>Select Country</option>
																									{this.state.countryData.map( (country)=> (
																									<option value={country.id}>{country.name}</option> 
																									))} 
																								</select>
																							</div>
																						</div>
																						<div class="col-12 col-md-5">
																							<div class="form-group">
																								<label> </label>  
																							   <select class="form-control mt-2" value={this.state.city} onChange={(e)=> this.setState({ city: e.target.value})}>
																									<option>Select City</option>
																									{this.state.cityData.map( (city)=> (
																										<option  selected={city.id==this.state.city?'selected':null} value={city.id}>{city.name}</option> 
																									))} 
																								</select> 								
																							</div>
																						</div>

																						<div class="col-12 col-md-12 mb-4">
																							<div class="upload-img">
																								<label>Profile Photo *</label>
																								{this.state.fileprofilepic!=null ? 
																									 <img src={this.state.fileprofilepic} style={{"width" : "5%"}}  />	
																									 :   <img src={this.state.profilepic} style={{"width" : "5%"}}  />	  
																									}
																								<div class="change-photo-btn ml-0 hidden-sm hidden-xs">
																									<span><i class="fa fa-upload"></i> Profile Photo *</span>
																									<input type="file" class="upload"  onChange={this.fileChangedHandlerID1} />
																								
																								</div>

																								<div class="change-photo-btn hidden-md hidden-lg">
																									<span><i class="fa fa-upload"></i> Profile Photo *</span>
																									<input type="file" class="upload"  onChange={this.fileChangedHandlerID1} />
																								</div>

																								<small class="form-text text-muted"> Please upload a square image (e.g. 100*100)</small>
																								<small class="form-text text-muted"> Allowed JPG, GIF or PNG. Max size of 2MB</small>


																							</div>
																						</div>

																						 


																						<lebel>Other pics concerning your activity (max 4)</lebel>
																						<div class="row">
																							<div class="col-md-3">
																								<div class="upload-img">
																									<label>&nbsp;</label>
																									
																									<div class="change-photo-btn">
																										<span><i class="fa fa-upload"></i> 	Other pics</span>
																										<input type="file" class="upload" onChange={this.fileChangedHandlerActivity1} />
																									</div>
																									<small class="form-text text-muted text-center"> Allowed JPG, GIF or PNG. Max size of 2MB</small>
																									{this.state.fileactivityimage1 !=null ? 
																									 <img src={this.state.fileactivityimage1} style={{"width" : "20%"}}  />	
																									 :  <img src={this.state.activityimage1} style={{"width" : "20%"}}  />	  
																									}
																								</div>
																							</div>
																							<div class="col-md-3">
																								<div class="upload-img">
																									<label>&nbsp;</label>
																									<div class="change-photo-btn">
																										<span><i class="fa fa-upload"></i> 	Other pics</span>
																										<input type="file" class="upload" onChange={this.fileChangedHandlerActivity2} />
																									</div>
																									<small class="form-text text-muted text-center"> Allowed JPG, GIF or PNG. Max size of 2MB</small>
																									{this.state.fileactivityimage2 !=null ? 
																									 <img src={this.state.fileactivityimage2} style={{"width" : "20%"}}  />	
																									 :   <img src={this.state.activityimage2} style={{"width" : "20%"}}  />	  
																									}
																								</div>
																							</div>
																							<div class="col-md-3">
																								<div class="upload-img">
																									<label>&nbsp;</label>
																									<div class="change-photo-btn">
																										<span><i class="fa fa-upload"></i>Other pics</span>
																										<input type="file" class="upload" onChange={this.fileChangedHandlerActivity3} />
																									</div>
																									<small class="form-text text-muted text-center"> Allowed JPG, GIF or PNG. Max size of 2MB</small>
																									{this.state.fileactivityimage3!=null ? 
																									 <img src={this.state.fileactivityimage3} style={{"width" : "20%"}}  />	
																									 :   <img src={this.state.activityimage3} style={{"width" : "20%"}}  />	  
																									}

																								</div>
																							</div>
																							<div class="col-md-3">
																								<div class="upload-img">
																									<label>&nbsp;</label>
																									<div class="change-photo-btn">
																										<span><i class="fa fa-upload"></i> Other pics</span>
																										<input type="file" class="upload" onChange={this.fileChangedHandlerActivity4} />
																									</div>
																									<small class="form-text text-muted text-center"> Allowed JPG, GIF or PNG. Max size of 2MB</small>
																									{this.state.fileactivityimage4!=null ? 
																									 <img src={this.state.fileactivityimage4} style={{"width" : "20%"}}  />	
																									 :   <img src={this.state.activityimage4} style={{"width" : "20%"}}  />	  
																									}
																								</div>
																							</div>

																						</div>
																					</div>
																					<div class="col-md-12">
																						<center>
																							<button type="submit" class=" mt-5 btn btn-primary btn-lg submit-btn mb-4" onClick={this.SavePublicIntroInformation}>Save Changes</button>
																						</center>
																					</div>
																					<div class="row">
																						<div class="col-md-6"></div>
																						<div class="col-md-6">
																							<center>
																								<a href={"publicconsultation#consult"} class=" mt-5 btn  btn-warning btn-sm submit-btn mb-4">Next {">>"} </a>
																							</center>
																						</div>
																					</div>

																				</form>

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


export default withTranslation()(Publicintro);
