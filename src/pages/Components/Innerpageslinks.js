import React, {Component} from 'react';
import { withTranslation } from 'react-i18next';
import i18n from "i18next";



function settingLanguage(lang){ 
	i18n.changeLanguage(lang);
}


class InnerPagesLinks extends React.Component {  

    constructor(props) {
        super(props);  

          this.state= {
            innerclassmobile : "btn btn-rounded btn-outline-info m-2 hidden-md hidden-lg",
            innerclassdesktop : "btn btn-rounded btn-outline-info m-2 hidden-xs hidden-sm",
             innerclassmobile1 : "btn btn-rounded btn-outline-info m-2 hidden-md hidden-lg",
            innerclassdesktop1 : "btn btn-rounded btn-outline-info m-2 hidden-xs hidden-sm",
             innerclassmobile2 : "btn btn-rounded btn-outline-info m-2 hidden-md hidden-lg",
            innerclassdesktop2 : "btn btn-rounded btn-outline-info m-2 hidden-xs hidden-sm",
            
        } 
      }  
 
 componentDidMount() {
      

 const currentHref = window.location.href;
    if (currentHref.endsWith('/publicintro') || currentHref.endsWith('/publicintro#intro')) {
      this.setState({innerclassmobile:"btn btn-rounded btn-info m-2 hidden-md hidden-lg"});
     this.setState({innerclassdesktop:"btn btn-rounded btn-info m-2 hidden-xs hidden-sm"}); 
     this.setState({innerclassmobile1:"btn btn-rounded btn-outline-info m-2 hidden-md hidden-lg"});
     this.setState({innerclassdesktop1:"btn btn-rounded btn-outline-info m-2 hidden-xs hidden-sm"}); 
     this.setState({innerclassmobile2:"btn btn-rounded btn-outline-info m-2 hidden-md hidden-lg"});
     this.setState({innerclassdesktop2:"btn btn-rounded btn-outline-info m-2 hidden-xs hidden-sm"}); 
     this.setState({innerclassmobile3:"btn btn-rounded btn-outline-info m-2 hidden-md hidden-lg"});
     this.setState({innerclassdesktop3:"btn btn-rounded btn-outline-info m-2 hidden-xs hidden-sm"}); 
     this.setState({innerclassmobile4:"btn btn-rounded btn-outline-info m-2 hidden-md hidden-lg"});
     this.setState({innerclassdesktop4:"btn btn-rounded btn-outline-info m-2 hidden-xs hidden-sm"}); 
          

    }

  else if (currentHref.endsWith('/publicconsultation') || currentHref.endsWith('/publicconsultation#consult')) {
      this.setState({innerclassmobile:"btn btn-rounded btn-outline-info m-2 hidden-md hidden-lg"});
     this.setState({innerclassdesktop:"btn btn-rounded btn-outline-info m-2 hidden-xs hidden-sm"}); 
     this.setState({innerclassmobile1:"btn btn-rounded btn-info m-2 hidden-md hidden-lg"});
     this.setState({innerclassdesktop1:"btn btn-rounded btn-info m-2 hidden-xs hidden-sm"}); 
     this.setState({innerclassmobile2:"btn btn-rounded btn-outline-info m-2 hidden-md hidden-lg"});
     this.setState({innerclassdesktop2:"btn btn-rounded btn-outline-info m-2 hidden-xs hidden-sm"}); 
     this.setState({innerclassmobile3:"btn btn-rounded btn-outline-info m-2 hidden-md hidden-lg"});
     this.setState({innerclassdesktop3:"btn btn-rounded btn-outline-info m-2 hidden-xs hidden-sm"}); 
     this.setState({innerclassmobile4:"btn btn-rounded btn-outline-info m-2 hidden-md hidden-lg"});
     this.setState({innerclassdesktop4:"btn btn-rounded btn-outline-info m-2 hidden-xs hidden-sm"}); 
          

    }

     else if (currentHref.endsWith('/publicoverview#overview') || currentHref.endsWith('/publicoverview')) {
      this.setState({innerclassmobile:"btn btn-rounded btn-outline-info m-2 hidden-md hidden-lg"});
     this.setState({innerclassdesktop:"btn btn-rounded btn-outline-info m-2 hidden-xs hidden-sm"}); 
     this.setState({innerclassmobile1:"btn btn-rounded btn-outline-info m-2 hidden-md hidden-lg"});
     this.setState({innerclassdesktop1:"btn btn-rounded btn-outline-info m-2 hidden-xs hidden-sm"}); 
     this.setState({innerclassmobile2:"btn btn-rounded btn-info m-2 hidden-md hidden-lg"});
     this.setState({innerclassdesktop2:"btn btn-rounded btn-info m-2 hidden-xs hidden-sm"}); 
     this.setState({innerclassmobile3:"btn btn-rounded btn-outline-info m-2 hidden-md hidden-lg"});
     this.setState({innerclassdesktop3:"btn btn-rounded btn-outline-info m-2 hidden-xs hidden-sm"}); 
     this.setState({innerclassmobile4:"btn btn-rounded btn-outline-info m-2 hidden-md hidden-lg"});
     this.setState({innerclassdesktop4:"btn btn-rounded btn-outline-info m-2 hidden-xs hidden-sm"}); 
          

    }

       else if (currentHref.endsWith('/publicdegree#degree') || currentHref.endsWith('/publicdegree')) {
      this.setState({innerclassmobile:"btn btn-rounded btn-outline-info m-2 hidden-md hidden-lg"});
     this.setState({innerclassdesktop:"btn btn-rounded btn-outline-info m-2 hidden-xs hidden-sm"}); 
     this.setState({innerclassmobile1:"btn btn-rounded btn-outline-info m-2 hidden-md hidden-lg"});
     this.setState({innerclassdesktop1:"btn btn-rounded btn-outline-info m-2 hidden-xs hidden-sm"}); 
     this.setState({innerclassmobile2:"btn btn-rounded btn-outline-info m-2 hidden-md hidden-lg"});
     this.setState({innerclassdesktop2:"btn btn-rounded btn-outline-info m-2 hidden-xs hidden-sm"}); 
     this.setState({innerclassmobile3:"btn btn-rounded btn-info m-2 hidden-md hidden-lg"});
     this.setState({innerclassdesktop3:"btn btn-rounded btn-info m-2 hidden-xs hidden-sm"}); 
     this.setState({innerclassmobile4:"btn btn-rounded btn-outline-info m-2 hidden-md hidden-lg"});
     this.setState({innerclassdesktop4:"btn btn-rounded btn-outline-info m-2 hidden-xs hidden-sm"}); 
          

    }

        else if (currentHref.endsWith('/publicextra#extra') || currentHref.endsWith('/publicextra')) {
      this.setState({innerclassmobile:"btn btn-rounded btn-outline-info m-2 hidden-md hidden-lg"});
     this.setState({innerclassdesktop:"btn btn-rounded btn-outline-info m-2 hidden-xs hidden-sm"}); 
     this.setState({innerclassmobile1:"btn btn-rounded btn-outline-info m-2 hidden-md hidden-lg"});
     this.setState({innerclassdesktop1:"btn btn-rounded btn-outline-info m-2 hidden-xs hidden-sm"}); 
     this.setState({innerclassmobile2:"btn btn-rounded btn-outline-info m-2 hidden-md hidden-lg"});
     this.setState({innerclassdesktop2:"btn btn-rounded btn-outline-info m-2 hidden-xs hidden-sm"}); 
     this.setState({innerclassmobile3:"btn btn-rounded btn-outline-info m-2 hidden-md hidden-lg"});
     this.setState({innerclassdesktop3:"btn btn-rounded btn-outline-info m-2 hidden-xs hidden-sm"}); 
     this.setState({innerclassmobile4:"btn btn-rounded btn-info m-2 hidden-md hidden-lg"});
     this.setState({innerclassdesktop4:"btn btn-rounded btn-info m-2 hidden-xs hidden-sm"}); 
          

    }

     else {
      this.setState({innerclassmobile:"btn btn-rounded btn-outline-info m-2 hidden-md hidden-lg"});
     this.setState({innerclassdesktop:"btn btn-rounded btn-outline-info m-2 hidden-xs hidden-sm"});
     this.setState({innerclassmobile1:"btn btn-rounded btn-outline-info m-2 hidden-md hidden-lg"});
     this.setState({innerclassdesktop1:"btn btn-rounded btn-outline-info m-2 hidden-xs hidden-sm"});
   this.setState({innerclassmobile2:"btn btn-rounded btn-outline-info m-2 hidden-md hidden-lg"});
     this.setState({innerclassdesktop2:"btn btn-rounded btn-outline-info m-2 hidden-xs hidden-sm"}); 
this.setState({innerclassmobile3:"btn btn-rounded btn-outline-info m-2 hidden-md hidden-lg"});
     this.setState({innerclassdesktop3:"btn btn-rounded btn-outline-info m-2 hidden-xs hidden-sm"}); 
        
this.setState({innerclassmobile4:"btn btn-rounded btn-outline-info m-2 hidden-md hidden-lg"});
     this.setState({innerclassdesktop4:"btn btn-rounded btn-outline-info m-2 hidden-xs hidden-sm"}); 

    }

        // if(this.props.setName=="private")
        // this.setState({class:"btn btn-rounded btn-dark m-2"});
     
        // if(this.props.setName=="publicintro")
        // this.setState({class2:"btn btn-rounded btn-info m-2"});
    

        // if(this.props.setName=="action")
        // this.setState({class3:"btn btn-rounded  m-2 profile-action"});
    
    }

