import React , {Component} from 'react';
//import { useTranslation } from 'react-i18next';
import { withTranslation } from 'react-i18next';
import i18n from "i18next";
// import settingLanguage from './helper';
import CustomerHeader from './Components/CustomerHeader';
import Footer from './Components/Footer';
import axios from 'axios';
import { Redirect,useHistory} from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
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
		   booking_chat_channel:[], 
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
		   specialist_filter_data:[],
		   specialist_category_filter_data:"",
		   healthcheck:false,
		   universitycheck:false,
		   ResultCount:0,
		   locationtext:'',
		   nametext:'',
		   tagsselected:'',
		   tagsData:[] ,
		   sortbyselected:'',
		   eventDate:''
        };   
  
    }  

  

	handleChangeLocation = e => {  
		this.setState({locationtext: e.target.value }); 
		function updateQueryStringParameter(uri, key, value) {
		var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
		var separator = uri.indexOf('?') !== -1 ? "&" : "?";
		if (uri.match(re)) {
		  return uri.replace(re, '$1' + key + "=" + value + '$2');
		}
		else {
		  return uri + separator + key + "=" + value;
		}
	  }
	  
	 
	  var url=updateQueryStringParameter(window.location.href,'location',e.target.value);
	   //console.log(url+'healthcheck'+e.target.checked); 
		window.location.href=url;
	  };

	  


	  


	  handleChangeSortby = e => { 
 
		this.setState({sortbyselected: e.target.value });
	  
		function updateQueryStringParameter(uri, key, value) {
		var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
		var separator = uri.indexOf('?') !== -1 ? "&" : "?";
		if (uri.match(re)) {
		  return uri.replace(re, '$1' + key + "=" + value + '$2');
		}
		else {
		  return uri + separator + key + "=" + value;
		}
	  }
	  
	 
	  var url=updateQueryStringParameter(window.location.href,'sortcolumn',e.target.value);
	   //console.log(url+'healthcheck'+e.target.checked); 
		window.location.href=url;
	  };


	  handleChangeTags = e => { 
 
		this.setState({tagsselected: e.target.value });
	  
		function updateQueryStringParameter(uri, key, value) {
		var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
		var separator = uri.indexOf('?') !== -1 ? "&" : "?";
		if (uri.match(re)) {
		  return uri.replace(re, '$1' + key + "=" + value + '$2');
		}
		else {
		  return uri + separator + key + "=" + value;
		}
	  }
	  
	 
	  var url=updateQueryStringParameter(window.location.href,'tags',e.target.value);
	   //console.log(url+'healthcheck'+e.target.checked); 
		window.location.href=url;
	  };


	handleChangeName = e => { 
 
		this.setState({nametext: e.target.value });
	  
		function updateQueryStringParameter(uri, key, value) {
		var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
		var separator = uri.indexOf('?') !== -1 ? "&" : "?";
		if (uri.match(re)) {
		  return uri.replace(re, '$1' + key + "=" + value + '$2');
		}
		else {
		  return uri + separator + key + "=" + value;
		}
	  }
	  
	 
	  var url=updateQueryStringParameter(window.location.href,'name',e.target.value);
	   //console.log(url+'healthcheck'+e.target.checked); 
		window.location.href=url;
	  };



handleChange = e => { 
 
  this.setState({healthcheck: e.target.checked });

  function updateQueryStringParameter(uri, key, value) {
  var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
  var separator = uri.indexOf('?') !== -1 ? "&" : "?";
  if (uri.match(re)) {
    return uri.replace(re, '$1' + key + "=" + value + '$2');
  }
  else {
    return uri + separator + key + "=" + value;
  }
}


var url=updateQueryStringParameter(window.location.href,'healthcheck',e.target.checked);
 console.log(url+'healthcheck'+e.target.checked); 
  window.location.href=url;
};




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

