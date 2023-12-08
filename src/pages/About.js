import React , {Component} from 'react';
//import { useTranslation } from 'react-i18next';
import { withTranslation } from 'react-i18next';
import i18n from "i18next";
// import settingLanguage from './helper';
import axios from 'axios';
import Header from './Components/Header';
import Footer from './Components/Footer';
require('dotenv').config();
// const { t, i18n } = useTranslation(); 

function settingLanguage(lang){ 
	i18n.changeLanguage(lang);
}

class About extends React.Component {   

//    settingLanguage(lang){ 
//         i18n.changeLanguage(lang);
//     } 
constructor(props){
	super(props);
	this.state={

        newslettername: '',
		newsletteremail:'',
		newsletteragree:false,
		newsletteragree_error_mess:'',
		newsletteremail_required_mess:'',
		newslettersuccess_mess:'',
		name: '',
		email:'',
		message:'',
		agree:false,
		agree_error_mess:'',
		email_required_mess:'',
		message_required_mess:"",
		success_mess:''


	}
}

handleChange(e)
{
	this.setState({name: e.target.value});
}
handleChange1(e)
{ 
	this.setState({email: e.target.value});
}
handleChange2(e){ 
	this.setState({message: e.target.value});
}
handleChange3(e){ 
	this.setState({agree: true});
}
handleChange5(e){ 
	this.setState({newslettername: e.target.value});
}
handleChange6(e){ 
	this.setState({newsletteremail: e.target.value});
}

handleChange7(e){ 
	console.log('true selcted');
	this.setState({newsletteragree: true});
	console.log(this.state.newsletteragree);
}

handleButtonClicked() {

	var name = this.state.name;
	var agree = this.state.agree;
	var email = this.state.email;
	var message = this.state.message;


	if(email=='')
	{
		this.setState({email_required_mess: 'Please fill the email field'});
		this.setState({message_required_mess: ''});
	}
	else if(message==""){
		this.setState({email_required_mess: ''});
		this.setState({message_required_mess: 'Please fill the email field'});
	}


	else 
	{
		this.setState({email_required_mess: ''});
		this.setState({message_required_mess: ''});

		if(!agree){ 
			this.setState({agree_error_mess: 'Please check the checkbox'});
		}
		else
		{
			this.setState({agree_error_mess: ''});


			const userContactData = {name:name,email:email,message:message}

			axios.post(process.env.REACT_APP_BASE_URL+`/medalohaAPI/addAboutContact`,userContactData)
			.then(res => {


				if(res.data.Status)
				{
					this.setState({success_mess: 'Data has been inserted'});
					document.getElementById("name").value='';
					document.getElementById("email").value='';
					document.getElementById("message").value='';
					document.getElementById("agree").checked=false;

					setTimeout(function () { 
						document.getElementById("success_message").innerHTML='';
						window.location.reload();
					}, 5000);

				}


			}); 
		}
	}
}


handleButtonClicked1() {

	var name = this.state.newslettername;
	var agree2 = this.state.newsletteragree;
	var email = this.state.newsletteremail; 

	if(email=='')
	{
		this.setState({newsletteremail_required_mess: 'Please fill the email field'});
	}


	else 
	{
		this.setState({newsletteremail_required_mess: ''});

console.log(agree2);

		if(!agree2){ 
			console.log('agree---if ');
			this.setState({newsletteragree_error_mess: 'Please check the checkbox'});
		}
		else
		{
			console.log('agree---else ');
			this.setState({newsletteragree_error_mess: ''});


			const userNewsletterData = {name:name,email:email}

			axios.post(process.env.REACT_APP_BASE_URL+`/medalohaAPI/addSignupNewsletter`,userNewsletterData)
			.then(res => {


				if(res.data.Status)
				{
					this.setState({newslettersuccess_mess: 'Data has been inserted'});
					document.getElementById("newslettername").value='';
					document.getElementById("newsletteremail").value='';
				
					document.getElementById("newsletteragree").checked=false;

					setTimeout(function () { 
						document.getElementById("newslettersuccess_message").innerHTML='';
						window.location.reload();
					}, 5000);

				} else {
					this.setState({newslettersuccess_mess: res.data.Message});
				} 
			}); 
		}
	}
}


render(){
	const { t } = this.props;
	return (

		<div class="main-wrapper">  
		<Header/> 
		<section class="bg-theme">
		<div class="row">
		<div class="container margintop-8">
		<div class="card border-0">
		<div class="card-body">
		<div class="row">
		<div class="col-md-7">
		<h4  class="color6 mb-4">{t('Anysuggestion')} 
		<span class="font-size-15 color7 text-muted">
		{t('AnysuggestionContent')} 
		</span>
		</h4>


		<div class="info-widget mb-0 pb-0 border-bottom-0">
		<div class="row">
		<div class="col-md-6 col-sm-12">
		<div class="form-group ">

		<input class="form-control" id="name" onChange={this.handleChange.bind(this)}  type="text" placeholder="Name" />
		</div>
		</div>
		<div class="col-md-6 col-sm-12">
		<div class="form-group">
		<input class="form-control" id="email" type="text" onChange={this.handleChange1.bind(this)}  placeholder="Email" />
		<span style={{color:"red"}}>{(this.state.email_required_mess==='')?'':this.state.email_required_mess}</span>
		</div>

		</div>
		<div class="col-md-12 col-sm-12">
		<div class="form-group card-label card-label1" >

		<textarea id="message" style={{minHeight:'120px'}} class="mt-0 mb-0 custom-height8 form-control"  placeholder="Message" onChange={this.handleChange2.bind(this)}></textarea>
		<span style={{color:"red"}}>{(this.state.message_required_mess==='')?'':this.state.message_required_mess}</span>
		</div>
		</div>

		</div>

		</div>
		<input type="checkbox" id="agree" onChange={this.handleChange3.bind(this)}/>
		<span class="text-muted"> I agree to </span> <a href="/privacy-policy" class="color6">Privacy Policy</a>

		<br/><span style={{color:"red"}}>{ (this.state.agree_error_mess==='')?'':this.state.agree_error_mess}</span>


		<div class="submit-section mt-0">

		<button type="button" class="btn btn-primary submit-btn mt-4 mb-3"  onClick={this.handleButtonClicked.bind(this)}>SEND</button> <br/>

		<span id="success_message" style={{color:"green"}} >{this.state.success_mess}</span>
		</div>




		</div>	


		<div class="col-md-5">
		<div class="p-3 border rounded bag-custom7">
		<div class="row">
		<div class="col-md-1">&nbsp;</div>
		<div class="col-md-10">
		<center>
		<img src="assets/icon/letter.png" class="width-80" />
		</center>
		<h3 class="text-center" >{t('Newsletter')}</h3>
		<p  class="text-center font-weight-bold">{t('NewsletterContent')}</p>
		</div>
		</div>

		<div class="row">
		<div class="col-md-1">

		</div>
		<div class="col-md-10">
		<input class="form-control"  id="newslettername" onChange={this.handleChange5.bind(this)} type="text" placeholder="Name"/>
		<br/>
		<input class="form-control" id="newsletteremail" onChange={this.handleChange6.bind(this)} type="text" placeholder="Email"/>
		<span  style={{color:"red"}}> {(this.state.newsletteremail_required_mess==='')?'':this.state.newsletteremail_required_mess}</span>
		<br/> 
		<input type="checkbox" id="newsletteragree" onChange={this.handleChange7.bind(this)} />
		 <span class="ml-1">I agree to</span> <a href="/privacy-policy" class="color6">Privacy Policy</a>
		<br/><span style={{color:"red"}}>{(this.state.newsletteragree_error_mess==='')?'':this.state.newsletteragree_error_mess}</span><br/>
		<button class="btn  w-100 btn btn-primary submit-btn" onClick={this.handleButtonClicked1.bind(this)}>SEND</button>
           <span style={{color:"green"}} id="newslettersuccess_message">{this.state.newslettersuccess_mess}</span>
		</div>

		</div>
		</div>
		</div>

		</div>



		</div>
		</div>
		</div>
		</div>
		<div class="container">
		<div class="mb-5 mb-0">
		<div class="card border-0 clearfix">
		<div class="card-header">
		<h3 id="faq" class="card-title text-center color6" ><strong>{t('FAQTitle')}</strong></h3>
		</div>
		<div class="card-body">
		<div class="about-author">
		<div class="author-details ml-0 mt-5">
		<a href="#" class="blog-author-name color6">
		 {t('FaqQuestion1')}
		</a>
		<p class="mb-0 text-muted">
		{t('FaqResponse1')}
		</p>
		</div>
		<div class="author-details ml-0 mt-5">
		<a href="#" class="blog-author-name color6">
		{t('FaqQuestion2')}  
		</a>
		<p class="mb-0 text-muted">
		{t('FaqResponse2')}</p>
		</div>
		<div class="author-details ml-0 mt-5">
		<a href="#" class="blog-author-name color6" >
		{t('FaqQuestion3')} 
		</a>
		<p class="mb-0 text-muted">
	{t('FaqResponse3')}
		</p>
		</div>
		<div class="author-details ml-0 mt-5">
		<a href="#" class="blog-author-name color6" >
		{t('FaqQuestion4')}
		</a>
		<p class="mb-0 text-muted">{t('FaqResponse4')}</p>
		<ul class="text-muted">
		<li>
		{t('FaqResponse41')}</li>
		<li>
		{t('FaqResponse42')}
		</li>
		<li>
		{t('FaqResponse43')}
		</li>
		</ul>
		</div>
		<div class="author-details ml-0 mt-5">
		<a href="#" class="blog-author-name color6">
		{t('FaqQuestion5')}
		</a>
		<p class="mb-0 text-muted">
		{t('FaqResponse5')}</p>
		</div>
		<div class="author-details ml-0 mt-5">
		<a href="#" class="blog-author-name color6">
		{t('FaqQuestion6')}
		</a>
		<p class="mb-0 text-muted">
		{t('FaqResponse6')}
		</p>
		</div>
		<div class="author-details ml-0 mt-5">
		<a href="#" class="blog-author-name color6">
		{t('FaqQuestion7')}
		</a>
		<p class="mb-0 text-muted">
		{t('FaqResponse7')}</p>
		</div>
		<div class="author-details ml-0 mt-5">
		<a href="#" class="blog-author-name color6">
		{t('FaqQuestion8')}
		</a>
		<p class="mb-0 text-muted">
		{t('FaqResponse8')}</p>
		</div>
		</div>
		</div>
		</div>
		</div>


		<div class="card author-widget mb-0">
		<div class="card-body">
		<div class="about-author">
		<div class="about-author-img bg-transparent oveflow-initial">
		<div class="author-img-wrap">
		<a href="#">
		<img class="img-fluid" alt="" src="assets/icon/disclaimer.png"/></a>

		</div>
		</div>
		<div class="author-details">
		<p class="mb-0 text-muted">{t('AboutBoxContent')}</p>
		</div>
		</div>
		</div>
		</div>

		</div>
		</section>


		<Footer/>
		</div>
		)
	}

}

export default withTranslation()(About);