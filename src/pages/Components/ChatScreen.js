import React from "react";
import {
  AppBar,
  Backdrop,
  CircularProgress,
  Container,
  CssBaseline,
  Grid,
  IconButton,
  List,
  TextField,
  Toolbar,
  Typography,
} from "@material-ui/core";
import {Recorder} from 'react-voice-recorder'
import 'react-voice-recorder/dist/index.css'
import { EmojiTransportationOutlined, Send } from "@material-ui/icons";
import axios from "axios";
import moment from 'moment';
import ChatItem from "../Components/ChatItem";
import $ from 'jquery';
const Chat = require("twilio-chat");

require('dotenv').config();

class ChatScreen extends React.Component {
  constructor(props) {
    super(props); 
    this.state = {
      audioDetails : {
        url: null,
        blob: null,
        chunks: null,
        duration: {
        h: null,
        m: null,
        s: null,
        }
        },
      text: "",
      messages: [],
      loading: false,
      channel: null,
      booking_chat_channel:[],
      triggerMessage : false ,
      triggerMessageSpecialist:true,
      emailOwner:'',
      chatmasterName :"",
      booking_chat_channel:[],
      booking_chat_channel2:[], 
      classAcitve:'chat-scroll',
      queryBox:false,
      queryString:'',
      queryTime:'',
      spec_image:'',
      ocname:'',
      oclastname:'',
      ocimage:'assets/img/doctors/doctor-thumb-02.jpg',
      uname :'',
      sname:'',
      uimage:'',
      simage:'',
      image_preview:null,
      searchvalue:'',
      userQueryImage:'assets/img/doctors/doctor-thumb-02.jpg',
      refreshPage:false,
      defaultImage:'assets/img/doctors/doctor-thumb-02.jpg',
      specialist_login_time:'avatar avatar-away',
      selectchatmemberid:'',
      
     
    }; 
    this.scrollDiv = React.createRef();
  }

 

  getToken = async (email) => { 
   
    const response = await axios.get(process.env.REACT_APP_BASE_URL+`/chatAPI/token/`+email);
    const { data } = response;
    return data.token;
  };

  handleAudioStop(data) {
   
    this.setState({ audioDetails: data });
  }




   handleOnChange(value, audioname ){
    
     console.log("ajaysoni");
  }

 async handleAudioUpload(file) {
   
    this.state.channel.sendMessage({
        contentType: 'audio/webm',
          media:file,
      }); 
return false;
   //await this.joinChannel(this.state.channel); 
   }

handleReset() {
  const reset = {
    url: null,
    blob: null,
    chunks: null,
    duration: {
      h: 0,
      m: 0,
      s: 0
    }
  };

this.setState({ audioDetails: reset });

$(".chat-cont-right .chat-footer .input-group .form-control").show();
$(".MuiIconButton-root").show();

$("._1ceqH .1Yplu .1Pz2d").hide();
$("._1ceqH .1Yplu .2gd2_").hide();
$("._f2DT8").hide();
$("._1ceqH .3bC73 .1YOWG ._3bC73 ._1Yplu").hide();
 window.location.reload();

}

  handleChange(event) {
    this.setState({searchvalue: event.target.value});
  }



  handleChange1(event) {   
    const [file] = event.target.files
    if (file) {
      var  src = URL.createObjectURL(file) 
      this.setState({image_preview: src});
    }
 }

    getSpecialistStatus(specialistId)
 {
  
  axios.get(process.env.REACT_APP_BASE_URL+`/authenticationAPI/getspecialistStatus?specialistId=`+specialistId)
    .then(res => {
   

if(parseInt(res.data)>parseInt(Date.now())){
  
      this.setState({specialist_login_time: 'avatar avatar-green'});
      }
else
{
 
  this.setState({specialist_login_time: 'avatar avatar-away'});
}

     });  

   }

