import React from 'react';
import { withTranslation } from 'react-i18next';
import i18n from "i18next";
import FullCalendar, { formatDate } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { INITIAL_EVENTS, createEventId } from './event-utils';
import Modal from 'react-modal';
import ReactDOM from 'react-dom';
import axios from 'axios';
import moment from 'moment';
import Tooltip from 'react-tooltip';
import DatePicker from 'react-datepicker'; 
// import "react-datepicker/dist/react-datepicker.css";
// import 'bootstrap/dist/css/bootstrap.min.css';
require('dotenv').config();


class SpecialistBookingHistory extends React.Component {
  
   
            constructor(props) {
                super(props);
                 

 

                    this.state = {
                        weekendsVisible: true,
                        currentEvents: [],
                        modelIsOpen:false,
                        Consultation:[],
                        startDate:"",
                        endDate:"" ,
                        checData:[],
                        year:"",
                        time:"",
                        chores: [],
                        events: [],
                        eventBoxColor:'',
                        ifCalendarBoxRender : false,
                        modal: false,
                        calendarWeekends: true,
                        event: [],
                        booking_history:[],
						disabledOnlineClass:'btn btn-secondary text-dark btn-sm',
						enabledOnlineClass:'btn btn-info btn-sm bg-cus3',
						disabledLink:'javascript:void(0);',
						sessionDate:false,
						searchvalue:"",
						startDate: new Date()
                    }
					this.handleChangeTime = this.handleChangeTime.bind(this);
				 
            }

			handleChangeTime(date) {
				this.setState({
				  startDate: date
				})
			  }

			handleChange(event) {
				this.setState({searchvalue: event.target.value});
			  }

    componentDidMount() {

        axios.get(process.env.REACT_APP_BASE_URL+`/specilistAPI/GetSpecialistBooking?specialist_id=`+localStorage.getItem('specialist_id'))
		.then(res => {
			   console.log('booking start'); 
			   console.log(res.data); 
			   res.data.forEach(element => {
				console.log('booking evele'); 
					console.log(element);  
				   if(element.booking_status==4){
					   this.updateBooking(4,element.bookingID);
				   }
				   window.localStorage.removeItem("session_date"+element.bookingID); //remove one item
				   
				 
			   });
			  
			   this.setState({booking_history : res.data}); 
         });   
            
      } 

  // after 3 hours of session date time 
 IsExpireSession=(booking_id)=>{
	// return true; 
	console.log('starting '+booking_id); 
var validation = axios.get(process.env.REACT_APP_BASE_URL+`/specilistAPI/IsSpecialistExpireSession?booking_id=`+booking_id)
	.then(res => {
		   console.log('booking start2222'); 
		   console.log(res.data);  
		   if(res.data==1){
			   return true;
		   } else {
			   return false ;
		   }
	 });


	 if(validation)
	 {
		 return true;
	 } else {
		 return false;
	 }


  }


