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
import queryString from 'query-string';
 

require('dotenv').config();

function settingLanguage(lang){ 
     i18n.changeLanguage(lang);
 }

class Bookingsuccess extends React.Component {   
    
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
           invoiceURL:"",
           CLIENT_ID : "871867605134-c7e4vqv03ksg5l6rvlh4modpcqjla2fk.apps.googleusercontent.com",
           API_KEY : "AIzaSyB2QRJsaf8c-LX6J24yQvcOlOFMI5gMwQ8",
           DISCOVERY_DOCS : ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
           SCOPES : "https://www.googleapis.com/auth/calendar.events"
        };   
 

    }  
   
	addtogoogle(){ 
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
              apiKey: 'AIzaSyB2QRJsaf8c-LX6J24yQvcOlOFMI5gMwQ8',
              clientId: '871867605134-c7e4vqv03ksg5l6rvlh4modpcqjla2fk.apps.googleusercontent.com',
              discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
              scope: 'https://www.googleapis.com/auth/calendar.events',
            })
      
      
            window.gapi.client.load('calendar', 'v3')
      //time zone list:
      // https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
            let timeZone = "Asia/Jerusalem"; 
            let duration = '01:30:00'; //duration of each event, here 30 minuts
      
      
          //event start time - im passing datepicker time, and making it match  
              //with the duration time, you can just put iso strings:
      //2020-06-28T09:00:00-07:00' 
      
            let startDate = new Date('2022-03-03T09:00:00-07:00');
            let msDuration = (Number(duration.split(':')[0]) * 60 * 60 + Number(duration.split(':')[1]) * 60  + Number(duration.split(':')[2])) * 1000;
            let endDate = new Date(startDate.getTime() + msDuration);
            let isoStartDate = new Date(startDate.getTime()-new Date().getTimezoneOffset()*60*1000).toISOString().split(".")[0];
            let isoEndDate = new Date(endDate.getTime()-(new Date().getTimezoneOffset())*60*1000).toISOString().split(".")[0];
      
      
      //sign in with pop up window
      window.gapi.auth2.getAuthInstance().signIn()
            .then(() => { 
              let event = {
                'summary': 'Medaloha calendar', // or event name
                'location': 'Gwalior', //where it would happen
                'start': {
                  'dateTime': isoStartDate,
                  'timeZone': timeZone
                },
                'end': {
                  'dateTime': isoEndDate,
                  'timeZone': timeZone
                },
                'recurrence': [
                  'RRULE:FREQ=DAILY;COUNT=1' 
                ],
                'reminders': {
                  'useDefault': false,
                  'overrides': [
                    {'method': 'popup', 'minutes': 20}
                  ]
                }
              } 
              let request =window.gapi.client.calendar.events.insert({
                'calendarId': 'primary',
                'resource': event,
              }) 
              request.execute(event => {
                console.log(event)
                window.open(event.htmlLink)
              }) 
      
            })
        })
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
        var invoice_id = queryString.parse(window.location.search);
        console.log('invoice_id');
        console.log(invoice_id.invoice_id);
        console.log(this.props)

         var BookedSpecialist_id = localStorage.getItem('temp_booking_specialist')
         console.log('BookedSpecialist_id');
         console.log(BookedSpecialist_id);
        this.setState({invoiceURL : '/invoice/'+invoice_id.invoice_id});

         axios.get(process.env.REACT_APP_BASE_URL+`/specilistAPI/GetFeaturedSpecialistFullDetails?specialist_id=`+BookedSpecialist_id)
         .then(res => {
            console.log('res.data222'); 
             if(res.data['Status']){
                this.setState({profileimage : res.data['Result'][0].SpecialistPic});
                this.setState({SpecialistName : res.data['Result'][0].SpecialistName}); 
                this.setState({SpecialistCountry : res.data['Result'][0].SpecialistCountry}); 
                this.setState({SpecialistCity : res.data['Result'][0].SpecialistCity}); 
             } 
         });  
	  }  
    render(){
        const { t } = this.props;
		const promise = loadStripe("pk_test_dpbFidCDzQDGz85BRrqlGhJD");
		 
        return ( 
	          <div class="main-wrapper">  
                <CustomerHeader/> 
                <div class="breadcrumb-bar bg-cus">
				<div class="container-fluid">
					<div class="row align-items-center">
						<div class="col-md-12 col-12"> 
							<h2 class="breadcrumb-title">Reservation confirmed!</h2>
						</div>
					</div>
				</div>
			</div>
            <div class="content success-page-cont">
				<div class="container-fluid"> 
					<div class="row justify-content-center">
						<div class="col-lg-6">
						
						 
							<div class="card success-card">
								<div class="card-body">
									<div class="success-cont">
										<i class="fas fa-check"></i>
										<h3>Appointment booked Successfully!</h3>
										<p>Appointment booked with <strong>Dr. {this.state.SpecialistName}</strong>
										</p>
										<a href={this.state.invoiceURL} class="btn btn-primary view-inv-btn">View Invoice</a>
									</div>
									<center><a  style={{display:'none'}}  class="btn btn-info mt-4" onClick={this.addtogoogle}>Add To Google Calender</a></center>
									
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


export default withTranslation()(Bookingsuccess);