  render(){ 
	const { t } = this.props;
    // console.log(this.props.setName);
      return ( 
          <React.Fragment>
			 	{t('SpecPublicText1')} <br />
				 {t('SpecText3')} : 

			<a href="/publicintro#intro" class={this.state.innerclassmobile}>&nbsp;INTRO(1/5)&nbsp;</a>
				<span class="hidden-md hidden-lg">,</span>
				<a href="/publicintro#intro"  class={this.state.innerclassdesktop}>&nbsp;INTRO(1/5)&nbsp;</a>
				<span class="hidden-xs hidden-sm">,</span>
				<a href="/publicconsultation#consult" class={this.state.innerclassmobile1}>&nbsp;CONSULTATIONS(2/5)&nbsp;</a>
				<span class="hidden-md hidden-lg">,</span>
				<a href="/publicconsultation#consult" class={this.state.innerclassdesktop1}>&nbsp;CONSULTATIONS(2/5)&nbsp;</a>
				<span class="hidden-xs hidden-sm">,</span>
				<a href="/publicoverview#overview" class={this.state.innerclassmobile2}>&nbsp;OVERVIEW(3/5)&nbsp;</a>
				<span class="hidden-md hidden-lg">,</span>
				<a href="/publicoverview#overview" class={this.state.innerclassdesktop2}>&nbsp;OVERVIEW(3/5)&nbsp;</a>
				<span class="hidden-xs hidden-sm">,</span>
				<a href="/publicdegree#degree" class={this.state.innerclassmobile3}>&nbsp;DEGREES(4/5)&nbsp;</a>
				<span class="hidden-md hidden-lg">,</span>
				<a href="/publicdegree#degree" class={this.state.innerclassdesktop3}>&nbsp;DEGREES(4/5)&nbsp;</a>
				<span class="hidden-xs hidden-sm">,</span>
				<a href="/publicextra#extra" class={this.state.innerclassmobile4}>&nbsp;EXTRA(5/5)&nbsp;</a>
				<span class="hidden-md hidden-lg">.</span>
				<a href="/publicextra#extra" class={this.state.innerclassdesktop4}>&nbsp;EXTRA(5/5)&nbsp;</a>
				<span class="hidden-xs hidden-sm">.</span> 
			 </React.Fragment>

      )
  }
}

export default withTranslation()(InnerPagesLinks); 
 