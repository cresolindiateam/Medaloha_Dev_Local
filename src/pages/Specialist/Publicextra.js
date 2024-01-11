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
import SpecialistBookingHistory from '../Components/SpecialistBookingHistory';
// const { t, i18n } = useTranslation(); 
import moment from 'moment';
import BookingCalendar from '../Components/BookingCalendar';
import ChatScreen from "../Components/ChatScreen";
require('dotenv').config();

function settingLanguage(lang){ 
     i18n.changeLanguage(lang);
 }

class Publicextra extends React.Component {   
    
    constructor(props) {  
        super(props); 
         this.state = {
			public_intro_id:0,
            holistic_center: "" ,
            holistic_location  : "",   
		   country:"",
		   city:"",
		   workingtime:"", 
           timezone:"",
		   calendarBox:false,
		   settingBox:true,
		   reviewBox:false,
		   messageBox:false, 
		   lanaguageInfo:"",
		   getreplyData:[],
		   values: [0],
		   addMoreRow:0,
		   valuesMore:[],
		   addMoreRowMore:0,
		   start_time:'',
		   end_time:'',
		   daysArray:[],
		   startArray:[],
		   startArrayEdit:[],
		   endArrayEdit:[],
		   countryData:[],
		   cityData:[],
		   timezoneData:[],
		   endArray:[],
		   workingDataFinal:[],
		   // workingDataFinal2:[],
		   daystring2:[],
		   startstring2:[],
		   endstring2:[],

		   
		   c_name: "" ,
		   c_surname : "",
		   c_image:"assets/img/doctors/doctor-thumb-02.jpg", 
		   spec_image:"",
		   name: "" ,
		   surname : "",
		   pairs :[],
		   consultColorArray:['','','','','legend-video','legend-video-part','legend-video-full','legend-video','legend-video-part','legend-video-full','legend-inperson','legend-inperson-part','legend-inperson-full']
         };   
         this.savePair = this.savePair.bind(this);
     }  

  savePair = (day, time) => {

  	 this.setState(prevState => ({
      pairs: [...prevState.pairs, { day, time }]
    }));

  };

   checkForMatch = (day, time) => {
    return this.state.pairs.some(pair => pair.day === day && pair.time === time);
  };
	 
	 handleChangeTitle(i , event) { 
	 	 alert(event.target.value)
		let daysArray = [...this.state.daysArray];
		daysArray[i] = event.target.value;
		this.setState({ daysArray });
		 alert(daysArray); 
	 }


	 handleChangeStartEdit(event , i) { 
		console.log('this.state.startArray22');
		console.log(event);console.log(i);
		let startArrayEdit = [...this.state.startArrayEdit];
		startArrayEdit[i] = event;
		this.setState({ startArrayEdit }); 
		console.log('this.state.startArray');
		console.log(this.state.startArrayEdit);
	 }

	 	 
	 handleChangeStart(event , i) { 
		console.log('this.state.startArray22');
		console.log(event);console.log(i);
		


		let startArray = [...this.state.startArray];
		startArray[i] = event;


       //        const time = event.toString().split(" ")[4];
       //        this.savePair(this.state.daysArray[i], time);
       //        const isMatch = this.checkForMatch(this.state.daysArray[i], time);

			    // if (isMatch) {
			    //   alert("Both day and time match! please select another time slot");
			    //   return false;
			    // } else {
			    //   //alert("No match found.");
			    // }

		this.setState({ startArray }); 
		console.log('this.state.startArray');
		console.log(this.state.startArray);
	 }

	 handleChangeEnd(event , i) { 
		console.log('this.state.endArray22');
		console.log(event);console.log(i);



const startTime = new Date(this.state.startArray[i]);
const endTime = new Date(event);
 // alert(startTime.getTime());
 // alert(endTime.getTime());

if(endTime.getTime()>startTime.getTime()){

		let endArray = [...this.state.endArray];
		endArray[i] = event;
		this.setState({ endArray }); 
		console.log('this.state.endArray');
		console.log(this.state.endArray);
	}
else
{
	alert("End Time is Greater than start time");
}

	 }


