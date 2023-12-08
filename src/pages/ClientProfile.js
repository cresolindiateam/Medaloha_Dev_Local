import React , {Component} from 'react';
//import { useTranslation } from 'react-i18next';
import { withTranslation } from 'react-i18next';
import i18n from "i18next";
// import settingLanguage from './helper';
import CustomerHeader from './Components/CustomerHeader';
import Footer from './Components/Footer';
import axios from 'axios';
// const { t, i18n } = useTranslation(); 
require('dotenv').config();


function settingLanguage(lang){ 
     i18n.changeLanguage(lang);
 }

class ClientProfile extends React.Component {   
    
	constructor(props) {
        super(props); 
        this.state = { 
			email:"",
           name : "",
           surname : "",
           mobile : "",
           dob : "",
           zipcode:"",
           timezone:"", 
           user_image:process.env.REACT_APP_URL+"/assets/img/doctors/doctor-thumb-02.jpg",
           customer_country:"", 
		   city:"",
		   consultation_language:'',
		   message:'',
		   successMessage:''
        };   
    }  

	messageValue(e){
       this.setState({message:e.target.value});
	}
 
   componentDidMount(){
	var customer_id = this.props.match.params.id;  
	axios.get(process.env.REACT_APP_BASE_URL+`/customerAPI/GetCustomerDetailsByID?customer_id=`+customer_id)
	.then(res => {
		console.log(res.data);
		this.setState({name : res.data[0]['first_name']});
		this.setState({surname : res.data[0]['last_name']});
		this.setState({email : res.data[0]['email']}); 
		this.setState({mobile : res.data[0]['mobile']}); 
		this.setState({dob : res.data[0]['dob']}); 
		this.setState({streetaddress : res.data[0]['street_address']}); 
		this.setState({zipcode : res.data[0]['zipcode']}); 
		this.setState({timezone : res.data[0]['timezone'] +' '+ res.data[0]['utc_offset_string']}); 
		if(res.data[0]['user_image']!=null)
		this.setState({user_image : process.env.REACT_APP_BASE_URL+'/public/uploads/profile/'+res.data[0]['user_image']});   
		this.setState({customer_country : res.data[0]['country_name']});  
		this.setState({city : res.data[0]['city_name']}); 
		this.setState({consultation_language : res.data[0]['consultation_language']});   
	});  

   }
   reportSaved =(e) => {
	e.preventDefault();   

	if(this.state.message==""){
		alert('Please enter message.');
		return false;
	}

	var specialistid = localStorage.getItem('specialist_id'); 
	var customer_id = this.props.match.params.id; 

	const clientData = { message : this.state.message ,  specialistid:specialistid , client:customer_id}
 
	 console.log(clientData);

	 axios.post(process.env.REACT_APP_BASE_URL+`/specilistAPI/reportTomedaloha`,clientData)
	 .then(res => {
		 
		console.log(res.data);
		
		if(res.data.Status) 
		{
			 this.setState({successMessage:'Thanks for your valuable comment'});
			 this.setState({message:''});
		}
		else 
		alert(res.data.Message);
		
	  }).catch(function (error) {
		console.log(error);
	  });  

   }


    render(){
        const { t } = this.props;
        return (
          
	<div class="main-wrapper">  
	<div id="modal1" className="modal">
												<div className="modal-content">
													<a href="#!" className=" text-right modal-action modal-close waves-effect waves-green btn-flat">Close</a>
													<h4 className="text-muted text-center">Forgot Password</h4>

													<p>Email*</p>
													<form>
														<div className="form-group form-focus focused">
															<input required type="email" className="form-control floating" />
															<label className="focus-label">Email</label>
														</div>
														<button className="btn btn-primary btn-block " type="submit">Submit</button>
													</form>

												</div>

											</div> 
           <CustomerHeader/>
	
		   <div class="breadcrumb-bar bg-cus">
				<div class="container-fluid">
					<div class="row align-items-center">
						<div class="col-md-12 col-12"> 
							<h2 class="breadcrumb-title">Profile View</h2>
						</div>
					</div>
				</div>
			</div>
	
			<div class="content bg-theme">
				<div class="container">
					<div class="row">
						<div class="col-md-12 col-lg-12 col-xl-12 dct-appoinment">
						<div class="card">
						<div class="card-body disp">
							
						 <div class="col-md-5 mt-3 text-center">
						 	<img src={this.state.user_image} class="img-fluid mh-280"  />
						 	
						 </div>
						 <div class="col-md-7 pad-0">
						 	<div class="offset-1">
						 	<h4 class="mb-3">Full Name: <span class="font-weight-100">{this.state.name + ' ' + this.state.surname}</span></h4>
						 	<h4 class="mb-3">Email: <span class="font-weight-100"> {this.state.email}</span></h4>
						 	<h4 class="mb-3">Country: <span class="font-weight-100">{this.state.customer_country}</span></h4>
						 	<h4 class="mb-3">City: <span class="font-weight-100">{this.state.city} </span></h4>
						 	<h4 class="mb-3">Time Zone:  <span class="font-weight-100">{this.state.timezone} </span></h4>
						 	<h4 class="mb-3">Date of birth: <span class="font-weight-100">{this.state.dob}</span></h4>
						 	<h4 class="mb-3">Mobile: <span class="font-weight-100">{this.state.mobile}</span></h4>
						 	<h4 class="mb-3">Languages for consultation: <span class="font-weight-100">{this.state.consultation_language}</span></h4>

					



						 </div>
						 	 	<div class="mb-5 mt-5 ta pad-0">
						 		<a href="/privatesetting?pat_message" class="btn  mt-1 rounded  text-white message-btn">
								    MESSAGES
							     </a> 
								 
 <a className="btn modal-trigger  btn-danger rounded  mt-1 ml-1 text-white report-meda-btn" data-target="modal2">
 REPORT TO MEDALOHA
 </a>
						 			

						 	</div>
						 </div>
 
  <div id="modal2" class="modal">
  <div class="modal-content">
    <a href="#!" class=" text-right modal-action modal-close waves-effect waves-green btn-flat">Close</a>
    <h4 class="text-muted text-center">Report To Medaloda</h4> 
    <p>Message</p>
    <form>
    <div class="form-group form-focus focused">
												<textarea class="form-control"   onChange={(e)=> this.messageValue(e)} ></textarea>

											 <span style={{color:'green'}}>{this.state.successMessage}</span>
											</div>
											<button class="btn btn-primary btn-block " type="submit" onClick={this.reportSaved}>Send</button>
										</form>
										
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

export default withTranslation()(ClientProfile);