

import React , {Component,useEffect} from 'react';
import { withRouter  } from 'react-router-dom';
//import { useTranslation } from 'react-i18next';
import { withTranslation } from 'react-i18next';
import i18n from "i18next";
// import settingLanguage from './helper';
import LoginHeader from './Components/LoginHeader';
import Footer from './Components/Footer';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
require('dotenv').config();

function settingLanguage(lang){ 
    i18n.changeLanguage(lang);  
  if(lang=='eng')
  {  var url = 'EN_last2.png'; 
  }  else  if(lang=='itanian'){
    var url = 'IT_last2.png';
  } else  if(lang=='spanis'){
    var url = 'ES_last2.png';
  } 
  settingLanguageOnchange(lang,url);
} 


function settingLanguageOnchange(lang,url){ 
  localStorage.setItem("onchangeLanguage",lang);
   // i18n.changeLanguage(lang);  
  localStorage.setItem("onchangeLanguageURL",url);
  //window.location.reload();
} 

 
class ResetPassword extends React.Component {  

  constructor(props) {
        super(props);
        this.state = {
           
           password : "",
          confirmpassword:"",
          gettoken:''

        }
    } 



 

 

  
  resetPassword =(e) => {
    e.preventDefault();    
     
//alert('hello');
          if(this.state.password==""){
            alert('Please enter password.');
            return false;
          }

        if(this.state.confirmpassword==""){
            alert('Please enter confirm password.');
            return false;
          }

       if(this.state.confirmpassword!=this.state.password){
            alert('Please enter confirm password same as Password');
            return false;
          }



 const clientData = {password:this.state.password,token:this.state.gettoken}




          axios.post(process.env.REACT_APP_BASE_URL+`/authenticationAPI/reset-password`,clientData)
     .then(res => {
       
      if(res.data.Status)
       {  
        alert(res.data.Message);
        


       }
      else 
      alert(res.data.Message);
      
      }).catch(function (error) {
      console.log(error);
      });  
  }


  componentDidMount(){
   
   
    // Access 'token' from the URL params using 'match.params.token'
    const { match } = this.props;
  
    const token = match.params.id;

    // Call the handleResetPassword method with the extracted token
  
    this.setState({gettoken:token}); 
  
  }

    render(){
        const { t } = this.props;
  



        return ( 
  <div class="main-wrapper">  
   <LoginHeader/>
     <div className="content pb-0">
    <div className="">
      <div className="card border-0 mb-0">
        <div className="row border-bottom">
          <div className="col-md-6 col-6 text-right text-danger mb-3 mr-0">
            <a href="/login"><span className="login-text font-weight-bold">Reset Password</span></a>
          </div>
        </div>
      </div>

    </div>


    <div className="container-fluid bg-theme">
      <div className="row">
        <div className="col-md-12">
         
          <div className="account-content">
            <div className="row align-items-center justify-content-center">
              <div className="login-right login-right bg-white mt-5 mb-5" style={{width:'52%'}}>
                <div className="login-header">
                  <h3 className="login-title color-cus1">Enter 
                    <span className="font-weight-bold"> MedAloha</span>
                  </h3>
                </div>
                <form >
                  <div className="form-group form-focus focused">
                    <input type="password" className="form-control"     onChange={(e) => this.setState({ password: e.target.value })}  placeholder="Password" value={this.state.password}    />
                    {/*<label className="focus-label">Email</label>*/}
                  </div>
                  <div className="form-group form-focus focused">
                    <input type="password" className="form-control" onChange={(e) => this.setState({ confirmpassword: e.target.value })}  placeholder="Confirm Password" value={this.state.confirmpassword}     />
                    {/*<label className="focus-label">Password</label>*/}
                  </div>


                  

                 
                  <button className="btn btn-primary btn-block btn-lg login-btn" type="button" onClick={this.resetPassword}>Reset Passowrd</button> 

                  <div className="login-or">
                    <span className="or-line"></span>
                    <span className="span-or">or</span>
                  </div>
                    
                      <div className="text-center dont-have">
                        <h6>Login Here? <a href="/login" className="text-danger">Login</a>
                        </h6></div>
                 </form>
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
                    </div>



                    <div className="col-md-6 col-lg-6 mb-5 hidden-sm hidden-xs">
                      <center>
                                                <img src="assets\icon\olistica.png" className="img-fluid ml-5 w-25 mt-4" alt="" />  
                      </center>
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

export default withTranslation()(ResetPassword);
