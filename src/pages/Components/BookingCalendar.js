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
require('dotenv').config();

class BookingCalendar extends React.Component {
  
            constructor(props) {
                super(props);
                  this.handleInputChange = this.handleInputChange.bind(this);
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
                        slotMessage:false
                    } 
                    // Binding method in the constructor
    this.updateInputValue = this.updateInputValue.bind(this);
            }

           closeModal(){  
            //     this.setState({
            //        modal: false
            //   });
            //alert('asdfasdf');

              this.setState({
                modelIsOpen: false
              });
             
            }

updateInputValue(event)
{
  if(event.target.value!='' && this.state.time!=undefined){
   this.setState({
                time: event.target.value
              });
  }
}
            componentDidMount() {


axios.get(process.env.REACT_APP_BASE_URL+'/specilistAPI/EmailRegisterForNextSlotCheck?spec_id='+localStorage.getItem('specialist_id'))
                  .then(response => { 
                   
                   console.log(response.data);
                  })


                axios.get(process.env.REACT_APP_BASE_URL+'/specilistAPI/GetCalendarEvents?specialist_id='+localStorage.getItem('specialist_id'))
                  .then(response => { 
                    this.setState({event: response.data})
                   /* console.log({calendarEvents: response.data})*/
                  })
                  .catch(function (error) {
                    console.log(error);
                  })
              }

              toggle = () => {
                this.setState({ modal: !this.state.modal });
              };

             

    handleInputChange(event) {
        const target = event.target;
        var value = target.value;
        console.log(value);
        const checkedLegend = value.split('_');
        if(target.checked){ 
            this.state.checData[checkedLegend[0]] = value ; //checkedLegend[1]; 
        }  else{
            this.state.checData.splice(checkedLegend[0], 1);
        }   
    }
 
  counsultdropdown(){  
    var filtered = this.state.checData.filter(function (el) {
        return el != null;
      });
      let title = filtered.toString();      
      console.log(title);

      this.setState({eventBoxColor:"#eeeee"}); 

       if(title) {  
             let year = document.getElementById("cs2").value; 
             let time = document.getElementById("cs3").value;  
             var start=year+'T'+time;  
             const clientData = {start :start , title : this.state.checData , specialist_id:localStorage.getItem('specialist_id')} 
        axios.post(process.env.REACT_APP_BASE_URL+`/specilistAPI/UpdateCalendarEvents`,clientData)
        .then(res => {
            this.setState({checData : []});
            console.log('res.data---->');     console.log(res.data);

            if(res.data['Status']){
                this.setState({slotMessage:true});
                 setTimeout(() => this.setState({slotMessage:false}), 3000);
            }
            this.setState({ifCalendarBoxRender:true});
            console.log('eventBoxColor'); 
             console.log(this.state.eventBoxColor);
            console.log(this.state.ifCalendarBoxRender);
            // this.handleDateSelect()
            //var data2 = [{"id":14,"title":" depak goud60","start":"2021-08-22 02:00:00"},{"id":15,"title":",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,60","start":"2021-08-22 02:00:00"},{"id":13,"title":"Ram coming again","start":"2021-08-24 01:00:00"}];
            // INITIAL_EVENTS.push({"id":14,"title":" depak 0000000","start":"2021-08-22 02:00:00"}) ;
            //  this.handleEvents(data2);
            //  this.handleEvents([{"id":14,"title":" depak 0000000","start":"2021-08-22 02:00:00"}]);
            axios.get(process.env.REACT_APP_BASE_URL+'/specilistAPI/GetCalendarEvents?specialist_id='+localStorage.getItem('specialist_id'))
            .then(response => {  
              this.setState({event: response.data})
             /* console.log({calendarEvents: response.data})*/
            })
            .catch(function (error) {
              console.log(error);
            })

        
        }).catch(function (error) {
            console.log(error);
        });   
      }
  } 

   




