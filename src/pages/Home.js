import React , {Component} from 'react';
//import { useTranslation } from 'react-i18next';
import { withTranslation } from 'react-i18next';
import i18n from "i18next";
// import settingLanguage from './helper';
import Header from './Components/Header';
import Footer from './Components/Footer';
import axios from 'axios';
import Slider from "react-slick";

//import "react-responsive-carousel/lib/styles/carousel.min.css"; 
{/*var Carousel = require('react-responsive-carousel').Carousel;*/}

require('dotenv').config();
// const { t, i18n } = useTranslation(); 
 

// function settingLanguage(lang){ 
//      i18n.changeLanguage(lang);
//  } 
 function translateLanguage(lang){
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
    i18n.changeLanguage(lang);  
	localStorage.setItem("onchangeLanguageURL",url);
	window.location.reload();
} 


class Home extends React.Component {   
    
//    settingLanguage(lang){ 
//         i18n.changeLanguage(lang);
//     } 

constructor(props) {
	super(props);
	this.state = {
		tags : '',
	    tagsData: [],
	    categoryData  : [] ,
		specialistData : [],
		location: '',
		name:'',
		defaultCountry:'eng'
	};  

	


}  




componentWillMount(){ 
	const AxiosInstance = axios.create({ baseURL: process.env.REACT_APP_BASE_URL});
	AxiosInstance.get(`/specilistAPI/GetFeaturedSpecialist?language_id=`+localStorage.getItem('i18nextLng'))
	.then(res => {
		if(res.data['Status'])
		this.setState({specialistData : res.data['Result']});
	  	 console.log('specialist time');
		 console.log(res.data['Result']);
	});  


	console.log('---->language');
	console.log(localStorage.getItem('i18nextLng'));

	AxiosInstance.get(`/authenticationAPI/GetAllTagsByLanguage?language_id=`+localStorage.getItem('i18nextLng'))
	.then(res => {
		this.setState({tagsData : res.data});
		 console.log('---->tags');
		 
		 console.log(res.data);
	});  
	


}

handleButtonClickedCountry() {
     axios.get('https://ipapi.co/json/').then((response) => {
        let data = response.data;
        this.setState({
            location: data.country_name,
          
        });
});
  }

componentDidMount() {

 this.setState({'defaultCountry':localStorage.getItem("onchangeLanguage")})


	const AxiosInstance = axios.create({ baseURL: process.env.REACT_APP_BASE_URL});

	//console.log(Storage.get('i18nextLng'));
	console.log("localStorage.getItem('i18nextLng')");
	console.log(localStorage.getItem('i18nextLng'));
	
	AxiosInstance.get(`/authenticationAPI/GetAllCategoryByLanguage?language_id=`+localStorage.getItem('i18nextLng'))
	.then(res => {
		this.setState({categoryData : res.data});
		 console.log(res.data);
	});   
	
  }

printReviewStar = (review) => {
		const row = [];
		for (var i = 0; i < review; i++) {
		  row.push(<i class="fas fa-star filled"></i>);
		}
		  for (var i = 0; i < (5-review); i++) {
		  row.push(<i class="fas fa-star "></i>);
		}
		return row;
	  };

  handleInputChanged(event) {
    this.setState({
      location: event.target.value
    });
  }

  handleInputChanged1(event) {
    this.setState({
      name: event.target.value
    });
  }
   

handleButtonClicked() {
    var location = this.state.location;
    var name = this.state.name;
    var tag = this.state.tags; 
  }


  favSpecialist(specialist_id) { 
		var ct_id = localStorage.getItem('customer_id');
		if(ct_id== null){
			alert("Please login before choose Favourite");
			return false;
		} else {
			const AxiosInstance = axios.create({ baseURL: process.env.REACT_APP_BASE_URL});

			const clientData = {user_id :ct_id, specialist_id : specialist_id}
			console.log(clientData); 
			AxiosInstance.post(`/medalohaAPI/UserFavSpecialist`, clientData)
			.then(res => {  
				if(res.data['Status']){
					alert(res.data['Message']);
				}
				 
			});  

		}



  }


