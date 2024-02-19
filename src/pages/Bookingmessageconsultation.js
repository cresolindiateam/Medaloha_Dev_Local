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
import moment from 'moment';
// const { t, i18n } = useTranslation(); 
require('dotenv').config();


function settingLanguage(lang){ 
     i18n.changeLanguage(lang);
 }

class Bookingmessageconsultation extends React.Component {   
    
    constructor(props) {
        super(props);
       // this.state = { checked: false };
        this.handleChange = this.handleChange.bind(this);
        this.messageconfirm = this.messageconfirm.bind(this);
        
        this.state = { 
		   profileimage:"",
           name : "",
           title : "",
           category : "",
           experience : "",
           SpecialistCountry:"",
           SpecialistCity:"",
           SpecilistRatingAvg:"",
           SpecilistRatingCount:"",
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
           message_description:''
        };   
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

    messageconfirm(e){
      e.preventDefault();   
        //alert(this.state.message_description);
        // this.setState({message_description:e.target.value}); 

       if(this.state.message_description!=''){ 
         
        localStorage.setItem('message_description' ,this.state.message_description);
        localStorage.setItem('BookedSpecialist_id',this.props.match.params.id);
        localStorage.setItem('selectedTime',moment().format('YYYY-MM-DD HH:mm:ss'));
        window.location.href = '/checkout';
       } else {
         alert("Please entered your query for specialist");
       }


      
    }

	
     fileChangedHandlerID1 = event => {
        this.setState({ idfront: event.target.files[0] })
      } 

      fileChangedHandlerID2 = event => {
          console.log(event.target.files);
        this.setState({ idback: event.target.files[0] })
      } 
      
      handleChange(e) {
         //alert(this.state.checked);
        this.setState({ checked: !this.state.checked });
        this.setState({confirmationPath:'bookingmessageconsultation'});

    }
      
    componentDidMount() {

         var specialist_id = this.props.match.params.id; 
         axios.get(process.env.REACT_APP_BASE_URL+`/specilistAPI/GetFeaturedSpecialistFullDetails?specialist_id=`+specialist_id+'&language_id='+localStorage.getItem('i18nextLng'))
         .then(res => {
            console.log('res.data222'); 
             if(res.data['Status']){
                this.setState({profileimage : res.data['Result'][0].SpecialistPic});
                this.setState({name : res.data['Result'][0].SpecialistName});
                this.setState({title:res.data['Result'][0].SpecialistTitle}); 
                this.setState({SpecialistCountry :res.data['Result'][0].SpecialistCountry});
                this.setState({SpecialistCity :res.data['Result'][0].SpecialistCity});
                this.setState({SpecilistRatingCount :res.data['Result'][0].SpecilistRatingCount});
                this.setState({SpecilistRatingAvg :res.data['Result'][0].SpecilistRatingAvg});

             } 

         });   



         axios.get(process.env.REACT_APP_BASE_URL+`/specilistAPI/GetSpecialistDegreeByID?specialist_id=`+specialist_id)
         .then(res => {
            console.log('res.w'); 
             if(res.data['Status']){

                console.log(res.data['Result']); 
                this.setState({DegreeInformation:res.data['Result']}); 

                console.log(this.state.DegreeInformation);
                // this.setState({degreetitle : res.data['Result'][0].SpecialistDegreeTitle});
                // this.setState({details : res.data['Result'][0].Details});
                // this.setState({year:res.data['Result'][0].Year});
                // this.setState({institude : res.data['Result'][0].SpecialistInstitute});
                // this.setState({otherinformation :res.data['Result'][0].OtherInformation});
                // this.setState({docfile :res.data['Result'][0].Docfile}); 
             } 
         });   
	  } 
 
    render(){
        const { t } = this.props;

     if(localStorage.getItem('customer_id')==null){
			return	<Redirect to="/"/>
		} 

        return ( 
	          <div class="main-wrapper">  
                <CustomerHeader/> 
           <div class="breadcrumb-bar bg-cus">
			    	<div class="container-fluid">
					  <div class="row align-items-center">
						  <div class="col-md-12 col-12">
							<h2 class="breadcrumb-title">Booking For Message Consultation</h2>
						 </div>
					  </div>
			 	  </div>
			     </div>
                
                 <div class="content bg-theme">
				 <div class="container">  
					 
					<div class="card">
					<div class="card-body"> 

				<div class="doctor-widget">
					<div class="col-md-8">

						<div class="media">
								<div class="doctor-img">
										<h4 class="text-center font-size-21 color1" >{this.state.name}</h4>
									<a href="doctor-profile.html" class="d-flex">
										<img src="\assets\icon\medicine.png" class="img-fluid search-pic" alt="User Image" />
										<img src={this.state.profileimage} class="img-fluid" alt="User Image" width="200" height="200" />
									</a>
								</div>

							  <div class="media-body" >
							    
						<div class="doc-info-cont mt-5">
							<h4 class="doc-name"><a href="doctor-profile.html" class="text-dark">{this.state.title}</a></h4>
							 
							<div class="rating">
								{
                  this.printReviewStar(this.state.SpecilistRatingAvg)
               } 
								<span class="text-muted d-inline-block average-rating">({this.state.SpecilistRatingCount})</span>
							</div>
							<div class="clinic-details">
								<p class="doc-location"><i class="fas fa-map-marker-alt"></i> {this.state.SpecialistCountry} , {this.state.SpecialistCity}</p>
							</div>
						</div>
					  </div>
					</div>
 				</div>

					
				</div>
			</div>
		</div>

	 <form class="  mt-5">
		  <div class="form-group">
			  
			<img src="/assets/icon/messages.png"  class="message-pic1 hidden-sm hidden-xs" />
		    <img src="/assets/icon/messages.png" class="message-pic width-30 hidden-md hidden-lg" />
			<textarea id="review_desc" maxlength="100"     onChange={(e)=> this.setState({ message_description: e.target.value})}  class="form-control bg-light custom-height9"  placeholder="Write here your query to the specialist (max 5000 characters)"></textarea>
		 </div>
		 
		
	
		

				<div class="submit-section d-flex justify-content-end">
		
    
			<div class="offset-md-10 mb-3">
				<button type="button" onClick={this.messageconfirm} class="btn btn-primary submit-btn ml-2">Confirm</button>
			
			</div>
			</div>  
	</form>
				 

				</div>
			</div>	
               
 
            <Footer/>
            </div>
        )
    } 
} 


export default withTranslation()(Bookingmessageconsultation);
