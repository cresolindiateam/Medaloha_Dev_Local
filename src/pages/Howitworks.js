import React , {Component} from 'react';
//import { useTranslation } from 'react-i18next';
import { withTranslation } from 'react-i18next';
import i18n from "i18next";
// import settingLanguage from './helper';
import Header from './Components/Header';
import Footer from './Components/Footer';

// const { t, i18n } = useTranslation(); 

function settingLanguage(lang){ 
     i18n.changeLanguage(lang);
 }

class Howitworks extends React.Component {   
    
//    settingLanguage(lang){ 
//         i18n.changeLanguage(lang);
//     } 

    render(){
        const { t } = this.props;
        return (
          
	<div class="main-wrapper">  
          <Header/> 

<div class="container bg-theme hidden-md hidden-lg">
			 	<div class="media">
			 		<img src="assets/images/topic-1.png" class="mt-5 mr-5 topic_img" />	
			 		<div class="media-body">
			 			 <h4 class="mt-5 color6" > <strong>LOGIN/REGISTER </strong> </h4>
					    <p> Login/Register &amp; get full access to the website’s functionalities. Updates will be provided both via your personal area &amp; by email</p>
			 		</div>
			 	</div>
 			 
			 	<div class="media">
			 		<img src="assets/images/topic-2.png" class="mt-5 mr-5 topic_img" />	
			 		<div class="media-body">
			 			 <h4 class="mt-5 color6"> <strong>CHOOSE </strong> </h4>
					    <p> Choose the language in which you would like to have your consultation done. Choose holistic field &amp; specialist of interest.</p>
			 		</div>
			 	</div>
 			 <div class="media">
			 		<img src="assets/images/topic-3.png" class="mt-5 mr-5 topic_img" />	
			 		<div class="media-body">
			 			 <h4 class="mt-5 color6"> <strong>BOOK </strong> </h4>
						     <p>
	    					Book your spot. Visit specialist’s profile &amp; see types of consultations provided: 
	    					</p>
                      <ul class="pl-3 mb-0">
                          <li>Written: you can write/voice message the specialist about a specific subject</li>
                           <li>Video: audio/video sessions.</li>
                            <li>In-person: In-person consultation. Check where the specialist is consulting.


                            </li>
                      </ul> 

                      Modes can be SHORT (exploratory contact), COMPLETE (full session) &amp; CYCLE (a pack of complete sessions bookable within 3 months from payment)
			 		</div>
			 	</div>
			 	<div class="media">
			 		<img src="assets/images/topic-4.png" class="mt-5 mr-5 topic_img" />	
			 		<div class="media-body">
			 			 <h4 class="mt-5 color6" > <strong>PAY ONLINE </strong> </h4>
					    <p> Pay online, by paypal or card systems.</p>
			 		</div>
			 	</div>
			 	<div class="media">
			 		<img src="assets/images/topic-5.png" class="mt-5 mr-5 topic_img" />	
			 		<div class="media-body">
			 			 <h4 class="mt-5 color6"> <strong>CONSULT</strong> </h4>
					     <p>
				        Once paid, you will get access to the consultation:
				        </p>
				        <ul class="pl-3 mb-0">
				        <li>
                        Written: you will get a written/voice answer to your query (by 7 days time).</li>

                        <li>
                        Video: you will get the link to connect at the booked time.
                        </li>

                        <li>
                        In-person: exact location may be provided privately depending on the specialist. 
                        </li>
                    </ul>
                        <p>
                         * Cancellations: a full money refund is available up to 24 hrs before consultation (21% charge after this time). In case of net issues, please rebook the session or contact the specialist
				    </p>
    							         
			 		</div>
			 	</div> 
					 
			 	<div class="media">
			 		<img src="assets/images/topic-6.png" class="mt-5 mr-5 topic_img"/>
			 		
			 		<div class="media-body">
			 			 <h4 class="mt-5 color6"> <strong>LEAVE A REVIEW </strong> </h4>
					    <p> Leave a review about the consultation. This step is strongly recommended to support our community choose their specialists wisely. Thanks for your collaboration.</p>
			 		</div>
			 	</div>


			 	<div class="media"><a href="/" class="btn btn-primary get_strated_btn">Get Started</a></div>
			 	

			 </div>




<div class="row hidden-xs hidden-sm bg-theme">
        			<div class="container pt-5">
        				<div class="row">
        					<div class="col-md-5 pr-3">
        						<section class="text-right mt-5 mb-5">
        							<h6 class="mt-5"> &nbsp; </h6>
        							<p class="mt-5"></p>
        						</section>
        						<section class="text-right margin-top-135" > 
        							<h6 class="color6" style={{textTransform:'uppercase'}}>  <strong >{t('Choose')}</strong> </h6>
        							<p>
									{t('ChooseContent')}
        							</p>
        						</section>

        						<section class="text-right mt-5 mb-5">
        							<h6 class="mt-5"> &nbsp; </h6>
        							<p class="mt-5"></p>
        						</section>
        						<section class="text-right margin-top-145"> 
        							<h6 class="color6"> <strong> {t('PAYONLINE')} </strong></h6>
        							<p>
									{t('PAYONLINEContent')}
        							</p>
        						</section>

        						<section class="text-right mt-5 mb-5">
        							<h6 class="mt-5"> &nbsp; </h6>
        							<p class="mt-5"></p>
        						</section>
        						<section class="text-right margin-top-220"> 
        							<h6 class="color6">  <strong>{t('LEAVEAREVIEW')} </strong></h6>
        							<p>
        								{t('LEAVEAREVIEWContent')} 
        							</p>
        						</section>

        					</div>
        					<div class="col-md-2 howt-back">
        						<center><img src="assets/images/topic-1.png" class="mt-5 ml-4"/></center>
        						<center><img src="assets/images/topic-2.png" class="mt-5 mr-5" /></center>
        						<center><img src="assets/images/topic-3.png" class="mt-5 ml-3" /></center>
        						<center><img src="assets/images/topic-4.png" class="mt-5 mr-5" /></center>
        						<center><img src="assets/images/topic-5.png" class="mt-5 ml-4" /></center>
        						<p>&nbsp;</p>
        						<center><img src="assets/images/topic-6.png" class="mt-5 mr-5" /></center>
        						<p>&nbsp;</p>
        						<p>&nbsp;</p>	
        						<p>&nbsp;</p>	

        					</div>
        					<div class="col-md-5">


        						<section class="text-left mt-5 mb-5">
        							<h6 class="mt-5 color6" > <strong> {t('LOGINREGISTER')} </strong> </h6>
        							<p>{t('LOGINREGISTERContent')}</p>
        						</section>
        						<section class="text-right mt-5 mb-5">
        							<h6 class="mt-5"> &nbsp;  </h6>
        							<p class="mt-5"></p>
        						</section>

        						<section class="text-left mb-5 margin-top-135" >
        							<h6 class="mt-5 color6"> <strong>{t('BOOK')}</strong></h6>

        							<p class="mb-0">
									{t('BOOKContent')}
        							</p>
        							<ul class="pl-3 mb-0">
        								<li>{t('BOOKContentLi1')}</li>
        								<li>{t('BOOKContentLi2')}</li>
        								<li>{t('BOOKContentLi3')}</li> 
        							</ul>
        							<p>

									{t('BOOKContentLi3P')}
        							</p>
        						</section>
        						<section class="text-left mb-5" >
        							<h6 class="color6"> <strong>{t('CONSULT')}</strong></h6>
        							<p class="mb-0">
									{t('CONSULTContent')}
        							</p>
        							<ul class="pl-3 mb-0">
        								<li>
        								{t('CONSULTContentLi1')}</li>

        								<li>
										{t('CONSULTContentLi2')}
        								</li>

        								<li>
        								{t('CONSULTContentLi3')}
        								</li>
        							</ul>
        							<p>
									{t('CONSULTContentLiP')}
        							</p>
        						</section>

        					</div>

        					<a href="/" class="btn btn-primary get_strated_btn">Get Started</a>
        				</div>
        			</div>
        		</div>

			

<Footer/>
	</div>
        )
    }

}

export default withTranslation()(Howitworks);