  componentDidMount = async () => {  


     
    

    this.setState({uname:this.props.name});
    this.setState({uimage:this.props.path}); 
    this.setState({sname:this.props.c_name});
    this.setState({simage:this.props.c_path}); 
    
   

    if(localStorage.getItem('customer_id')!=null){
      localStorage.setItem('globaluserid',localStorage.getItem('customer_id'));
      axios.get(process.env.REACT_APP_BASE_URL+`/customerAPI/GetCustomerChatChannel?customer_id=`+localStorage.getItem('customer_id'))
      .then(res => { 
           this.setState({booking_chat_channel : res.data});  
           if(res.data){ 
            this.setState({chatmasterName:'Dr.' +res.data[0]['first_name']+' '+res.data[0]['last_name']}); 
            this.chatfunction(res.data[0]['payment_stripe_id'],res.data[0]['twilio_chat_id1'],"spec_"+res.data[0]['specialist_id'],res.data[0]['user_id']);
            this.setState({ loading: true });  
          }
       });   
    }


    if(localStorage.getItem('specialist_id')!=null){
      localStorage.setItem('globalspecialistid',localStorage.getItem('specialist_id'));
      axios.get(process.env.REACT_APP_BASE_URL+`/specilistAPI/GetSpecialistChatChannel?specialist_id=`+localStorage.getItem('specialist_id'))
      .then(res => { 
           this.setState({booking_chat_channel2 : res.data});  
          
           if(res.data){ 
            this.setState({chatmasterName:res.data[0]['first_name']+' '+res.data[0]['last_name']}); 
            this.chatfunction(res.data[0]['payment_stripe_id'],res.data[0]['twilio_chat_id2'],"user_"+res.data[0]['user_id'],res.data[0]['specialist_id']);
            this.setState({ loading: true });  
          }
       });   
    } 

        $( document ).ready(function() {


      $("._1ceqH ._1Yplu ._1Pz2d").hide();
      $("._1ceqH ._1Yplu ._2gd2_").hide();
      $("._1ceqH ._f2DT8").hide();
      $("._1ceqH ._1Yplu ._1Pz2d").hide();
       $("._1ceqH ._1Yplu ._2gd2_").hide();
       $("._1ceqH ._f2DT8").hide();
      });
      
      $("._1dpop").click(function(){
       $(".chat-cont-right .chat-footer .input-group .form-control").hide();
       $(".MuiIconButton-root").hide();
       $("._1ceqH ._1Yplu ._1Pz2d").show();
       $("._1ceqH ._1Yplu ._2gd2_").show();
        $("._1ceqH ._f2DT8").show();
      })

  };


 

  joinChannel = async (channel) => {
      if (channel.channelState.status !== "joined") {
        await channel.join();
      }  
    
      channel.on("messageAdded", this.handleMessageAdded);
    
  };

selectchatmember(room)
{
  this.setState({selectchatmemberid : room}); 
}