  updateNoteForClient=(TextClient,bookingID)=>{
          console.log(TextClient); console.log(bookingID);
		  if(TextClient!=''){
			var NoteForPrivateData = {bookingId:bookingID,text:TextClient,specialist_id:localStorage.getItem('specialist_id')}
			axios.post(process.env.REACT_APP_BASE_URL+`/specilistAPI/NoteForClients`,NoteForPrivateData)
		//	axios.post('/specilistAPI/NoteForClients?bookingId='+bookingID+'&text='+TextClient+'&specialist_id='+localStorage.getItem('specialist_id'))
			.then(res => {
				 console.log(res.data.Validation); 
	      	 }); 
		  }
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

	  updateBooking=(bookingType,bookingID)=>{
		 //alert(bookingType);
	   window.localStorage.removeItem("session_date"+bookingID ,0);
		this.setState({sessionDate:false});
		if(bookingType==4){ 
			//'bookingSessionDate'+bookingID;
			localStorage.setItem("session_date"+bookingID ,bookingID);
			this.setState({sessionDate:bookingID});
		//	window.location.reload();
			return false;
		}

		 if(bookingType!=1){  
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
			  window.location.reload();
		    }  
	  }






  bookingSessionDateChnage(date,legend_id,legend_name,pre_user_id,bookingID,userEmail){
		 console.log(legend_id);
		 console.log(legend_name);
		 console.log(pre_user_id);
		 console.log('coming soon :----');
        // console.log(e.target.value); 
		  this.setState({
			startDate: date
		  }); 
		  if (window.confirm("Confirm for Rebooking  selected date "+this.state.startDate)) {
			var NoteForPrivateData = {legend_id:legend_id,legend_name:legend_name,pre_user_id:pre_user_id,specialist_id:localStorage.getItem('specialist_id'),chooseTime:date,booking_id:bookingID ,event_id : localStorage.getItem('BookingEventId') ,user_email :userEmail}
			axios.post(process.env.REACT_APP_BASE_URL+`/specilistAPI/Rebooking4UserBySpecialist`,NoteForPrivateData)
            // axios.post('/specilistAPI/NoteForPrivate?bookingId='+bookingID+'&text='+TextPrivate+'&specialist_id='+localStorage.getItem('specialist_id'))
		    .then(res => {
			   console.log(res.data.Validation); 
			   alert('Rebooking have done'); 
			   window.location.reload(false); 
			 }); 
		}

		
	  }









	  isvalideSessionDate(date, rebookdate){
		console.log(date + rebookdate)
  var startDate = '';
		if(rebookdate==null)
		{
		  startDate= moment(date).format('YYYY-MM-D') ;
		} else {
		  startDate= moment(rebookdate).format('YYYY-MM-D');
		} 

		var now = new Date();
		var nowDate= moment(now).format('YYYY-MM-D') ;
		if(moment(startDate).isSameOrAfter(nowDate)){
			return true
		} else {
			return false;
		} 
		
	}
	
	

  render() {
  
    return (  
		<div>
		<div class="row displ">
		<div class="col-md-9 mt-3 ">
			<h3 class="text-center text-dark mb-4">BOOKING MANAGEMENT</h3>
		</div>  
		<div class="col-md-3 mt-2 float-right">
			<div class="form-group search-info w-100 mb-2">
			<input type="text" class="form-control" placeholder="Search"  onChange={this.handleChange.bind(this)} />
			</div>
		</div>
	</div> 
        <div class="table-responsive" > 
		 <table class="table table-hover table-striped table-center mb-0">
												<thead>
													<tr class="text-center">
														<th>Status
															<div class="bookingstatustooltip ml-1"><i class="fas fa-info-circle"  title=""></i>
																<span class="bookingstatustooltiptext text-left" ><ul class="margin-top-5 margin-bottom-0 cus-fs" ><li>BOOKED: reservation confirmed.</li><li>DONE: remember to update your status to DONE when the session has been completed; from this moment, you cannot REBOOK/CANCEL the session anymore, user can leave a review and client payment will be set to delivery after 21 days -in case of no complains. Transfers to your bank account are done every beginning of the month.</li><li>REBOOK: a new session date can be booked by the user up to 24 h before the previously booked consultation. You can also select a rebooking, up to when you set the session on DONE status (we suggest to message the user first to proceed in a coordinated way).</li><li>CANCEL:  full money restitution available for the user up to 24 h before the consultation. You can also select a cancellation with full money restitution, up to when you set the session on DONE status.</li><li>PAST: Record of a past consultation.</li></ul>

															</span>
														</div>
													</th>

													<th>Type</th>
													<th>Client </th>
													<th>Booking</th>
													<th>Session Date</th>
													<th>Link</th>
													<th>Notes for client
														<div class="bookingstatustooltip ml-1" style={{ zIndex: 1000 }}><i class="fas fa-info-circle"  title=""></i>
															<span class="bookingstatustooltiptext toolnotes text-left width-275">Add here short communications, bonuses, etc. that your client should know about the consultation
															</span>
														</div>
													</th>
													<th>Private Records
														<div class="bookingstatustooltip ml-1" style={{ zIndex: 1000 }}><i class="fas fa-info-circle"  title=""></i>
															<span class="bookingstatustooltiptext toolnotes text-left width-275" >Keep here your records about the consultation. This file is only visible to you

															</span>
														</div></th>
														<th>Price/Invoice</th>
														<th>Payment Status</th>
													</tr>
												</thead>
												<tbody> 						 
													{this.state.booking_history.filter( (booking)=> {   
														// return booking.first_name.toLowerCase(); 
														return (this.state.searchvalue===null || this.state.searchvalue===undefined  ||this.state.searchvalue==='')?booking: (booking.first_name.toLowerCase().includes(this.state.searchvalue.toLowerCase()) || booking.last_name.toLowerCase().includes(this.state.searchvalue.toLowerCase()) ||  (booking.first_name+' '+booking.last_name).toLowerCase().includes(this.state.searchvalue.toLowerCase()));
 														}).map( (booking)=> (  
													<tr> 
														<td class="pr-0 pl-1">  
															<select class="w-100" onChange={(e)=> this.updateBooking(e.target.value,booking.bookingID) }> 
																<option class="text-success" selected={booking.booking_status == 1} value='1'>Booked</option>
																<option class="text-success" selected={booking.booking_status == 2} value='2'>Done</option>
																<option class="text-danger"  selected={booking.booking_status == 3}  value='3'>Cancel</option>
																{booking.legendId == 1 || booking.legendId == 2|| booking.legendId == 3 ?null:<option class="text-info" selected={booking.booking_status == 4 || booking.booking_status == 7}  value='4'>Rebook</option>}
																<option class="text-dark"    selected={booking.booking_status == 5}  value='5'>Past</option>
															</select> 
														</td>

													   <td class="text-center">
															{booking.legend_name}
						  							   </td>

														<td><a href={"clientProfile/"+booking.Uid} target="_blank">{booking.first_name} {booking.last_name}</a></td>
														 <td>
															{moment(booking.booking_date).format('D MMM YYYY')}
														 </td>
														<td class="text-center "> 
														  {/*  <input type="datetime-local" class={"form-control bookingSessionDate"+booking.bookingID} onBlur={(e)=>this.bookingSessionDateChnage(e,booking.legendId,booking.legend_name,booking.Uid,booking.bookingID)} /> */}
   {localStorage.getItem("session_date"+booking.bookingID)==booking.bookingID ?  
   <DatePicker
              selected={ this.state.startDate }
              onChange={  (e)=>this.bookingSessionDateChnage(e,booking.legendId,booking.legend_name,booking.Uid,booking.bookingID,booking.email)}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={10}
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
			   
          />  :
														 (booking.legendId==1 || booking.legendId==2|| booking.legendId==3) ? 
														     // moment(booking.session_date).format('D MMM YYYY : HH:MM') 
															  localStorage.getItem('SpecialistTimezone')!=null ? moment.utc(booking.session_date).tz(localStorage.getItem('SpecialistTimezone')).format('D MMM YYYY h:mm A') : moment(booking.session_date).format('D MMM YYYY h:mm A')
															:
															booking.rebook_session_date1==null?
															//moment(booking.session_date).format('D MMM YYYY : HH:MM') 
															localStorage.getItem('SpecialistTimezone')!=null ? moment.utc(booking.session_date).tz(localStorage.getItem('SpecialistTimezone')).format('D MMM YYYY h:mm A') : moment(booking.session_date).format('D MMM YYYY h:mm A')
															:
															<div> <span style={{color:"#ccc"}}>
															{// moment(booking.session_date).format('D MMM YYYY : HH:MM') 
															localStorage.getItem('SpecialistTimezone')!=null ? moment.utc(booking.session_date).tz(localStorage.getItem('SpecialistTimezone')).format('D MMM YYYY h:mm A') : moment(booking.session_date).format('D MMM YYYY h:mm A')}
															</span> 
														  <br/> { //moment(booking.rebook_session_date1).format('D MMM YYYY : HH:MM') 
														  localStorage.getItem('SpecialistTimezone')!=null ? moment.utc(booking.rebook_session_date1).tz(localStorage.getItem('SpecialistTimezone')).format('D MMM YYYY h:mm A') : moment(booking.rebook_session_date1).format('D MMM YYYY h:mm A')} 
														  </div>
															 }	
													 
															</td>
														<td> 
															<center>

															{ (booking.legendId==1 || booking.legendId==2|| booking.legendId==3) ? 
															   <a href="privatesetting?pat_message"  onClick={this.showmessage} class="btn btn-info btn-sm bg-cus1 border-cus2" >GO TO QUERY</a>
															:  // booking_status = 4 , 7 just for request 
															  ( booking.booking_status==3 || booking.booking_status==5  || booking.booking_status==4  || booking.booking_status==7) ?
															      <a href={this.state.disabledLink}   class={this.state.disabledOnlineClass}  >JOIN ONLINE SESSION </a>
																 

                                                                       : //Video 
																  ((booking.legendId==4 || booking.legendId==5 || booking.legendId==6) && this.IsExpireSession(booking.bookingID)) ?
																		  this.isvalideSessionDate(booking.session_date,booking.rebook_session_date1)==true? 
																			      <a href={"https://medalohacall.cresol.in/?payment="+btoa(booking.first_name +'_'+ booking.last_name+'||'+booking.Room+'||Video')  }
																			      target="_blank" class={this.state.enabledOnlineClass}  >JOIN ONLINE SESSION </a> 
																			  :'-' 
																	 :  // audio 
																  ((booking.legendId==7 || booking.legendId==8 || booking.legendId==9) && this.IsExpireSession(booking.bookingID)) ?
																  this.isvalideSessionDate(booking.session_date,booking.rebook_session_date1)==true? <a href={"https://medalohacall.cresol.in/?payment="+btoa(booking.first_name +'_'+ booking.last_name+'||'+booking.Room+'||Audio')  }
																  target="_blank" class={this.state.enabledOnlineClass}  >JOIN ONLINE SESSION </a> :'-' : '-'
															 
														     }	
 
															</center>
														</td>
														<td class="text-center">
															<textarea class="form-control notes-client" placeholder="Notes"  onBlur={(e)=> this.updateNoteForClient(e.target.value,booking.bookingID) } >{booking.client_note}</textarea>
														</td> 
														<td>
													      <textarea class="form-control notes-private" placeholder="Notes" onBlur={(e)=> this.updateNoteForPrivate(e.target.value,booking.bookingID) } >{booking.private_note}</textarea>
							                           </td>
								<td>
									<p class="text-center pb-0">{booking.booking_price}/ 
 										<a href={"invoice/"+booking.bookingID} class="text-primary" target="_blank">Invoice.pdf </a>
									</p>

								</td>

								<td class="text-center">
									Paid
								</td>
							</tr>
 							))}

						</tbody>
						</table>
						</div></div>
    ) 
  } 

}
   

export default withTranslation()(SpecialistBookingHistory);