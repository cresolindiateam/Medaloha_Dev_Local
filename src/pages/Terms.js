import React , {Component} from 'react';
//import { useTranslation } from 'react-i18next';
import { withTranslation } from 'react-i18next';
import i18n from "i18next";
// import settingLanguage from './helper';
import CustomerHeader from './Components/CustomerHeader';
import Footer from './Components/Footer';

// const { t, i18n } = useTranslation(); 

function settingLanguage(lang){ 
     i18n.changeLanguage(lang);
 }

class Terms extends React.Component {   
    
//    settingLanguage(lang){ 
//         i18n.changeLanguage(lang);
//     } 

    render(){
        const { t } = this.props;
        return (
          
	 <div class="main-wrapper">  
			<CustomerHeader/> 
	
			<div class="breadcrumb-bar  pt-0 pb-0 bg-cus">
				<div class="container-fluid">
					<div class="row align-items-center">
						<div class="col-md-12 col-12">
							<h1 class="breadcrumb-title text-center p-4">{t('TermsMainTitle')}</h1>
						</div>
					</div>
				</div>
			</div>
	
			<div class="content">
				<div class="container">
					<div class="row">
						<div class="col-12">
							<div class="terms-content">
								<div class="terms-text">
									<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vel sodales mauris. Nunc accumsan mi massa, ut maximus magna ultricies et:</p>
									<ol>
										<li>Integer quam odio, ullamcorper id diam in, accumsan convallis libero. Duis at lacinia urna.</li>
										<li>Mauris eget turpis sit amet purus pulvinar facilisis at sed lacus.</li>
										<li>Quisque malesuada volutpat orci, accumsan scelerisque lorem pulvinar vitae.</li>
										<li>Vestibulum sit amet sem aliquam, vestibulum nisi sed, sodales libero.</li>
									</ol>
								</div>
								<div class="terms-text">
									<h4>Aenean accumsan aliquam justo, et rhoncus est ullamcorper at</h4>
									<p>Donec posuere dictum enim, vel sollicitudin orci tincidunt ac. Maecenas mattis ex eu elit tincidunt egestas. Vivamus posuere nunc vel metus bibendum varius. Vestibulum suscipit lacinia eros a aliquam. Sed dapibus arcu eget egestas hendrerit.</p>

									<p>Vivamus consectetur metus at nulla efficitur mattis. Aenean egestas eu odio vestibulum vestibulum. Duis nulla lectus, lacinia vitae nibh vitae, sagittis interdum lacus. Mauris lacinia leo odio, eget finibus lectus pharetra ut. Nullam in semper enim, id gravida nulla.</p>

									<p>Fusce gravida auctor justo, vel lobortis sem efficitur id. Cras eu eros vitae justo dictum tempor.</p>
								</div>
								<div class="terms-text">
									<h4>Etiam sed fermentum lectus. Quisque vitae ipsum libero</h4>
									<p>Phasellus sit amet vehicula arcu. Etiam pulvinar dui libero, vitae fringilla nulla convallis in. Fusce sagittis cursus nisl, at consectetur elit vestibulum vestibulum:</p>
									<ul>
										<li>Nunc pulvinar efficitur interdum.</li>
										<li>Donec feugiat feugiat pulvinar.</li>
										<li>Suspendisse eu risus feugiat, pellentesque arcu eu, molestie lorem. </li>
										<li>Duis non leo commodo, euismod ipsum a, feugiat libero.</li>
									</ul>
								</div>
								<div class="terms-text">
									<h4>pulvinar</h4> 
									<p>Sed sollicitudin, diam nec tristique tincidunt, nulla ligula facilisis nunc, non condimentum tortor leo id ex.</p>

									<p>Vivamus consectetur metus at nulla efficitur mattis. Aenean egestas eu odio vestibulum vestibulum. Duis nulla lectus, lacinia vitae nibh vitae, sagittis interdum lacus. Mauris lacinia leo odio, eget finibus lectus pharetra ut. Nullam in semper enim, id gravida nulla.</p>

									<p>Donec posuere dictum enim, vel sollicitudin orci tincidunt ac. Maecenas mattis ex eu elit tincidunt egestas. Vivamus posuere nunc vel metus bibendum varius. Vestibulum suscipit lacinia eros a aliquam. Sed dapibus arcu eget egestas hendrerit.Donec posuere dictum enim, vel sollicitudin orci tincidunt ac. Maecenas mattis ex eu elit tincidunt egestas. Vivamus posuere nunc vel metus bibendum varius. Vestibulum suscipit lacinia eros a aliquam. Sed dapibus arcu eget egestas hendrerit.</p>
								</div>
								<div class="terms-text">
									<h4>efficitur</h4>

									<p>Fusce gravida auctor justo, vel lobortis sem efficitur id. Cras eu eros vitae justo dictum tempor.</p>

									<p><strong>Vivamus posuere nunc vel metus bibendum varius. Vestibulum suscipit lacinia eros a aliquam. Sed dapibus arcu eget egestas hendrerit.Donec posuere dictum enim, vel sollicitudin orci tincidunt ac.</strong></p>
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

export default withTranslation()(Terms);