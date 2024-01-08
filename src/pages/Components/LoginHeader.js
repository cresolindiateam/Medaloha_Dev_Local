import React, {Component} from 'react';
import { withTranslation } from 'react-i18next';
import i18n from "i18next";


function settingLanguage(lang){ 
    i18n.changeLanguage(lang);
} 
class LoginHeader extends React.Component{
    render(){
        const { t } = this.props;
        return (
<header className="header"> 
<nav className="navbar navbar-expand-lg header-nav bg-white">
    <div className="row w-100" style={{'marginLeft':'0px','marginRight':'0px'}}>
        <div className="col-md-3 col-3">
            <div className="navbar-header mt-4">
                <a className="mt-5" id="mobile_btn" href="javascript:void(0);">
                    <span className="bar-icon">
                        <span></span>
                        <span></span>
                        <span></span>
                    </span>
                </a>
                <a href="/" className="hidden-xs hidden-sm navbar-brand logo">
                    <img src="\assets\img\logo.png" className="img-fluid" alt="Logo"   />
                </a>
            </div>
        </div>

        <div className="col-md-5 col-6">
            <center>
                <a href="/" className=" hidden-lg hidden-md">
                    <img src="assets\img\logo.png" className="  mt-3  img-fluid" alt="Logo" />
                </a>
            </center>
        </div>

        <div className="col-md-4 col-3 pt-2 mt-4">
            <ul className="nav d-flex header-navbar-rht float-right">

                <li className="nav-item hidden-xs hidden-sm">
                    <button className="nav-link header-login btn btn-success bg-transparent text-dark">
                        <a href={process.env.REACT_APP_URL+"/login"} className="">LOGIN</a> /
                        <a href={process.env.REACT_APP_URL+"/register"} className="">REGISTER </a>
                    </button>
                </li> 
        </ul>
    </div>
</div>


<div className="main-menu-wrapper">
    <div className="menu-header">
        <a href="index.html" className="menu-logo">
            <img src="assets\img\logo.png" className="img-fluid" alt="Logo" />
        </a>
        <a id="menu_close" className="menu-close" href="javascript:void(0);">
            <i className="fas fa-times"></i>
        </a>

    </div>

 
    <ul className="main-nav">
        <li className="login-link">


<div class="d-flex p-2"><a class="nav-link header-login bg-success text-white " href="/login">EN </a><a class="nav-link header-login  text-white" href="/login">IT </a><a class="nav-link header-login ml-1 text-white" href="/login">SP </a></div>

     
        </li>
        <li className="login-link">
            <a href="/login">Login / Signup</a>
        </li>

            <li class="login-link">
                                    <a href="/"><img class="width-26 padding-left-2 margin-top-4" src="/assets/images/choose-white.png" /><span class="margin-left-12">Choose</span></a>
                                </li>
                                <li class="login-link">
                                    <a href="/howitworks"><img class="width-27" src="/assets/images/how-white.png" /><span class="margin-left-10">How</span></a>
                                </li>
                        
                            <li class="login-link"> 
                                <a href="/about"><img class="width-26 padding-left-2" src="/assets/images/about-white.png" /><span class="margin-left-16">Extra</span></a>
                            </li>

       {/* <li className="login-link">
            <a href="login.html">Profile Settings</a>
        </li>
        <li className="login-link">
            <a href="login.html">Appointment</a>
        </li>
        <li className="login-link">
            <a href="login.html">Message</a>
        </li>
        <li className="login-link">
            <a href="login.html">Favorits</a>
        </li>
        <li className="login-link">
            <a href="login.html">Review</a>
        </li>

        <li className="login-link">
            <a href="login.html">Logout</a>
        </li>*/}

    </ul>		 
 
</div>		 


</nav>
</header>
        )
    }

}

export default withTranslation()(LoginHeader);