  chatfunction = async(room,email,id,nextID) => {

this.selectchatmember(room);

  
var string=id;
localStorage.setItem("onChangeId", id);
var string_first_concate=string.toString().split("_")[0];
var string_last_concate=string.toString().split("_")[1]; 
localStorage.getItem('globaluserid');
localStorage.getItem('globalspecialistid');



if(string_first_concate=='user')
{

    axios.get(process.env.REACT_APP_BASE_URL+'/customerAPI/GetCustomerDetailsByID?customer_id='+parseInt(string_last_concate))
    .then(res => {
         this.setState({ocname : res.data[0]['first_name']}); 
         this.setState({oclastname : res.data[0]['last_name']}); 
         if(res.data[0]['user_image']!=null)
         this.setState({ocimage : process.env.REACT_APP_BASE_URL+'/public/uploads/profile/'+res.data[0]['user_image']});
         this.setState({sname : res.data[0]['first_name']+' '+res.data[0]['last_name']}); 
         if(res.data[0]['user_image']!=null)
         this.setState({simage : process.env.REACT_APP_BASE_URL+'/public/uploads/profile/'+res.data[0]['user_image']});
        });  
 }



if(string_first_concate=='spec')
{
  axios.get(process.env.REACT_APP_BASE_URL+'/specilistAPI/GetSpecialistPrivateDetailsByID?specialist_id='+parseInt(string_last_concate))
    .then(res => {
          this.setState({ocname : res.data[0]['first_name']}); 
          this.setState({oclastname : res.data[0]['last_name']});
          if(res.data[0]['profile_photo']!=null)
          this.setState({ocimage : process.env.REACT_APP_BASE_URL+'/public/uploads/docs/profileresize/'+res.data[0]['profile_photo']}); 

          this.setState({sname : res.data[0]['first_name']+' '+res.data[0]['last_name']});  
          if(res.data[0]['profile_photo']!=null)
          this.setState({simage : process.env.REACT_APP_BASE_URL+'/public/uploads/docs/profileresize/'+res.data[0]['profile_photo']}); 
                  
        }); 

}




if(localStorage.getItem('globaluserid')!=null){ 
  axios.get(process.env.REACT_APP_BASE_URL+'/customerAPI/GetCustomerDetailsByID?customer_id='+parseInt(nextID))
  .then(res => {
       this.setState({uname : res.data[0]['first_name']+' '+res.data[0]['last_name']}); 
       if(res.data[0]['user_image']!=null)
       this.setState({uimage : process.env.REACT_APP_BASE_URL+'/public/uploads/profile/'+res.data[0]['user_image']}); 
      });  
}

if(localStorage.getItem('globalspecialistid')!=null){
axios.get(process.env.REACT_APP_BASE_URL+'/specilistAPI/GetSpecialistPrivateDetailsByID?specialist_id='+parseInt(localStorage.getItem('globalspecialistid')))
.then(res => {
    this.setState({uname : res.data[0]['first_name']+' '+res.data[0]['last_name']});  
    this.setState({uimage : process.env.REACT_APP_BASE_URL+'/public/uploads/docs/profileresize/'+res.data[0]['profile_photo']}); 
  });  
}
   await axios.get(process.env.REACT_APP_BASE_URL+`/specilistAPI/GetUserQuery?payment_id=`+room)
		.then(res => {
         if(res.data!=null){ 
           if(res.data[0]['specialist_query']!='null')
            this.setState({queryBox : true});  

            this.setState({queryString : res.data[0]['specialist_query']}); 
            if(res.data[0]['user_image']!=null)
            this.setState({userQueryImage : res.data[0]['user_image']}); 
            this.setState({queryTime : true});  
         }
		   
		}); 
 

 //null 'null'
 
    let token = "";
    this.setState({emailOwner:email});
    this.setState({ loading: true });  
    this.setState({ classAcitve: 'chat-scroll-avtive' }); 
    try {
      token = await this.getToken(email);
   } catch {
      throw new Error("unable to get token, please reload this page");
    } 
    const client = await Chat.Client.create(token);

    client.on("tokenAboutToExpire", async () => {
      const token = await this.getToken(email);
      client.updateToken(token);
    });

    client.on("tokenExpired", async () => {
      const token = await this.getToken(email);
      client.updateToken(token);
    });

    client.on("channelJoined", async (channel) => { 
     
      const messages = await channel.getMessages(); 
      this.setState({ messages: messages.items || [] });
      this.scrollToBottom();
    }); 

    try {  
      const channel = await client.getChannelByUniqueName(room);
      await this.joinChannel(channel);
      this.setState({ channel, loading: false });
      this.setState({ classAcitve: 'chat-scroll' }); 
    } catch {
      try {

        const channel = await client.createChannel({
          uniqueName: room,
          friendlyName: room,
        });
        await this.joinChannel(channel);
        this.setState({ channel, loading: false });
        this.setState({ classAcitve: 'chat-scroll' }); 
      } catch(error) {
          if (error.code) {
            console.error("Error Code:", error.code);
          }
          if (error.message) {
            console.error("Error Message:", error.message);
          }
        console.log("unable to create channel, please reload this page"+error);
      }
    }
  }
  

