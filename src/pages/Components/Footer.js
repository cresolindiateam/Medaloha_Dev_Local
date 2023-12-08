import React, {Component} from 'react';
import { withTranslation } from 'react-i18next';
import i18n from "i18next";
 

function settingLanguage(lang){ 
    i18n.changeLanguage(lang);
}



class Footer extends React.Component {  
  render(){
    const { t } = this.props; 
      return ( 
<footer class="footer"> 
<div class="footer-top">
    <div class="container-fluid">
        <div class="row">
            <div class="col-lg-3 col-md-3">


                <div class="footer-widget footer-about">
                    <div class="footer-logo">
                       
                        {/*<img src="\assets\img\logo.png"   style={{'height':'60px','backgroundColor':'white'}} class="img-fluid" alt="Logo1" />*/}
                      
                      {/*<div  style={{'height':'60px','color':'white','marginBottom':'10px','color': 'white','fontWeight':'600','textTransform': 'uppercase';'fontSize': '36px';'fontFamily': 'inherit'}}>Medaloha</div>*/}
                        <p class="text-white">Follow us. </p>
                        <div class="social-icon">
                            <ul>
                                <li>
                                    <a href="#" target="_blank"><i class="fab fa-facebook-f"></i> </a>
                                </li>
                                <li>
                                    <a href="#" target="_blank"><i class="fab fa-twitter"></i> </a>
                                </li>
                                <li>
                                    <a href="#" target="_blank"><i class="fab fa-linkedin-in"></i></a>
                                </li>
                                <li>
                                    <a href="#" target="_blank"><i class="fab fa-instagram"></i></a>
                                </li>
                                <li>
                                    <a href="#" target="_blank"><i class="fab fa-youtube"></i></a>
                                </li>

                            </ul>

                        </div>
                    </div>
                </div>
                <div class="footer-about-content">
                    <p class="text-white">Share us. </p>
                    <div class="social-icon">
                        <ul>
                            <li>
                                <a href="#" target="_blank"><i class="fab fa-facebook-f"></i> </a>
                            </li>
                            <li>
                                <a href="#" target="_blank"><i class="fab fa-facebook-messenger"></i> </a>
                            </li>
                            <li>
                                <a href="#" target="_blank"><i class="fab fa-whatsapp"></i> </a>
                            </li>

                            <li>
                                <a href="#" target="_blank"><i class="fab fa-twitter"></i> </a>
                            </li>
                                            
                                            <li>
                                                <a href="#" target="_blank"><i class="fab fa-instagram"></i></a>
                                            </li>
                                        
                                        </ul>
                                    </div>
                                </div>





                            </div>

                            <div class="col-lg-6 col-md-6 mt-4 hidden-xs ">
                                <div id="carouselExampleSlidesOnly" class="carousel slide mb-1" data-ride="carousel">
                                    <div class="carousel-inner">
                                        <div class="carousel-item active">
                                            <p class="comment-content author-name">
                                                "I was already planning private consultations by myself with health practitioners, by contacting and asking them for online sessions, but it took time and efforts…  MedAloha is exactly what I was waiting for."
                                            </p>
                                            <div class="meta-data mb-0 author-section">
                                                <span class="comment-author font-italic author-name">Elisa</span>
                                            </div>
                                        </div>
                                        <div class="carousel-item">

                                            <p class="comment-content author-name" >
                                                "Super intuitive and user-friendly.!"
                                            </p>
                                            <div class="meta-data mb-0 author-section" >
                                                <span class="comment-author font-italic author-name" >Andreas</span>
                                            </div>
                                        </div>
                                        <div class="carousel-item">
                                            <p class="comment-content author-name">
                                                "Discovering here new stuff about holistics and cool specialists from all over the world, will try more sessions soon."
                                            </p>
                                            <div class="meta-data mb-0 author-section" >
                                                <span class="comment-author font-italic author-name" >Julie</span>
                                            </div>
                                        </div>
                                        <div class="carousel-item">
                                            <p class="comment-content author-name">
                                                "As a practitioner, MedAloha is the best way –especially in these covid times- to comfortably and easily connect from home with people from everywhere and to share my passion for holistic health."
                                            </p>
                                            <div class="meta-data mb-0 author-section">
                                                <span class="comment-author font-italic author-name">Eros</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>




                            </div>

                            <div class="col-lg-3 col-md-3 mobile_footer_top">
                                <div class="footer-widget footer-contact float-right">
                                    <h2 class="footer-title">{t('ContactUS')}</h2>
                                    <div class="footer-contact-info">
                                        <div class="footer-address">
                                            <span><i class="fas fa-map-marker-alt"></i></span>
                                            <p> 3556  Beech Street, San Francisco,<br /> California, CA 94108 </p>
                                        </div>
                                        <p>
                                            <i class="fas fa-phone-alt"></i>
                                            +1 315 369 5943
                                        </p>
                                        <p class="mb-0">
                                            <i class="fas fa-envelope"></i>
                                            doccure@example.com
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                      <div class="row">
  <div class="col-md-3 text-left">

   
                                    <p class="text-white  footer-middle-text mar-bottom-0">
                                        Are you a Recognized Holistic Practitioner? <a href="/applyspecialist" class="text-success">Apply</a></p>
                                   
                                       </div>

                                   <div class="col-md-6 text-center"> 
                                  <img src="/assets/img/footer-logo.png"  style={{'width':'40%','marginTop':'-8%'}} class="img-fluid hidden-xs hidden-sm" alt="logo" />
                        
                         <img src="/assets/img/footer-logo.png"  style={{'width':'50%'}} class="img-fluid hidden-md hidden-lg" alt="logo" />
                   
                                </div>
</div>


                    </div>

                        </div>

                    <div class="footer-bottom">
                        <div class="container-fluid">
                            <div class="copyright">
                       <div class="row">
                        <div class="col-md-6 col-lg-6">
                            <div class="copyright-text">
                                <p class="mb-0 text-center-mobile">&copy; 2021 MedAloha. All rights reserved.</p>
                            </div>
                        </div>
                        <div class="col-md-6 col-lg-6">
                            <div class="copyright-menu">
                                <ul class="policy-menu"> 
                                    <li><a href="/term-condition">{t('TermsConditions')}</a></li>
                                    <li><a href="/privacy-policy">{t('Privacy')}</a></li>
                                    <li><a href="/cookie-policy">{t('CookiePolicy')}</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div> 
    </footer>
      )
  }
}

export default  withTranslation()(Footer);