handleChange2 = e => { 

	alert(e.target.checked);
 
	this.setState({universitycheck: e.target.checked });
  
	function updateQueryStringParameter(uri, key, value) {
	var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
	var separator = uri.indexOf('?') !== -1 ? "&" : "?";
	if (uri.match(re)) {
	  return uri.replace(re, '$1' + key + "=" + value + '$2');
	}
	else {
	  return uri + separator + key + "=" + value;
	}
  }  
  var url=updateQueryStringParameter(window.location.href,'universitycheck',e.target.checked);
   console.log(url+'universitycheck'+e.target.checked); 
	window.location.href=url;
  };

 fileChangedHandler = event => {
	this.setState({ selectedFile: event.target.files[0] })
	} 

 formatAMPM= (date) => {
  console.log(date);
  console.log("hello");
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}

chooseEvent= e => { 
	console.log(e.target.value);
	this.setState({eventDate:e.target.value});
	function updateQueryStringParameter(uri, key, value) {
		var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
		var separator = uri.indexOf('?') !== -1 ? "&" : "?";
		if (uri.match(re)) {
		  return uri.replace(re, '$1' + key + "=" + value + '$2');
		}
		else {
		  return uri + separator + key + "=" + value;
		}
	  } 
	  var url=updateQueryStringParameter(window.location.href,'events',e.target.value);
	  console.log(url); 
	   window.location.href=url;
}


    componentDidMount() { 
			let search = window.location.search;
			let params = new URLSearchParams(search);
			let location = params.get('location');
			let name = params.get('name');
			let tags = params.get('tags');
			let healthcheck = params.get('healthcheck');
			let universitycheck = params.get('universitycheck');
			let sortcolumn = params.get('sortcolumn');
			let events = params.get('events');
			this.setState({locationtext : location}); 
			this.setState({nametext : name});
			this.setState({tagsselected : tags});
			this.setState({sortbyselected:sortcolumn});	

			if(healthcheck=='true'){
				this.setState({healthcheck:true});
			}

			if(universitycheck=='true'){
				this.setState({universitycheck:true});
			}
   
         axios.get(process.env.REACT_APP_BASE_URL+`/medalohaAPI/SpecialistFilterData?location=`+location+'&name='+name+'&tags='+tags+'&healthcheck='+healthcheck+"&universitycheck="+universitycheck+"&sortcolumn="+sortcolumn+"&events="+events+'&language_id='+localStorage.getItem('i18nextLng'))
		 .then(res => {
			 console.log('search start --->');
			 //console.log(res.data['Result'][0]['OthersData']['videoCount']);
			 console.log(res);
			 this.setState({specialist_filter_data: res.data['Result']});
			 this.setState({ResultCount:res.data['Result'].length});

			
			 //this.setState({specialist_category_filter_data: res.data.Category}); 
        }); 


		axios.get(process.env.REACT_APP_BASE_URL+`/authenticationAPI/GetAllTagsByLanguage?language_id=`+localStorage.getItem('i18nextLng'))
	.then(res => {
		this.setState({tagsData : res.data});
		 console.log('---->tags');
		 
		 console.log(res.data);
	});  
	  }

	  countrydropdown(countryvalue,cityvalue){
		 this.setState({ country: countryvalue}); 
		 axios.get(process.env.REACT_APP_BASE_URL+`/authenticationAPI/GetAllCityByCountryID?country_id=`+countryvalue)
		.then(res => {
			this.setState({cityData : res.data});  
		});  
        this.setState({city : cityvalue}); 
	  } 


  gotopage(text,spec_id,count,price, legendid) { 
	 



	  localStorage.setItem('value',price); // price
	  localStorage.setItem('legend',legendid);  // legend id  
  if(text==null){ 
  }
  else
  {
  	if(text=='chat'){
  	 const { history } = this.props; 
	   if(count==2)


        history.push("/specialistDetails/"+spec_id);
		if(count==1)
	    history.push("/bookingmessageconsultation/"+spec_id); 
    }

    if(text=='video'){
  	 const { history } = this.props; 
	   if(count==2)
	   		//alert(legendid+"vijay");
{

var ct_id = localStorage.getItem('customer_id')

if(ct_id!=null)
{
const clientData = {user_id :ct_id, specialist_id : spec_id}
		console.log(clientData); 
		axios.post(process.env.REACT_APP_BASE_URL+`/customerAPI/EmailRegisterForNextSlot`, clientData)
		.then(res => {  
			// if(res.data['Status']){
				alert(res);
			// }

		});
}

	   history.push("/specialistDetails/"+spec_id);

	}
	   if(count==1)
	   	//alert(legendid+"ajay");
     history.push("/bookingvideoconsultation/"+spec_id);
    }

if(text=='audio'){
  	 const { history } = this.props; 
	   if(count==2)
	   history.push("/specialistDetails/"+spec_id);
	   if(count==1)
     history.push("/bookingvideoconsultation/"+spec_id);
    }

      if(text=='invivo'){

alert("hello12");
  	 const { history } = this.props;
	   if(count==2)
 {

alert("hello1");
var ct_id = localStorage.getItem('customer_id')

if(ct_id!=null)
{
const clientData = {user_id :ct_id, specialist_id : spec_id}
		console.log(clientData); 
		axios.post(process.env.REACT_APP_BASE_URL+`/customerAPI/EmailRegisterForNextSlot`, clientData)
		.then(res => {  
			// if(res.data['Status']){
				alert(res);
			// }

		});
}


 }






	   history.push("/specialistDetails/"+spec_id);
	   if(count==1)
       history.push("/bookingvideoconsultation/"+spec_id);
    }

  }
  };
	 	

  favSpecialist(specialist_id) { 
	var ct_id = localStorage.getItem('customer_id');
	if(ct_id== null){
		alert("Please login before choose Favourite");
		return false;
	} else {

		const clientData = {user_id :ct_id, specialist_id : specialist_id}
		console.log(clientData); 
		axios.post(process.env.REACT_APP_BASE_URL+`/medalohaAPI/UserFavSpecialist`, clientData)
		.then(res => {  
			if(res.data['Status']){
				alert(res.data['Message']);
			}
			 
		});  

	} 

}


 
 
    render(){ 
        const { t } = this.props;
        const emptyDataChat = {
      display: 'none'
    }; 
 return (     
	<div class="main-wrapper">
		<CustomerHeader/>  
		 <div class="breadcrumb-bar search-box2">  
				 <div class="container-fluid">
					<div class="row align-items-center">
						<div class="col-md-3 mb-2 col-12">
						  <h2 class=" text-white mb-0 cus-fs2" >{this.state.specialist_filter_data && true ?this.state.specialist_filter_data.length:0} matches found: </h2>
						</div>
					<div class="col-md-6 mb-2 col-12 d-flex">
					<input type="checkbox" class="margin-top-5"   checked={this.state.healthcheck} value={this.state.healthcheck} onChange={this.handleChange} /> 
					<span class="text-white">
			    	<img src="assets\icon\medicine.png" title="Healthcare University Degree"  class="img-fluid  doc-only hidden-xs hidden-sm mtop-10" alt="User Image" />
			    	<img src="assets\icon\medicine.png" title="Healthcare University Degree" class="img-fluid  doc-only-mob hidden-lg hidden-md" alt="User Image" />
			    	<span style={{marginLeft:'33px'}}  >Healthcare University Degree</span> 
				</span>
				<input type="checkbox" class="margin-top-5" style={{'marginLeft':'50px'}} checked={this.state.universitycheck} name="degree" value={this.state.universitycheck} onChange={this.handleChange2}  /> 
 
<span class="text-white">
<img src="assets\icon\University_degree.png" title="Other University Degree" class="img-fluid  doc-only-mob1  hidden-lg hidden-md" alt="User Image" />
<img src="assets\icon\University_degree.png" title="Other University Degree" class="img-fluid  doc-only hidden-xs hidden-sm oui" alt="User Image" />
			    	 
<span style={{marginLeft:'60px'}} >Other University Degree</span>
</span>
				 			 
						</div>
						<div class="col-md-2 col-7">
							<div class="mb-2">
								<span class="text-white">Sort by</span>
								<span class="sortby-fliter sortby-fliter3" >
								<select class="" onChange={this.handleChangeSortby} style={{'width':'75%'}}>
										<option selected="">Sort By</option> 
										<option class="sorting" selected={this.state.sortbyselected=='Surname'?"selected":""}>Surname</option> 
										<option class="sorting" selected={this.state.sortbyselected=='Rating'?"selected":""}>Rating</option> 
										<option class="sorting"   value="Count" selected={this.state.sortbyselected=='Count'?"selected":""}>Number of Ratings</option> 
										<option class="sorting" selected={this.state.sortbyselected=='Price'?"selected":""}>Price</option>
										<option class="sorting" value="Written" selected={this.state.sortbyselected=='Written'?"selected":""}>Chat Consultation</option>
										<option class="sorting" value="Audio" selected={this.state.sortbyselected=='Audio'?"selected":""}>Audio Consultation</option>
										<option class="sorting" value="Video" selected={this.state.sortbyselected=='Video'?"selected":""}>Video Consultation</option>
										<option class="sorting" value="Person" selected={this.state.sortbyselected=='Person'?"selected":""}>In Vivo Consultation</option>
									</select>
								</span>
							</div>
						</div>
						<div class="col-md-1 mb-2 col-5 padding-0" > 
							<span class="text-white"> Date</span> 

							<input class="calender calicon" type="date" onChange={this.chooseEvent} /> 
						</div>
					</div>
				</div>
				 </div> 
			<div class="content bg-theme">
				<div class="container-fluid"> 
 {this.state.specialist_filter_data.length!=0  ? 
    this.state.specialist_filter_data.map( (data)=> (	
	<div class="row">
	<div class="col-md-12 col-lg-12 col-xl-12">
	 <div class="card">
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
						   
<i class="fas fa-info-circle pricetooltip ml-1" data-toggle="tooltip" data-original-title="">
<span class="pricetooltiptext">Range price for all types of consultations</span>

				   </i>

						  </h6>
						  <div class="rating mb-1">
							  {
									this.printReviewStar(data.SpecilistRatingAvg)
							 } 
						   <span class="d-inline-block average-rating text-muted text-muted">({data.SpecilistRatingCount})&nbsp;
						   <span class="text-muted">&nbsp;
						   </span>
						   <span class="text-muted reviews">
							 <span>No Reviews</span>
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
<h6 class="font-weight-bold text-muted text-center mt-2 ">Available Consultations
								<div class="searchtooltip ml-1">
								<i class="fas fa-info-circle"  title=""></i>
							   <span class="searchtooltiptext text-left" >
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
{data.LengendId && (data.LengendId.includes(1)==true || data.LengendId.includes(2)==true || data.LengendId.includes(3)==true) ?
  

   <li class={data.MessageData && data.MessageData['Count']==0 ?'list-group-item d-flex emptyDataChat':"list-group-item d-flex"} >
	   <img src="assets/images/written.png" class="custom-width custom-height"/>
	   <h6 class="written_text_color ml-2 text-left consult_text_box">Chat</h6>
	 {data.MessageData && data.MessageData['Count']==0 ?  <button  class="w-100 written_box_color text-white font-weight-bold font-size-10" 
	   onClick={e=>this.gotopage('chat',data.SpecialistPublicPrivateID,2,0,0)} >
		Make your request now 
	 </button> : <button class="w-100 written_box_color text-white font-weight-bold font-size-10" 
	   onClick={e=>this.gotopage('chat',data.SpecialistPublicPrivateID,data.MessageData['Count'],data.MessageData['Information'][0]['public_price'],1)} >
		Make your request now 
	 </button> }
</li> : null


}	
{data.LengendId && (data.LengendId.includes(4)==true || data.LengendId.includes(5)==true || data.LengendId.includes(6)==true) ?
 
 <li class="list-group-item d-flex">
   <img src="assets/images/video.png" class="custom-width custom-height" />
   <h6 class="orange ml-2 text-left consult_text_box">Video </h6>
  {data.OthersData && data.OthersData['videoCount']==0 ?  <button  onClick={e=>this.gotopage('video',data.SpecialistPublicPrivateID,2,0,0)} class="w-100 bg-orange font-size-10 font-weight-bold" >
   No free slots: <i class="fa fa-bell"></i> Alert 
  </button> : <button onClick={e=>this.gotopage('video',data.SpecialistPublicPrivateID,data.OthersData['videoCount'],data.OthersData['videoPrice'],4)} class="w-100 bg-orange font-size-10 font-weight-bold" >
   Next Availability:   {data.OthersData['videoDate']}
  </button>}
</li>
:null }

{data.LengendId && ( data.LengendId.includes(7)==true || data.LengendId.includes(8)==true || data.LengendId.includes(9)==true) ?
<li class="list-group-item d-flex">
<img src="assets/images/audio.png" class="cystom-width custom-height" />
<h6 class="orange ml-2 text-left consult_text_box" >&nbsp;Audio</h6>

{data.OthersData && data.OthersData['audioCount']==0 ?<button class="w-100 bg-orange text-white font-weight-bold font-size-11" onClick={e=>this.gotopage('audio',data.SpecialistPublicPrivateID,2,0,0)}>
   No free slots: <i class="fa fa-bell"></i> Alert 
</button> : <button class="w-100 bg-orange text-white font-weight-bold font-size-11" onClick={e=>this.gotopage('audio',data.SpecialistPublicPrivateID,data.OthersData['audioCount'],data.OthersData['audioPrice'],7)}>
Next Availability: {data.OthersData['audioDate']}
</button>}

</li>:null }
{data.LengendId && (data.LengendId.includes(10)==true || data.LengendId.includes(11)==true || data.LengendId.includes(12)==true) ?
<li class="list-group-item d-flex">
<img src="assets/images/live.png" class="cystom-width custom-height" />
<h6 class="blue ml-2 text-left consult_text_box" >&nbsp;In-vivo</h6>
{data.OthersData && data.OthersData['vivoCount']==0 ? <button class="w-100 bg-blue text-white font-weight-bold font-size-11" onClick={e=>this.gotopage('invivo',data.SpecialistPublicPrivateID,2,0,0)}>
   No free slots: <i class="fa fa-bell"></i> Alert 
</button> : <button class="w-100 bg-blue text-white font-weight-bold font-size-11" onClick={e=>this.gotopage('invivo',data.SpecialistPublicPrivateID,data.OthersData['vivoCount'],data.OthersData['vivoPrice'],10)}>
Next Availability: {data.OthersData['vivoDate']}
</button>}
</li>:null }



</ul>
</div>
</div>
				   
			   </div> 
		   </div>
	   </div>
	</div> 
    {this.state.specialist_filter_data.length>20 ? 
	 <div class="load-more text-center">
	  <a class="btn btn-primary btn-sm" href="javascript:void(0);">Load More</a>	
     </div>	
	 :'' } 
	 </div> 
</div>
))  
 : 
 <div className='card' style={{'border':'unset','backgroundColor':'unset','color':'#fa4262','fontSize':'20px','textAlign':'center'}}>No results found in your area</div>} 


</div>

</div>		



 <Footer/>
 </div>
) 
}
}

export default withTranslation()(Dashboard);