	 handleChangeEndEdit(event , i) { 
		console.log('this.state.endArray22');
		console.log(event);console.log(i);
		let endArrayEdit = [...this.state.endArrayEdit];
		endArrayEdit[i] = event;
		this.setState({ endArrayEdit }); 
		console.log('this.state.endArray');
		console.log(this.state.endArrayEdit);
	 }

	 createDynamicUI(workingDataArray){
		 console.log('this.state.workingData');
		  console.log(workingDataArray); 

		 //  workingDataArray.forEach((data) =>{ 

		 //  	console.log(data.days);
			// this.state.daystring2.push(data.days);
			// this.state.startstring2.push(data.start_time);
			// this.state.endstring2.push(data.end_time);  
		 //  });
	 

	 return workingDataArray.map((el, i) => 
		<div id={el.days+el.id}>   
			 <div class="row"> 
						<div class="col-md-4"> 
						  <label>Working Days {console.log(el.days)}</label>
						   <select class="form-control"  onChange={this.handleChangeTitle.bind(this, i)}  disabled="true" >
						       <option value="">Please choose</option>
							   <option selected ={el.days=='Sun'?'selected':''}  value='Sun'>Sun</option>
							   <option selected ={el.days=='Mon'?'selected':''}  value='Mon'>Mon</option>
							   <option selected ={el.days=='Tues'?'selected':''}  value='Tues'>Tues</option>
							   <option selected ={el.days=='Wed'?'selected':''}  value='Wed'>Wed</option>
							   <option selected ={el.days=='Thus'?'selected':''}  value='Thus'>Thus</option>
							   <option selected ={el.days=='Fri'?'selected':''}  value='Fri'>Fri</option>
							   <option selected ={el.days=='Sat'?'selected':''}  value='Sat'>Sat</option> 
						   </select>
						</div>  
						<div class="col-md-3"> 
			    <label>Start Time</label>
				<DatePicker
				id="start-date-time"
				name="startDateTime"
				selected={this.state.startArray[i]}
				onChange={(date2)=>this.handleChangeStart(date2,i)}
				showTimeSelect
				showTimeSelectOnly
				timeIntervals={15}
				timeCaption="Start Time"
				dateFormat="h:mm aa"
				className="form-control" 
				readOnly={true}
				value={this.state.startArray[i]==null?el.start_time:this.state.startArray[i]}
				/>
										</div>  
										<div class="col-md-3"> 
										<label>End Time</label>
			<DatePicker
					id="end-date-time"
					name="endDateTime"
				selected={this.state.endArray[i]}
				onChange={(date)=>this.handleChangeEnd(date,i)}
				showTimeSelect
				showTimeSelectOnly
				timeIntervals={15}
				timeCaption="End Time"
				dateFormat="h:mm aa"
				className="form-control"  
				readOnly={true}
				value={this.state.endArray[i]==null?el.end_time:this.state.endArray[i]}
				/>
 </div>   
 <div class="2"><button class="pull-right pr-2 text-dark rounded h2" style={{background:'unset',border:'unset',marginTop:'2rem'}}  onClick={(e)=>this.removeDynamicClick(el.id)} >×</button> </div>
						
			   </div>  
			   
			 <hr/>
		</div>          
	)
	 
	 }


	 removeDynamicClick(working_id){  
		 console.log('working_id'); console.log(working_id);
		axios.get(process.env.REACT_APP_BASE_URL+`/specilistAPI/specialistWorkingRemoveByid?working_id=`+working_id)
		.then(res => { 
			 console.log(res.data.Status);
			 if(res.data.Status){ 

				axios.get(process.env.REACT_APP_BASE_URL+`/specilistAPI/GetSpecialistWorkingTimeByID?specialist_id=`+localStorage.getItem('specialist_id')+'&language_code='+localStorage.getItem('i18nextLng')+'&seetingLanguage='+localStorage.getItem('SettingLanguage'))
				.then(res => { 
					console.log('workingData');
					console.log(res.data);
					if(res.data.Status){   
						res.data.WorkingData.forEach((item) => {
							this.state.workingDataFinal.push(item); 
						});
						console.log('workingData2');
						console.log(this.state.workingDataFinal.length);
					} 
				});  
			 }
		});   

	 }

