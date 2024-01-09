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
require('dotenv').config();

// const { t, i18n } = useTranslation(); 

function settingLanguage(lang){ 
     i18n.changeLanguage(lang);
 }

class SpecialistDetails extends React.Component {   
    
    constructor(props) {
        super(props);
       // this.state = { checked: false };
        // this.handleChange = this.handleChange.bind(this,0);
		// this.handleChange11 = this.handleChange11.bind(this,0);
        // this.handleChange2 = this.handleChange2.bind(this,0);
		// this.handleChange21 = this.handleChange21.bind(this,0);
        // this.handleChange3 = this.handleChange3.bind(this,0);
		// this.handleChange31 = this.handleChange31.bind(this,0);
        this.state = { 
		   profileimage:"",
           name : "",
           title : "",
           study : "",
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
           messageFull:"",
           vivo:"",
           vivoPart:"",
           vivoFull:"",
           audio:"",
           audioPart:"",
           audioFull:"",

            video:"",
           videoPart:"",
           videoFull:"",


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
		   checked:false ,
		   checked11:false,
		   checked12:false,
           checked2:false,
		   checked21:false,
		   checked22:false,
           checked3:false,
		   checked31:false,
		   checked33:false,
           SpecialistStudy:"",

		   messageBox:false,
		   videoBox:false,
		   inpersonBox:false , 

		   audioBox:false,


		   messageTitleBox1:false,
		   messageTitleBox2:false,
		   messageTitleBox3:false,

		   messageTitle1:'',
		   messageTitle2:'',
		   messageTitle3:'',

		   messagePrice1:'',
		   messagePrice2:'',
		   messagePrice3:'',

		   messageLegend1:0,
		   messageLegend2:0,
		   messageLegend3:0,

		   videoTitleBox1:false,
		   videoTitleBox2:false,
		   videoTitleBox3:false,
		   videoTitleBox4:false,

		   videoTitle1:'',
		   videoTitle2:'',
		   videoTitle3:'',
		   videoTitle4:'',

		   videoTitlePrice1:'',
		   videoTitlePrice2:'',
		   videoTitlePrice3:'',
		   videoTitlePrice4:'',


		   videoLegend1:0,
		   videoLegend2:0,
		   videoLegend3:0,
		   videoLegend4:0,




		   inpersonTitleBox1:false,
		   inpersonTitleBox2:false,
		   inpersonTitleBox3:false,


		   inpersonTitle1:'',
		   inpersonTitle2:'',
		   inpersonTitle3:'',

		   inpersonLegend1:0,
		   inpersonLegend2:0,
		   inpersonLegend3:0,

		   inpersonTitlePrice1:'',
		   inpersonTitlePrice2:'',
		   inpersonTitlePrice3:'', 
		   SpecialistHealthCare:0,
		   getreplyData:[],
		   reviewData:[], 
		   SpecialistTimezone:'',
		   SpecialistOffsetString:'',
		   SpecialistWorkingTime:'',

		   reviewStart:'',

		   ratingCount :0,
		   ratingAvg:0,
		   Holisticcenter:'',
		   Holisticlocation:'',

		   getConsultationsCount:0,
		   ConfirmButton:false,
		   videoText:'',
		   Videoimage:'',

			videoTitleBox5:'',
			videoTitle5:'',
			videoTitlePrice5:'',
			videoLegend5:'' ,

			videoTitleBox6:'',
			videoTitle6:'',
			videoTitlePrice6:'',
			videoLegend6:'',
			setCopySuccess:'' 

		 
        };   
    }  


	
     fileChangedHandlerID1 = event => {
        this.setState({ idfront: event.target.files[0] })
      } 

      fileChangedHandlerID2 = event => {
          console.log(event.target.files);
        this.setState({ idback: event.target.files[0] })
      } 
      
       ClipboardComponent = () => {
 
  const textToCopy = window.location.href;


    try {
       navigator.clipboard.writeText(textToCopy);
      
      this.setState({ setCopySuccess: 'Copied to clipboard!' });
       setTimeout(() => {
     this.setState({ setCopySuccess: '' }); // Set uploading state to false after some time (simulating upload completion)
    }, 2000);

    } catch (err) {
      
        this.setState({ setCopySuccess: 'Failed to copy!' });
         setTimeout(() => {
     this.setState({ setCopySuccess: '' }); // Set uploading state to false after some time (simulating upload completion)
    }, 2000);
      console.error('Failed to copy!', err);
    }
  
}

	  handleChange(e,legendValue) {
        //alert(e.target.value);
		localStorage.setItem('value',e.target.value);
		localStorage.setItem('legend',legendValue); 
		this.setState({ checked11: false });
        this.setState({ checked: !this.state.checked });
		this.setState({ checked12: false }); 
		var specialist_id = this.props.match.params.id;
        this.setState({confirmationPath:'/bookingmessageconsultation/'+specialist_id});
     }
	 handleChange11(e,legendValue) {
		// alert(e.target.value);
		 localStorage.setItem('value',e.target.value);
		 localStorage.setItem('legend',legendValue);
		 
		 this.setState({ checked11: !this.state.checked11 });
		 this.setState({ checked: false }); 
		 this.setState({ checked12: false }); 
		 var specialist_id = this.props.match.params.id;
		 this.setState({confirmationPath:'/bookingmessageconsultation/'+specialist_id});
	  }
 
	  handleChange12(e,legendValue) {
		 // alert(e.target.value);
		  localStorage.setItem('value',e.target.value);
		  localStorage.setItem('legend',legendValue);
		  
		  this.setState({ checked12: !this.state.checked12 });
		  this.setState({ checked11: false }); 
		  this.setState({ checked: false }); 
		  var specialist_id = this.props.match.params.id;
		  this.setState({confirmationPath:'/bookingmessageconsultation/'+specialist_id});
	   }
 
	handleInputChanged(event) {
		this.setState({
		  reply_content: event.target.value
		});
	  }

   

	 convert(str) {
console.log('str001');
	 	console.log(str);
		var date = new Date(str),
		  //mnth = ("0" + (date.getMonth() + 1)).slice(-2),

		  mnth=date.getMonth(),
		  day = ("0" + date.getDate()).slice(-2),                                                                        
		  /*monthNames = [ "Jan", "February", "March", "April", "May", "June", 
							 "July", "August", "September", "October", "November", "December" ];*/

							 monthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
							 "Jul", "Aug", "Sept", "Oct", "Nov", "Dec" ];
		  
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
 