    render(){
        const { t } = this.props;

	 	const settings = {
			dots: false,
			autoplay:false,
			infinite: true,
			variableWidth: true 
			};

			
		
        return ( 
		 <React.Fragment> 
          <Header/> 

  


			<section class="section">
				<div class="container-fluid bg-theme pl-0 pr-0">
					<div class="banner-wrapper" style={{maxWidth:'unset'}}>

						<div  class="bg-header-img-m bg-img bg-img1 hidden-lg hidden-md ">
						<h3 class=" mobile-home-title font-weight-bold font-size-heading hidden-lg hidden-md hidden-sm i-t">Your International Holistic Platform</h3>

						<h5 class="b-t text-muted hidden-lg hidden-md hidden-sm">Book Online. Consult Video &amp; In-Person.</h5>
                        </div>
				   	</div>


					<div class="search-box">
						<form action="/search">

							<div class="row w-100 padding_bottom i-div">

								<div  class="bg-header-img bg-img bg-img1 hidden-xs hidden-sm big_image ">
								<h3 class="font-weight-bold font-size-heading hidden-lg hidden-md hidden-sm holi-t-r" >Your International Holistic Platform</h3>



    <div id="carouselExampleControls" class="hidden-xs hidden-sm carousel slide carosel_slide_text carousel-main" data-ride="carousel" >
    	<div class="carousel-inner">
    		<div class="carousel-item active">
    			<h4 class="text-right mr-2 text-white image_text">
    				<span class="font-weight-bold">{t('ProfessionalityNeed')}</span>
    			</h4>
    		</div>
    		<div class="carousel-item">
    			<h4 class="text-right mr-3 text-white image_text">
    				<span class="font-weight-bold">{t('SupportDeserve')}</span>
    			</h4>
    		</div>
    		<div class="carousel-item">
    			<h4 class="text-right mr-3 text-white image_text">
    				<span class="font-weight-bold">{t('FlexibilityWant')}</span>
    			</h4>
    		</div>

    	</div>

    </div>
            

			</div>
			<div class="bgclass">

				<div class="col-md-5 text-center ">
					
					<h3 class="font-weight-bold font-size-heading  hidden-xs holi-t" >Your International Holistic Platform</h3>

					<h5 class="text-muted pt-2 hidden-xs fr-section-1">Book Online. Consult Video & In-Person.</h5>

				</div>


				<div class="col-md-4 pad-0">

				<div  class="tooltip1 mobile-search-menu mobile-search-menu2 form-group search-info  mb-3 margintop2 tool-search-loc-sec">
					<a href="javascript:void(0)" class="geo_icon_link geo_icon_link1"><i class="fas fa-map-marker-alt" onClick={this.handleButtonClickedCountry.bind(this)}></i>
					</a> 
					 
					<input  type="text" name="location" class="search-loc-input hidden-xs form-control" placeholder="Location" value={this.state.location} onChange={this.handleInputChanged.bind(this)} />
					<input   type="text" class="search-loc-input form-control hidden-sm hidden-md hidden-lg" placeholder="Search Location" />

									<span class="tooltiptext1 tool-spec-text-sec"> 
										<div class="text-center">
											<a href="/search" class="tool-search-loc"><font class="tool-search-loc-font"><font class="tool-search-loc-font">Search Location</font></font></a>
										</div>
									</span> 
								 </div>


									<div  class="tooltip2 mobile-search-menu mobile-search-menu2 form-group search-info  cb--container mb-2 margintop2 tool-spec-field-sec" id="ComboBox" >


									<input type="text" id="name" name="name"  value={this.state.name} onChange={this.handleInputChanged1.bind(this)}   autocomplete="off" class="tooltip1 search-input form-control sspf cb--input w-100" aria-label="Special inputfield with 11 prefilled options available, use the down/up arrow keys to chose one or write your own text."  placeholder="Name/Field" />

                          				<span class="tooltiptext2 tool-spec-text-sec">  
											<div class="text-center">
												<a href="/search" class="tool-search-spec-field"><font class="tool-search-spec-field-font" ><font class="tool-search-spec-field-font" >Search Specialist's Name/Field</font></font></a>
											</div>
										</span>
									</div>
                                    <div  class="tooltip3 mobile-search-menu
									mobile-search-menu2 form-group cb--container mb-2 margintop2 tag-drop-r-sec" id="ComboBox">

									<a href="" class="geo_icon_link geo_icon_link1"><i class="fas fa-hashtag"></i>
									</a>

									 <select name="tags" class="form-control tag-drop" autocomplete="off" aria-hidden="true" onChange={(e)=> this.setState({ tags: e.target.value})}> 
										<option value="" selected="" class=" cb--option">Tag</option> 
											{this.state.tagsData.map( (tag)=> (
											<option value={tag.id}>{tag.name}</option> 
										))} 
									 </select>  			 

									<span class="tooltiptext3 tool-spec-text-sec"> 
										<div class="text-center">
											<a href="/search" class="search-h-t"><font class="tool-search-tag-font"><font class="tool-search-tag-font">Search Health Tag</font></font></a>
										</div>
									</span>

								</div>
							</div>
							
									<div class="col-md-1 sbutton ">
								    	<button  onClick={this.handleButtonClicked.bind(this)} class="btn btn-primary search-btn mb-4"><i class="fas fa-search"></i> <span>Search</span></button>
								     </div>

									<div class="col-md-2  text-center mb-4 pad-0">

										<div class="lan-text"><b>Language</b></div>

										<div  class="consult_section consult_sec">
											<span class=" consult_text" >Consult in: </span>
										</div>
										 
										<div class="language_section"> 
											<select class="lan_select" id="lan_select" onChange={(e)=>translateLanguage(e.target.value)}>
											<option  value="eng" selected={this.state.defaultCountry=='eng' ? "selected" : ""} >English</option>
											<option value="itanian" selected={this.state.defaultCountry=='itanian' ? "selected" : ""}>Italian</option>
											<option value="spanis" selected={this.state.defaultCountry=='spanis' ? "selected" : ""}>Spanish</option> 
										</select>
									</div>  
								</div>
							</div>

						</div>
					</form>
				</div> 
			</div>
		</section>
	 
        


 {/*<Carousel showArrows={true} >
                <div>
                    
                    <p className="legend">Legend 1djndjbdhbhd</p>
                </div>
                <div>
                   
                    <p className="legend">Legend 2dbdhbdbdhbh</p>
                </div>
                
            </Carousel>*/}
 



		<div class="section-header text-center bg-theme mb15 mar-bottom-0">
			<h3 class="font-weight-bold font-size-heading2 find_txt color-cus" >{t('Holistic')}</h3>
			<h5 class="text-muted mar-bottom-0">{t('Holistic_Discover')}</h5>
		</div>

		<div class="row bg-theme">
			<div class="container pt-2">
			 


<div class="col-md-12 hidden-lg hidden-md">
					<div class="row">
						<table class="table table-responsive hidden-lg hidden-md">
							<tbody><tr>




						 {this.state.categoryData.map( (category , i)=> (  
						  i<=9 ? 	
								<td>
									<div class="text-center">
										<center>
											<div class={i===0?'mag-border speicality-img':'speicality-img'}>
												<a href="/search">
													<img src={category.image} class="img-fluid round_image" alt="Speciality" />
												</a>
											</div>

										</center>
										<p class="mt-2">
											</p><div class="tooltip">
												<a href="javascript:void(0)" class={i===0?'text-mag font-weight-bold':'font-weight-bold'}>{category.name}</a>
											
												<span class="tooltiptext tool-spec-text-sec" >
													

{category.description.length > 250 ?
        (
          <h5 class="tool-spec-heading">
            {`${category.description.substring(0, 250)}...`}<a href="#" class="text-white font-weight-bold">Read more</a>
          </h5>
        ) :
        <h5 class="tool-spec-heading">{category.description}</h5>
      }


													<div class="text-center">
														<a href="/search" class="tool-spec-btn">SEE SPECIALISTS</a>
													</div>
												</span>
											</div>
										<p></p>
									</div>
								</td>

: null 

				    ))}     
						
</tr>

<tr>


 {this.state.categoryData.map( (category , i)=> (  
					(i>9) &&	  (i<=18) ? 	
								<td>
									<div class="text-center">
										<center>
											<div class="speicality-img ">
												<a href="/search">
													<img src={category.image} class="img-fluid round_image" alt="Speciality" />
												</a>
											</div>

										</center>
										<p class="mt-2">
											</p><div class="tooltip">
												<a href="javascript:void(0)" class="font-weight-bold">{category.name}</a>
											
												<span class="tooltiptext tool-spec-text-sec" >
													

{category.description.length > 250 ?
        (
          <h5 class="tool-spec-heading">
            {`${category.description.substring(0, 250)}...`}<a href="#" class="text-white font-weight-bold">Read more</a>
          </h5>
        ) :
        <h5 class="tool-spec-heading">{category.description}</h5>
      }


													<div class="text-center">
														<a href="/search" class="tool-spec-btn">SEE SPECIALISTS</a>
													</div>
												</span>
											</div>
										<p></p>
									</div>
								</td>

: null 

				    ))} 




	            				 		

	            			

	            				
	            				 	</tr>

	            				 	<tr>

{this.state.categoryData.map( (category , i)=> (  
					(i>18) &&	  (i<=27) ? 	
								<td>
									<div class="text-center">
										<center>
											<div class="speicality-img ">
												<a href="/search">
													<img src={category.image} class="img-fluid round_image" alt="Speciality" />
												</a>
											</div>

										</center>
										<p class="mt-2">
											</p><div class="tooltip">
												<a href="javascript:void(0)" class="font-weight-bold">{category.name}</a>
											
												<span class="tooltiptext tool-spec-text-sec" >
													

{category.description.length > 250 ?
        (
          <h5 class="tool-spec-heading">
            {`${category.description.substring(0, 250)}...`}<a href="#" class="text-white font-weight-bold">Read more</a>
          </h5>
        ) :
        <h5 class="tool-spec-heading">{category.description}</h5>
      }


													<div class="text-center">
														<a href="/search" class="tool-spec-btn">SEE SPECIALISTS</a>
													</div>
												</span>
											</div>
										<p></p>
									</div>
								</td>

: null 

				    ))} 

	            				 	
					</tr>
				</tbody></table>

			</div>
		</div>





		<div class="col-md-12 hidden-xs hidden-sm">
			<div class="row">  
				<div id="myCarousel" class="carousel slide w-100" data-ride="carousel">
				<div class="carousel-inner"> 
				     <div class="carousel-item active">  
					 <div class="col-md-12 dis-flex">   
				   {this.state.categoryData.map( (category , i)=> (  
						  i<=5 ? <div class="col-md-2 col-6 mb-4">
						   <div class="text-center">
						   <center><div class={i===0?'mag-border speicality-img':'speicality-img'}>
						   <a href="/search">	
						   <img src={category.image} class="img-fluid round_image" alt="Speciality" /></a>
						   </div></center>
						   <p class="mt-2"></p>
						   <div class="tooltip">
						   <a href="javascript:void(0)" class={i===0?'text-mag font-weight-bold':'font-weight-bold'}>{category.name}</a>
						   <span class="tooltiptext tool-spec-text-sec"> 

 {category.description.length > 250 ?
        (
          <h5 class="tool-spec-heading">
            {`${category.description.substring(0, 250)}...`}<a href="#" class="text-white font-weight-bold">Read more</a>
          </h5>
        ) :
        <h5 class="tool-spec-heading">{category.description}</h5>
      }

						   
						   <div class="text-center">
							 <a href="/search" class="tool-spec-btn">SEE SPECIALISTS</a>
						   </div>
						   </span>
						   </div>
						   </div>
						   </div> : null 

				    ))}     

			 </div> 

			 <div class="col-md-12 dis-flex">   
				   {this.state.categoryData.map( (category , i)=> (  
						  (i>=6) && (i<=12) ? <div class="col-md-2 col-6 mb-3">
						   <div class="text-center">
						   <center><div class="speicality-img">
						   <a href="/search">	
						   <img src={category.image} class="img-fluid round_image" alt="Speciality" /></a>
						   </div></center>
						   <p class="mt-2"> </p>
						   <div class="tooltip">
						   <a href="javascript:void(0)" class="font-weight-bold" >{category.name}</a>
						   <span class="tooltiptext tool-spec-text-sec"> 
						   {category.description.length > 250 ?
        (
          <h5 class="tool-spec-heading">
            {`${category.description.substring(0, 250)}...`}<a href="#" class="text-white font-weight-bold">Read more</a>
          </h5>
        ) :
        <h5 class="tool-spec-heading">{category.description}</h5>
      }
						   <div class="text-center">
							 <a href="/search" class="tool-spec-btn">SEE SPECIALISTS</a>
						   </div>
						   </span>
						   </div>
						  
						   </div>
						   </div> : null 

				    ))}     

			 </div> 
 </div>




<div class="carousel-item"> 
<div class="col-md-12 dis-flex">
      {this.state.categoryData.map( (category , i)=> (  
						  (i>=12) && (i<=18) ? <div class="col-md-2 col-6 mb-3">
						   <div class="text-center">
						   <center><div class="speicality-img">
						   <a href="/search">	
						   <img src={category.image} class="img-fluid round_image" alt="Speciality" /></a>
						   </div></center>
						   <p class="mt-2"> </p>
						   <div class="tooltip">
						   <a href="javascript:void(0)" class="font-weight-bold">{category.name}</a>
						   <span class="tooltiptext tool-spec-text-sec"> 
						   {category.description.length > 250 ?
        (
          <h5 class="tool-spec-heading">
            {`${category.description.substring(0, 250)}...`}<a href="#" class="text-white font-weight-bold">Read more</a>
          </h5>
        ) :
        <h5 class="tool-spec-heading">{category.description}</h5>
      }
						   <div class="text-center">
							 <a href="/search" class="tool-spec-btn">SEE SPECIALISTS</a>
						   </div>
						   </span>
						   </div> 
						   </div>
						   </div> : null 

				    ))}   

</div>		 

<div class="col-md-12 dis-flex"> 

               {this.state.categoryData.map( (category , i)=> (  
						  (i>=18) && (i<=24) ? <div class="col-md-2 col-6">
						   <div class="text-center">
						   <center><div class="speicality-img">
						   <a href="/search">	
						   <img src={category.image} class="img-fluid round_image" alt="Speciality" /></a>
						   </div></center>
						   <p class="mt-2"> </p>
						   <div class="tooltip">
						   <a href="javascript:void(0)" class="font-weight-bold">{category.name}</a>
						   <span class="tooltiptext tool-spec-text-sec"> 
						   {category.description.length > 250 ?
        (
          <h5 class="tool-spec-heading">
            {`${category.description.substring(0, 250)}...`}<a href="#" class="text-white font-weight-bold">Read more</a>
          </h5>
        ) :
        <h5 class="tool-spec-heading">{category.description}</h5>
      }
						   <div class="text-center">
							 <a href="/search" class="tool-spec-btn">SEE SPECIALISTS</a>
						   </div>
						   </span>
						   </div> 
						   </div>
						   </div> : null 

				    ))}   

			 </div>

</div>





</div>
<a class="left carousel-control carousel-left-anchor" href="#myCarousel" data-slide="prev" >
	<span class="fa fa-angle-left carousel-left-icon" ></span>
	<span class="sr-only">Previous</span>
</a>
<a class="right carousel-control carousel-right-anchor" href="#myCarousel" data-slide="next" >
	<span class="fa fa-angle-right carousel-right-icon" ></span>
	<span class="sr-only">Next</span>
</a>
</div> 

</div>
</div>
</div>
</div>

<div class="bg-theme">
	<h2>&nbsp;</h2>
	<div class="section-header mb-3 text-center ">
		<h3 class="font-weight-bold font-size-heading2 find_txt color-cus">{t('Featured_Specialists')}</h3>
		<h5 class="text-muted">{t('Featured_Specialists_Because')}</h5>
	</div>
	<div class="row"> 
		<div class="col-lg-12">
			<div class="doctor-slider slider">  
			<Slider {...settings}>
			{this.state.specialistData.map((specialist)=> { 
					 return (   
				       <div class="profile-widget">
					   <div class="doc-img">
					   <a  href={"/specialistDetails/"+specialist.SpecialistPublicPrivateID} >
					   <img class="img-fluid" alt="User Image" src={specialist.SpecialistPic} />
					   </a>
					   <a href="javascript:void(0);" class="fav-btn" onClick={e=>this.favSpecialist(specialist.SpecialistPublicPrivateID)} >
					      <i class="far fa-bookmark"></i>
					   </a>
					   </div>
					   <div class="pro-content">
					   <h3 class="title">
					   <a  href={"/specialistDetails/"+specialist.SpecialistPublicPrivateID}  >{specialist.SpecialistName}</a>
						 {specialist.SpecialistHealthCare !=0  && 
					      <img src="assets\icon\medicine.png" class="img-fluid doc-pics" alt="User Image" />
                         }
					   </h3>
					   <p class="speciality">
					   {specialist.SpecialistTitle}
					   <br />
					   <a href="#">
					   {specialist.SpecialistHolestic}
					   </a>
					   </p>
					   <div class="rating">
					    {
						  this.printReviewStar(specialist.SpecilistRatingAvg)
					    }
					   <span class="d-inline-block average-rating">&nbsp;({specialist.SpecilistRatingCount})</span>
					   </div>
					   <ul class="available-info"> 
					   <li>
						<i class="far fa-money-bill-alt"></i>  {specialist.SpecialistPrice}&nbsp;
						<i class="fas fa-info-circle pricetooltip" data-toggle="tooltip" data-original-title="">
<span class="pricetooltiptext">Range price for all types of consultations</span>

						</i>
					

					   </li>
					   <li>
					     <i class="fas fa-map-marker-alt"></i> {specialist.SpecialistCountry} , {specialist.SpecialistCity}
					   </li>
					   <li>
					     <i class="far fa-clock"></i> Available on {specialist.SpecialistWorkingTime}
					   </li> 
					   
					   </ul>
					   <div class="row row-sm">
					   <div class="col-6">
					   <a href={"/specialistDetails/"+specialist.SpecialistPublicPrivateID} class="btn view-btn">View Profile</a>
					   </div>
					   <div class="col-6">
	                    {specialist.MessageValue && specialist.MessageValue==1 ? 
					     <a href={"/specialistDetails/"+specialist.SpecialistPublicPrivateID}  class="btn book-btn">Book Now</a>
						 : 
						 <a href={"/specialistDetails/"+specialist.SpecialistPublicPrivateID}  class="btn book-btn">Book Now</a>
						  }


					   </div>
					   </div>
					   </div>
					   </div>
				
				   )
				})
			}
				</Slider>
		    	  </div>
		    </div>
	     </div>
	</div> 

<div class="bac-img-footer bg-img bg-img1 hidden-lg hidden-md "> 
</div>
<div id="carouselExampleSlidesOnly" class=" hidden-md hidden-lg hidden-sm carousel slide mb-3 pointer-event carouselRes" data-ride="carousel">
<div class="carousel-inner">
	<div class="carousel-item">
		<p class="comment-content text-white">
			"I was already planning private consultations by myself with health practitioners, by contacting and asking them for online sessions, but it took time and efforts…  MedAloha is exactly what I was waiting for."
		</p>
		<div class="meta-data mb-0 author-section">
			<span class="comment-author font-italic text-white" ><b>Elisa</b></span>
		</div>
	</div>
	<div class="carousel-item">

		<p class="comment-content text-white">
			"Super intuitive and user-friendly.!"
		</p>
		<div class="meta-data mb-0 author-section" >
			<span class="comment-author font-italic text-white"><b>Andreas</b></span>
		</div>
	</div>
	<div class="carousel-item">
		<p class="comment-content text-white">
			"Discovering here new stuff about holistics and cool specialists from all over the world, will try more sessions soon."
		</p>
		<div class="meta-data mb-0 author-section">
			<span class="comment-author font-italic text-white" ><b>Julie</b></span>
		</div>
	</div>
	<div class="carousel-item active">
		<p class="comment-content text-white" >
			"As a practitioner, MedAloha is the best way –especially in these covid times- to comfortably and easily connect from home with people from everywhere and to share my passion for holistic health."
		</p>
		<div class="meta-data mb-0 author-section">
			<span class="comment-author font-italic text-white"><b>Eros</b></span>
		</div>
	</div>
</div>
</div>

<Footer/>
 </React.Fragment>
        )
    }

}

export default withTranslation()(Home);
