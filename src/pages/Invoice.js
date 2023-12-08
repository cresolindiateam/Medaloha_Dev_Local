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
//import BookingCalendarPaymentStripe from 'Components/BookingCalendarPaymentStripe';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
require('dotenv').config();

function settingLanguage(lang){ 
     i18n.changeLanguage(lang);
 }

class Invoice extends React.Component {   
    
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
		   InvoiceNumber:"",
		   InvoiceDate:"",
		   SpecialistName:"",
		   UserName:"",
		   UserAddress:"",
		   Userzip:"",
		   HolisticCenter:"",
		   HolisticLocation:"",
		   Track:"",
		   BookingPrice:"",
		   Scityname:"",
		   Ucityname:"",
		   Scountryname:"",
		   Ucountryname:"",
		   RebookingStatus:"",
		   cardType:"",
		   Last4:""
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

		var InvoiceID = this.props.match.params.id;
		console.log('res.dddddd'); 
		console.log(InvoiceID); 
         axios.get(process.env.REACT_APP_BASE_URL+`/specilistAPI/GetBookingInvoice?invoice_id=`+InvoiceID)
         .then(res => {
            console.log('res.data222'); 
			console.log(res.data); 
             if(res.data){
				 var stringinvoice = res.data[0].bookingID;
               this.setState({InvoiceNumber : stringinvoice}); 
			   this.setState({InvoiceDate : res.data[0].booking_date}); 
			   this.setState({SpecialistName : res.data[0].Sname+" "+res.data[0].Slastname}); 
			   this.setState({UserName : res.data[0].UserName +" "+ res.data[0].UserLast}); 
			   this.setState({UserAddress : res.data[0].UserAddress}); 
			   this.setState({Userzip : res.data[0].Userzip}); 
			   this.setState({HolisticCenter : res.data[0].holistic_center}); 
			   this.setState({HolisticLocation : res.data[0].holistic_location}); 
			   this.setState({Track : res.data[0].Track}); 
			   this.setState({HolisticLocation : res.data[0].holistic_location}); 
			   this.setState({BookingPrice : res.data[0].booking_price}); 

			   this.setState({Scityname : res.data[0].s_city_name}); 
			   this.setState({Ucityname : res.data[0].u_city_name}); 
			   this.setState({Scountryname : res.data[0].s_country_name}); 
			   this.setState({Ucountryname : res.data[0].u_country_name});  
			   this.setState({RebookingStatus : res.data[0].user_rebooking_status}); 
			   
 
			   this.setState({cardType : res.data[0].cardType});  
			   this.setState({Last4 : res.data[0].Last4}); 
			   
             } 
         });  
	  } 

	  
 
    render(){
        const { t } = this.props;
		const promise = loadStripe("pk_test_dpbFidCDzQDGz85BRrqlGhJD");
		 
        return ( 
	          <div class="main-wrapper">  
                <CustomerHeader/> 
               <div class="breadcrumb-bar">
				<div class="container-fluid">
					<div class="row align-items-center">
						<div class="col-md-12 col-12"> 
							<h2 class="breadcrumb-title">Invoice View</h2>
						</div>
					</div>
				</div>
			</div>
         
			<div class="content">
				<div class="container-fluid"> 
					<div class="row">
						<div class="col-lg-8 offset-lg-2">
							<div class="invoice-content">
								<div class="invoice-item">
									<div class="row">
										<div class="col-md-6">
											<div class="invoice-logo">
												<img src="/assets/img/logo.png" alt="logo" />
											</div>
										</div>
										<div class="col-md-6">
											<p class="invoice-details">
												<strong>Order:</strong> #{"000"+this.state.InvoiceNumber} <br />
												<strong>Issued:</strong> {this.state.InvoiceDate}
											</p>
										</div>
									</div>
								</div>
								
						 
								<div class="invoice-item">
									<div class="row">
										<div class="col-md-6">
											<div class="invoice-info">
												<strong class="customer-text">Invoice From</strong>
												<p class="invoice-details invoice-details-two">
													Dr. {this.state.SpecialistName} <br/>
												{this.state.HolisticCenter}, {this.state.HolisticLocation},<br/>
													{this.state.Scityname!=null ? this.state.Scityname :''}, {this.state.Scountryname!=null ? this.state.Scountryname:''} <br/>
												</p>
											</div>
										</div>
										<div class="col-md-6">
											<div class="invoice-info invoice-info2">
												<strong class="customer-text">Invoice To</strong>
												<p class="invoice-details">
													{this.state.UserName}<br/>
													{this.state.UserAddress}, <br/>
													{this.state.Ucityname!=null? this.state.Ucityname : ''}, {this.state.Userzip!=null ? this.state.Userzip : ''},  {this.state.Ucountryname!=null ? this.state.Ucountryname:''} <br/>
												</p>
											</div>
										</div>
									</div>
								</div>
							 
								<div class="invoice-item">
									<div class="row">
										<div class="col-md-12">
											<div class="invoice-info">
												<strong class="customer-text">Payment Method</strong>
												<p class="invoice-details invoice-details-two">
												 {this.state.cardType} Card <br/>
													XXXXXXXXXXXX-{this.state.Last4} <br/>
												 
												</p>
											</div>
										</div>
									</div>
								</div>
							 
								<div class="invoice-item invoice-table-wrap">
									<div class="row">
										<div class="col-md-12">
											<div class="table-responsive">
												<table class="invoice-table table table-bordered">
													<thead>
														<tr>
															<th>Description</th>
															<th class="text-center">Quantity</th>
															<th class="text-center">VAT</th>
															<th class="text-right">Total</th>
														</tr>
													</thead>
													<tbody>
														<tr>
															<td>{this.state.Track} Calling</td>
															<td class="text-center">1</td>
															<td class="text-center">$0</td>
															<td class="text-right">${this.state.BookingPrice}</td>
														</tr>
														 
													</tbody>
												</table>
											</div>
										</div>
										<div class="col-md-6 col-xl-4 ml-auto">
											<div class="table-responsive">
												<table class="invoice-table-two table">
													<tbody>
													<tr>
														<th>Subtotal:</th>
														<td><span>${this.state.BookingPrice}</span></td>
													</tr>
													<tr>
														<th>Discount:</th>
														<td><span>-0%</span></td>
													</tr>
													<tr>
														<th>Total Amount:</th>
														<td> {this.state.RebookingStatus==1? "Rebooking: $0" :<span>${this.state.BookingPrice}</span>} </td>
													</tr>
													</tbody>
												</table>
											</div>
										</div>
									</div>
								</div>
							 
								
							 
								<div class="other-info">
									<h4>Other information</h4>
									<p class="text-muted mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed dictum ligula, cursus blandit risus. Maecenas eget metus non tellus dignissim aliquam ut a ex. Maecenas sed vehicula dui, ac suscipit lacus. Sed finibus leo vitae lorem interdum, eu scelerisque tellus fermentum. Curabitur sit amet lacinia lorem. Nullam finibus pellentesque libero.</p>
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


export default withTranslation()(Invoice);