	  handleChange2(e,legendValue) {  
		
		localStorage.setItem('value',e.target.value);
		localStorage.setItem('legend',legendValue);
        this.setState({ checked2: !this.state.checked2 });
        this.setState({ checked21: false });
		this.setState({ checked22: false });
		this.setState({ checked24: false });
		var specialist_id = this.props.match.params.id;
        this.setState({confirmationPath:'/bookingvideoconsultation/'+specialist_id});
     }

	 handleChange21(e,legendValue) {
		// alert(e.target.value);
		 localStorage.setItem('value',e.target.value);
		 localStorage.setItem('legend',legendValue);
		  
		 this.setState({ checked21: !this.state.checked21 });
		 this.setState({ checked2: false });
		 this.setState({ checked22: false });
		 this.setState({ checked24: false });
		 var specialist_id = this.props.match.params.id;
		 this.setState({confirmationPath:'/bookingvideoconsultation/'+specialist_id});
	  }
 

	  handleChange22(e,legendValue) {
		// alert(e.target.value);
		 localStorage.setItem('value',e.target.value);
		 localStorage.setItem('legend',legendValue);
		  
		 this.setState({ checked22: !this.state.checked22 });
		 this.setState({ checked2: false });
		 this.setState({ checked21: false }); 
		 this.setState({ checked24: false });
		 var specialist_id = this.props.match.params.id;
		 this.setState({confirmationPath:'/bookingvideoconsultation/'+specialist_id});
	  }

	  handleChange24(e,legendValue) {
		// alert(e.target.value);
		 localStorage.setItem('value',e.target.value);
		 localStorage.setItem('legend',legendValue);
		  
		 this.setState({ checked24: !this.state.checked24 });
		 this.setState({ checked2: false });
		 this.setState({ checked21: false });
		 this.setState({ checked22: false });
	
		 var specialist_id = this.props.match.params.id;
		 this.setState({confirmationPath:'/bookingvideoconsultation/'+specialist_id});
	  }
 
 

    
	  handleChange3(e,legendValue) {
		//	alert(e.target.value);
			localStorage.setItem('value',e.target.value);
			localStorage.setItem('legend',legendValue);
			this.setState({ checked33: false });
			this.setState({ checked31: false });
			this.setState({ checked3: !this.state.checked3 });
			var specialist_id = this.props.match.params.id;
			this.setState({confirmationPath:'/bookingvideoconsultation/'+specialist_id});
		 }
	
		 handleChange31(e,legendValue) {
			//alert(e.target.value);
			localStorage.setItem('value',e.target.value);
			localStorage.setItem('legend',legendValue);
			this.setState({ checked3: false});
			this.setState({ checked33: false });
			this.setState({ checked31: !this.state.checked31 });
			var specialist_id = this.props.match.params.id;
			this.setState({confirmationPath:'/bookingvideoconsultation/'+specialist_id});
		 }
		
