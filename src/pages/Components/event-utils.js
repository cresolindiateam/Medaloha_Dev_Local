import React , {Component} from 'react';
import axios from 'axios'; 
 

 let eventGuid = 0 
 let Data =[];

  let url='http://medaloha.vipscollege.com/event/fetch.php'; 

    // axios.get(`specilistAPI/GetCalendarEvents`)
		// .then(response => {
		//   Data  = response.data;
    //   console.log('Data'); console.log(response.data);
		// });   
 
   
export const INITIAL_EVENTS  = process.env.REACT_APP_BASE_URL+'/specilistAPI/GetCalendarEvents';

export function createEventId() {
  return String(eventGuid++)
}
