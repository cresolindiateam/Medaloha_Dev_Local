import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import Howitworks from './pages/Howitworks';
import Login from './pages/Login';
import Register from './pages/Register';
import Thanks from './pages/Thanks';
import {Route , Link, Switch } from 'react-router-dom';
import Applyspecialist from './pages/Applyspecialist';
import CustomerDashboard from './pages/Customer/Dashboard';
import Specilistconfirmation from './pages/Specilistconfirmation';
import Customerconfirmation from './pages/Customerconfirmation';
import React, {Component} from 'react';
import PrivateSetting from './pages/Specialist/Privatesetting';
import PublicIntro from './pages/Specialist/Publicintro';
import PublicOverview from './pages/Specialist/Publicoverview';
import PublicDegree from './pages/Specialist/Publicdegree';
import PublicExtra from './pages/Specialist/Publicextra';
import PublicConsultation  from './pages/Specialist/Publicconsultation';
import SpecialistDetails  from './pages/SpecialistDetails';
import Bookingmessageconsultation  from './pages/Bookingmessageconsultation';
import Bookingvideoconsultation  from './pages/Bookingvideoconsultation';
import Checkout from './pages/Specialist/Checkout';
import Bookingsuccess from './pages/Specialist/Bookingsuccess';
import Invoice from './pages/Invoice';
import Search from './pages/Search';
import Profileaction from './pages/Specialist/Profileaction';
import About from './pages/About';
import Privacypolicy from './pages/Privacypolicy';
import Cookiepolicy from './pages/Cookiepolicy';
import Terms from './pages/Terms';
import ClientProfile from './pages/ClientProfile';
 
function App() { 
  return (
    <React.Fragment>
      <Switch>
       <Route exact path="/"  component={Home}/> 
       <Route exact path="/howitworks"  component={Howitworks}/>  
       <Route exact path="/login"  component={Login}/>  
       <Route exact path="/register"  component={Register}/> 
       <Route exact path="/thanks"  component={Thanks}/>
       <Route exact path="/applyspecialist"  component={Applyspecialist}/>
       <Route exact path="/customerdashboard"  component={CustomerDashboard}/>
       <Route exact path="/specilistconfirmation"  component={Specilistconfirmation}/>
       <Route exact path="/customerconfirmation"  component={Customerconfirmation}/>
       <Route exact path="/privatesetting"  component={PrivateSetting}/>
       <Route exact path="/publicintro"  component={PublicIntro}/>
       <Route exact path="/publicoverview"  component={PublicOverview}/>
       <Route exact path="/publicdegree"  component={PublicDegree}/>
       <Route exact path="/publicextra"  component={PublicExtra}/>
       <Route exact path="/publicconsultation" component={PublicConsultation} />
       <Route exact path="/specialistDetails/:id" component={SpecialistDetails} />
       <Route exact path="/bookingmessageconsultation/:id" component={Bookingmessageconsultation} />
       <Route exact path="/bookingvideoconsultation/:id" component={Bookingvideoconsultation} />
       <Route exact path="/checkout" component={Checkout} />
       <Route exact path="/booking-success" component={Bookingsuccess} />
       <Route exact path="/invoice/:id" component={Invoice} />
       <Route exact path="/search" component={Search} />
       <Route exact path="/profileaction" component={Profileaction} />
       <Route exact path="/about" component={About} />
       <Route exact path="/privacy-policy" component={Privacypolicy} />
       <Route exact path="/cookie-policy" component={Cookiepolicy} />
       <Route exact path="/term-condition" component={Terms} />
       <Route exact path="/clientProfile/:id" component={ClientProfile} />
       </Switch>
  </React.Fragment> 
  );
}

export default App;
