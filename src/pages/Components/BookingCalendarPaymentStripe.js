import React, { useState, useEffect } from "react";
import axios from 'axios';
import {
  CardElement,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,

  useStripe,
  useElements
} from "@stripe/react-stripe-js";
require('dotenv').config();

export default function BookingCalendarPaymentStripe() {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState('');
  const [clientSecretPaymentIndentId, setclientSecretPaymentIndentId] = useState('');
  const stripe = useStripe();
  const elements = useElements(); 
  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    // process.env.REACT_APP_BASE_URL+
    //.fetch("http://localhost:2200/specilistAPI/payment", {
    window
      .fetch(process.env.REACT_APP_BASE_URL+"/specilistAPI/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json" 
        },
        body: JSON.stringify({items: [{ amount: localStorage.getItem('value'),email:localStorage.getItem('LoginEmail'),username:localStorage.getItem('LoginName')}]})
      })
      .then(res => { 
        return res.json();
      })
      .then(data => {
        console.log('datacoming from server');
        console.log(data.paymentIntentId);
        setClientSecret(data.clientSecret);
        setclientSecretPaymentIndentId(data.paymentIntentId);
      });
  }, []);

  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d"
        }
      },
      invalid: {
        color: "white",
        iconColor: "#fa755a"
      }
    }
  };

  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  const handleSubmit = async ev => {
      ev.preventDefault();
      setProcessing(true);  
        const payload = await stripe.createPaymentMethod({
              type: 'card',
              card: elements.getElement(CardNumberElement),
              card: elements.getElement(CardExpiryElement),
              card: elements.getElement(CardCvcElement),
          });
             

  if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
        console.log('payload');
        console.log(payload);
      setError(null);
      setProcessing(false);
      setSucceeded(true); 
      const bookingData = { 
                            user_id : localStorage.getItem('customer_id') ,
                            specialist_id : localStorage.getItem('BookedSpecialist_id'), 
                            session_date : localStorage.getItem('selectedTime'),
                            price : localStorage.getItem('value') ,
                            event_id : localStorage.getItem('BookingEventId'),
                            payment_stripe_id : payload.paymentMethod.id , 
                            brand : payload.paymentMethod.card.brand , 
                            last4 : payload.paymentMethod.card.last4 , 
                            legend_id:localStorage.getItem('legend') ,
                            clientSecretPaymentIndentId:clientSecretPaymentIndentId,
                            message_description:localStorage.getItem('message_description')
                           }
      console.log(bookingData); 
      console.log('clientSecretPaymentIndentId');
      console.log(clientSecretPaymentIndentId);

      axios.post(process.env.REACT_APP_BASE_URL+`/specilistAPI/SpecialistBooking`,bookingData)
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
  };

 

  const inputStyle = { 
    'background-color': '#fff',
    'border': '1px solid #dbdbdb',
    'border-radius': '4px',
    'box-shadow': '0 1px 3px 0 rgb(0 0 0 / 5%)',
    'display': 'block',
    'height': '50px',
    'margin-top': '-13px',
    'padding': '5px 15px 5px!important',
    'transition': 'border-color .3s',
    'width': '100%'
}


const tempcss = {
    'background-color': '#fff',
    'border': '1px solid #dbdbdb',
    'border-radius': '4px',
    'box-shadow': '0 1px 3px 0 rgb(0 0 0 / 5%)',
    'display': 'block',
    'height': '50px',
    'margin-top': '-13px',
    'padding': '5px 15px 0',
    'transition': 'border-color .3s',
    'width': '100%'
}

const tempcss1 = {
    'background-color': '#fff',
    'border': '1px solid #dbdbdb',
    'border-radius': '4px',
    'box-shadow': '0 1px 3px 0 rgb(0 0 0 / 5%)',
    'display': 'block',
    'height': '50px',
    'margin-top': '-13px',
    'padding': '0px 0px 0px',
    'transition': 'border-color .3s',
    'width': '100%'
}

const CardInputWrapper = `<div>`;


  return (

    
 <form id="payment-form" onSubmit={handleSubmit}>
     <label class="payment-radio credit-card-option mt-3 mr-5">
       <input type="radio" name="radio" checked="checked" />
         <span class="checkmark"></span>
              Credit card
     </label>
        
        <div class="payment-list"> 
                        <div class="row mt-4">
                        <div class="col-md-6"> 
                          <div class="form-group card-label"  >
                           <input type="text" class="form-control" style={{"padding":"5px 15px 5px 15px"}} placeholder="Name on Card" />
                          </div>
                        </div>

                        <div class="col-md-6">
                          <div class="form-group card-label" style={tempcss}>
                          <CardNumberElement  onChange={handleChange} 
          options={{
            style: {
              base: inputStyle,
              padding:"5px 15px 15px 5px!important",
              color:"red!important"
            },
          }}
          /> 
                          </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group card-label" style={tempcss}> 
                              <CardExpiryElement  onChange={handleChange} 
                                    options={{
                                      style: {
                                        base: inputStyle,
                                      },
                                    }}
                                    /> 
                            </div>
                          </div>  
       
                          <div class="col-md-6">
  <div class="form-group card-label" style={tempcss}> 
    <CardCvcElement  onChange={handleChange} 
          options={{
            style: {
              base: inputStyle,
            },
          }}
          /> 
  </div>
</div>

                      
                      </div>
                       </div> 
                      <div class="submit-section mt-4">
          <button
         class="btn btn-primary submit-btn" 
         id="submit"
       >
          <span id="button-text">
          {processing ? (
            <div className="spinner" id="spinner"></div>
          ) : (
            "Pay now"
          )}
        </span>
      </button>
                      </div>  


 
      
    
      {error && (
        <div className="card-error" role="alert">
          {error}
        </div>
      )}
   
      <p className={succeeded ? "result-message" : "result-message hidden"}>
        Payment succeeded, see the result in your
        <a
          href={`https://dashboard.stripe.com/test/payments`}
        >
          {" "}
          Stripe dashboard.
        </a> Refresh the page to pay again.
      </p>
    </form>

    
  );
}