	 createMoreUI(){ 
		console.log('start add more...');
	   return this.state.valuesMore.map((el, i) => 
		   <div id={el+1}>   
				<div class="row"> 
						   <div class="col-md-4"> 
							 <label>Working Days</label>
							  <select class="form-control"  onChange={this.handleChangeTitle.bind(this, i+this.state.workingDataFinal.length)} >
							  <option value="">Please choose</option>
								<option   value='Sun'>Sun</option>
							   <option   value='Mon'>Mon</option>
							   <option   value='Tues'>Tues</option>
							   <option   value='Wed'>Wed</option>
							   <option   value='Thus'>Thus</option>
							   <option   value='Fri'>Fri</option>
							   <option   value='Sat'>Sat</option>
							  </select>
						   </div>  
						   <div class="col-md-3"> 
							 <label>Start Time</label>
				   <DatePicker
					id="start-date-time"
					name="startDateTime"
					selected={this.state.startArray[i+this.state.workingDataFinal.length]}
					onChange={(date2)=>this.handleChangeStart(date2,i+this.state.workingDataFinal.length)}
					showTimeSelect
					showTimeSelectOnly
					timeIntervals={15}
					timeCaption="Start Time"
					dateFormat="h:mm aa"
					className="form-control" 
				   />
										   </div>  
										   <div class="col-md-3"> 
										   <label>End Time</label>
			   <DatePicker
					   id="end-date-time"
					   name="endDateTime"
				   selected={this.state.endArray[i+this.state.workingDataFinal.length]}
				   onChange={(date)=>this.handleChangeEnd(date,i+this.state.workingDataFinal.length)}
				   showTimeSelect
				   showTimeSelectOnly
				   timeIntervals={15}
				   timeCaption="End Time"
				   dateFormat="h:mm aa"
				   className="form-control" 
				   />
	</div>  

	<div class="2"><button class="pull-right pr-2 text-dark rounded h2" style={{background:'unset',border:'unset',marginTop:'2rem'}} onClick={this.removeClickMore.bind(this, i)} >×</button> </div>
						   
				  </div>  
				  
				<hr/>
		   </div>          
	   )
	}


	removeClickMore(i){  
		let valuesMore = [...this.state.valuesMore];
		valuesMore.splice(i,1);
		this.setState({ valuesMore }); 
		this.setState({addMoreRowMore:false}); 
	 }
   
	 removeClick(i){  
		let values = [...this.state.values];
		values.splice(i,1);
		this.setState({ values }); 
		this.setState({addMoreButton:false}); 
	 }
	 