		 handleChange33(e,legendValue) {
			//alert(e.target.value);
			localStorage.setItem('value',e.target.value);
			localStorage.setItem('legend',legendValue);
			this.setState({ checked3: false});
			this.setState({ checked31: false });
			this.setState({ checked33: !this.state.checked33 });
			var specialist_id = this.props.match.params.id;
			this.setState({confirmationPath:'/bookingvideoconsultation/'+specialist_id});
		 }
		
      
    componentDidMount() { 

 setTimeout(() => {
     this.setState({ setCopySuccess: '' }); // Set uploading state to false after some time (simulating upload completion)
    }, 2000);

		 localStorage.setItem('Rebooking',false);
		 localStorage.setItem('bookingID',0); 
         var specialist_id = this.props.match.params.id; 
		 console.log("getItem('i18nextLng')");
		 console.log(localStorage.getItem('i18nextLng'));  

         axios.get(process.env.REACT_APP_BASE_URL+`/specilistAPI/getReply?specialist_id=`+specialist_id)
		.then(res => { 
			this.setState({getreplyData : res.data.Data}); 
		});

		axios.get(process.env.REACT_APP_BASE_URL+`/specilistAPI/getConsultationsCount?specialist_id=`+specialist_id)
		.then(res => { 
			console.log("res.data-getConsultationsCount-getConsultationsCount->");
			console.log(res.data);
			this.setState({getConsultationsCount : res.data}); 
		});

		 axios.get(process.env.REACT_APP_BASE_URL+`/specilistAPI/userSpecialistReviewListing?specialist_id=`+specialist_id)
		 .then(res => {
			  console.log('Review Data');
			  console.log(res.data);
			  if(res.data.Data)
			  this.setState({reviewData : res.data.Data});
			  console.log(res.data.Data);
		 });  

		 console.log('res.start -->');
		 	console.log("GetFeaturedSpecialistFullDetails");
         axios.get(process.env.REACT_APP_BASE_URL+`/specilistAPI/GetFeaturedSpecialistFullDetails?specialist_id=`+specialist_id+'&language_id='+localStorage.getItem('i18nextLng'))
         .then(res => {
         	//alert("hello");
            console.log('GetFeaturedSpecialistFullDetails');
            console.log(res.data);
            console.log("GetFeaturedSpecialistFullDetails"); 
			console.log(res.data);
			var image = null;
			if(res.data['Result'][0].SpecialistPic)
			image = res.data['Result'][0].SpecialistPic;
             if(res.data['Status']){ //HolisticcenterHolisticlocation
                this.setState({profileimage :image});
				this.setState({Holisticlocation :res.data['Result'][0].Holisticlocation});
				this.setState({Holisticcenter :res.data['Result'][0].Holisticcenter});
                this.setState({name : res.data['Result'][0].SpecialistName});
                this.setState({title:res.data['Result'][0].SpecialistTitle});

                this.setState({SpecialistStudy:res.data['Result'][0].SpecialistStudy});

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
                this.setState({messageFull :res.data['Result'][0].SpecialistMessageFull});

                 this.setState({vivo :res.data['Result'][0].SpecialistVivo});
                this.setState({vivoPart :res.data['Result'][0].SpecialistVivoPart});
                this.setState({vivoFull :res.data['Result'][0].SpecialistVivoFull});

                this.setState({audio :res.data['Result'][0].SpecialistAudio});
                this.setState({audioPart :res.data['Result'][0].SpecialistAudioPart});
                this.setState({audioFull :res.data['Result'][0].SpecialistAudioFull});

                 this.setState({video :res.data['Result'][0].SpecialistVideo});
                this.setState({videoPart :res.data['Result'][0].SpecialistVideoPart});
                this.setState({videoFull :res.data['Result'][0].SpecialistVideoFull});

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
                this.setState({SpecialistHealthCare :res.data['Result'][0].SpecialistHealthCare});
				this.setState({SpecialistTimezone :res.data['Result'][0].SpecialistTimezone});
				this.setState({SpecialistOffsetString :res.data['Result'][0].SpecialistOffsetString});
				this.setState({SpecialistWorkingTime :res.data['Result'][0].SpecialistWorkingTime});
				this.setState({reviewStart :res.data['Result'][0].SpecilistRatingAvg});
                this.setState({ratingCount :res.data['Result'][0].SpecilistRatingCount});
				this.setState({ratingAvg :res.data['Result'][0].SpecilistRatingAvgPer});
                 
                
             }
         
         

         });   



         axios.get(process.env.REACT_APP_BASE_URL+`/specilistAPI/GetSpecialistDegreeByID?specialist_id=`+specialist_id+'&language_id='+localStorage.getItem('i18nextLng'))
         .then(res => {
            console.log('res.w'); 
             if(res.data['Status']){ 
                console.log(res.data); 
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

		 axios.get(process.env.REACT_APP_BASE_URL+`/specilistAPI/GetSpecialistConsulationByID?specialist_id=`+specialist_id)
         .then(res => {
			console.log('res.data'); 
            console.log(res.data); 
             if(res.data){  

				   res.data.forEach((consultation) => {
					    console.log(consultation);

						if(consultation.provided_type==1){ // message 
							this.setState({messageBox:true});
							this.setState({messageTitleBox1:true});
							this.setState({messageTitle1:''});
							this.setState({messagePrice1:consultation.public_price.toFixed()});
							this.setState({ messageLegend1:consultation.provided_type});
						}

						if(consultation.provided_type==2){ // message part 
							this.setState({messageBox:true});
							this.setState({messageTitleBox2:true});
							this.setState({messageTitle2:'PART'});
							this.setState({messagePrice2:consultation.public_price.toFixed()});
							this.setState({ messageLegend2:consultation.provided_type});
						}

						if(consultation.provided_type==3){ // message full 
							this.setState({messageBox:true});
							this.setState({messageTitleBox3:true});
							this.setState({messageTitle3:'FULL'});
							this.setState({messagePrice3:consultation.public_price.toFixed()});
							this.setState({ messageLegend3:consultation.provided_type});
						}


						if(consultation.provided_type==4){ // video part 
							this.setState({videoText:'Video'});
							this.setState({ Videoimage:'/assets/images/video.png'})
							this.setState({videoBox:true});
							this.setState({videoTitleBox1:true});
							this.setState({videoTitle1:''});
							this.setState({videoTitlePrice1:consultation.public_price.toFixed()});
							this.setState({videoLegend1:consultation.provided_type});
						}

						if(consultation.provided_type==5){ // video part 
							this.setState({videoText:'Video'});
							this.setState({ Videoimage:'/assets/images/video.png'})
							this.setState({videoBox:true});
							this.setState({videoTitleBox2:true});
							this.setState({videoTitle2:'PART'});
							this.setState({videoTitlePrice2:consultation.public_price.toFixed()});
							this.setState({videoLegend2:consultation.provided_type});
						}


						if(consultation.provided_type==6){ // video full 
							this.setState({videoText:'Video'});
							this.setState({ Videoimage:'/assets/images/video.png'})
							this.setState({videoBox:true});
							this.setState({videoTitleBox3:true});
							this.setState({videoTitle3:'FULL'});
							this.setState({videoTitlePrice3:consultation.public_price.toFixed()});
							this.setState({videoLegend3:consultation.provided_type});
						}


						if(consultation.provided_type==7){ // Audio
							this.setState({videoText:'Audio'});
							this.setState({ Videoimage:'/assets/images/audio.png'})
							this.setState({audioBox:true});
							this.setState({videoTitleBox4:true}); 
							this.setState({videoTitle4:''}); 
							this.setState({videoTitlePrice4:consultation.public_price.toFixed()});
							this.setState({videoLegend4:consultation.provided_type});
						}

						if( consultation.provided_type==8 ){ // Audio
							this.setState({videoText:'Audio'});
							this.setState({ Videoimage:'/assets/images/audio.png'})
							this.setState({audioBox:true});
							this.setState({videoTitleBox5:true}); 
							this.setState({videoTitle5:'PART'}); 
							this.setState({videoTitlePrice5:consultation.public_price.toFixed()});
							this.setState({videoLegend5:consultation.provided_type});
						}

						if( consultation.provided_type==9){ // Audio
							this.setState({videoText:'Audio'});
							this.setState({ Videoimage:'/assets/images/audio.png'})
							this.setState({audioBox:true});
							this.setState({videoTitleBox6:true}); 
							this.setState({videoTitle6:'FULL'}); 
							this.setState({videoTitlePrice6:consultation.public_price.toFixed()});
							this.setState({videoLegend6:consultation.provided_type});
						}


						if(consultation.provided_type==10){ // inperson part 
							this.setState({inpersonBox:true});
							this.setState({inpersonTitleBox1:true});
							this.setState({inpersonTitle1:''});
							this.setState({inpersonTitlePrice1:consultation.public_price.toFixed()});
							this.setState({inpersonLegend1:consultation.provided_type});
						}

						if(consultation.provided_type==11){ // inperson part 
							this.setState({inpersonBox:true});
							this.setState({inpersonTitleBox2:true});
							this.setState({inpersonTitle2:'PART'});
							this.setState({inpersonTitlePrice2:consultation.public_price.toFixed()});
							this.setState({inpersonLegend2:consultation.provided_type});
						}

						if(consultation.provided_type==12){ // inperson full 
							this.setState({inpersonBox:true});
							this.setState({inpersonTitleBox3:true});
							this.setState({inpersonTitle3:'FULL'});
							this.setState({inpersonTitlePrice3:consultation.public_price.toFixed()});
							this.setState({inpersonLegend3:consultation.provided_type});
						} 
				  })
				 
                //this.setState({DegreeInformation:res.data['Result']});  
             } 
         });   
	  } 


  favSpecialist() { 
	var specialist_id = this.props.match.params.id;
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

        // if(localStorage.getItem('specialist_id')==null){
		// 	return	<Redirect to="/login"/>
		// } 

 const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

        return ( 
	          <div class="main-wrapper">  
                <CustomerHeader/> 
                <div class="breadcrumb-bar bg-cus">
			    	<div class="container-fluid">
					  <div class="row align-items-center">
						  <div class="col-md-12 col-12">
							<h2 class="breadcrumb-title">Specialist Profile</h2>
						 </div>
					  </div>
				  </div>
			     </div>
                 <div class="content bg-theme pb-5">
				<div class="container">  
					<div class="card">
						<div class="card-body">
							<div class="specialist-consult">
								<div class="col-md-7 col-12">
									<div class="">
										<div class="media sp-media">
											<div class="doctor-img">
												<h4 class="font-size-21 color-cus4">{this.state.name}</h4>
										   <a href="#" class="d-flex">
                                         
											{this.state.SpecialistHealthCare !=0 && 
											  <img src="\assets\icon\medicine.png" class="img-fluid search-pic" alt="User Image" />
											}
											{this.state.profileimage!=null ?
											  <img src={this.state.profileimage} class="img-fluid d-block w-100" alt="User Image" />
											  : 
											   <img src={localStorage.getItem('UserProfileImage')} class="img-fluid d-block w-100" alt="User Image" />
											}
										
													
												</a>
												
												<div class="clinic-details mt-3 spec-details-consult">
													<ul class="clinic-gallery">
														<li>
														{this.state.setCopySuccess && <p>{this.state.setCopySuccess}</p>}
															<button  onClick={() => this.ClipboardComponent()} class="btn btn-white text-muted msg-btn cus-padding cus-padding1">
																<i class="fa fa-share-alt sfz"></i>
															</button>
														</li>
														<li>
															<a href="javascript:void(0)" class="btn btn-white text-muted fav-btn cus-padding cus-padding1 "  onClick={e=>this.favSpecialist()} >
																<i class="far fa-bookmark sfz"></i>
															</a>
														</li>
														<li>
															<a href={"/privatesetting?pat_message"} class="btn btn-white text-muted msg-btn cus-padding1 cus-padding">
																<i class="far fa-comment-alt sfz"></i>
															</a>
														</li>
													</ul>
												</div>
											</div>
											<div class="media-body spec-details-consult"> 
												<div class="doc-info-cont">
													<h4 class="doc-name"><a href="javascript:void(0)" class="text-dark">{this.state.title}</a></h4>
													<p class="doc-speciality font-weight-bold mb-10" >{this.state.SpecialistStudy}</p>
													<a href="#"> <h6 class="text-info">{this.state.category}</h6></a>
													<h6 class="text-muted">{this.state.experience} years experience overall</h6>
													<h6 class="text-muted">{this.state.getConsultationsCount && this.state.getConsultationsCount!=0 ? "consultations done -since " + monthNames[new Date().getMonth()] + new Date().getFullYear() : null }   </h6> 
													<div class="rating">
													     {
														   this.printReviewStar(this.state.reviewStart)
														 } 
														<span class="d-inline-block average-rating text-muted">({this.state.ratingCount})&nbsp;&nbsp;</span>
														<span class="text-muted">
															<i class="fa fa-thumbs-up text-muted"></i> &nbsp; {this.state.ratingAvg}%
														</span>
													</div>
													<div class="clinic-details">
														<p class="doc-location"><i class="fas fa-map-marker-alt"></i> &nbsp; {this.state.SpecialistCountry}, {this.state.SpecialistCity}</p>

													</div>

													<div class="clinic-details">
														<ul class="clinic-gallery">
                                                      {this.state.SpecialistActivityImg1 !=  null ?
                                                            <li>
                                                            <a href={this.state.SpecialistActivityImg1} data-fancybox="gallery">
                                                                <img src={this.state.SpecialistActivityImg1} alt="Feature" />
                                                            </a>
                                                        </li>:null 
                                                        }
															

                                                            {this.state.SpecialistActivityImg2 !=null ?
                                                            <li>
                                                            <a href={this.state.SpecialistActivityImg2} data-fancybox="gallery">
                                                                <img src={this.state.SpecialistActivityImg2} alt="Feature" />
                                                            </a>
                                                        </li>:null 
                                                        }

                                                        {this.state.SpecialistActivityImg3 != null?
                                                            <li>
                                                            <a href={this.state.SpecialistActivityImg3} data-fancybox="gallery">
                                                                <img src={this.state.SpecialistActivityImg3} alt="Feature" />
                                                            </a>
                                                        </li>:null 
                                                        }
														 {this.state.SpecialistActivityImg4 !=null ?
                                                            <li>
                                                            <a href={this.state.SpecialistActivityImg4} data-fancybox="gallery">
                                                                <img src={this.state.SpecialistActivityImg4} alt="Feature" />
                                                            </a>
                                                        </li>:null 
                                                        }
														</ul>
													</div>

												</div>

											</div>
										</div>

										
						</div>
						
					</div>
					<div class="col-md-5 col-12 mt-3 p-0">
						<div class="clinic-services border w-100" id="avlcon">
							<div class="mt-3 w-100">
								<div  class="w-100 d-flex hidden-sm hidden-xs">
									<div class="col-md-8">
										<h6 class="font-weight-bold text-muted ml-4 mb-3">Available Consultations &nbsp;


											<div class="specdetailtooltip line-height"><i class="fas fa-info-circle"  title=""></i>
												<span class="specdetailtooltiptext text-left"><h4 
class="text-center text-white t-o-consult-text">Types of consultations:</h4>
    <ul class="mb-0 cus-font-size"><li>Chat: you can write/voice message the specialist about a specific subject</li><li>Video: you can access online your audio-video session, comfortably from your place</li><li>In-vivo: join a specialist for a live session, searching by area of interest</li></ul>
    <h5 class="text-justify text-white tool-tip-text"> Modes can be PART (e.g. exploratory session) or FULL (e.g. complete session). Check specialist’s profile for specific details.</h5>
    <div class="text-center">
    	<a href="#" class="text-white h-i-w-text">How it works</a> 
    </div>
</span>
</div>

</h6>
</div>
<div class="col-md-4 pl5">
	<h6 class="font-weight-bold text-muted float-left">
		Price
	</h6>
	<i class="fa fa-eur  cus-font-size1 text-muted" aria-hidden="true" style={{"marginLeft":"10px"}}></i>
	<img src="assets/icon/euro.png" class="ml-1 d-none euro-img" />
</div>
		 </div>
				 <div  class=" d-flex hidden-md hidden-lg">
						 					<div class="col-8 p-0" >
						 					<h6 class="font-weight-bold text-muted mb-1">Available Consultations &nbsp;




						 						<div class="specdetailtooltip line-height"><i class="fas fa-info-circle"  title=""></i>
						 							<span class="specdetailtooltiptext text-left"><h4  class="text-center text-white t-o-consult-text">Types of consultations:</h4>
                               <ul class="mb-0 cus-font-size"><li>Message: you can write/voice message the specialist about a specific subject</li><li>Video: you can access online your audio-video session, comfortably from your place</li><li>In-vivo: join a specialist for a live session, searching by area of interest</li></ul><h5 class="text-justify text-white cus-font-size"> Modes can be PART (e.g. exploratory session) or FULL (e.g. complete session). Check specialist’s profile for specific details.</h5> 
                            <div class="text-center">
                               <a href="/howitworks" class="text-white h-i-w-text">How it works</a> 
                            </div>
                            </span>
                            </div>
                            </h6>
                            </div>
                                    <div class="d-flex col-4 ">
                                       <h6 class="font-weight-bold text-muted mb-3 ">
                                        Price
                                       </h6>
                                       <i class="fa fa-eur  text-muted cus-font-size1" aria-hidden="true"  style={{"marginLeft":"15px"}} ></i>
                                       <img src="assets/icon/euro.png"    class="d-none euro-img1"/>
                                    </div>

						 		
						 			</div>

						 		</div>
						 		<div class=" card flex-fill specialist-consult1  mt-0 mb-0 border-0" >
	 <div class="list-group list-group-flush ml-0" >
										 
 {/* Message stat  */} 

 { this.state.messageBox &&
						 				      <div class="col-md-12 padding0 d-flex"  >
													<div class="col-md-5 col-5 pleftright10 d-flex">
														<div style={{"marginTop":"-5px","marginBottom":"1rem"}} >
															<img src="/assets/images/written.png" class="avcon-img1" />   
														</div>
															<div class="written_text_color  avcon-txt1 border-0 mt-2 w-150" style={{"padding":"0px 6px","textTransform":"uppercase"}}>Chat &nbsp;</div>
														
													</div>
													<div class="col-md-7 col-7 mt-2 d-flex"> 

														<div class="col-md-6 col-6 p-0">


														   { this.state.messageTitleBox1 &&
														   	<div class={(this.state.messageTitle2)?"written_text_color text-left":""}>{this.state.messageTitle2} </div>
													
														   }

															{ this.state.messageTitleBox2 &&
															<div class={(this.state.messageTitle2)?"written_text_color text-left":""}>{this.state.messageTitle2} </div>
															}

															{ this.state.messageTitleBox3 &&
															<div class={(this.state.messageTitle3)?"written_text_color text-left":""}>{this.state.messageTitle3} </div>
															}
														</div>   
														<div class="col-md-6 col-6 p-0">
														{ this.state.messageTitleBox1 &&
															<div class="form-group pl-0 form-check written_text_color">
															<label class="form-check-label">{this.state.messagePrice1}</label>	
															<input type="checkbox" name="messageConfirm"  value={this.state.messagePrice1}   checked={this.state.checked} onChange={(e)=>this.handleChange(e,this.state.messageLegend1)} />
																</div>

																
														}

														  { this.state.messageTitleBox2 &&




<div class="form-group form-check pl-0 written_text_color">
															<label class="form-check-label">{this.state.messagePrice2}</label>	
															<input type="checkbox" name="messageConfirm"  value={this.state.messagePrice2}   checked={this.state.checked11} onChange={(e)=>this.handleChange11(e,this.state.messageLegend2)} />
																</div>


																

														  }

														 { this.state.messageTitleBox3 && 
															


<div class="form-group pl-0 form-check written_text_color">
															<label class="form-check-label">{this.state.messagePrice3}</label>	
															<input type="checkbox" name="messageConfirm"  value={this.state.messagePrice3}   checked={this.state.checked12} onChange={(e)=>this.handleChange12(e,this.state.messageLegend3)} />
																</div>

                                                          }

													    </div>
													</div>
								           </div>
	                                      }
					  {/* End Message */}
	            { this.state.videoBox &&
					<div class="col-md-12 padding0 d-flex">
						<div class="col-md-5 col-5 pleftright10  d-flex">
							<div style={{"marginTop":"-5px","marginBottom":"1rem"}}>
								<img src={this.state.Videoimage} class="avcon-img2" /> 
							</div> 
							<div  style={{"padding":"0px 6px","textTransform":"uppercase"}} class="orange mt-2 border-0 avcon-txt1 w-150">{this.state.videoText}  &nbsp;</div>
						</div>
						<div class="col-md-7 col-7 mt-2 d-flex">
									<div class="col-md-6 col-6 p-0">
									                      { this.state.videoTitleBox1 &&
															<div class="orange text-left">{this.state.videoTitle1}</div>
														   }
															{ this.state.videoTitleBox2 &&
															<div class="orange text-left">{this.state.videoTitle2} </div>
															}

															{ this.state.videoTitleBox3 &&
															<div class="orange text-left">{this.state.videoTitle3} </div>
															}

															{ this.state.videoTitleBox4 &&											
															<div class="orange text-left">{this.state.videoTitle4} </div>
															}
									</div>  
								               	<div class="col-md-6 col-6 p-0">

												   { this.state.videoTitleBox1 && 

                                                          <div class="form-group pl-0 form-check orange">
															<label class="form-check-label">{this.state.videoTitlePrice1}</label>	
														<input type="checkbox" name="messageConfirm"    value={this.state.videoTitlePrice1} checked={this.state.checked2}   onChange={ (e)=>this.handleChange2(e,this.state.videoLegend1)} />
															</div>


												 }

					                              { this.state.videoTitleBox2 &&
													
<div class="form-group pl-0 form-check orange">
															<label class="form-check-label">{this.state.videoTitlePrice2}</label>	
															<input type="checkbox" name="messageConfirm"   value={this.state.videoTitlePrice2}  checked={this.state.checked21}  onChange={(e)=>this.handleChange21(e,this.state.videoLegend2)}/>
													</div>
													
												 }

												 { this.state.videoTitleBox3 &&
													
<div class="form-group pl-0 form-check orange">
															<label class="form-check-label">{this.state.videoTitlePrice3}</label>	
																<input type="checkbox" name="messageConfirm"    value={this.state.videoTitlePrice3}  checked={this.state.checked22}  onChange={(e)=>this.handleChange22(e,this.state.videoLegend3)}/>
														</div>

													
	                                             }

												 { this.state.videoTitleBox4 &&

												 	<div class="form-group pl-0 form-check orange">
															<label class="form-check-label">{this.state.videoTitlePrice4}</label>	
															<input type="checkbox" name="messageConfirm"    value={this.state.videoTitlePrice4}  checked={this.state.checked24}  onChange={(e)=>this.handleChange24(e,this.state.videoLegend4)}/>
													</div>
													
	                                             }
									</div>
						</div> 
					</div>
              	}
				   { this.state.audioBox &&
					<div class="col-md-12 padding0 d-flex">
						<div class="col-md-5 col-5 pleftright10  d-flex">
							<div style={{"marginTop":"-5px","marginBottom":"1rem"}}>
								<img src={this.state.Videoimage} class="avcon-img2" /> 
							</div> 
							<div  style={{"padding":"0px 6px","textTransform":"uppercase"}} class="orange mt-2 border-0 avcon-txt1 w-150">{this.state.videoText}  &nbsp;</div>
						</div>
						<div class="col-md-7 col-7 mt-2 d-flex">
									<div class="col-md-6 col-6 p-0">
									                       { this.state.videoTitleBox4 &&
															<div class="orange text-left">{this.state.videoTitle4}</div>
														   }
															{ this.state.videoTitleBox5 &&
															<div class="orange text-left">{this.state.videoTitle5} </div>
															}   
															{ this.state.videoTitleBox6 &&											
															<div class="orange text-left">{this.state.videoTitle6} </div>
															}
									</div>  
								               	<div class="col-md-6 col-6 p-0">

												   { this.state.videoTitleBox4 && 

														<div class="form-group pl-0 form-check orange">
														<label class="form-check-label">{this.state.videoTitlePrice4}</label>	
														<input type="checkbox" name="messageConfirm"    value={this.state.videoTitlePrice4}  checked={this.state.checked24}  onChange={(e)=>this.handleChange24(e,this.state.videoLegend4)}/>
														</div>


												 }

					                            

												 { this.state.videoTitleBox5 &&
													
<div class="form-group pl-0 form-check orange">
															<label class="form-check-label">{this.state.videoTitlePrice5}</label>	
																<input type="checkbox" name="messageConfirm"    value={this.state.videoTitlePrice5}  checked={this.state.checked25}  onChange={(e)=>this.handleChange24(e,this.state.videoLegend5)}/>
														</div>

													
	                                             }

												 { this.state.videoTitleBox6 &&

												 	<div class="form-group pl-0 form-check orange">
															<label class="form-check-label">{this.state.videoTitlePrice6}</label>	
															<input type="checkbox" name="messageConfirm"    value={this.state.videoTitlePrice6}  checked={this.state.checked26}  onChange={(e)=>this.handleChange26(e,this.state.videoLegend6)}/>
													</div>
													
	                                             }
									</div>
						</div> 
					</div>
              	}

                  {/*  In person Start */}
				  { this.state.inpersonBox &&
					<div class="col-md-12 padding0 d-flex">
						<div class="col-md-5 col-5 pleftright10 d-flex">
							<div style={{"marginTop":"-5px","marginBottom":"1rem"}}>
								<img src="/assets/images/live.png" class="avcon-img3" /> 
								
							</div>
<div class="blue mt-2 border-0 avcon-txt1 w-150" style={{"padding":"0px 6px","textTransform":"uppercase"}}>In-vivo</div>

						</div>
						<div class="col-md-7 col-7 mt-2 d-flex">
							   <div class="col-md-6 col-6 p-0">
							   
							                              { this.state.inpersonTitleBox1 &&
															<div class="blue text-left">{this.state.inpersonTitle1}</div>
														   }
															{ this.state.inpersonTitleBox2 &&
															<div class="blue text-left">{this.state.inpersonTitle2} </div>
															}

															{ this.state.inpersonTitleBox3 &&
															<div class="blue text-left">{this.state.inpersonTitle3} </div>
															}
							   </div> 
								<div class="col-md-6 col-6 p-0">
								{ this.state.inpersonTitleBox1 &&
									

	                                            <div class="form-group pl-0 form-check blue">
															<label class="form-check-label">{this.state.inpersonTitlePrice1}</label>	
														<input type="checkbox" name="messageConfirm"    value={this.state.inpersonTitlePrice1} checked={this.state.checked3}   onChange={(e)=>this.handleChange3(e,this.state.inpersonLegend1)} />
										</div>


									}
									{ this.state.inpersonTitleBox2 &&



	                                            <div class="form-group pl-0 form-check blue">
															<label class="form-check-label">{this.state.inpersonTitlePrice2}</label>	
														 <input type="checkbox" name="messageConfirm"   value={this.state.inpersonTitlePrice2} checked={this.state.checked31}   onChange={(e)=>this.handleChange31(e,this.state.inpersonLegend2)} />
											</div>

									
									}

								 { this.state.inpersonTitleBox3 &&
									
   <div class="form-group pl-0 form-check blue">
															<label class="form-check-label">{this.state.inpersonTitlePrice3}</label>	
				 <input type="checkbox" name="messageConfirm"   value={this.state.inpersonTitlePrice3} checked={this.state.checked33}   onChange={(e)=> this.handleChange33(e,this.state.inpersonLegend3)} />
																	</div>

									}
								</div> 
						</div>
					</div> 
				  }
				{/* In Person End */}

	<div class="">
					<div class="col-md-12 mb-3"> 
				     	{this.state.ConfirmButton && this.state.ConfirmButton==true ? <a href={this.state.confirmationPath} class="btn btn-primary  rounded float-right" id="myLink_33" style={{marginBottom:'10px'}} >Go To Booking</a>  : <a href='#' class="btn btn-primary  rounded float-right"  id="myLink_33"  style={{marginBottom:'10px'}}>Slots Not Available</a>}  
					 </div> 
					<div id="modal1" class="modal">
						<div class="modal-content">
							<a href="#!" class=" text-right modal-action modal-close waves-effect waves-green btn-flat">Close</a>
							<h4 class="text-muted text-center">Report To Medaloda</h4>

							<p>Email*</p>
							<form>
								<div class="form-group form-focus focused">
									<input required type="email" class="form-control floating"/>
									<label class="focus-label">Email</label>
								</div>
								<button class="btn btn-primary btn-block " type="submit">Send</button>
							</form>

						</div>

					</div> 
				</div>

	 </div>

			

			</div>
		</div>

	</div>
</div>
</div>
</div>

 
<div class="card">
	<div class="card-body pt-0"> 
		<nav class="user-tabs cus-user-tabs mb-4" >
			<ul class="nav nav-tabs nav-tabs-bottom nav-justified">
				<li class="nav-item">
					<a class="nav-link active" href="#doc_overview" data-toggle="tab">Overview</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="#doc_locations" data-toggle="tab">Degrees</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="#doc_reviews" data-toggle="tab">Reviews</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="#doc_business_hours" data-toggle="tab">Extra</a>
				</li>
			</ul>
		</nav> 
		<div class="tab-content pt-0"> 
			<div role="tabpanel" id="doc_overview" class="tab-pane fade show active">
				<div class="row">
					<div class="col-md-12 col-lg-12"> 
						<div class="widget awards-widget">
							<h4 class="widget-title font-weight-bold">Consultation description</h4>
							
                 {
                            	(this.state.message!='' && this.state.message!='undefined')?
							<div class="d-flex">
								<div class="experience-box">
									<div class="widget-title font-weight-bold cus-font-size1 color-cus3">Chat: </div>
								</div><div class="experience-box">
									<p>
										&nbsp;{(this.state.message!='undefined')?this.state.message:'-'}
									</p>
								</div></div>:""}

							
{
                            	(this.state.messagePart!='')?
							<div class="d-flex">
								<div class="experience-box">
									<div class="font-weight-bold cus-font-size1 color-cus3">Chat PART: </div>
								</div>
								<div class="experience-box">
									<p class="">
										&nbsp;{this.state.messagePart}
									</p>
								</div>
							</div>:""

						}


{
                            	(this.state.messageFull!='')?
							<div class="d-flex">
								<div class="experience-box">
									<div class="font-weight-bold cus-font-size1 color-cus3">Chat FULL: </div>
								</div>
								<div class="experience-box">
									<p class="">
										&nbsp;{this.state.messageFull}
									</p>
								</div>
							</div>:""}


{
                            	(this.state.vivo!='')?
								<div class="d-flex">
								<div class="experience-box">
									<div class="font-weight-bold cus-font-size1 color-cus3">Vivo: </div>
								</div>
								<div class="experience-box">
									<p class="">
										&nbsp;{(this.state.vivo!='undefined')?this.state.vivo:'-'}
									</p>
								</div>
							</div>:""}


{
                            	(this.state.vivoPart!='')?
								<div class="d-flex">
								<div class="experience-box">
									<div class="font-weight-bold cus-font-size1 color-cus3">Vivo PART: </div>
								</div>
								<div class="experience-box">
									<p class="">
										&nbsp;{this.state.vivoPart}
									</p>
								</div>
							</div>:""}


{
                            	(this.state.vivoFull!='')?
								<div class="d-flex">
								<div class="experience-box">
									<div class="font-weight-bold cus-font-size1 color-cus3">Vivo FULL: </div>
								</div>
								<div class="experience-box">
									<p class="">
										&nbsp;{this.state.vivoFull}
									</p>
								</div>
							</div>:""}


{
                            	(this.state.audio!='')?
							<div class="d-flex">
								<div class="experience-box">
									<div class="font-weight-bold cus-font-size1 color-cus3">Audio: </div>
								</div>
								<div class="experience-box">
									<p class="">
										&nbsp;{this.state.audio}
									</p>
								</div>
							</div>:""}


{
                            	(this.state.audioPart!='')?
	                          <div class="d-flex">
								<div class="experience-box">
									<div class="font-weight-bold cus-font-size1 color-cus3">Audio PART: </div>
								</div>
								<div class="experience-box">
									<p class="">
										&nbsp;{this.state.audioPart}
									</p>
								</div>
							</div>:""}

{
                            	(this.state.audioFull!='')?
								<div class="d-flex">
								<div class="experience-box">
									<div class="font-weight-bold cus-font-size1 color-cus3">Audio FULL: </div>
								</div>
								<div class="experience-box">
									<p class="">
										&nbsp;{this.state.audioFull}
									</p>
								</div>
							</div>:""}


{
                            	(this.state.video!='')?
<div class="d-flex">
								<div class="experience-box">
									<div class="font-weight-bold cus-font-size1 color-cus3">Video: </div>
								</div>
								<div class="experience-box">
									<p class="">
										&nbsp;{this.state.video}
									</p>
								</div>
							</div>:""}

{
                            	(this.state.videoPart!='')?
	                          <div class="d-flex">
								<div class="experience-box">
									<div class="font-weight-bold cus-font-size1 color-cus3">Video PART: </div>
								</div>
								<div class="experience-box">
									<p class="">
										&nbsp;{this.state.videoPart}
									</p>
								</div>
							</div>:""}


{
                            	(this.state.videoFull!='')?

								<div class="d-flex">
								<div class="experience-box">
									<div class="font-weight-bold cus-font-size1 color-cus3">Video FULL: </div>
								</div>
								<div class="experience-box">
									<p class="">
										&nbsp;{this.state.videoFull}
									</p>
								</div>
							</div>:""}



						</div>


						 
						<div class="widget about-widget">
							<h4 class="widget-title font-weight-bold">About Me</h4>
							<p>{this.state.aboutme}</p>
						</div>
					 


						<div class="widget awards-widget">
							<h4 class="widget-title font-weight-bold">My holistic expertise</h4>
							<div class="experience-box">
								<p>
                                {this.state.specialistHolesticExp}
								</p>
							</div>
						</div>
					 
						<div class="widget education-widget">
							<h4 class="widget-title font-weight-bold">Education</h4>
							<div class="experience-box">
								<p>
                                {this.state.specialistEducation}
								</p>
							</div>
						</div>
					 





					 
						<div class="widget experience-widget">
							<h4 class="widget-title font-weight-bold">Work & Experience</h4>
							<div class="experience-box">
								<p>
								{this.state.specialistWorkingExperienceDetails}
								</p>
							</div>
						</div>
					 


						<div class="widget experience-widget">
							<h4 class="widget-title font-weight-bold">See presentation videos</h4>
							<div class="experience-box">
								<p>
									<a target="_blank" href={this.state.specialistVedioUrl1}>Video Title Here-1</a>
								</p>
								<p>
									<a target="_blank" href={this.state.specialistVedioUrl2}>Video Title Here-2</a>
								</p>
							</div>
						</div>



						<div class="widget awards-widget">
							<h4 class="widget-title font-weight-bold">Languages available for consultation</h4>
							<div class="experience-box">
								<p>
									{this.state.specialistAvaLanguage}
								</p>
							</div>
						</div>
						<div class="widget awards-widget">
							<h4 class="widget-title font-weight-bold">Other contributions</h4>
							<div class="experience-box">
								<p>
                                {this.state.specialistOtherContribution}
								</p>
							</div>
						</div>
						<div class="widget awards-widget">
							<h4 class="widget-title font-weight-bold">Mission</h4>
							<div class="experience-box">
								<p>
                                {this.state.specialistMission}
								</p>
							</div>
						</div>
					 
						<div class="widget awards-widget">
							<h4 class="widget-title font-weight-bold">Comments</h4>
							<div class="experience-box">
								<p>
                                {this.state.specialistOtherComments}
								</p>
							</div>
						</div>

						<div class="widget about-widget">
							<h4 class="widget-title font-weight-bold">Tags</h4> 

							<p> <a href="javascript:void(0)">
                                {this.state.specialistOtherTags}
                                   </a>
							</p>
						</div>
</div>
</div>
</div> 
<div role="tabpanel" id="doc_locations" class="tab-pane fade">
{this.state.DegreeInformation.map( (Data)=> (
    <div class="location-list">
		<div class="row"> 
			<div class="col-md-8">
				<div class="clinic-content mt-4">
					<h3><a href="#">DEGREE TITLE-{Data.SpecialistDegreeTitle}</a></h3>
					<h4>Description-{Data.Details}</h4> 
					<h4>Institute-{Data.SpecialistInstitute}</h4>
					<h4 class="font-italic">Year-{Data.Year}</h4>
					<h4>Other information-{Data.OtherInformation}</h4>
				</div>
			</div> 
			<div class="col-md-4">
				<div class="clinic-timing">
					<div>
						<a href="" data-toggle="modal" data-target="#dview">
                        {Data.DocFile!=null ? 
                        <img src={Data.DocFile} class="img-fluid border w-75"/>
                        :
                        <img src="/assets/images/noimg.jpg" class="img-fluid border w-75"/> 
                    }
							
						</a>
					</div>
				</div>
			</div> 
		</div>
	</div>
))
}
	
	 
 
 

</div>
 
<div role="tabpanel" id="doc_reviews" class="tab-pane fade">

 
	<div class="widget review-listing">
		<ul class="comments-list"> 
						
						{this.state.reviewData && this.state.reviewData!=null?
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
																	{this.state.getreplyData && this.state.getreplyData!='' ?
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
																			
																		</div>
																	</div>
																	:''}
																</div>
																 
															</div>
														</div> 
													</li> 
													)) : <li style={{textAlign:"center"}}>Review Not found.</li>} 
						
													</ul>

	 

	 
		<div class="all-feedback text-center">
			 
		</div> 
	</div> 

								</div>
							 
								<div role="tabpanel" id="doc_business_hours" class="tab-pane fade">
									<div class="row">
										<div class="col-md-6">
											<div class="widget business-widget">
												<div class="widget-content">
													<h3>Location </h3><hr/>
													<div class="doc-info-cont">
														<h4 class="doc-name"><a href="specialist-profile.html" class="text-dark">{this.state.Holisticcenter}
														</a></h4>
														<p class="doc-speciality">{this.state.Holisticlocation}</p>
													 

														<div class="clinic-details">
															<p class="doc-location mb-2"><i class="fas fa-map-marker-alt"></i> {this.state.SpecialistCountry}, ({this.state.SpecialistCity}) -<a href="" class="text-info font-weight-bold">Get Direction</a>
															</p>
															<ul class="clinic-gallery">
                                                            {this.state.SpecialistActivityImg1 !=  null ?
                                                            <li>
                                                            <a href={this.state.SpecialistActivityImg1} data-fancybox="gallery">
                                                                <img src={this.state.SpecialistActivityImg1} alt="Feature" />
                                                            </a>
                                                        </li>:null 
                                                        }
															

                                                            {this.state.SpecialistActivityImg2 !=null ?
                                                            <li>
                                                            <a href={this.state.SpecialistActivityImg2} data-fancybox="gallery">
                                                                <img src={this.state.SpecialistActivityImg2} alt="Feature" />
                                                            </a>
                                                        </li>:null 
                                                        }

                                                        {this.state.SpecialistActivityImg3 != null?
                                                            <li>
                                                            <a href={this.state.SpecialistActivityImg3} data-fancybox="gallery">
                                                                <img src={this.state.SpecialistActivityImg3} alt="Feature" />
                                                            </a>
                                                        </li>:null 
                                                        }
														 {this.state.SpecialistActivityImg4 !=null ?
                                                            <li>
                                                            <a href={this.state.SpecialistActivityImg4} data-fancybox="gallery">
                                                                <img src={this.state.SpecialistActivityImg4} alt="Feature" />
                                                            </a>
                                                        </li>:null 
                                                        }
															</ul>
														</div>
													</div>
												</div>
											</div></div>
											<div class="col-md-6 ">

											 
												<div class="widget business-widget">
													<div class="widget-content">
														<div class="listing-hours">
															<div class="listing-day current">
																<h3>Working Time  
																	<span class="h6">(Specialista’s Time Zone)</span> 
																</h3>
	


	</div>
{


(this.state.SpecialistWorkingTime) && this.state.SpecialistWorkingTime.split('||').map( (datat)=> ( 
 


<div class="listing-day">


<div class="day">{(datat.length>0)? datat.slice(0, datat.indexOf('-')):''}</div>



<div class="time-items">
									<span class="time">{(datat.length>0)? datat.slice(datat.indexOf('-') + 1):''} </span>
								</div>


</div>


		 ) )
}

														
															<hr/>
 
															<h4 class="text-center">Time Zone: {this.state.SpecialistTimezone}  {this.state.SpecialistOffsetString} </h4>
														</div>
													</div>
												 

												</div>
											</div>
										</div> 

									</div>
								</div>
							</div>


						 
						 </div>
                         </div>	 </div>	

    
                <Footer/>
                </div>
        )
    } 
} 


export default withTranslation()(SpecialistDetails);
