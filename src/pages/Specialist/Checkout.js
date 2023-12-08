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
import moment from 'moment';
import BookingCalendarPaymentStripe from '../Components/BookingCalendarPaymentStripe';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
require('dotenv').config();

function settingLanguage(lang){ 
     i18n.changeLanguage(lang);
 }

class Checkout extends React.Component {   
    
    constructor(props) {
        super(props);
       // this.state = { checked: false };
        this.handleChange = this.handleChange.bind(this);
        this.state = { 
		   profileimage:"",
           SpecialistName : "",
           title : "",
           category : "",
           experience : "",
           SpecialistCountry:"",
           SpecialistCity:"", 
           confirmationPath : "javascript:void(0)",
           checked:true ,
		   reviewStart:'',
		   ratingCount:'',
		   ratingAvg:''
        };   
    }  
   
	
     fileChangedHandlerID1 = event => {
        this.setState({ idfront: event.target.files[0] })
      } 

      fileChangedHandlerID2 = event => {
          console.log(event.target.files);
        this.setState({ idback: event.target.files[0] })
      } 
      
      handleChange(e) {
         alert(this.state.checked);
        this.setState({ checked: !this.state.checked });
        this.setState({confirmationPath:'bookingmessageconsultation'});

    }
      
    componentDidMount() {

         var BookedSpecialist_id = localStorage.getItem('BookedSpecialist_id'); 
		 localStorage.setItem('temp_booking_specialist',BookedSpecialist_id);
		 console.log('temp_booking_specialist');
		 console.log(localStorage.getItem('temp_booking_specialist'));

         axios.get(process.env.REACT_APP_BASE_URL+`/specilistAPI/GetFeaturedSpecialistFullDetails?specialist_id=`+BookedSpecialist_id+'&language_id='+localStorage.getItem('i18nextLng'))
         .then(res => {
            console.log('res.data222'); 
             if(res.data['Status']){
                this.setState({profileimage : res.data['Result'][0].SpecialistPic});
                this.setState({SpecialistName : res.data['Result'][0].SpecialistName}); 
                this.setState({SpecialistCountry : res.data['Result'][0].SpecialistCountry}); 
                this.setState({SpecialistCity : res.data['Result'][0].SpecialistCity}); 
				this.setState({reviewStart :res.data['Result'][0].SpecilistRatingAvg});
                this.setState({ratingCount :res.data['Result'][0].SpecilistRatingCount});
				this.setState({ratingAvg :res.data['Result'][0].SpecilistRatingAvgPer});
             } 
         });  
	  } 

    rebookingDone(e){
		e.preventDefault();

		const bookingData = { 
			user_id : localStorage.getItem('customer_id') ,
			specialist_id : localStorage.getItem('BookedSpecialist_id'), 
			session_date : localStorage.getItem('selectedTime'),
			event_id : localStorage.getItem('BookingEventId'),
			price : localStorage.getItem('value') ,
			payment_stripe_id : '' , 
			legend_id:localStorage.getItem('legend') ,
			message_description:localStorage.getItem('message_description'),
			bookingID:localStorage.getItem('bookingID')
		   }
			console.log('bookingData'); 
			console.log(bookingData); 
			

			axios.post(process.env.REACT_APP_BASE_URL+`/specilistAPI/SpecialistReBooking`,bookingData)
			.then(res => {
			//this.setState({countryData : res.data});
			console.log(res.data); 
			if(res.data.Status)
			{
			// res.data.InvoiceId
		
			window.localStorage.removeItem("BookedSpecialist_id"); 
			window.localStorage.removeItem("selectedTime"); 
			window.localStorage.removeItem("value"); 
			window.localStorage.removeItem("legend");  
			window.location.href = '/booking-success?invoice_id='+res.data.InvoiceId;

			} 
			else 
			alert(res.data.Message);

			}).catch(function (error) {
			console.log(error);
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
 
    render(){
        const { t } = this.props;
		const promise = loadStripe("pk_test_dpbFidCDzQDGz85BRrqlGhJD");
		const fontUrl = [{ cssSrc: "https://fonts.googleapis.com/css?family=Podkova:400" }]

        if(localStorage.getItem('customer_id')==null){
			return	<Redirect to="/login"/>
		} 

        return ( 
			
	          <div class="main-wrapper">  
                <CustomerHeader/> 
                <div class="breadcrumb-bar bg-cus">
			    	<div class="container-fluid">
					  <div class="row align-items-center">
						  <div class="col-md-12 col-12">
							<h2 class="breadcrumb-title">Payment</h2>
						 </div>
					  </div>
				  </div>
			     </div>
                
      <div class="content">
			<div class="container"> 
				<div class="row section" >
					<div class="col-md-7 col-lg-8">
						<div class="card">
							<div class="card-body">   
									<div class="payment-widget">
							            <h4 class="card-title">Payment Method</h4> 
										{localStorage.getItem('Rebooking')==='false' ?
										<Elements stripe={promise} fonts={fontUrl}>
											<BookingCalendarPaymentStripe/>
										</Elements> 
										:
										<div>
										<label class="payment-radio credit-card-option mt-3 mr-5">
										<input type="radio" name="radio" checked="checked" />
											<span class="checkmark"></span>
														ReBooking
									       </label>

										   <button   class="btn btn-primary submit-btn" onClick={(e)=>this.rebookingDone(e)} >Pay Now</button>
										  </div>
										}

										</div>  
								</div>
							</div>
							
						</div>
						
						<div class="col-md-5 col-lg-4 theiaStickySidebar"> 
							<div class="card booking-card">
								<div class="card-header">
									<h4 class="card-title">Booking Summary</h4>
								</div>
								<div class="card-body">  
									<div class="booking-doc-info">
										<a href={'specialistDetails/'+localStorage.getItem('BookedSpecialist_id')} class="booking-doc-img">
											<img src={this.state.profileimage} alt="User Image" />
										</a>
										<div class="booking-info">
											<h4><a href={"specialistDetails/"+localStorage.getItem('BookedSpecialist_id')}>Dr. {this.state.SpecialistName}</a></h4>
											<div class="rating">
										   	{
      											this.printReviewStar(this.state.reviewStart)
										     } 
												<span class="d-inline-block average-rating">({this.state.ratingCount})</span>
											</div>
											<div class="clinic-details">
												<p class="doc-location"><i class="fas fa-map-marker-alt"></i> {this.state.SpecialistCity}, {this.state.SpecialistCountry}</p>
											</div>
										</div>
									</div>
								 
									
									<div class="booking-summary">
										<div class="booking-item-wrap">
											<ul class="booking-date">
												<li>Date <span>{moment(localStorage.getItem('selectedTime')).format('D MMMM Y')}</span></li>
												<li>Time <span>{moment(localStorage.getItem('selectedTime')).format('h:mm a')}</span></li>
											</ul> 
											<ul class="booking-fee">
											 
												<li>Consultation (VAT incl.) <span>${localStorage.getItem('value')}</span></li>
												
											</ul>
											<div class="booking-total">
												<ul class="booking-total-list">
													<li>
														<span>Total</span>
														<span class="total-cost">${localStorage.getItem('value')}</span>
													</li>
												</ul>
											</div>
										</div>
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


export default withTranslation()(Checkout);
