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

class Publicextra extends React.Component {   
    
    constructor(props) {  
        super(props); 
         this.state = {
				id:0,
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
				message_price:'',
				message_part_price:'',
				message_full_price:'',
				video_price:'',
				video_part_price:'',
				video_full_price:'',
				inperson_price:'',
				inperson_part_price:'',
				inperson_full_price:'', 
				message_price_commissions:'',
				message_part_price_commissions:'',
				message_full_price_commissions:'',
				video_price_commissions:'',
				video_part_price_commissions:'',
				video_full_price_commissions:'',
				inperson_price_commissions:'',
				inperson_part_price_commissions:'',
				inperson_full_price_commissions:'', 
				calendarBox:false,
				settingBox:true,
				reviewBox:false,
				messageBox:false, 
				getreplyData:[],
				inpersonCommission:0,
				videoCommission:0,
				messageCommission:0,
				booking_history:[],
				messageCount:[],
				videoCount:[],
				inpersonCount:[],
				audioCount:[],	
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

	
	axios.get(process.env.REACT_APP_BASE_URL+`/specilistAPI/GetLegendCommission`)
	.then(res => { 
		console.log('legends commission');	console.log(res.data);

		if(res.data[0]['legends_type']==1)
		this.setState({"messageCommission":res.data[0]['commission_percentage']})
	 
		if(res.data[1]['legends_type']==2)
		this.setState({"videoCommission":res.data[1]['commission_percentage']})
	 

		if(res.data[2]['legends_type']==3)
		this.setState({"inpersonCommission":res.data[2]['commission_percentage']})
	 

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

	
	
        axios.get(process.env.REACT_APP_BASE_URL+`/specilistAPI/GetSpecialistConsultationByID?specialist_id=`+localStorage.getItem('specialist_id'))
	  	 .then(res => {
		    console.log('GetSpecialistConsultationByID');
            console.log(res.data); 
	        var ConsultationData = res.data;
		    // ConsultationData. 
			ConsultationData.forEach((element, index) => {
				console.log(element);
				console.log(element.provided_type);

				if(element.provided_type==1){
					this.setState({message_trigger:true});
					this.setState({message_price:element.private_price});
					this.setState({message_price_commissions:element.public_price});
					this.state.messageCount.push(1);  
				} 				
				if(element.provided_type==2){
					this.setState({message_part_trigger:true});
					this.setState({message_part_price:element.private_price});
					this.setState({message_part_price_commissions:element.public_price});
					this.state.messageCount.push(1);  
				}
				if(element.provided_type==3){
					this.setState({message_full_trigger:true});
					this.setState({message_full_price:element.private_price});
					this.setState({message_full_price_commissions:element.public_price});
					this.state.messageCount.push(1);  
				}


				if(element.provided_type==4){
					this.setState({video_trigger:true});
					this.setState({video_price:element.private_price});
					this.setState({video_price_commissions:element.public_price});
					 this.state.videoCount.push(1);  
				}

				if(element.provided_type==5){
					this.setState({video_part_trigger:true});
					this.setState({video_part_price:element.private_price});
					this.setState({video_part_price_commissions:element.public_price});
					this.state.videoCount.push(1);  
				}

				if(element.provided_type==6){
					this.setState({video_full_trigger:true});
					this.setState({video_full_price:element.private_price});
					this.setState({video_full_price_commissions:element.public_price});
					this.state.videoCount.push(1); 
				}

				if(element.provided_type==7){
					this.setState({audio_only_trigger:true});
					this.setState({video_price:element.private_price});
					this.setState({video_price_commissions:element.public_price});
					this.state.audioCount.push(1);  
				}

				if(element.provided_type==8){
					this.setState({audio_only_part_trigger:true});
					this.setState({video_part_price:element.private_price});
					this.setState({video_part_price_commissions:element.public_price});	
					this.state.audioCount.push(1);  
				}
				if(element.provided_type==9){
					this.setState({audio_only_full_trigger:true});
					this.setState({video_full_price:element.private_price});
					this.setState({video_full_price_commissions:element.public_price});
					this.state.audioCount.push(1);  
				}
				
				if(element.provided_type==10){  // inperson_full_price_commissionsinperson_part_price_commissions
					this.setState({inperson_trigger:true});
					this.setState({inperson_price:element.private_price});
					this.setState({inperson_price_commissions:element.public_price});
					this.state.inpersonCount.push(1);   
				}

				if(element.provided_type==11){  // inperson_full_price_commissions
					this.setState({inperson_part_trigger:true});
					this.setState({inperson_part_price:element.private_price});
					this.setState({inperson_part_price_commissions:element.public_price});
					this.state.inpersonCount.push(1);  
				}

				if(element.provided_type==12){  // inperson_full_price_commissions
					this.setState({inperson_full_trigger:true});
					this.setState({inperson_full_price:element.private_price});
					this.setState({inperson_full_price_commissions:element.public_price});
					this.state.inpersonCount.push(1);  
				} 

			 }); 

		 }); 
		 
		
	  }


 countMessage(checkstatus,messagenumber){ 

		if(messagenumber==1){
			this.setState({message_trigger:checkstatus});
			this.setState({message_part_trigger:false});
			this.setState({message_full_trigger:false});
			this.state.messageCount.splice(this.state.messageCount.indexOf(1), 1);
		} 
		if(messagenumber==2){
			this.setState({message_trigger:false});
			this.state.messageCount.splice(this.state.messageCount.indexOf(1), 1);	
			this.setState({message_part_trigger:checkstatus});
		} 
		if(messagenumber==3){
			this.setState({message_trigger:false});
			this.state.messageCount.splice(this.state.messageCount.indexOf(1), 1);	
			this.setState({message_full_trigger:checkstatus});
		} 
 
		if(checkstatus){ 
			 this.state.messageCount.push(1);  
			 console.log(this.state.messageCount);
		}  else { 
			this.state.messageCount.splice(this.state.messageCount.indexOf(1), 1);	
			
			if(messagenumber==1)
			this.setState({message_trigger:false});
	
			if(messagenumber==2)
			this.setState({message_part_trigger:false});
	
			if(messagenumber==3)
			this.setState({message_full_trigger:false});
			
		} 
		console.log('Settingdone');
		console.log(this.state.messageCount);
		console.log(this.state.messageCount.length);

		if(this.state.messageCount.length>2){	
			 alert('Please choose only 2 message schedules.');
			 this.state.messageCount.splice(this.state.messageCount.indexOf(1), 1);
			 if(messagenumber==1)
			 this.setState({message_trigger:false});
	 
			 if(messagenumber==2)
			 this.setState({message_part_trigger:false});
	 
			 if(messagenumber==3)
			 this.setState({message_full_trigger:false});
			 
		}

  }


countVideo(checkstatus,messagenumber){
	 
		if(messagenumber==1){
			this.setState({video_trigger:checkstatus});
			this.setState({video_part_trigger:false});
			this.setState({video_full_trigger:false});
			this.state.videoCount.splice(this.state.videoCount.indexOf(1), 1);
		}
	

		if(messagenumber==2){
			this.setState({video_part_trigger:checkstatus});
			this.setState({video_trigger:false});
			this.state.videoCount.splice(this.state.videoCount.indexOf(1), 1);
		}
		

		if(messagenumber==3){
			this.setState({video_full_trigger:checkstatus});
			this.setState({video_trigger:false});
			this.state.videoCount.splice(this.state.videoCount.indexOf(1), 1);
		}
	

	 
		this.setState({audio_only_trigger:false}); 
		this.setState({audio_only_part_trigger:false}); 
		this.setState({audio_only_full_trigger:false});


	if(checkstatus){ 
			 this.state.videoCount.push(1);  
			 console.log(this.state.videoCount);
		}  else { 
			this.state.videoCount.splice(this.state.videoCount.indexOf(1), 1);
			if(messagenumber==1)
			this.setState({video_trigger:false});
	
			if(messagenumber==2)
			this.setState({video_part_trigger:false});
	
			if(messagenumber==3)
			this.setState({video_full_trigger:false});
			
		} 
		
		if(this.state.videoCount.length>2){	
			 alert('Please choose only 2 Video schedules.');
			 this.state.videoCount.splice(this.state.videoCount.indexOf(1), 1);
			 if(messagenumber==1)
			 this.setState({video_trigger:false});
	 
			 if(messagenumber==2)
			 this.setState({video_part_trigger:false});
	 
			 if(messagenumber==3)
			 this.setState({video_full_trigger:false});
			 
		}


	  }


 countAudio(checkstatus,messagenumber){ 

		if(messagenumber==1){
			this.setState({audio_only_trigger:checkstatus});
			this.setState({audio_only_part_trigger:false});
			this.setState({audio_only_full_trigger:false});
			this.state.audioCount.splice(this.state.audioCount.indexOf(1), 1);
		}
		

		if(messagenumber==2){
			this.setState({audio_only_part_trigger:checkstatus});
			this.setState({audio_only_trigger:false});
			this.state.audioCount.splice(this.state.audioCount.indexOf(1), 1);
		}
		

		if(messagenumber==3){
			this.setState({audio_only_full_trigger:checkstatus});
			this.setState({audio_only_trigger:false});
			this.state.audioCount.splice(this.state.audioCount.indexOf(1), 1);
		}
	


	 
		this.setState({video_trigger:false}); 
		this.setState({video_part_trigger:false}); 
		this.setState({video_full_trigger:false});


	if(checkstatus){ 
			 this.state.audioCount.push(1);  
			 console.log(this.state.audioCount);
		}  else { 
			this.state.audioCount.splice(this.state.audioCount.indexOf(1), 1);
			if(messagenumber==1)
			this.setState({audio_only_trigger:false});
	
			if(messagenumber==2)
			this.setState({audio_only_part_trigger:false});
	
			if(messagenumber==3)
			this.setState({audio_only_full_trigger:false});
			
		} 
		
		if(this.state.audioCount.length>2){	
			 alert('Please choose only 2 Video schedules.');
			 this.state.audioCount.splice(this.state.audioCount.indexOf(1), 1);
			 if(messagenumber==1)
			 this.setState({audio_only_trigger:false});
	 
			 if(messagenumber==2)
			 this.setState({audio_only_part_trigger:false});
	 
			 if(messagenumber==3)
			 this.setState({audio_only_full_trigger:false}); 
			 
		}


	  }


	  countInperson(checkstatus,messagenumber){ 
	 
		if(messagenumber==1){
			this.setState({inperson_trigger:checkstatus});
			this.setState({inperson_part_trigger:false});
			this.setState({inperson_full_trigger:false});
			this.state.inpersonCount.splice(this.state.inpersonCount.indexOf(1), 1);
		}
		

		if(messagenumber==2){
			this.setState({inperson_part_trigger:checkstatus});
			this.setState({inperson_trigger:false});
			this.state.inpersonCount.splice(this.state.inpersonCount.indexOf(1), 1);
		}
		

		if(messagenumber==3){
			this.setState({inperson_full_trigger:checkstatus});
			this.setState({inperson_trigger:false});
			this.state.inpersonCount.splice(this.state.inpersonCount.indexOf(1), 1);
		}
		



		if(checkstatus){ 
			this.state.inpersonCount.push(1);  
			console.log(this.state.inpersonCount);
	   }  else { 
		this.state.inpersonCount.splice(this.state.inpersonCount.indexOf(1), 1);
		if(messagenumber==1)
		this.setState({inperson_trigger:false});

		if(messagenumber==2)
		this.setState({inperson_part_trigger:false});

		if(messagenumber==3)
		this.setState({inperson_full_trigger:false});  
	   } 

	   if(this.state.inpersonCount.length>2){	
	    alert('Please choose only 2 In-person schedules.'); 
		this.state.inpersonCount.splice(this.state.inpersonCount.indexOf(1), 1);
		if(messagenumber==1)
		this.setState({inperson_trigger:false});

		if(messagenumber==2)
		this.setState({inperson_part_trigger:false});

		if(messagenumber==3)
		this.setState({inperson_full_trigger:false}); 
			
	   }

	  }

	  selectprice1(val1){
		this.setState({message_price:val1}); 

		if(val1!=''){ 
		var commissionPrice = (this.state.messageCommission/100) * val1;
		var totalComissionPrice  = parseFloat(commissionPrice)+parseFloat(val1);
		this.setState({message_price_commissions: totalComissionPrice.toFixed(2)});
		} else{
			this.setState({message_price_commissions: ''});
		}
	  }

	  selectprice2(val2){
		this.setState({message_part_price:val2});
		  if(val2!=''){ 
			var commissionPrice2 = (this.state.messageCommission/100) * val2;
			var totalComissionPrice2  = parseFloat(commissionPrice2)+parseFloat(val2);
			this.setState({message_part_price_commissions:totalComissionPrice2.toFixed(2)});
		  } else {
			this.setState({message_part_price_commissions:''});
		  }
	
	  }

	  selectprice3(val3){
		this.setState({message_full_price:val3});
		if(val3!=''){
			var commissionPrice3 = (this.state.messageCommission/100) * val3;
			var totalComissionPrice3  = parseFloat(commissionPrice3)+parseFloat(val3);
			this.setState({message_full_price_commissions:totalComissionPrice3.toFixed(2)});
		} else {
			this.setState({message_full_price_commissions:''});
		}
		
	  }

	  selectprice4(val4){
		this.setState({video_price:val4});
		 if(val4!=''){
			var commissionPrice4 = (this.state.videoCommission/100) * val4;
			var totalComissionPrice4 = parseFloat(commissionPrice4)+parseFloat(val4);
			this.setState({video_price_commissions:totalComissionPrice4.toFixed(2)}); 
		 } else{
			this.setState({video_price_commissions:''});
		 }
		
	  }

	  selectprice5(val5){
		this.setState({video_part_price:val5});
		if(val5!=''){
			var commissionPrice5 = (this.state.videoCommission/100) * val5;
			var totalComissionPrice5 = parseFloat(commissionPrice5)+parseFloat(val5);
			this.setState({video_part_price_commissions:totalComissionPrice5.toFixed(2)});
		}else {
			this.setState({video_part_price_commissions:''});
		}
		
	  }

	  selectprice6(val6){
		this.setState({video_full_price:val6});
		if(val6!=''){
			var commissionPrice6 = (this.state.videoCommission/100) * val6;
			var totalComissionPrice6 = parseFloat(commissionPrice6)+parseFloat(val6);
			this.setState({video_full_price_commissions:totalComissionPrice6.toFixed(2)});
		} else {
			this.setState({video_full_price_commissions:''});
		}
		
	  }
 

	  selectprice7(val7){
		this.setState({inperson_price:val7});
		if(val7!=''){
			var commissionPrice7 = (this.state.inpersonCommission/100) * val7;
			var totalComissionPrice7 = parseFloat(commissionPrice7)+parseFloat(val7);
			this.setState({inperson_price_commissions:totalComissionPrice7.toFixed(2)});
		} else{
			this.setState({inperson_price_commissions:''});
		}
	
	  }
 

	  selectprice8(val8){
		this.setState({inperson_part_price:val8});
		if(val8!=''){
			var commissionPrice8 = (this.state.inpersonCommission/100) * val8;
			var totalComissionPrice8 = parseFloat(commissionPrice8)+parseFloat(val8);
			this.setState({inperson_part_price_commissions:totalComissionPrice8.toFixed(2)});
		} else{
			this.setState({inperson_part_price_commissions:''});
		}
		
	  }
 

	  selectprice9(val9){
		this.setState({inperson_full_price:val9});
		if(val9!=''){
			var commissionPrice9 = (this.state.inpersonCommission/100) * val9;
			var totalComissionPrice9 = parseFloat(commissionPrice9)+parseFloat(val9);
			this.setState({inperson_full_price_commissions:totalComissionPrice9.toFixed(2)});
		} else{
			this.setState({inperson_full_price_commissions:''});
		}
	
	  }
 
 

 SavePublicConsultation =(e) => { 
        e.preventDefault();  
		var message = 0;
		if(this.state.message_trigger){
			message = 1; 
		}

		var messagePart = 0;
		if(this.state.message_part_trigger){
			messagePart = 1;
		}

		var messageFull = 0;
		if(this.state.message_full_trigger){
			messageFull = 1;
		}

		var video  = 0;
		if(this.state.video_trigger){
			video = 1;
			if(this.state.audio_only_trigger){
				video = 2;  // with audio 
			} 
		}

		if(this.state.audio_only_trigger){
			video = 2;  // with audio 
		} 

		var videoPart  = 0;
		if(this.state.video_part_trigger){
			videoPart = 1;
			if(this.state.audio_only_part_trigger){
				videoPart = 2;  // with audio 
			} 
		} 

		if(this.state.audio_only_part_trigger){
			videoPart = 2;  // with audio 
		} 

		var videoFull  = 0;
		if(this.state.video_full_trigger){
			videoFull = 1;
			if(this.state.audio_only_full_trigger){
				videoFull = 2;  // with audio 
			} 
		} 

		if(this.state.audio_only_full_trigger){
			videoFull = 2;  // with audio 
		} 

		
		var inperson = 0;
		if(this.state.inperson_trigger){
			inperson = 1; 
		}

		var inpersonPart = 0;
		if(this.state.inperson_part_trigger){
			inpersonPart = 1;
		}

		var inpersonFull = 0;
		if(this.state.inperson_full_trigger){
			inpersonFull = 1;
		} 

     const consultationData = {message :message , messagePart : messagePart,
               specialist_id:localStorage.getItem('specialist_id')
             ,messageFull:messageFull,language_id:1,public_intro_id:this.state.id,
			 video:video, videoPart:videoPart, videoFull:videoFull ,inperson:inperson , 
			 inpersonPart:inpersonPart , inpersonFull:inpersonFull ,
			 message_price:this.state.message_price, message_part_price : this.state.message_part_price,
			  message_full_price :this.state.message_full_price , video_price:this.state.video_price,
			  video_part_price:this.state.video_part_price , video_full_price:this.state.video_full_price , 
			  inperson_price:this.state.inperson_price , inperson_part_price:this.state.inperson_part_price,
			  inperson_full_price:this.state.inperson_full_price ,  
			  message_price_commissions:this.state.message_price_commissions, message_part_price_commissions : this.state.message_part_price_commissions,
			  message_full_price_commissions :this.state.message_full_price_commissions , video_price_commissions:this.state.video_price_commissions,
			  video_part_price_commissions:this.state.video_part_price_commissions , video_full_price_commissions:this.state.video_full_price_commissions , 
			  inperson_price_commissions:this.state.inperson_price_commissions , inperson_part_price_commissions:this.state.inperson_part_price_commissions,
			  inperson_full_price_commissions:this.state.inperson_full_price_commissions
			}

			console.log('consultationData');  
         console.log(consultationData);  
		 axios.post(process.env.REACT_APP_BASE_URL+`/specilistAPI/updatePublicConsultation`,consultationData)
		 .then(res => {
			 //this.setState({countryData : res.data});
		    console.log(res.data); 
			if(res.data.Status) 
			{ 
				//this.setState({id:res.data.PublicIntro_id});
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
										<p class="text-center">{t('SpecSubTitleSetting')} <br/> {t('SpecSubTitleSettingMandatory')}
										</p>
										
										<p class="text-center hidden-md hidden-lg font-weight-bold">Go to sections:</p>
										  
                                          <GoToSection setName="publicintro"/> 			
											<h3 class="text-center"> PUBLIC </h3><hr/>
											<p class="text-center">
											 
										   <InnerPagesLinks />

											</p>
											<div class="mt-5" id="consult">
												<h3 class=" mb-2 text-center">CONSULTATIONS (2/5)</h3>
											 <p class="mb-4 text-center">
											 {t('SpecConsultationText')} 
											 </p> 
							<form> 
							<input type="hidden" name="public_intro_id" value={this.state.id} />
							<div class="row form-row"> 
							<div class="table-responsive"> 
<table class="table table-striped">
	<thead>
		<tr>
			<th colspan="6">Select Types Provided</th>
			
			<th colspan="3"> Price 

				<i class="fa fa-eur margin-left-5 font-size-18 color5" aria-hidden="true" ></i>

			 </th>
				<th>Price appearing in Public Profile (with commissions) 
				</th> 

			</tr>
		</thead>
		<tbody>

			<tr>
				<td class="align-middle" colspan="6">
					<input type="checkbox" name="message" checked={this.state.message_trigger}   onChange={(e)=>this.countMessage(e.target.checked, 1)}/>
					<span  class="font-weight-bold color3">Chat</span>
				</td>
			
				<td class="align-middle" colspan="3">
					<input type="text" name="" placeholder="Select Price" class="form-control form-control1" value={this.state.message_price}   onChange={(e)=> this.selectprice1(e.target.value) } />

				</td>
				<td class="align-middle">
					<input type="text" name="" placeholder="Price" class="form-control form-control1" disabled value={this.state.message_price_commissions} /> 
				</td>  
			</tr>  
			<tr>
				<td class="align-middle" colspan="6">
					<input type="checkbox"   name="message"  checked={this.state.message_part_trigger}   onChange={(e)=> this.countMessage(e.target.checked, 2)} />
					<span  class="font-weight-bold color3">Chat PART</span>
				</td>
			
				<td class="align-middle" colspan="3">
					<input type="text" name="" placeholder="Select Price" class="form-control form-control1"  value={this.state.message_part_price}   onChange={(e)=> this.selectprice2(e.target.value) } />

				</td>
				<td class="align-middle">
					<input type="text" name="" placeholder="Price" class="form-control form-control1" disabled  value={this.state.message_part_price_commissions}/>

				</td> 


			</tr> 
			<tr>
				<td class="align-middle" colspan="6">
					<input type="checkbox" name="message"  checked={this.state.message_full_trigger}    onChange={(e)=> this.countMessage(e.target.checked, 3)}   />
					<span class=" font-weight-bold color3" >Chat FULL</span>
				</td>
			
				<td class="align-middle" colspan="3">
					<input type="text" name="" placeholder="Select Price" class="form-control form-control1" value={this.state.message_full_price}   onChange={(e)=> this.selectprice3(e.target.value) }  />

				</td>
				<td class="align-middle">
					<input type="text" name="" placeholder="Price" class="form-control form-control1" disabled  value={this.state.message_full_price_commissions} />

				</td> 

			</tr>
			<tr>
				<td class="align-middle" colspan="5">
					<input type="checkbox" name="video" checked={this.state.video_trigger}  onChange={(e)=> this.countVideo(e.target.checked, 1)}  />
					<span class="font-weight-bold color4" >Video </span>
				</td> 
				<td class="align-middle">
				<input type="checkbox" checked={this.state.audio_only_trigger} onChange={(e)=> this.countAudio(e.target.checked, 1)}  /> 
				<span class="color4">Audio Only</span>
				</td> 
				<td class="align-middle" colspan="3">
				<input type="text" name="" placeholder="Select Price" class="form-control"  value={this.state.video_price}   onChange={(e)=> this.selectprice4(e.target.value) } />

				</td>
				<td class="align-middle">
				<input type="text" name="" placeholder="Price" class="form-control" disabled  value={this.state.video_price_commissions} />
				</td>

				</tr>
				<tr>
				<td class="align-middle" colspan="5">
				<input type="checkbox" name="video"   checked={this.state.video_part_trigger}   onChange={(e)=> this.countVideo(e.target.checked, 2)} />
				<span class=" font-weight-bold color4">Video PART </span>
				</td>


				<td class="align-middle">
				<input type="checkbox" checked={this.state.audio_only_part_trigger}  onChange={(e)=> this.countAudio(e.target.checked, 2)}  /> 
				<span class="color4" >Audio Only</span>
				</td> 
				<td class="align-middle" colspan="3">
				<input type="text" name="" placeholder="Select Price" class="form-control" value={this.state.video_part_price}   onChange={(e)=> this.selectprice5(e.target.value) }  />

				</td>
				<td class="align-middle">
				<input type="text" name="" placeholder="Price" class="form-control" disabled value={this.state.video_part_price_commissions} />
				</td>

				</tr>

				<tr>
				<td class="align-middle" colspan="5">
				<input type="checkbox" name="video"  checked={this.state.video_full_trigger}   onChange={(e)=> this.countVideo(e.target.checked, 3)}  />
				<span class="font-weight-bold color4">Video FULL</span>
				</td> 
				<td class="align-middle">
				<input type="checkbox"  checked={this.state.audio_only_full_trigger}  onChange={(e)=> this.countAudio(e.target.checked, 3)}  /> 
				<span  class="color4">Audio Only</span>
				</td> 
				<td class="align-middle" colspan="3">
				<input type="text" name="" placeholder="Select Price" class="form-control"  value={this.state.video_full_price}   onChange={(e)=> this.selectprice6(e.target.value) }/>

				</td>
				<td class="align-middle">
				<input type="text" name="" placeholder="Price" class="form-control" disabled value={this.state.video_full_price_commissions}  />

				</td> 

				</tr>
 

				<tr>
				<td class="align-middle" colspan="6">
				<input type="checkbox" name="inperson"  checked={this.state.inperson_trigger}    onChange={(e)=>this.countInperson(e.target.checked, 1)} />
				<span class=" font-weight-bold text-blue">In-vivo</span>
				</td>

				<td class="align-middle" colspan="3">
				<input type="text" name="" placeholder="Select Price" class="form-control"   value={this.state.inperson_price}   onChange={(e)=> this.selectprice7(e.target.value) }/>

				</td>
				<td class="align-middle">
				<input type="text" name="" placeholder="Price" class="form-control" disabled  value={this.state.inperson_price_commissions} /> 

				</td> 

				</tr>
				<tr>
				<td class="align-middle" colspan="6">
				<input type="checkbox" name="inperson"  checked={this.state.inperson_part_trigger}  onChange={(e)=>this.countInperson(e.target.checked, 2)} />
				<span class=" font-weight-bold text-blue" >In-vivo PART</span>
				</td>


				<td class="align-middle" colspan="3">
				<input type="text" name="" placeholder="Select Price" class="form-control"  value={this.state.inperson_part_price}   onChange={(e)=> this.selectprice8(e.target.value) }/>

				</td>
				<td class="align-middle">
				<input type="text" name="" placeholder="Price" class="form-control" disabled value={this.state.inperson_part_price_commissions}     /> 

				</td> 

				</tr>
				<tr>
				<td class="align-middle" colspan="6">
				<input type="checkbox" name="inperson"  checked={this.state.inperson_full_trigger}  onChange={(e)=>this.countInperson(e.target.checked, 3)}   />
				<span class=" font-weight-bold text-blue">In-vivo FULL</span>
				</td>


				<td class="align-middle" colspan="3">
				<input type="text" name="" placeholder="Select Price" class="form-control" value={this.state.inperson_full_price}   onChange={(e)=> this.selectprice9(e.target.value) }/>

				</td>
				<td class="align-middle">
				<input type="text" name="" placeholder="Price" class="form-control" disabled  value={this.state.inperson_full_price_commissions}    /> 

				</td> 

				</tr>

				</tbody>
				</table> 
				</div>
							</div>
							</form> 
							<div class="col-md-12">
								<center>
									<button type="submit" class=" mt-5 btn btn-primary btn-lg submit-btn mb-4" onClick={this.SavePublicConsultation}>Save Changes</button>
								</center>
							</div>
							<div class="row">
								<div class="col-md-6 col-6">
									<center>
										<a href="/publicintro#intro" class=" mt-5 btn  btn-warning btn-sm submit-btn mb-4"> {"<<"} Previous</a>
									</center>
								</div> 
								<div class="col-md-6 col-6">
									<center>
										<a href="/publicoverview#overview" class=" mt-5 btn  btn-warning btn-sm submit-btn mb-4">Next {">>"} </a>
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


export default withTranslation()(Publicextra); 