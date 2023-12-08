import React, {Component} from 'react';
import { withTranslation } from 'react-i18next';
import i18n from "i18next";



function settingLanguage(lang){ 
	i18n.changeLanguage(lang);
}


class InnerPagesLinks extends React.Component {  

    constructor(props) {
        super(props);  
      }  
 

  render(){ 
	const { t } = this.props;
    // console.log(this.props.setName);
      return ( 
          <React.Fragment>
			 	{t('SpecPublicText1')} <br />
				 {t('SpecText3')} : 

			<a href="/publicintro#intro" class="hidden-md hidden-lg">&nbsp;INTRO(1/5)&nbsp;</a>
				<span class="hidden-md hidden-lg">,</span>
				<a href="/publicintro#intro"  class="hidden-xs hidden-sm">&nbsp;INTRO(1/5)&nbsp;</a>
				<span class="hidden-xs hidden-sm">,</span>
				<a href="/publicconsultation#consult" class="hidden-md hidden-lg">&nbsp;CONSULTATIONS(2/5)&nbsp;</a>
				<span class="hidden-md hidden-lg">,</span>
				<a href="/publicconsultation#consult" class="hidden-xs hidden-sm">&nbsp;CONSULTATIONS(2/5)&nbsp;</a>
				<span class="hidden-xs hidden-sm">,</span>
				<a href="/publicoverview#overview" class="hidden-md hidden-lg">&nbsp;OVERVIEW(3/5)&nbsp;</a>
				<span class="hidden-md hidden-lg">,</span>
				<a href="/publicoverview#overview" class="hidden-xs hidden-sm">&nbsp;OVERVIEW(3/5)&nbsp;</a>
				<span class="hidden-xs hidden-sm">,</span>
				<a href="/publicdegree#degree" class="hidden-md hidden-lg">&nbsp;DEGREES(4/5)&nbsp;</a>
				<span class="hidden-md hidden-lg">,</span>
				<a href="/publicdegree#degree" class="hidden-xs hidden-sm">&nbsp;DEGREES(4/5)&nbsp;</a>
				<span class="hidden-xs hidden-sm">,</span>
				<a href="/publicextra#extra" class="hidden-md hidden-lg">&nbsp;EXTRA(5/5)&nbsp;</a>
				<span class="hidden-md hidden-lg">.</span>
				<a href="/publicextra#extra" class="hidden-xs hidden-sm">&nbsp;EXTRA(5/5)&nbsp;</a>
				<span class="hidden-xs hidden-sm">.</span> 
			 </React.Fragment>

      )
  }
}

export default withTranslation()(InnerPagesLinks); 
 