//   eventRender(info) {
//     var tooltip = new Tooltip(info.el, {
//       title: info.event.extendedProps.title,
//       placement: "top",
//       trigger: "click",
//       container: "body"
//     });
//   }



  render() {

    function renderEventContent(eventInfo) {
        console.log(eventInfo);
        console.log(eventInfo.backgroundColor);
      
       var eventTitleData =  eventInfo.event.title.split("_");

       console.log(eventTitleData);

      // eventInfo.event.title = eventTitleData[1];

       if(eventTitleData[0]==4 || eventTitleData[0]==7)
          eventInfo.backgroundColor = '#ffffc6';
        else if(eventTitleData[0]==5 || eventTitleData[0]==8)
         eventInfo.backgroundColor = '#f4c15080';
       else if(eventTitleData[0]==6 || eventTitleData[0]==9)
         eventInfo.backgroundColor = 'orange';

       else if(eventTitleData[0]==10)
         eventInfo.backgroundColor = '#e6f1fb';
      else if(eventTitleData[0]==11)
         eventInfo.backgroundColor = '#abd0f5';
      else if(eventTitleData[0]==12)
         eventInfo.backgroundColor = '#a3a3f9';



        return (
          <>  
            <b>{eventInfo.timeText}</b>
            {/* <i>{eventTitleData[1]}</i> */}
          </>
        )
      }


 

    return (  
        <div className='demo-app'>
            <Modal isOpen={this.state.modelIsOpen}    
            style={{  
            content: {
                textAlign: 'center',
                backgroundColor: 'white',
                borderRadius: '0',
                width: '600px',
                margin:'0 auto',
                position: 'relative',
                zIndex:'1000'
               }
              }} 
            >

                {/* <Modal style={{
                content: {
                textAlign: 'center',
                backgroundColor: 'white',
                borderRadius: '0',
                width: '400px',
                margin:'0 auto',
                position: 'relative',
                zIndex:'1000'
                }
                }}
                isOpen={this.state.modal}
                toggle={this.toggle}
                > */}
           <button class="close" onClick={(e)=>this.closeModal()}><span>×</span></button>
           <h5 class="modalTitle" id="exampleModalLabel">Add Consultation</h5>
            <input type="time"   id="Time1"  class="form-control" value={this.state.time}  onChange={this.updateInputValue }/  >
            <input type="hidden" id="cs" value={this.state.startDate} />
            <input type="hidden" id="cs1" value={this.state.endDate} /> 
            <input type="hidden" id="cs2" value={this.state.year} /> 
            <input type="hidden" id="cs3" value={this.state.time} />
             {this.state.Consultation.map( (consult)=> (
                        <>
                        <div class="formGroup mt-3">
                        <div class="mt-3">
                        <input type="checkbox"  onChange={this.handleInputChange} value={consult.id+'_'+consult.legend_name} /><span>{consult.legend_name}</span><br/>
                        </div>
                        </div>
                        </>
              ))} 

            <div class="col-md-12">
             {this.state.slotMessage && <label style={{color:'green'}}>Slot updated</label>



              }
            <button type="button" class="btn btn-primary" style={{justifyContent:'center'}} onClick={(e)=> this.counsultdropdown() }>Add Slot</button>
            </div>

        </Modal>
      
        <div className='demo-app-main'>
        <input type="hidden" id="title" value="" />  
         
          {/* <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            initialView='timeGridWeek'
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            contentHeight={400}
            contentWidth={600}
            slotDuration={'00:30'}
            allDaySlot = {false} 
           
          
            
            // titleFormat= { 
            //     { year: 'numeric', month: 'short', day: 'numeric' }
            //   } 
            // dayHeaderFormat={  
            //     {weekday: 'short' , month: 'short' ,day: 'numeric', omitCommas: false }
            // } 
            slotLabelFormat =
            {
                {
                    hour: 'numeric',
                    minute: '2-digit',
                    omitZeroMinute: false,
                    hour12: false
                  }
            }
         
            // dayHeaderFormat={(param) => {
            //         console.log(param);
            //         return moment(param.date).format('ddd D/M');
            //   } }
           
            weekends={this.state.weekendsVisible}
            initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
           // events= {this.state.events}
           // eventRender={this.eventRender}
            select={this.handleDateSelect}
            eventContent={renderEventContent} // custom render function
            eventClick={this.handleEventClick}
            eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
            eventAdd={function(){}}
            eventChange={function(){}}
            eventRemove={function(){}}  
            dayCellDidMount={function(data) { 
                 console.log(data);
                //  console.log(moment(date.date).format('D'));
                //     // var today = new Date(); 
                //     if (moment(date.date).format('D') === moment().format('D')) {
                //      //  date.el.css("background-color", "red");
                //     }  

                
                }  
            } 
            
          /> */}
 

             <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
                }}
                timeZone='local'
                initialView='timeGridWeek'
                editable={true}
                selectable={true}
                selectMirror={true}
                dayMaxEvents={true}
                contentHeight={400}
                contentWidth={600}
                titleFormat= {false}
                allDaySlot = {false}
                slotDuration={'00:30'}
                weekends={this.state.weekendsVisible}
                eventContent={renderEventContent}
                events={this.state.event}
                eventClick={this.handleEventClick}
                select={this.handleDateSelect} 
                eventsSet={this.handleEvents} 
                slotLabelFormat =
                {
                    {
                        hour: 'numeric',
                        minute: '2-digit',
                        omitZeroMinute: false,
                        hour12: false
                      }
                }
              /> 
        </div>
      </div>
    ) 
  }
 
  handleWeekendsToggle = () => {
    this.setState({
      weekendsVisible: !this.state.weekendsVisible
    })
  }
 

  handleDateSelect = (selectInfo) => {

  



const targetDate = new Date(selectInfo.start);
const currentDate = new Date();

if(currentDate > targetDate) 
{
  alert("Can not select Older dates");
   this.setState({
      modelIsOpen: !this.state.modelIsOpen
    });
} 



   this.setState({
      modelIsOpen: !this.state.modelIsOpen
    });










    var year = moment(selectInfo.startStr).format('YYYY-MM-DD');
    console.log(year);
    var time = moment(selectInfo.startStr).format('HH:mm:ss');
 
  this.setState({
       year: year
     })
   this.setState({
       time: time
     }) 
 
    var formData1 = new FormData();
    
    axios.get(process.env.REACT_APP_BASE_URL+'/specilistAPI/GetSpecialistConsultation?specialist_id='+localStorage.getItem('specialist_id'))
    .then(res => {
      this.setState({Consultation : res.data});
      console.log('res.data');
      console.log(res.data);
    });   
 
 
 this.setState({
      startDate: selectInfo.startStr
    })
  this.setState({
      endDate: selectInfo.endStr
    }) 


 
     let calendarApi = selectInfo.view.calendar; 
    console.log('calendarApi');
     console.log(calendarApi); 

         calendarApi.unselect() ;

         calendarApi.addEvent({
         id: createEventId(),
         title:'',
         start: selectInfo.startStr,
         end: selectInfo.endStr, 
         backgroundColor : this.state.eventBoxColor
       });
       
 var elems = document.getElementsByClassName('fc-timegrid-event-short');
    for (var i=0;i<elems.length;i+=1){
      elems[i].style.display = 'none';
    }
 
 }
  
  handleEventClick = ({ event, el }) => {
     
      if (window.confirm("Are you sure for remove the slot?")) {
        console.log(event.id);
        axios.get(process.env.REACT_APP_BASE_URL+'/specilistAPI/removeEvent?eventId='+event.id)
        .then(res => {
        //  this.setState({Consultation : res.data});
          console.log('jayja');
          if(res.data[0].booking_status==2)
          {
         alert("can't remove this slot already booked");
       }
       else
       {
         event.remove();
       }
        });   
         
      }

    };

  handleEvents = (events) => {
    console.log('events'); 
    console.log(events);
    this.setState({
      currentEvents: events
    });
    console.log('events22'); 
    console.log(events);
  }

}
  






export default withTranslation()(BookingCalendar);