	 createUI(){ 
		 console.log('start add more...');
		return this.state.values.map((el, i) => 
			<div id={el+1}>   
			     <div class="row"> 
							<div class="col-md-4"> 
							  <label>Working Days</label>
							   <select class="form-control"  onChange={this.handleChangeTitle.bind(this, i)} >
							       <option value="">Please choose</option>
								  <option   value='Sun'>Sun</option>
							   <option   value='Mon'>Mon</option>
							   <option   value='Tues'>Tues</option>
							   <option   value='Wed'>Wed</option>
							   <option   value='Thus'>Thus</option>
							   <option   value='Fri'>Fri</option>
							   <option   value='Sat'>Sat</option>
							   </select>
							</div>  
							<div class="col-md-3"> 
							  <label>Start Time</label>
					<DatePicker
					id="start-date-time"
					name="startDateTime"
					selected={this.state.startArray[i]}
					onChange={(date2)=>this.handleChangeStart(date2,i)}
					showTimeSelect
					showTimeSelectOnly
					timeIntervals={15}
					timeCaption="Start Time"
					dateFormat="h:mm aa"
					className="form-control" 
					/>
											</div>  
											<div class="col-md-3"> 
											<label>End Time</label>
				<DatePicker
						id="end-date-time"
						name="endDateTime"
				    selected={this.state.endArray[i]}
					onChange={(date)=>this.handleChangeEnd(date,i)}
					showTimeSelect
					showTimeSelectOnly
					timeIntervals={15}
					timeCaption="End Time"
					dateFormat="h:mm aa"
					className="form-control" 
					/>
	 </div>  

	 <div class="2"><button class="pull-right pr-2 text-dark rounded h2" style={{background:'unset',border:'unset',marginTop:'2rem'}}  onClick={this.removeClick.bind(this, i)} >×</button> </div>
							
				   </div>  
				   
				 <hr/>
			</div>          
		)
	 }


	 	 
	 addClick(){  
		this.setState(prevState => ({ values: [...prevState.values, '']}));
		let values = [...this.state.values]; 
		values.push(this.state.addMoreRow+1);
		this.setState({addMoreRow:this.state.addMoreRow+1});
		this.setState({ values});  
	  }