  handleMessageAdded = (message) => { 
    const { messages } = this.state;
     if(message.author!==this.state.emailOwner)

         if(message.media!=null && message.media.state.contentType=='audio/webm')
   {
    
   
   }
     
       if(this.state.triggerMessageSpecialist) {   
        this.setState(
          {
            messages: !!messages ? [...messages, message] : [message],
          },
          this.scrollToBottom
         );  
         this.setState({triggerMessageSpecialist:false}); 
         this.setState({triggerMessage:true}); 

     }


     if(this.state.triggerMessage) {   
      this.setState(
        {
          messages: !!messages ? [...messages, message] : [message],
        },
        this.scrollToBottom
       );  
      // message.body = ''; 
       this.setState({triggerMessage:true}); 
       this.setState({triggerMessageSpecialist:true}); 
        
   }
    



   
  };

  scrollToBottom = () => {
     const messages = document.getElementById('asc');
     let scrollHeight = messages.scrollHeight;
     let height = messages.clientHeight;
     let maxScrollTop = scrollHeight - height;
     messages.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
  };

    allErase = () => {
      window.location.reload();
  };

 

  sendMessage = () => {
    this.setState({recording_url:null});    
    this.setState({image_preview:null});
        const { text, channel,image } = this.state;  

  if (text && String(text).trim()) 
  {
    this.setState({ loading: true }, () => {
         console.log("Loading state set to true");
    });
    channel && channel.sendMessage(text).then(() => {
      
        this.setState({ text: "", loading: false }, () => {
             console.log("Text reset and loading state set to false");
        });
        this.setState({ triggerMessage: true }, () => {
            console.log("Trigger message set to true");
        });
    }).catch(error => {
        console.error("Error sending message:", error);
    });
}

          else  {
       const formData = new FormData();
      formData.append('file', document.getElementById('formInputFile')[0].files[0]);

      channel.sendMessage(formData);

    }
 }


