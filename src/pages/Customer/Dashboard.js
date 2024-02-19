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
import moment from 'moment';
import ChatScreen from "../Components/ChatScreen";
// const { t, i18n } = useTranslation(); 
require('dotenv').config();

function settingLanguage(lang){ 
     i18n.changeLanguage(lang);
 }

class Dashboard extends React.Component {   
    
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
		   timezoneData:[],
		   redirect:false,
           mobile:"",
           dob:"",
           zipcode:"",
           consultationlanguage:"",
           selectedFile: null,
		   stdcode:"",
		   currentpassword:"",
		   newpassword:"",
		   confirmpassword:"",
		   customer_country:"" ,
		   booking_history:[],
		   booking_chat_channel:[],
		   chatmasterName :"",
		   disabledOnlineClass:'btn btn-secondary text-dark btn-sm',
		   enabledOnlineClass:'btn btn-info btn-sm bg-cus3',
		   disabledLink:'javascript:void(0);',
		   user_image:process.env.REACT_APP_URL+"/assets/img/doctors/doctor-thumb-02.jpg",
		   specialist_filter_data:[],
		   review_desc:'',
		   review_star:'',
		   recommend_status:'',
		   specialist_id:'',
		   reviewpastData:[],
		   specialistListingData:[],
		   specialistListingBreakData:[],
		   s_name: "" ,
           s_surname : "",
           s_image:'',
		   timezone:'',
		   bookingBox:false,
		   messageBox:false,  
		   favouriteBox:false,
		   reviewBox:false,
		   settingBox:true,
		   bookingactive:'block',
		   messageactive:'block',
		   favouriteactive:'block',
		   reviewactive:'block',
		   settingactive:'active',
		   searchvalue:'',
		   streetaddress:'',
		   recommend_select:'like-btn',
		   recommend_deselect:'dislike-btn',
		   imagePreview: null

		   
        };   
		//this.createchannel = this.createchannel.bind(this);
  
    }  


	specialistdropdown(event) {
		this.setState({
		  specialist_id: event.target.value
		});
	  }
	 handleInputChanged(event) {
		this.setState({
		  review_desc: event.target.value
		});
	  }
	
	   InputChanged1(val) {
		   alert(val);
		this.setState({
		  recommend_status: val
		});

this.setState({
		  recommend_select: 'like-btn recommend_select'
		});
this.setState({
		  recommend_deselect: 'dislike-btn'
		});


	  }
	
	   InputChanged2(val) {
		   alert(val);
		this.setState({
		  recommend_status: val
		});

this.setState({
		  recommend_select: 'like-btn'
		});

this.setState({
		  recommend_deselect: 'dislike-btn recommend_deselect'
		});

	  } 

	  handleInputChanged3(event) {
		this.setState({
		  recommend_status: event.target.value
		});
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
	   convert(str) {
	  var date = new Date(str),
		mnth = ("0" + (date.getMonth() + 1)).slice(-2),
		day = ("0" + date.getDate()).slice(-2),                                                                        
		monthNames = [ "January", "February", "March", "April", "May", "June", 
						   "July", "August", "September", "October", "November", "December" ];
		
	  return [ monthNames[mnth],date.getFullYear()].join(" ");
	}
 

	

 showcalendar= event => { 
	this.setState({ messageBox:false });
	this.setState({ settingBox:false }); 
	this.setState({ reviewBox:false });
   this.setState({ favouriteBox:false });
   this.setState({ bookingBox:true });
   this.setState({messageactive:'block'})
   this.setState({bookingactive:'active'})
   this.setState({favouriteactive:'block'})
   this.setState({reviewactive:'block'})
   this.setState({settingactive:'block'})
 }

 showmessage= event => {   
	console.log('coing tabs'); 
	this.setState({ messageBox:true });
	this.setState({ settingBox:false }); 
	this.setState({ reviewBox:false });
   this.setState({ favouriteBox:false });
   this.setState({ bookingBox:false });
   this.setState({messageactive:'active'})
   this.setState({bookingactive:'block'})
   this.setState({favouriteactive:'block'})
   this.setState({reviewactive:'block'})
   this.setState({settingactive:'block'})
  //window.alertHello(); 
  }


  showfavourite= event => {   
	console.log('coing tabs'); 
	this.setState({ messageBox:false });
	this.setState({ settingBox:false }); 
	this.setState({ reviewBox:false });
   this.setState({ favouriteBox:true });
   this.setState({ bookingBox:false });
   this.setState({messageactive:'block'})
   this.setState({bookingactive:'block'})
   this.setState({favouriteactive:'active'})
   this.setState({reviewactive:'block'})
   this.setState({settingactive:'block'})
  //window.alertHello(); 
  }

  showreview= event => {   
	console.log('coing tabs'); 
	this.setState({ messageBox:false });
	this.setState({ settingBox:false }); 
	this.setState({ reviewBox:true });
   this.setState({ favouriteBox:false });
   this.setState({ bookingBox:false });
   this.setState({messageactive:'block'})
   this.setState({bookingactive:'block'})
   this.setState({favouriteactive:'block'})
   this.setState({reviewactive:'active'})
   this.setState({settingactive:'block'})
  //window.alertHello(); 
  }

  showsetting= event => {   
	console.log('coing tabs'); 
	this.setState({ messageBox:false });
	this.setState({ settingBox:true }); 
	this.setState({ reviewBox:false });
   this.setState({ favouriteBox:false });
   this.setState({ bookingBox:false });
   this.setState({messageactive:'block'})
   this.setState({bookingactive:'block'})
   this.setState({favouriteactive:'block'})
   this.setState({reviewactive:'block'})
   this.setState({settingactive:'active'})

  //window.alertHello(); 
  }



  removeFav(Fid){
	console.log(Fid);
  axios.get(process.env.REACT_APP_BASE_URL+`/medalohaAPI/UserFavouriteSpecialistRemove?f_id=`+Fid)
  .then(res => {
  	 console.log('search start --->');
  	 console.log(res);
     if(res.data['Status']){
		//return	<Redirect to="/customerdashboard?pat_fav"/>
		window.location.href="/customerdashboard?pat_fav";
	 }
   	 
      // this.setState({specialist_filter_data: res.data['Data']});
  	 // this.setState({ResultCount:res.data['Result'].length});
  	 //this.setState({specialist_category_filter_data: res.data.Category}); 
  });  
}

	handleButtonClicked(spec_data) {
		var specialist_id=spec_data.split("|")[0]; 
		var review_desc = this.state.review_desc;
		var recommend_status = this.state.recommend_status;
     	console.log('recommend_status');
		console.log(recommend_status); 
		var review_star = this.state.review_star;

		console.log('review_star');
		console.log(review_star); 

		var specialist_id = specialist_id;
		var user_id = localStorage.getItem('customer_id'); 
	   var reviewData= {user_id:user_id,review_desc:review_desc,recommend_status:recommend_status,review_star:review_star,specialist_id:specialist_id}
	   axios.post(process.env.REACT_APP_BASE_URL+`/medalohaAPI/addReview`,reviewData)
			 .then(res => { 
				console.log(res.data);
				if(res.data.Status) 
				{ 
					alert('Update successfully');

					this.setState({recommend_status:''});
					this.setState({review_star:''});
					this.setState({review_desc:''});
					
					
					axios.get(process.env.REACT_APP_BASE_URL+`/medalohaAPI/userpastSpecialistReviewListing?user_id=`+localStorage.getItem('customer_id'))
					.then(res => {
						console.log(res);
						this.setState({reviewpastData : res.data.Data});
						//console.log(res.data.Data);
					}); 
					window.location.href='customerdashboard?pat_review';
				}
				else {
				   console.log(res.data.Message);
				}
				}).catch(function (error) {
				console.log(error);
			  });  
	
	  }
	

    fileChangedHandler = event => {
        this.setState({ selectedFile: event.target.files[0] })


 // Optionally, you can also preview the selected image here
    const reader = new FileReader();
    reader.onload = (e) => {
      // Set the preview image URL in state
      this.setState({ imagePreview: e.target.result });
    };
    reader.readAsDataURL(event.target.files[0]);

      } 


	  componentWillMount(){

		axios.get(process.env.REACT_APP_BASE_URL+`/medalohaAPI/SpecialistListingUserReview?user_id=`+localStorage.getItem('customer_id'))
		.then(res => {
			this.setState({specialistListingData : res.data.Data});
		     console.log(res.data.Data);
		}); 

	  	axios.get(process.env.REACT_APP_BASE_URL+`/medalohaAPI/userpastSpecialistReviewListing?user_id=`+localStorage.getItem('customer_id'))
		.then(res => {
			console.log('fasdfasds asdsdres');
			console.log(res);
			this.setState({reviewpastData : res.data.Data});
		     console.log(res.data);
		}); 

		axios.get(process.env.REACT_APP_BASE_URL+`/customerAPI/GetCustomerChatChannel?customer_id=`+localStorage.getItem('customer_id'))
		.then(res => {
		   console.log('22222222222'); 
			console.log(res);
			   this.setState({booking_chat_channel : res.data}); 

			   if(res.data){
				   localStorage.setItem('Channel',res.data[0]['payment_stripe_id']);
				   localStorage.setItem('ChannelEmail',res.data[0]['email']);
				   localStorage.setItem('ChannelName', res.data[0]['u_first_name']+' '+res.data[0]['u_last_name']); 
			   }
		 });  

	  }


 	 handleChange(e,ratingValue) { 
		this.setState({ review_star: ratingValue}); 
     }
    
	 handleChangeSearch(event) {
		this.setState({searchvalue: event.target.value});
	  }
      

  


    componentDidMount() { 

 


if(this.props.location.search=='?pat_appointments'){
			this.setState({ messageBox:false });
			this.setState({ settingBox:false }); 
			this.setState({ reviewBox:false });
		   this.setState({ favouriteBox:false });
		   this.setState({ bookingBox:true });
		   this.setState({messageactive:'block'})
		   this.setState({bookingactive:'active'})
		   this.setState({favouriteactive:'block'})
		   this.setState({reviewactive:'block'})
		   this.setState({settingactive:'block'})
		 }
         


		if(this.props.location.search=='?pat_message'){
			this.setState({ messageBox:true });
			this.setState({ settingBox:false }); 
			this.setState({ reviewBox:false });
		   this.setState({ favouriteBox:false });
		   this.setState({ bookingBox:false });
		   this.setState({messageactive:'active'})
		   this.setState({bookingactive:'block'})
		   this.setState({favouriteactive:'block'})
		   this.setState({reviewactive:'block'})
		   this.setState({settingactive:'block'})
		 }



		 if(this.props.location.search=='?pat_fav'){
			this.setState({ messageBox:false });
			this.setState({ settingBox:false }); 
			this.setState({ reviewBox:false });
		    this.setState({ favouriteBox:true });
		   this.setState({ bookingBox:false });
		   this.setState({messageactive:'block'})
		   this.setState({bookingactive:'block'})
		   this.setState({favouriteactive:'active'})
		   this.setState({reviewactive:'block'})
		   this.setState({settingactive:'block'})
		 }

		 if(this.props.location.search=='?pat_review'){
			this.setState({ messageBox:false });
			this.setState({ settingBox:false }); 
			this.setState({ reviewBox:true });
		    this.setState({ favouriteBox:false });
		   this.setState({ bookingBox:false });
		   this.setState({messageactive:'block'})
		   this.setState({bookingactive:'block'})
		   this.setState({favouriteactive:'block'})
		   this.setState({reviewactive:'active'})
		   this.setState({settingactive:'block'})
		 }
 

		var string = localStorage.getItem("onChangeId");
		    console.log("string--->");
			console.log(string);
			if(string){
			var string_first_concate=string.toString().split("_")[0];
			var string_last_concate=string.toString().split("_")[1];
			console.log("string2--->");
			console.log(string_last_concate);
			axios.get(process.env.REACT_APP_BASE_URL+'/specilistAPI/GetSpecialistPrivateDetailsByID?specialist_id='+parseInt(string_last_concate))
			.then(res => { 

				console.log('dashboard data');
				console.log(res);
				this.setState({s_name:res.data[0]['first_name']});
				this.setState({s_surname:res.data[0]['last_name']});
				this.setState({s_image:process.env.REACT_APP_BASE_URL+'/public/uploads/docs/'+res.data[0]['profile_photo']}); 
			});
       }


	 axios.get(process.env.REACT_APP_BASE_URL+`/medalohaAPI/UserFavouriteSpecialistListing?user_id=`+localStorage.getItem('customer_id'))
		.then(res => {
			 console.log('search start --->');
			 console.log(res);
			 this.setState({specialist_filter_data: res.data['Data']});
			// this.setState({ResultCount:res.data['Result'].length});
			 //this.setState({specialist_category_filter_data: res.data.Category}); 
        });  

		console.log(btoa("cresol?payment=deepak&localaddress=cresol"));
		console.log(atob("Y3Jlc29sP3BheW1lbnQ9ZGVlcGFrJmxvY2FsYWRkcmVzcz1jcmVzb2w=")); 
 
		axios.get(process.env.REACT_APP_BASE_URL+`/authenticationAPI/GetAllCountry`)
		.then(res => {
			this.setState({countryData : res.data}); 
		});  

        axios.get(process.env.REACT_APP_BASE_URL+`/customerAPI/GetCustomerDetailsByID?customer_id=`+localStorage.getItem('customer_id'))
		.then(res => {

			  console.log('customer information ');
		      console.log(res.data);

			if(res.data[0]['user_image']!=null){
				this.setState({user_image : process.env.REACT_APP_BASE_URL+'/public/uploads/profile/'+res.data[0]['user_image']}); 
				localStorage.setItem("UserProfileImage",process.env.REACT_APP_BASE_URL+"/public/uploads/profile/"+res.data[0]['user_image']);
			}
		 
			this.setState({name : res.data[0]['first_name']});
            this.setState({surname : res.data[0]['last_name']});
            this.setState({email : res.data[0]['email']}); 
			this.setState({mobile : res.data[0]['mobile']}); 
			if(res.data[0]['dob']!=null && res.data[0]['dob']!='0000-00-00' )
			 this.setState({dob : new Date(res.data[0]['dob'])}); 
			
			if(res.data[0]['street_address']!='null')
			this.setState({streetaddress : res.data[0]['street_address']}); 
			if(res.data[0]['zipcode']!='null')
			this.setState({zipcode : res.data[0]['zipcode']}); 

			this.setState({timezone : res.data[0]['timezone'] +''+ res.data[0]['utc_offset_string']});  

			if(res.data[0]['consultation_language']!='null')
			this.setState({consultationlanguage : res.data[0]['consultation_language']}); 
		   // console.log(res.data);
		    this.setState({customer_country : res.data[0]['std_code']}); 
            this.countrydropdown(res.data[0]['country_id'],res.data[0]['city_id']);
        });  


     axios.get(process.env.REACT_APP_BASE_URL+`/customerAPI/GetCustomerBooking?customer_id=`+localStorage.getItem('customer_id'))
		.then(res => {
			  console.log(res);
			   this.setState({booking_history : res.data}); 
         });   
  
	  }
 

	  countrydropdown(countryvalue,cityvalue){
		this.setState({ country: countryvalue}); 
		 axios.get(process.env.REACT_APP_BASE_URL+`/authenticationAPI/GetAllCityByCountryID?country_id=`+countryvalue)
		.then(res => {
			this.setState({cityData : res.data});  
		});  
        this.setState({city : cityvalue}); 

		axios.get(process.env.REACT_APP_BASE_URL+`/authenticationAPI/GetTimezonesByCountryID?country_id=`+countryvalue)
		.then(res => {
			//this.setState({cityData : res.data});
			console.log('Timezone listing');
		     console.log(res.data);
			 this.setState({timezoneData : res.data});
		}); 

	  } 


	//   countrydropdown(countryvalue,cityvalue){
	// 	this.setState({ country: countryvalue});

	// 	 axios.get(process.env.REACT_APP_BASE_URL+`/authenticationAPI/GetAllCityByCountryID?country_id=`+countryvalue)
	// 	.then(res => {
	// 		this.setState({cityData : res.data});  
	// 	}); 

    //     this.setState({city : cityvalue}); 
        
	//   } 

      customerupdate =(e) => {
        e.preventDefault();   
        
		//console.log(this.state.country);
		
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

         if(this.state.country==""){
            alert('Please enter country.');
            return false;
         }

         if(this.state.city==""){
            alert('Please enter city.');
            return false;
         }

		 if(this.state.timezone==""){
            alert('Please choose Timezone.');
            return false;
         }


           // console.log(this.state.city); 
           console.log(this.state.selectedFile);   
           const customerData = new FormData();
		   customerData.append('avatar',this.state.selectedFile);
		   customerData.append('customer_id',localStorage.getItem('customer_id'));
		   customerData.append('name',this.state.name);
		   customerData.append('surname',this.state.surname);
		   customerData.append('email',this.state.email);
		   customerData.append('country',this.state.country);
		   customerData.append('stdcode',this.state.customer_country);
		   customerData.append('mobile',this.state.mobile);
		   customerData.append('city',this.state.city);
		   customerData.append('dob',this.state.dob); 
		   customerData.append('streetaddress',this.state.streetaddress);
		   customerData.append('zipcode',this.state.zipcode); 
		   customerData.append('timezone',this.state.timezone); 
		   customerData.append('consultationlanguage',this.state.consultationlanguage);
		   // zipcode streetaddress
		  // data.append('customerData','deepak goud');
		  // console.log(data);


		//   axios.post(`/customerAPI/profilepic`,data)
		//   .then(res => {
		// 	  //this.setState({countryData : res.data});
		//      	 console.log(res); 
		// 	 }).catch(function (error) {
		// 	 console.log(error);
		//  }); 
  

		 axios.post(process.env.REACT_APP_BASE_URL+`/customerAPI/CustomerUpdate`,customerData)
		 .then(res => {
			 //this.setState({countryData : res.data});
		    console.log('CustomerUpdate'); 
			console.log(res.data);
			
			if(res.data.Status) 
			{ 
				alert('Update successfully');
				window.location.reload();
			}
			else 
			alert(res.data.Message);
			
	    	}).catch(function (error) {
			console.log(error);
		  });   
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
 
        
		 var passwordData = {currentpassword:this.state.currentpassword,newpassword:this.state.newpassword,confirmpassword:this.state.confirmpassword,customer_id:localStorage.getItem('customer_id')}

		 axios.post(process.env.REACT_APP_BASE_URL+`/customerAPI/ChangePassword`,passwordData)
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
	  
	  updateNoteForPrivate=(TextPrivate,bookingID)=>{
		console.log(TextPrivate); console.log(bookingID);
		if(TextPrivate!=''){
			var NoteForPrivateData = {bookingId:bookingID,text:TextPrivate,specialist_id:localStorage.getItem('specialist_id')}
			axios.post(process.env.REACT_APP_BASE_URL+`/specilistAPI/NoteForPrivate`,NoteForPrivateData)
      // axios.post('/specilistAPI/NoteForPrivate?bookingId='+bookingID+'&text='+TextPrivate+'&specialist_id='+localStorage.getItem('specialist_id'))
		  .then(res => {
			   console.log(res.data.Validation); 
			 }); 
		}
	}
 
	  createchannel=(Channel,mastername)=>{ 
			console.log('running'+Channel);
			localStorage.setItem('Channel',Channel);
             this.setState({chatmasterName: 'Dr ' + mastername});
		  window.alertHello(); 
	  }


	  updateBooking=(bookingType,bookingID,Sid)=>{
		 // alert(bookingType);

		 if(bookingType==4){
			if (window.confirm("Are you sure ?")) {
                window.location.href="bookingvideoconsultation/"+Sid+"?bookingId="+bookingID
				return false;
			}
		 }

		 if(bookingType!=1 && bookingType!=2){  
			if (window.confirm("Are you sure ?")) {
				axios.get(process.env.REACT_APP_BASE_URL+'/specilistAPI/GetSpecialistBookingUpdate?bookingId='+bookingID+'&status='+bookingType+'&specialist_id='+localStorage.getItem('specialist_id'))
				.then(res => {
					  console.log(res.data.Validation); 
					  
					   if(res.data.Validation==false)
					   {
						   alert(res.data.Message);
					   } else {
						   if(bookingType==2){
							    console.log(res.data.URL);
							    this.setState({disabledLink:res.data.URL});
							    this.setState({disabledOnlineClass:'btn btn-info btn-sm bg-cus3'});
						   }
					   }
					   
				 });  
			  }
		    }  else {
				alert('You don\'t have permission for this trigger.');
				return false;
			} 
	  }





	  isvalideSessionDate(date, rebookdate){



	  
		console.log(date + rebookdate);
	   var startDate = '';
	   if(rebookdate==null)
	   {
		 startDate= moment(date).format('YYYY-MM-D') ;
	   } else {
		 startDate= moment(rebookdate).format('YYYY-MM-D');
	   } 
   
	   var now = new Date();
	   var nowDate= moment(now).format('YYYY-MM-D') ;
	   if(moment(startDate).isSameOrAfter(nowDate))
	   {
		  // return true
          const dateParts = date.split(/[- :]/);
          const dateTime = new Date(Date.UTC(parseInt(dateParts[0]), parseInt(dateParts[1]) - 1, parseInt(dateParts[2]), parseInt(dateParts[3]), parseInt(dateParts[4]), parseInt(dateParts[5])));
          const utcDateTime = dateTime.toISOString();
          const currentDateTime = new Date();
          const currentUtcDateTime= currentDateTime.toISOString();
          const currentDate = new Date(currentUtcDateTime);
          const targetDate = new Date(utcDateTime);
          const diffInMilliseconds = Math.abs(targetDate - currentDate);
          const diffInMinutes = diffInMilliseconds / (1000 * 60);
          console.log(diffInMinutes);

const diffInMillisecondsbefore = Math.abs(currentDateTime - targetDate);
const diffInMinutesbefore = diffInMillisecondsbefore / (1000 * 60);
console.log(diffInMinutesbefore);

          if(diffInMinutes <= 5  )
          {
	        console.log("current"+currentUtcDateTime);
	        console.log("date"+utcDateTime);
	        console.log("exist");
	        return true;
          }


else if(diffInMinutesbefore <= 5 && diffInMinutesbefore >= 0 )
          {
	        console.log("current"+currentUtcDateTime);
	        console.log("date"+utcDateTime);
	        console.log("exist");
	        return true;
          }

		else
		{
		console.log("current"+currentUtcDateTime);
		console.log("date"+utcDateTime);
		console.log("not exist");	
			return false;
		}




	   } else {
		   return false;
	   }
			 
		 }

    render(){
        const { t } = this.props;
		if(localStorage.getItem('customer_id')==null){
			return	<Redirect to="/login"/>
		} 
        return ( 
	            <div class="main-wrapper">  
                <CustomerHeader/> 
                {/* <!-- Breadcrumb --> */}
                <div class="breadcrumb-bar bg-cus">
                <div class="container-fluid">
                <div class="row align-items-center">
                    <div class="col-md-12 col-12"> 
                        <h2 class="breadcrumb-title">Profile</h2>
                    </div>
                </div>
                </div>
                </div>
                {/* <!-- /Breadcrumb --> */}


                {/* <!-- Page Content --> */}
										<div class="content bg-theme">
											<div class="container-fluid"> 
												<div class="row"> 
													<div class="col-md-12 col-lg-12 col-xl-12 dct-appoinment">
														<div class="card">
															<div class="card-body pt-0 pl-0 pr-0">
																<div class="user-tabs"> 
																{/*	<ul class="nav nav-tabs nav-tabs-bottom nav-justified flex-wrap hidden-lg hidden-md">
																
																      <li class="nav-item">
																			<a class={"nav-link "+this.state.bookingactive} href="#pat_appointments" data-toggle="tab"  onClick={this.showcalendar}>
                                                                                <div class="d-inline position-absolute tab-section-div" >
                                                                                    <i class="fas fa-calendar-check"></i></div> 
																			<div class="d-inline margin-left-12"><span>  Bookings</span>
                                                                            </div>
                                                                            </a>
																		</li>
																		<li class="nav-item">
																			<a class={"nav-link "+this.state.messageactive} href="#pres" data-toggle="tab"  onClick={this.showmessage} ><div class="d-inline position-absolute tab-section-div"><i class="fas fa-comments"></i></div> 
																			<div class="d-inline margin-left-17"><span>Messages</span></div></a>
																		</li>
																		<li class="nav-item">
																			<a class="nav-link" href="#medical" data-toggle="tab">

																				<div class="d-inline position-absolute tab-section-div"><i class="fas fa-heart"></i></div> 

																				<div class="d-inline margin-left-20"><span>Favourites</span></div></a>
																			</li>
																			<li class="nav-item">
																				<a class="nav-link" href="#billing" data-toggle="tab"><div class="d-inline position-absolute reviewme"><i class="fas fa-star"></i></div>  
																				<div class="d-inline margin-left-5" ><span>Reviews	</span></div></a>
																			</li> 

																			<li class="nav-item">
																				<a class="nav-link active" href="#pro-setting" data-toggle="tab"><div class="d-inline position-absolute tab-section-div"><i class="fas fas fa-user-cog"></i></div>
																				<div class="d-inline margin-left-5"><span>Settings</span></div></a>
																			</li>
																		</ul>*/
                                                                         }


																		<ul class="nav test1 nav-tabs nav-tabs-bottom nav-justified flex-wrap">

																			<li class="nav-item">


																				<a class={"nav-link "+this.state.bookingactive}  href="#pat_appointments" data-toggle="tab"  onClick={this.showcalendar}>
																				<div class="search-event-block-subtitle2">
                                                                                     <i class="fas fa-calendar-check icon-basket search-event-icon-right-size"></i>
                                                                                        <label class="search-event-block-padding">Bookings</label>

                                                                                    </div>
                                                                              </a> 
																				
																			</li>
																			<li class="nav-item">
																				<a  class={"nav-link "+this.state.messageactive} href="#pres" data-toggle="tab"  onClick={this.showmessage} data-toggle="tab">
																		<div class="search-event-block-subtitle">
                                                                                     <i class="fas fa-comments icon-basket search-event-icon-right-size"></i>
                                                                                        <label class="search-event-block-padding">Messages</label>

                                                                                    </div>

																				</a>
																			</li>
																			<li class="nav-item">
																				<a class={"nav-link "+this.state.favouriteactive} href="#medical"  onClick={this.showfavourite} data-toggle="tab">



												<div class="search-event-block-subtitle">
                                                                                     <i class="fas fa-heart icon-basket search-event-icon-right-size"></i>
                                                                                        <label class="search-event-block-padding">Favourites</label>

                                                                                    </div>
																					</a>
																			 </li>
																		 	<li class="nav-item">
																					<a class={"nav-link "+this.state.reviewactive} href="#billing" data-toggle="tab"  onClick={this.showreview}>

																				

									<div class="search-event-block-subtitle1">
                                                                                     <i class="fas fa-star icon-basket search-event-icon-right-size"></i>
                                                                                        <label class="search-event-block-padding">Reviews</label>

                                                                                    </div>
																					</a>
																		    </li> 

																		    <li class="nav-item">
																					<a class={"nav-link "+this.state.settingactive} href="#pro-setting" data-toggle="tab"  onClick={this.showsetting}>

									<div class="search-event-block-subtitle3">
                                                                                     <i class="fas fa-user-cog icon-basket search-event-icon-right-size"></i>
                                                                                        <label class="search-event-block-padding">Settings</label>

                                                                                    </div>
																					</a>
																				</li>
																			</ul>
																		</div>
  <div class="tab-content"> 

{/* {Seetting } */}
{this.state.settingBox &&
 <div id="pro-setting" class={"tab-pane show active"+this.state.settingactive}>
                                <div class="card border-0">
                                    <div class="card-body">
                                        <h6 class="text-center">Filled information is only visible to the specialist that you reserve a consultation with. * Mandatory fields</h6>
                                        <form method="POST"  action="" enctype="multipart/form-data">
                                            <div class="row form-row">
                                                <div class="col-12 col-md-12">
                                                    <div class="form-group">
                                                        <div class="change-avatar">
                                                            <div class="profile-img"> 
                                                                <img src={this.state.user_image} alt="User Image" /> 
                                                            </div>
                                                            <div class="upload-img">
                                                            {this.state.imagePreview && (
        <img
          src={this.state.imagePreview}
          alt="Preview"
          style={{ maxWidth: '20%', maxHeight: '20px' }}
        />
      )}
                                                                <div class="change-photo-btn">
                                                                    <span><i class="fa fa-upload"></i> Upload Photo</span>
                                                                    
                                                                        
                                                                    <input type="file" class="upload"  onChange={this.fileChangedHandler} name="avatar" />
                                                                </div>
                                                                <small class="form-text text-muted">Allowed JPG, GIF or PNG. Max size of 2MB</small>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-12 col-md-6">
                                                    <div class="form-group">
                                                        <label>First Name *</label>
                                                        <input type="text" class="form-control"  value={this.state.name}  onChange={(e)=> this.setState({ name: e.target.value})}  disabled="disabled"  />
                                                    </div>
                                                </div>

                                                <div class="col-12 col-md-6">
                                                    <div class="form-group">
                                                        <label>Surname *</label>
                                                        <input type="text" class="form-control"  value={this.state.surname}  onChange={(e)=> this.setState({ surname: e.target.value})} disabled="disabled"  />
                                                    </div>
                                                </div>
                                                <div class="col-12 col-md-6">
                                                    <div class="form-group">
                                                        <label>Email ID *</label>
                                                        <input type="email" class="form-control" value={this.state.email}  onChange={(e)=> this.setState({ email: e.target.value})} disabled="disabled" />
                                                    </div>
                                                </div>
                                                <div class="col-12 col-md-6">
                                                    <label>Mobile </label>
                                                    <div class="input-group mb-3">
                                                        <div class="input-group-prepend"> 
															<select class="form-control" name="country" value={this.state.customer_country}  onChange={(e)=> this.setState({ customer_country: e.target.value})}  > <option  selected={this.state.customer_country=="+91"? 'selected':''}>+91</option><option  selected={this.state.customer_country=="+01"? 'selected':''}>+01</option><option  selected={this.state.customer_country=="+44"? 'selected':''}>+44</option></select>
                                                        </div>
                                                       <input class="form-control" type="text" placeholder="Mobile Number" value={(this.state.mobile=='null')?'':this.state.mobile} onChange={(e)=> this.setState({ mobile: e.target.value})}  />
                                                     </div>
                    </div> 
		<div class="col-12 col-md-6">
			<div class="form-group">
				<label> Country *</label>
				   <select class="form-control" value={this.state.country}  onChange={(e)=> this.countrydropdown(e.target.value) }>
														<option>Select Country</option>
														{this.state.countryData.map( (country)=> (
														   <option value={country.id}>{country.name}</option> 
														))} 
						 </select>
				</div>
			</div>
			<div class="col-12 col-md-6">
				<div class="form-group">
					<label>City *</label>
					<select class="form-control" value={this.state.city} onChange={(e)=> this.setState({ city: e.target.value})}>
														<option>Select City</option>
														{this.state.cityData.map( (city)=> (
														   <option value={city.id}>{city.name}</option> 
														))} 
					 </select>
				</div>
			</div>
			<div class="col-12 col-md-6">
				<div class="form-group">
					<label>Your Time Zone
						<span class="small">
							(keep your location updated in order for your Time Zone to be correct)
						</span>
					</label>

					<select class="form-control"value={this.state.timezone} onChange={(e)=> this.setState({ timezone: e.target.value})}   >
										<option value="">Select Country</option>
										{this.state.timezoneData.map( (timezone)=> (
											<option value={timezone.name+timezone.utcOffsetStr}>{timezone.name +timezone.utcOffsetStr }</option> 
										))} 
					 </select>
					{/* <input type="text" class="form-control" value={this.state.timezone} disabled="disabled" /> */}

				</div>
			</div>


			<div class="col-12 col-md-6">
				<div class="form-group">
					<label>Date of Birth</label>
					<div class="cal-icon">
					   <DatePicker selected={this.state.dob} className="form-control dropdownwidth"  showMonthDropdown
      showYearDropdown onChange={(date)=> this.setState({dob:date})}customerconfirmation />
				    </div>
				</div>
			</div>


			<div class="col-12 col-md-6">
				<div class="form-group">
					<label>Invoicing Address </label>
					<div class="iaddresssection">
						<div class="col-md-6 ia" >
							<input type="text" class="form-control" placeholder="Street Address"  value={this.state.streetaddress}  onChange={(e)=> this.setState({streetaddress:e.target.value}) } />
						</div>

						<div class="col-md-6 icsection">
							<input type="text" class="form-control" placeholder="City, Zip Code, Country"  value={this.state.zipcode}  onChange={(e)=> this.setState({zipcode:e.target.value}) } />
						</div>
					</div>

				</div>
			</div>	

			<div class="col-12 col-md-6">
				<div class="form-group">
					<label>Languages for consultation </label>
					<input type="text" class="form-control hidden-xs" placeholder="Type here the language(s) to get your session done, e.g. english, italian"  value={this.state.consultationlanguage} onChange={(e)=>this.setState({consultationlanguage:e.target.value})}/>
<input type="text" class="form-control hidden-lg hidden-md hidden-sm" placeholder="e.g. english, italian" />
												 
		</div>
	</div>					 

</div>
<div class="row"> 
	<div class="col-md-12">
		<div class="submit-section">
			<center>
				<button type="submit" class="btn btn-primary submit-btn mb-4" onClick={this.customerupdate}>Save Changes</button>
			</center>
		</div>

	</div>

</div>

<div class="col-md-6">
	<div class="card border rounded p-2">
		<div class="card-title border-bottom p-3">
			Change Password
		</div>
		<div class="card-body">
		 <form action="" method="POST">
			<div class="row mb-4">
				<div class="col-md-4">
					<label class=" mt-2 font-weight-bold">Current *</label>
				</div>
				<div class="col-md-8">
					<input type="password" placeholder="******" class="form-control ml-3 w-100" value={this.state.currentpassword}  onChange={(e)=>this.setState({currentpassword:e.target.value})}/>
				</div> 
			</div>
			<div class="row mb-4">
				<div class="col-md-4">
					<label class=" mt-2 font-weight-bold">New</label>
				</div>
				<div class="col-md-8">
					<input type="password" placeholder="" class="form-control ml-3 w-100" value={this.state.newpassword}  onChange={(e)=>this.setState({newpassword:e.target.value})} />
				</div> 
			</div>
			<div class="row">
				<div class="col-md-4">
					<label class="mt-2 font-weight-bold">Re-Type New</label>
				</div>
				<div class="col-md-8">
					<input type="password" placeholder="" class="form-control ml-3 w-100" value={this.state.confirmpassword}  onChange={(e)=>this.setState({confirmpassword:e.target.value})}/>
				</div> 
			</div> 
			<div class="submit-section mt-3 col-md-12">
				<center><button type="submit" class="btn btn-primary submit-btn" onClick={this.changepassword}> Change Password</button></center>
			</div>
		</form>

		</div>
	</div>
</div>

</form>


</div>
</div>
</div>
	}
{/* {Booking} */}
{this.state.bookingBox &&
<div id="pat_appointments" class={"tab-pane search-box "+this.state.bookingactive}>

	<h3 class="text-danger text-center">Manage your consultations here:</h3>
	<div class="card card-table mb-0 mt-2">
		<div class="card-body"> 
			<div class="col-md-3 mt-2">
				<div class="form-group search-info w-100 mb-2">
					<input type="text" class="form-control sspf" placeholder="Search"  onChange={this.handleChangeSearch.bind(this)} />
  				</div>
			</div>

			<div class="col-md-1 sbutton hidden-lg hidden-md hidden-sm d-none">

				<button type="submit" class="btn btn-primary search-btn mb-4"><i class="fas fa-search"></i> <span>Search</span></button>
			</div>

			<div class="table-responsive">
				<table class="table table-hover table-striped table-center mb-0">
					<thead>
						<tr class="text-center">
							<th>Status <div class="bookingstatustooltip"><i class="fas fa-info-circle"  title=""></i>
								<span class="bookingstatustooltiptext text-left" ><ul class="cus-fs margin-bottom-0"><li>BOOKED: reservation confirmed.</li>
									<li>DONE: the session has been completed, you can now leave a review about it.</li><li>REBOOK: up to 24 h before the session, you can choose here to rebook a new session date (we suggest to message the specialist to check spots availability). Specialists can also purpose you a rebooking if needed.</li><li>CANCEL: cancel here your session with a full money restitution -available up to 24 h before the consultation.</li><li>PAST: record of a past consultation.</li></ul>

								</span>
							</div></th>
							<th>Type</th> 
							<th>Specialist</th>
							<th>Booking</th>
							<th>Session Date</th>
							<th>Link 
								<div class="bookingstatustooltip">
								<i class="fas fa-info-circle m-1"  title=""></i>
									<span class="bookingstatustooltiptext text-left">

										<p class="text-center cus-fs margin-bottom-0 pl-1" >LINK buttons to join/rebook a session appear here:</p>

										<ul class="cus-fs margin-bottom-0 pl-1-half list-unstyled">


										<li class="test" >GO TO QUERY button accesses the message consultation requested by the client</li><li class="test">JOIN ONLINE SESSION link enters the audio-video session with your specialist</li><li class="test">REBOOK HERE button serves to access the booking page to select a new spot for your consultation</li></ul>

									</span>
								</div>

							</th>
							<th>Notes by specialist
								<div class="bookingnotestooltip"><i class="fas fa-info-circle ml-1"  title=""></i>
									<span class="bookingnotestooltiptext toolnotes text-left width-275" >See here communications provided by the specialist about the consultation

									</span>
								</div>
							</th>
							<th>Private Records
								<div class="bookingnotestooltip"><i class="fas fa-info-circle ml-1"  title=""></i>
									<span class="bookingnotestooltiptext toolnotes text-left width-275" >Keep here your records about the consultation. This file is only visible to you

									</span>
								</div>

							</th>
							<th>Price/Invoice</th>
						</tr>
					</thead>
					<tbody>
					 
					{this.state.booking_history.filter( (booking)=> {   
						// return booking.first_name.toLowerCase(); 
						return (this.state.searchvalue===null || this.state.searchvalue===undefined  ||this.state.searchvalue==='')?booking: (booking.first_name.toLowerCase().includes(this.state.searchvalue.toLowerCase()) || booking.last_name.toLowerCase().includes(this.state.searchvalue.toLowerCase()) ||  (booking.first_name+' '+booking.last_name).toLowerCase().includes(this.state.searchvalue.toLowerCase()));
						}).map( (booking)=> (  		
						<tr>
							<td class="pr-0 pl-1">
							<select class="w-100"  onChange={(e)=> this.updateBooking(e.target.value,booking.bookingID,booking.Sid) }> 
								<option class="text-success" selected={booking.booking_status == 1} value='1'>Booked</option>
								<option class="text-success" selected={booking.booking_status == 2} value='2'>Done</option>
								<option class="text-danger" selected={booking.booking_status == 3}  value='3'>Cancel</option>
								{booking.legendId == 1 || booking.legendId == 2|| booking.legendId == 3 ?null:<option class="text-info" selected={booking.booking_status == 4 || booking.booking_status == 7}  value='4'>Rebook</option>}
								<option class="text-dark" selected={booking.booking_status == 5}  value='5'>Past</option>
							</select> 
							</td>
							<td>{booking.legend_name }</td>
							<td><a href={"specialistDetails/"+booking.Sid} target="_blank">{booking.first_name} {booking.last_name}</a></td>
							<td>

						 {booking.booking_status==4 ?
						   <div> <span style={{color:"#ccc"}}>
							  { moment(booking.booking_date).format('D MMM YYYY') }
							  </span> 
						    <br/> {moment(booking.updated_at).format('D MMM YYYY')} 
							</div>
						    : 
						     moment(booking.booking_date).format('D MMM YYYY') 
						   }
							 </td>
							<td class="text-center">
								{ (booking.legendId==1 || booking.legendId==2|| booking.legendId==3) ? 
															   "-"
															:
						 booking.booking_status==4 ?
						   <div> <span style={{color:"#ccc"}}>
							     {localStorage.getItem('UserTimezone')!=null ? moment.utc(booking.session_date).tz(localStorage.getItem('UserTimezone')).format('D MMM YYYY h:mm A') : moment(booking.session_date).format('D MMM YYYY h:mm A') }
							  </span> 
						    <br/>
							{localStorage.getItem('UserTimezone')!=null ? moment.utc(booking.rebook_session_date1).tz(localStorage.getItem('UserTimezone')).format('D MMM YYYY h:mm A') : moment(booking.rebook_session_date1).format('D MMM YYYY h:mm A') }
							 
							</div>
						 : 
						 booking.rebook_session_date1==null?
						 localStorage.getItem('UserTimezone')!=null ? moment.utc(booking.session_date).tz(localStorage.getItem('UserTimezone')).format('D MMM YYYY h:mm A') : moment(booking.session_date).format('D MMM YYYY h:mm A')
						  :
						  <div> <span style={{color:"#ccc"}}>
						  { localStorage.getItem('UserTimezone')!=null ? moment.utc(booking.session_date).tz(localStorage.getItem('UserTimezone')).format('D MMM YYYY h:mm A') : moment(booking.session_date).format('D MMM YYYY h:mm A') }
						  </span> 
						<br/> {localStorage.getItem('UserTimezone')!=null ? moment.utc(booking.rebook_session_date1).tz(localStorage.getItem('UserTimezone')).format('D MMM YYYY h:mm A') : moment(booking.rebook_session_date1).format('D MMM YYYY h:mm A')} 
						</div>
															 
                            }	</td>
							<td> 
                                 <center>

															{ (booking.legendId==1 || booking.legendId==2|| booking.legendId==3) ? 
															   <a href="customerdashboard?pat_message"  class="btn btn-info btn-sm bg-cus1 border-cus2" >GO TO QUERY</a>
															:
															  (booking.booking_status==5 || booking.booking_status==3 || booking.booking_status==4 || booking.booking_status==7 ) ?
															      <a href={this.state.disabledLink}   class={this.state.disabledOnlineClass}  >JOIN ONLINE SESSION </a>
																  : //Video 
																  (booking.legendId==4 || booking.legendId==5 || booking.legendId==6) ?
																		  this.isvalideSessionDate(booking.session_date,booking.rebook_session_date1)==true? 
																			  <a href={"https://medalohacall.cresol.in/?payment="+btoa(booking.first_name +'_'+ booking.last_name+'||'+booking.Room+'||Video')  }
																			  target="_blank" class={this.state.enabledOnlineClass}  >JOIN ONLINE SESSION </a> 
																			  :'-' 
																	 :  // audio 
																  (booking.legendId==7 || booking.legendId==8 || booking.legendId==9) ?
																  this.isvalideSessionDate(booking.session_date,booking.rebook_session_date1)==true? <a href={"https://medalohacall.cresol.in/?payment="+btoa(booking.first_name +'_'+ booking.last_name+'||'+booking.Room+'||Audio')  }
																  target="_blank" class={this.state.enabledOnlineClass}  >JOIN ONLINE SESSION </a> :'-' : '-'
   
															   
														     }	
 
															</center>

							</td>
							<td class="text-center">
															<textarea class="form-control notes-client" placeholder="Notes"  onBlur={(e)=> this.updateNoteForClient(e.target.value,booking.bookingID) }  disabled >{booking.client_note}</textarea>
														</td> 
														<td>
													      <textarea class="form-control notes-private" placeholder="Notes" onBlur={(e)=> this.updateNoteForPrivate(e.target.value,booking.bookingID) } >{booking.private_note}</textarea>
							                           </td>
							<td>
								<p class="text-center pb-0">{booking.booking_price}/<a href={"invoice/"+booking.bookingID} class="text-primary" target="_blank">Invoice.pdf </a>
								</p>
							</td>
						</tr>
					))}
 
{this.state.booking_history=='' &&
<tr><td colSpan='9'><p style={{textAlign:'center',color:'red'}}>Data not found</p></td></tr>
}
					</tbody>
				</table>
			</div>
		</div>
	</div>
</div>
	}
{/*  Message */}
{this.state.messageBox &&
<div  id="pres" class={"tab-pane  search-box "+this.state.messageactive}> 
	<div class="col-xl-12">
     	<div class="chat-window">  
 {this.state.booking_history=='' &&
    <p style={{textAlign:'center',color:'red'}}>Data not found</p> 
  }
   {this.state.booking_history!='' &&
		      <ChatScreen    
		        id={localStorage.getItem('customer_id')}
                name={this.state.name+' '+this.state.surname}
                path={this.state.user_image}
                c_name={this.state.s_name+' '+this.state.s_surname}
                c_path={this.state.s_image} 
               />  
			}
		 </div>
	</div>
</div>
 }

{/* Favourate */}
{this.state.favouriteBox &&
<div class={"tab-pane search-box "+this.state.favouriteactive} id="medical">
	<h3 class="text-danger text-center">List of Favourite Professionals:</h3>
 
	{this.state.specialist_filter_data.map( (data)=> (	
 				 <div class="card">
					  <div class="pull-right" style={{paddingRight:'1.5rem'}}><button type="button" class="btn btn-primary mt-4 pull-right" onClick={()=>this.removeFav(data.Fid)} > &nbsp; X </button> </div>
						 <div class="card-body">
							 <div class="doctor-widget">
								 <div class="col-md-8">
									 <div class="media sp-media">
									 
					 <div class="profile-widget doctor-img img-text" >
							 <h4 class=" font-size-21 color1">{data.SpecialistName}</h4>
							 {data.HealthCareuniversitydegree  !=0  && 
							 <img src="assets\icon\medicine.png" class="img-fluid search-pic se-pic1 z-index1" alt="User Image" />
							 } 
						  <div class="doc-img">
							 <a href={data.SpecialistPublicProfileURL} class="d-flex d-flextest">
							  <img src={`${data.SpecialistPic}`} class="img-fluid mainimg specialist-image"  alt="User Image"/>
							 </a>
							 <a href="javascript:void(0)" class="fav-btn bookmark-a" tabindex="0" onClick={e=>this.favSpecialist(data.SpecialistPublicPrivateID)}>
							 <i class="far fa-bookmark"></i>
							 </a>
							 </div>
					 </div>
					 <div class="media-body">
					   <div class="doc-info-cont  mt-4">
						 <h4 class="doc-name mb-0">
						  <a href="javascript:void(0)" class="text-dark">{data.SpecialistTitle}
						 </a>
						</h4> 
						 <p class="doc-speciality mb-2 font-weight-bold">{data.SpecialistStudy}</p>
						 <a href="#">
						 <h6 class="text-info  mb-2">{data.SpecialistHolestic}</h6>
						 </a>
						 <h6 class="text-muted"></h6> 
						 <h6 class="text-muted mb-1">
						 <i class="far fa-money-bill-alt"></i> {data.Princestring}
						
<i class="fas fa-info-circle pricetooltip ml-1" data-toggle="tooltip" data-original-title=""><span class="pricetooltiptext">Range price for all types of consultations</span></i>
						</h6>
						<div class="rating mb-1">
						{
							 this.printReviewStar(data.SpecilistRatingAvg)
						 } 
						 <span class="d-inline-block average-rating text-muted text-muted">({data.SpecilistRatingCount})&nbsp;
						 <span class="text-muted">&nbsp;
						 </span>
						 <span class="text-muted reviews">
						   <u>No Reviews</u>
						 </span>
						 </span>
						 </div>
				<h6 class="text-info mb-1">
				 <span  class="color-858585">Tags: </span> 
				  {data.Tabs.map( (tag)=> (
						<span  class="858585">{tag.tag_name} , </span>	
				  ))} 
				  
				  <button class="read-more-btn" onclick="myFunction2()" id="myBtn2">...</button>
			  </h6>
				 <div class="clinic-details mb-0">
				 <p class="doc-location mb-1"><i class="fas fa-map-marker-alt"></i> {data.SpecialistCity}, {data.SpecialistCountry}</p>
				 </div> 
				 <div class="mw-300">
				  <a class="btn view-btn" href={data.SpecialistPublicProfileURL} >View Profile</a>
				 </div>
			 </div>
		 </div>
	 </div>
						
				   </div>
					 <div class="co-md-4" >
					  <div class="clinic-services">
						 <div class="row">
						  <div class="col-md-12"> 
							 <h6 class="font-weight-bold text-muted text-center mt-2 ml-1">Available Consultations
							  <div class="searchtooltip">
							  <i class="fas fa-info-circle ml-1"  title=""></i>
							 <span class="searchtooltiptext favsearch text-left" >
							 <h4  class="text-center text-white cus-fs1 types-of-con-text">Types of consultations:
							 </h4>

<ul class="cus-fs margin-bottom-0" >
<li>Chat: you can write voice message the specialist about a specific subject</li>
<li>Video: you can access online your audio-video session, comfortably from your place</li>
<li>In-vivo:join a specialist for a live session, searching by area of interest</li></ul>
<h5 class="text-justify text-white padding-5 cus-fs" > Modes can be PART (e.g. exploratory session) or FULL (e.g. complete session). Check specialist’s profile for specific details.</h5>
<div class="text-center">
 <a href="/howitworks" class="how-it-work">How it works</a> 
</div>
</span>
</div>
</h6>


</div>

</div>
<div class="card flex-fill mt-0 mb-0">
<ul class="list-group list-group-flush">
 <li class="list-group-item d-flex">
	 <img src="assets/images/written.png" class="custom-width custom-height"/>
	 <h6 class="written_text_color ml-2 text-left consult_text_box">Chat</h6>
	 <button class="w-100 written_box_color text-white font-weight-bold font-size-10" 
	 onclick="gotopage('message')" >
	 Make your request now

 </button>
</li>
<li class="list-group-item d-flex">
 <img src="assets/images/video.png" class="custom-width custom-height" />
 <h6 class="orange ml-2 text-left consult_text_box">Video</h6>
 <button onclick="gotopage('video')" class="w-100 bg-orange font-size-10 font-weight-bold" >
 Next Availability: 17 Nov
</button>
</li>

<li class="list-group-item d-flex">
<img src="assets/images/live.png" class="cystom-width custom-height" />
<h6 class="blue ml-2 text-left consult_text_box" >&nbsp;In-Vivo</h6>
<button class="w-100 bg-blue text-white font-weight-bold font-size-11">
 No free shots: <i class="fa fa-bell"></i> Alert
 
</button>
</li>
</ul>
</div>
</div>
				 
			 </div> 
		 </div>
	 </div>
 </div>

	))}
 

 </div>
	}
 {/* Review */}
 {this.state.reviewBox &&
<div class={"tab-pane "+this.state.reviewactive} id="billing">
<div class="write-review container">
	<h4 class="text-center font-weight-bold">Write a review about your consultation with:</h4>

	{/* <!-- Write Review Form --> */}
		{/* <!-- Write Review Form --> */}
	<form>
<select class="form-control" value={this.state.specialist_id}  onChange={this.specialistdropdown.bind(this)}>
							<option>Select Specialist</option> 
 {this.state.specialistListingData.map( (specialist)=> (
<option value={specialist.specialist_id+'|'+specialist.ListData+'|'+specialist.country_id}>{specialist.ListData}</option> 

))} 
</select>

		<div class="form-group"> 
			<label class="font-weight-bold font-size-21 color1" >{ (this.state.specialist_id==='')?'':this.state.specialist_id.split('|')[1]+' '+this.state.specialist_id.split('|')[2]}</label>
			<textarea id="review_desc" maxlength="100" class="form-control bg-light .custom-height4"  placeholder="Your review" onChange={this.handleInputChanged.bind(this)}></textarea>
			<p class="recommend-btn mt-3">
				<span class="mr-2 h4">Recommend?</span>
				<a href="javascript:void(0)" value="1" class={this.state.recommend_select}   onClick={() =>this.InputChanged1(1)}>
					<i class="far fa-thumbs-up"></i> Yes
				</a>
				<a href="javascript:void(0)" value="0" class={this.state.recommend_deselect}  onClick={() =>this.InputChanged2(0)}>
					&nbsp;<i class="far fa-thumbs-down"></i> No
				</a>
			</p>
			<div class="form-group d-flex">
				<span class="h4 mr-2">Consultation quality?</span>
				<div class="star-rating">


					<input id="star-5" type="radio" name="rating" value="5" onChange={(e)=>this.handleChange(e,5)} />
					<label for="star-5" title="5 stars">
						<i class="active fa fa-star"></i>
					</label>
					<input id="star-4" type="radio" name="rating" value="4" onChange={(e)=>this.handleChange(e,4)} />
					<label for="star-4" title="4 stars">
						<i class="active fa fa-star"></i>
					</label>
					<input id="star-3" type="radio" name="rating" value="3"  onChange={(e)=>this.handleChange(e,3)} />
					<label for="star-3" title="3 stars">
						<i class="active fa fa-star"></i>
					</label>
					<input id="star-2" type="radio" name="rating" value="2" onChange={(e)=>this.handleChange(e,2)} />
					<label for="star-2" title="2 stars">
						<i class="active fa fa-star"></i>
					</label>
					<input id="star-1" type="radio" name="rating" value="1" onChange={(e)=>this.handleChange(e,1)} />
					<label for="star-1" title="1 star">
						<i class="active fa fa-star"></i>
					</label>
				</div>
			</div>

		</div>
		
		<hr />
		<div class="form-group">
			<div class="terms-accept">
				<div class="custom-checkbox"  style={{display:'none'}}>
					<span class="mr-2 h4">I would like to appear as:</span>
					<div class="item">
						<input type="checkbox" id="terms_accept" class="align-middle" />
						<label for="terms_accept" class="mr-3">Name only </label>
					</div>
					<div class="item">
						<input type="checkbox" id="terms_accept" class="align-middle" />
						<label for="terms_accept" class="mr-3">Name Surname & Picture </label>
					</div>
					<div class="item">
						<input type="checkbox" id="terms_accept" class="align-middle" />
						<label for="terms_accept" class="mr-3">Anonym </label>
					</div>
				</div>
			</div>
		</div>
		<div class="submit-section">
			<center>
				<button type="button" class="btn btn-primary submit-btn mb-4" onClick={() => this.handleButtonClicked(this.state.specialist_id)}  >Add Review</button>
			</center>
		</div> 
	</form>
	{/* <!-- /Write Review Form --> */}
</div> 
<div class="widget review-listing mt-3">
	<h2 class="text-center font-weight-bold">Your past reviews:</h2>
		<ul class="comments-list">  
	{(this.state.reviewpastData.length<1)?<div class="no_record">No Records Found ...</div>:this.state.reviewpastData.map( (review)=> ( 
		<li class=" bg-white container">
			<div class="comment p-3"> 
		   	<img class="avatar avatar-sm rounded-circle" alt="User Image" src={(review.UserPic==null)?process.env.REACT_APP_URL+'/assets/img/doctors/doctor-thumb-02.jpg':`${process.env.REACT_APP_BASE_URL}/public/uploads/profile/${review.UserPic}`}  />
					<div class="comment-body">
					<div class="meta-data">
						<span class="comment-author">{review.UserName} </span>
						<span class="comment-date">{this.convert(review.ReviewCreated)}, Message Consultation</span> 
						{(review.RecommandStatus==1)?<p class="recommended"><i class="far fa-thumbs-up font-size-20"></i> I recommend this Specialist</p>:<p class="comment-content">
		                <span class="text-danger"><i class="far fa-thumbs-down text-danger font-size-20"></i> I do not recommend this Specialist</span></p>}
						<div class="review-count rating">
									{
									   this.printReviewStar(review.ReviewStar)
									}
								
							</div>
					</div>
					<p class="comment-content">
						{review.ReviewDescription}
					</p>

				</div>

			</div>
			<ul class="comments-reply pl-5">
				<li>
					<div class="comment"> 
				{review.ReplyDescription && review.ReplyDescription!='' ?  <img class="avatar avatar-sm rounded-circle" alt="User Image" src= {review.SpecilistPic=='' ?process.env.REACT_APP_URL+'/assets/img/doctors/doctor-thumb-02.jpg': review.SpecilistPic } /> : '' }
				        {review.ReplyDescription && review.ReplyDescription!='' ? 
				          <div class="comment-body">
							<div class="meta-data">
								<span class="comment-author">{review.SpecialistName}</span>
								<span class="comment-date">Specialist</span> 
							</div>  
							<p>{review.ReplyDescription}</p> 
						</div>
						:''}
					</div>
				</li>
			</ul>
		</li> 
		))} 

		{/* <!-- /Comment List --> */}

	</ul>

</div>

</div>
	}
{/* <!-- Billing Tab --> */}

					</div>
				</div>
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


export default withTranslation()(Dashboard);