	  addMoreClick(){  
		this.setState(prevState => ({ valuesMore: [...prevState.valuesMore, '']}));
		let valuesMore = [...this.state.valuesMore]; 
		valuesMore.push(this.state.addMoreRowMore+1);
		this.setState({addMoreRowMore:this.state.addMoreRowMore+1});
		this.setState({ valuesMore}); 
	 
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


	countrydropdown(countryvalue){
		this.setState({ country: countryvalue}); 
		axios.get(process.env.REACT_APP_BASE_URL+`/authenticationAPI/GetAllCityByCountryID?country_id=`+countryvalue)
		.then(res => {
			this.setState({cityData : res.data});
		   // console.log(res.data);
		}); 

		axios.get(process.env.REACT_APP_BASE_URL+`/authenticationAPI/GetTimezonesByCountryID?country_id=`+countryvalue)
		.then(res => {
			//this.setState({cityData : res.data});
			console.log('Timezone listing');
		     console.log(res.data);
			 this.setState({timezoneData : res.data});
		}); 
	  }
  
 componentDidMount() {   


  

	axios.get(process.env.REACT_APP_BASE_URL+`/specilistAPI/getReply?specialist_id=`+localStorage.getItem('specialist_id'))
	.then(res => { 
		this.setState({getreplyData : res.data.Data}); 
	}); 

	axios.get(process.env.REACT_APP_BASE_URL+'/specilistAPI/GetSpecialistConsultation?specialist_id='+localStorage.getItem('specialist_id'))
	.then(res => {
	  this.setState({Consultation : res.data});
	  console.log('res.data');
	  console.log(res.data);
	});   

	

	axios.get(process.env.REACT_APP_BASE_URL+`/authenticationAPI/GetAllCountry`)
	.then(res => {
		this.setState({countryData : res.data});
	   // console.log(res.data);
	}); 
 
	axios.get(process.env.REACT_APP_BASE_URL+`/specilistAPI/userSpecialistReviewListing?specialist_id=`+localStorage.getItem('specialist_id'))
	.then(res => {
		this.setState({reviewData : res.data.Data});
		 console.log(res.data.Data);
	});   

// choose by specilist under Action tab 
if(localStorage.getItem('SettingLanguage') != null ){
	console.log(process.env.REACT_APP_BASE_URL+`/authenticationAPI/GetLanguageInfo?language_id=`+localStorage.getItem('SettingLanguage'));
	axios.get(process.env.REACT_APP_BASE_URL+`/authenticationAPI/GetLanguageInfo?language_id=`+localStorage.getItem('SettingLanguage'))
	.then(res => {
		console.log(res.data);
		this.setState({lanaguageInfo : res.data[0]['language_name']});
		 console.log(res.data);
	}); 
}
	
axios.get(process.env.REACT_APP_BASE_URL+`/specilistAPI/GetSpecialistWorkingTimeByID?specialist_id=`+localStorage.getItem('specialist_id')+'&language_code='+localStorage.getItem('i18nextLng')+'&seetingLanguage='+null)
.then(res => { 
	 console.log('workingData');
	 console.log(res.data);
	if(res.data.Status){   
		res.data.WorkingData.forEach((item) => {
			this.state.workingDataFinal.push(item); 
			//this.state.workingDataFinal2.push(item); 
		 });

console.log("jani");
console.log(this.state.workingDataFinal);
console.log("jani");
  this.state.workingDataFinal.forEach((data) =>{ 

		  	// console.log(data.days);
			// this.state.daystring2.push(data.days);
			// this.state.startstring2.push(data.start_time);
			// this.state.endstring2.push(data.end_time);  

this.setState(prevState => ({
    daystring2: [...prevState.daystring2, data.days],
    startstring2: [...prevState.startstring2, data.start_time],
    endstring2: [...prevState.endstring2, data.end_time]
  }));




		  });

		 console.log('workingData2');
		 console.log(this.state.workingDataFinal.length);
	} 
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


        axios.get(process.env.REACT_APP_BASE_URL+`/specilistAPI/GetSpecialistPublicOverViewByID?specialist_id=`+localStorage.getItem('specialist_id')+'&language_code='+localStorage.getItem('i18nextLng')+'&seetingLanguage='+null)
	  	 .then(res => {
               console.log('res.data extra information');
			   console.log(res.data);
			//this.setState({countryData : res.data}); 
             this.setState({country:res.data[0]['country_name']});
           //  this.setState({city:res.data[0]['city_name']});
			 this.countrydropdown(res.data[0]['country_id']);
			 this.setState({city:res.data[0]['city_id']});

             this.setState({holistic_center:res.data[0]['holistic_center']});  
			 this.setState({holistic_location:res.data[0]['holistic_location']});  
			 this.setState({workingtime:res.data[0]['working_time']}); 
             this.setState({public_intro_id:res.data[0]['id']}); 
			 this.setState({timezone:res.data[0]['timezone']+res.data[0]['utc_offset_string']}); 

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
 
 

	  SavePublicExtraInformation =(e) => { 
         e.preventDefault();   
		 // console.warn(this.state);  

		 // console.log('daystring2');
 
		 // console.log(this.state.daystring2);
		 // console.log(this.state.daysArray);

		 // const daysUnique = Array.from(new Set(this.state.daystring3));
		 // const startsUnique = Array.from(new Set(this.state.startstring3));
		 // const endsUnique = Array.from(new Set(this.state.endstring3));
 

		 var daystring = [];

		 
		 this.state.daysArray.forEach((item) => {
			daystring.push(item);
		 });

// alert(this.state.daystring3);
// alert(this.state.startstring3);
// alert(this.state.endstring3);

 daystring = this.state.daystring2.concat(daystring);

// alert(mergedArray);
// alert(daysUnique+"haha");
// alert(startsUnique+"ha aj");
// alert(endsUnique+"ha vj");


// alert(daystring+"hi");


		 // if(daysUnique){ // Edit time 
		 // 	daysUnique.forEach((item) => {
			// 	daystring.push(item);
			//  });
		 // }

		 var startstring = [];
		 
		 this.state.startArray.forEach((item) => {
			var time = moment(item).format('HH:mm:ss');
			startstring.push(time);
		 });

		  startstring = this.state.startstring2.concat(startstring);
		// alert(startstring);

		//  if(startsUnique){ // Edit time 
		// 	startsUnique.forEach((item) => {
		// 		startstring.push(item);
		// 	});
		// }
		 

		 var endstring = [];
		 

		 this.state.endArray.forEach((item) => {
			var time = moment(item).format('HH:mm:ss');
			endstring.push(time);
		 });
// alert(endstring);
  endstring = this.state.endstring2.concat(endstring);
		//  if(endsUnique){ // Edit time 
		// 	endsUnique.forEach((item) => {
		// 		endstring.push(item);
		// 	});
		// }
		 

		 const overviewData = {holistic_center :this.state.holistic_center , holistic_location : this.state.holistic_location,
			specialist_id:localStorage.getItem('specialist_id')
			,daystring:daystring, startstring:startstring , endstring:endstring
		  ,workingtime:this.state.workingtime,language_id:localStorage.getItem('i18nextLng'),public_intro_id:this.state.public_intro_id,
		  setting_lanaguage_id:null,timezone:this.state.timezone , country_id:this.state.country, city_id:this.state.city}

	     console.log(overviewData); 


		 axios.post(process.env.REACT_APP_BASE_URL+`/specilistAPI/updatePublicExtra`,overviewData)
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
			 <div class="hidden-lg hidden-md">
				 <center><button type="button" class="mb-2 btn btn-info btn-sm" data-toggle="collapse" data-target="#lege">Legend <i class="fa fa-caret-down"></i></button></center> 




				 <div class="col-md-1 sbutton hidden-lg hidden-md hidden-sm d-none">

					 <button type="submit" class="btn btn-primary search-btn mb-4"><i class="fas fa-search"></i> <span>Search</span></button>
				 </div>

				 <div id="lege" class="collapse">
					 <div class="row">
						 <div class=" d-flex">
							 <div class="custom-height custom-width bag-custom5" >
							 </div>
							 <span class="p-2">Video PART</span>
						 </div>
					 </div>
					 <hr/>
					 <div class="row d-flex">
						 <div class=" d-flex">
							 <div class="custom-height custom-width bag-custom3">
							 </div>
							 <span class="p-2">Video FULL </span>
						 </div>
					 </div>
					 <hr/>
					 <div class="row d-flex">
						 <div class=" d-flex">
							 <div class="custom-height custom-width bag-custom6">
							 </div>
							 <span class="p-2">In-person PART</span>
						 </div>
					 </div>
					 <hr/>

					 <div class="row d-flex">
						 <div class=" d-flex">
							 <div class="custom-height custom-width
							 bag-blue">
							 </div>
							 <span class="p-2">In-person FULL</span>
						 </div>
					 </div>
					 <hr/>
					 <div class="row d-flex">
						 <div class=" d-flex">


							 <div class="text-center custom-height custom-width" >
								 <i class="fa fa-times legend-add-spot-i1"></i>	</div>

								 <span class="p-2 font-size-inherit padding-left-0" >   &nbsp; <div class="btn modal-trigger font-size-inherit
								 add-spot-txt-div"  data-target="modal2">Add New Spot</div> </span>

							 </div>
						 </div>
						 <hr/>
						 <div class="row d-flex">
							 <div class=" d-flex">
								 <div class="text-center custom-height custom-width" >
									 <i class="legend-add-spot-i1 fa fa-times" ></i>	</div>

									 <span class="p-2 font-size-inherit padding-left-0" >   &nbsp; <div class="btn modal-trigger font-size-inherit remove-spot-txt-div" data-target="modal2">Remove Spot</div> </span>

								 </div>
							 </div>
							 <hr/>


	 </div>
  </div>
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
	 </div>
 </div>
</div>

<div class="card card-table mb-0">
 <div class="card-body"> 
	 <SpecialistBookingHistory/>
</div>
</div>
 
</div>
 	}

{this.state.messageBox &&
<div class="tab-pane" id="pres" > 
	<div class="col-xl-12">
	   <div class="chat-window"> 
		 <ChatScreen
				 id={localStorage.getItem('specialist_id')}
				 name={this.state.name+' '+this.state.surname}
				 path={this.state.spec_image}
				 c_name={this.state.c_name+' '+this.state.c_surname}
				 c_path={this.state.c_image}  
				/> 
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
					<h3 class="text-center"> PUBLIC  {this.state.lanaguageInfo && this.state.lanaguageInfo!='null' ?  "For "+ this.state.lanaguageInfo : null }</h3><hr/>
					<p class="text-center">
					

					<InnerPagesLinks />

					</p>
					<div class="mt-5" id="extra">
					<h3 class=" mb-2 text-center">EXTRA (5/5)</h3>
					<p class="mb-4 text-center">
					{t('SpecExtraText1')}
					</p>




					<form>
					<input type="hidden" name="public_intro_id" value={this.state.id} />

					<div class="row form-row">

					<div class="row">	
					<div class="col-12 col-md-6">
					<div class="form-group">
					<label>Name of your holistic centre</label>
					<input type="text" class="form-control" placeholder="Name of your holistic centre" value={this.state.holistic_center} onChange={(e)=> this.setState({holistic_center:e.target.value})} />
					</div>
					</div>
					<div class="col-12 col-md-6">
					<div class="form-group">
					<label>Direction of the holistic location</label> 
					<input type="text" class="form-control" placeholder="Direction of the holistic location" value={this.state.holistic_location} onChange={(e)=> this.setState({holistic_location:e.target.value})}  />
					<div class="text-left">
					<input class="align-middle" type="checkbox" />
					Exact location provided on demand or after booking
					</div>
					</div>

					</div>
					<div class="col-12 col-md-6">
					<div class="form-group">
					<label>Country</label>
					<select class="form-control"value={this.state.country}  onChange={(e)=> this.countrydropdown(e.target.value) } >
														<option>Select Country</option>
														{this.state.countryData.map( (country)=> (
														   <option value={country.id}>{country.name}</option> 
														))} 
					 </select>
					{/* <input type="text" class="form-control"  placeholder=" Country" value={this.state.country} /> */}
					</div>
					</div>
					<div class="col-12 col-md-6">
					<div class="form-group">
					<label>City</label>
					<select class="form-control" value={this.state.city} onChange={(e)=> this.setState({ city: e.target.value})} >
							<option>Select City</option>
							{this.state.cityData.map( (city)=> (
								<option value={city.id}>{city.name}</option> 
						))} 
					 </select>
					{/* <input type="text" class="form-control"  placeholder=" City" value={this.state.city} /> */}
					</div>
					</div>
					<div class="col-12 col-md-6">
					   { this.state.workingDataFinal.length==0 ?  this.createUI() : this.createDynamicUI(this.state.workingDataFinal)}  
					     {this.createMoreUI()} 
					        <div class="col-md-6">  
							{ this.state.workingDataFinal.length==0 ?
							   <button type="button" class="btn btn-primary pull-right add-more"  onClick={this.addClick.bind(this)}>Add More</button>
							  : <button type="button" class="btn btn-primary pull-right add-more"  onClick={this.addMoreClick.bind(this)}>Add More</button>
							}
                             </div> 
					</div>
					<div class="col-12 col-md-6">
					<div class="form-group">
					<label>Your Time Zone</label>
					<select class="form-control"value={this.state.timezone} onChange={(e)=> this.setState({ timezone: e.target.value})}   >
										<option>Select Country</option>
										{this.state.timezoneData.map( (timezone)=> (
											<option value={timezone.name+timezone.utcOffsetStr}>{timezone.name +timezone.utcOffsetStr }</option> 
										))} 
					 </select>
					{/* <input type="text" class="form-control"  placeholder="Time Zone"  value={this.state.timezone}  /> */}
					</div>
					</div>
					</div>	
					<div class="container mt-5 mb-5">	
					<div class="col-md-12">
					<center>
					<button type="submit" class=" mt-5 btn btn-primary btn-lg submit-btn mb-4" onClick={this.SavePublicExtraInformation}>Save Changes</button>
					</center>
					</div>
					<div class="row">
					<div class="col-md-6">
					<center>
					<a href="/publicdegree#degree" class=" mt-5 btn  btn-warning btn-sm submit-btn mb-4"> {"<<"} Previous</a>
					</center>
					</div>

					</div>
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


export default withTranslation()(Publicextra); 