  render() {
    const { loading, text, messages, channel } = this.state;
   // const { id,name,path,c_name,c_path} = this.props;
    const { location } = this.props;
    const { state } = location || {};  
    const id= this.props.id;

  

    //  name=this.props.name; 
   // const path= this.props.path;
   // const c_name=this.props.c_name;
   // const c_path=this.props.c_path;
 

    // console.log('loading'); 
    // console.log(loading);

    return (
      <React.Fragment>
      <div className="chat-cont-left">
      <div className="chat-header">
        <span>Chats</span>
       
      </div>
      <form className="chat-search">
        <div className="input-group">
          <div className="input-group-prepend">
            <i className="fas fa-search"></i>
          </div>
          <input type="text" className="form-control" placeholder="Search"  onChange={this.handleChange.bind(this)} />
        </div>
      </form>
      <div className="chat-users-list">
      <div className="chat-scroll" >  

 {this.state.booking_chat_channel.filter( (channel)=> {  
    	

 //return (this.state.searchvalue===null||this.state.searchvalue===undefined ||this.state.searchvalue==='')?channel:channel.first_name.toLowerCase()===this.state.searchvalue.toLowerCase();
 return (this.state.searchvalue===null || this.state.searchvalue===undefined  ||this.state.searchvalue==='')?channel: (channel.first_name.toLowerCase().includes(this.state.searchvalue.toLowerCase()) || channel.last_name.toLowerCase().includes(this.state.searchvalue.toLowerCase()) ||  (channel.first_name+' '+channel.last_name).toLowerCase().includes(this.state.searchvalue.toLowerCase()));
   }).map( (channel)=> ( 

      
<a href="javascript:void(0);"  className={channel['twilio_chat_id1'].includes(this.state.selectchatmemberid)?'media  selectedchatmember':'media  '}  onClick={()=>this.chatfunction(channel['payment_stripe_id'],channel['twilio_chat_id1'],'spec_'+channel['specialist_id'],channel['user_id'])}>
         <div className="media-img-wrap specilaist">
             
            <p className="demopart">{ setInterval(() => {this.getSpecialistStatus(channel['specialist_id'])}, 60000*1.2)}</p>
              
           <div className={this.state.specialist_login_time} id="user_part">
           

             <img src={channel['profile_photo']!=null?`${process.env.REACT_APP_BASE_URL}/public/uploads/docs/profileresize/${channel['profile_photo']}` : this.state.defaultImage} alt={channel['first_name'] +' '+channel['last_name']} className="avatar-img rounded-circle" />
           </div>
         </div>
         <div className="media-body">
           <div>
             <div className="user-name">
 

  {channel['first_name']} {channel['last_name']}</div> 
             <div className="user-name">
 { localStorage.getItem('UserTimezone')!=null ? (channel['session_date']!='')?moment.utc(channel['session_date']).tz(localStorage.getItem('UserTimezone')).format('D MMM YYYY h:mm A'):'-' : moment(channel['session_date']).format('D MMM YYYY h:mm A') }
             </div> 
             <div className="user-last-chat">
                  {channel['last_message']} 
              </div>
           </div>
           <div>
             <div className="last-chat-time block"></div>
             <div className="badge badge-success badge-pill"></div>
           </div>
         </div>
 </a>


))}


{this.state.booking_chat_channel2.filter( (channel)=> {  
 return (this.state.searchvalue===null || this.state.searchvalue===undefined  ||this.state.searchvalue==='')?channel: (channel.first_name.toLowerCase().includes(this.state.searchvalue.toLowerCase()) || channel.last_name.toLowerCase().includes(this.state.searchvalue.toLowerCase()) ||  (channel.first_name+' '+channel.last_name).toLowerCase().includes(this.state.searchvalue.toLowerCase()));
   }).map( (channel)=> (	  
             <a href="javascript:void(0);" className={channel['twilio_chat_id2'].includes(this.state.selectchatmemberid)?'media  selectedchatmember':'media  '}  onClick={()=>this.chatfunction(channel['payment_stripe_id'],channel['twilio_chat_id2'],'user_'+channel['user_id'],channel['specialist_id'])}>
                      <div className="media-img-wrap">
                         <div className="avatar avatar-away" id="specialist_part">
                           {channel['user_image'] && channel['user_image']!=null ?
                           <img src={`${process.env.REACT_APP_BASE_URL}/public/uploads/profile/${channel['user_image']}`} alt={channel['first_name'] +' '+channel['last_name']} className="avatar-img rounded-circle" />:
                           <img src={`${process.env.REACT_APP_URL}/assets/img/doctors/doctor-thumb-02.jpg`} alt="User Image" className="avatar-img rounded-circle" />
                          }
                         </div>
                      </div>
                      <div className="media-body">
                        <div>
                          <div className="user-name">{channel['first_name'] +' '+channel['last_name']}
                          </div>
                                <div className="user-name">
                                { localStorage.getItem('SpecialistTimezone')!=null ? (channel['session_date']!='')?moment.utc(channel['session_date']).tz(localStorage.getItem('SpecialistTimezone')).format('D MMM YYYY h:mm A'):'-' : moment(channel['session_date']).format('D MMM YYYY h:mm A') }
 
             </div>
                        </div>
                   
                        <div>
                          <div className="last-chat-time block"></div>
                          <div className="badge badge-success badge-pill"></div>
                        </div>
                      </div>
              </a>

      ))}

              


              
        </div>
       </div>
    </div>
    <div className="chat-cont-right">
   
       
    <div className="chat-header">
                  <a id="back_user_list" href="javascript:void(0)" className="back-user-list">
                    <i className="material-icons">chevron_left</i>
                  </a>
                  <div className="media">
                    <div className="media-img-wrap">
                      <div className={this.state.specialist_login_time}>
                         <img src={`${this.state.ocimage}`} alt="User Image22" className="avatar-img rounded-circle" />
                      </div>
                    </div>
                    <div className="media-body">
                      <div className="user-name">  
                       <div className="user-name"
                       > {this.state.ocname+' '+this.state.oclastname}
                      
                      
                      <div className="input-group-prepend">
                        <div className="btn-file btn">
                          <i className="fa fa-paperclip"></i>
                          <form id="formInputFile">
                             <input type="file" id="rimage" onChange={this.handleChange1.bind(this)}/>  
                          </form>
                        </div>

                         </div>
                         
                          </div>
                       </div>
                   
                    </div>
                  </div>

                  <div className="input-group-prepend"> 
                    </div>

                 
                </div>
   
  <div className="chat-body">  
    <div className={this.state.classAcitve}  id="asc"> 
    {this.state.queryBox && this.state.queryBox!='null' ?
    <li className="MuiListItem-root tets MuiListItem-gutters"><div>
        <div style={styles.author}>
            <div className="avatar">
              <img src={this.state.userQueryImage} alt="User Image22" className="avatar-img rounded-circle" />
            </div> 
            {this.state.ocname+' '+this.state.oclastname}
         </div>
         {(this.state.queryString && this.state.queryString!=null)  ?
          <div style={styles.container}>
              {(this.state.queryString && this.state.queryString!=null && this.state.queryString!=null)  ? this.state.queryString  : '' } 
              <div className="chat-time"> 
              {(this.state.queryString!=null)  ? this.state.queryTime  : '' }
              </div>
           </div>
           : ''}
     
         </div>

         <div>
       
      </div></li>:''
      } 



   {messages &&  messages.map((message) => ( 
              


                  <ChatItem
                      key={message.index}
                      message={message}
                      email={this.state.emailOwner}
                      id={id}
                      name={this.state.emailOwner==message.author?this.state.uname:'goud deepak'}
                      path={this.state.emailOwner==message.author?this.state.uimage:'deepak goud'}
                      c_name={this.state.sname}
                      c_path={this.state.simage} 
                  />
              ))}  
              </div>
           </div> 
           <div className="chat-footer">
           <div className="input-group d-flex "> 
           <Recorder
            record={true}
            title={"New recording"}
            audioURL={this.state.audioDetails.url}
            showUIAudio={true}
            
            handleAudioStop={data => this.handleAudioStop(data)}
            handleOnChange={(value) => this.customFunction()}
            handleAudioUpload={data => this.handleAudioUpload(data)}
            handleReset={() => this.handleReset()}
            /> 
           

             {(this.state.image_preview===undefined || this.state.image_preview===null)  ? <TextField id="text_field" required className="form-control box_sm" placeholder="Type Here" multiline rows={2} value={text} disabled={!channel} onChange={(event) =>this.setState({ text: event.target.value })}/>:<img src={this.state.image_preview} style={{'height':'45px'}}   id="preview_image" /> }

              <IconButton
                style={styles.sendButton}
                onClick={this.sendMessage}
                // disabled={!channel || !text}
              >
               <Send style={styles.sendIcon} />
              </IconButton> 
              </div>
              </div>
    <div>

  
    </div>
   </div>
   
    </React.Fragment>
     
    );
  }
}

const styles = {
  container :{
    maxWidth: "75%",
    borderRadius: 12,
    padding: 16,
    color: "black",
    fontSize: 12,
    backgroundColor: "#fff",
  },
  textField: { width: "100%", borderWidth: 0, borderColor: "transparent" },
  textFieldContainer: { flex: 1, marginRight: 12 },
  gridItem: { paddingTop: 12, paddingBottom: 12 },
  gridItemChatList: { overflow: "auto", height: "70vh" },
  gridItemMessage: { marginTop: 12, marginBottom: 12 },
  sendButton: { backgroundColor: "#0de0fe",width:"7%",height:"50px"},
  sendIcon: { color: "white" },
  mainGrid: { paddingTop: 100, borderWidth: 1 }, 
  author: { fontSize: 10, color: "gray" },
};



export default ChatScreen;
