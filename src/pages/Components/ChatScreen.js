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
     
    }; 
    this.scrollDiv = React.createRef();
    console.log('this.scrollDiv');
    console.log(this.scrollDiv);

    //console.log("localStorage.getItem('Channel')22222");

   // console.log(props.id);
   
  }

 

  getToken = async (email) => { 
   // console.log(email);
    const response = await axios.get(process.env.REACT_APP_BASE_URL+`/chatAPI/token/`+email);
    const { data } = response;
    return data.token;
  };

  handleAudioStop(data) {
    console.log(data)
    this.setState({ audioDetails: data });
  }



  handleOnChange(value, audioname ){
    console.log('handleOnChange');
    console.log(audioname);
     console.log(value);
  }

 async handleAudioUpload(file) {
    console.log('uploaded file on twilio')
    console.log(file);

    this.state.channel.sendMessage({
        contentType: 'audio/webm',
          media:file,
      }); 

   await this.joinChannel(this.state.channel); 
   
    
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
$("._1ceqH .3bC73 .1YOWG ._3bC73 ._1Yplu").hide();
 //window.location.reload();

}

  handleChange(event) {
    this.setState({searchvalue: event.target.value});
  }

  // handleChange1(event) {
  //   const [file] = event.target.files
  // if (file) {
  //    var  src = URL.createObjectURL(file)  
  //   this.setState({image_preview: src});
  // }
  // }


  handleChange1(event) {   
    const [file] = event.target.files
    if (file) {
      var  src = URL.createObjectURL(file) 
      this.setState({image_preview: src});
    }
 }



  componentDidMount = async () => {  


     
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
    

    this.setState({uname:this.props.name});
    this.setState({uimage:this.props.path}); 
    this.setState({sname:this.props.c_name});
    this.setState({simage:this.props.c_path}); 
    
    console.log(localStorage.getItem('customer_id'));


    console.log('');

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

console.log('specialist_id');
    console.log(localStorage.getItem('specialist_id'));
    if(localStorage.getItem('specialist_id')!=null){
      localStorage.setItem('globalspecialistid',localStorage.getItem('specialist_id'));
      axios.get(process.env.REACT_APP_BASE_URL+`/specilistAPI/GetSpecialistChatChannel?specialist_id=`+localStorage.getItem('specialist_id'))
      .then(res => { 
           this.setState({booking_chat_channel2 : res.data});  
            console.log('res.data3--->');  
            console.log(res.data);  
           if(res.data){ 
            this.setState({chatmasterName:res.data[0]['first_name']+' '+res.data[0]['last_name']}); 
            this.chatfunction(res.data[0]['payment_stripe_id'],res.data[0]['twilio_chat_id2'],"user_"+res.data[0]['user_id'],res.data[0]['specialist_id']);
            this.setState({ loading: true });  
          }
       });   
    } 
  };


  

 
  joinChannel = async (channel) => {
      if (channel.channelState.status !== "joined") {
        await channel.join();
      }  
      console.log('first 6  step');   
  
  console.log(channel);   
  //const channel = await client.getChannelByUniqueName(room);


      channel.on("messageAdded", this.handleMessageAdded);
     // channel.unbind("messageAdded", this.handleMessageAdded);  
     // console.log('first 7 step'); 
     // channel.off('messageAdded', this.messageAdded); 
  };


  // chatfunction = async(room, email) => {

  //   // const { location } = this.props;
  //   // const { state } = location || {};
  //   // const { email, room } = state || {};

  //   console.log(`/specilistAPI/GetUserQuery?payment_id=`+room);

  //  await axios.get(`/specilistAPI/GetUserQuery?payment_id=`+room)
	// 	.then(res => {
  //         console.log('specialist query');  console.log(res.data);
  //        if(res.data){
  //           this.setState({queryBox : true});  
  //           this.setState({queryString : res.data});  
  //           this.setState({queryTime : true});  
  //        }
		   
	// 	}); 
 
 
  //   let token = "";

  //   this.setState({emailOwner:email});
  //   // console.log('this.state.emailOwner' + email);
  //   // console.log(this.state.emailOwner);
  

  // // this.setState({triggerMessage:false});

  //   // if (!email || !room) {
  //   //  // this.props.history.replace("/");
  //   // }
  //   // console.log('location'); console.log(location);
  //   // console.log('state'); console.log(state);
  //   // console.log('room'); console.log(room);

  //   console.log('first 1 step'); 
  //   this.setState({ loading: true });  
  //   this.setState({ classAcitve: 'chat-scroll-avtive' }); 
  //   try {
  //     token = await this.getToken(email);
  //     console.log('token new ');
  //     console.log(token);
  //  } catch {
  //     throw new Error("unable to get token, please reload this page");
  //   } 
  //   const client = await Chat.Client.create(token);

  //   console.log('client');
  //   console.log(client);

  //   client.on("tokenAboutToExpire", async () => {
  //     const token = await this.getToken(email);
  //     client.updateToken(token);
  //   });

  //   client.on("tokenExpired", async () => {
  //     const token = await this.getToken(email);
  //     client.updateToken(token);
  //   });

  //   client.on("channelJoined", async (channel) => {
     
  //     // getting list of all messages since this is an existing channel
  //     const messages = await channel.getMessages();
  //     console.log('messages222');  
  //     console.log(messages);
  //     console.log('channel:');  
  //     console.log(channel); 
  //     console.log('messages233332');  
  //     this.setState({ messages: messages.items || [] });
  //     this.scrollToBottom();
  //   }); 

  //   console.log('first 2 step'); 

  //   try {  
  //     console.log('first 2 step'+room);  
  //     const channel = await client.getChannelByUniqueName(room);
  //     console.log('first 3 step'); 
  //     console.log(channel); 
  //     await this.joinChannel(channel);
  //     this.setState({ channel, loading: false });
  //     this.setState({ classAcitve: 'chat-scroll' }); 
  //   } catch {
  //     try {
  //       console.log('first try 4  step'); 
  //       const channel = await client.createChannel({
  //         uniqueName: room,
  //         friendlyName: room,
  //       });
  //       console.log('first 4 step'); 
  //       await this.joinChannel(channel);
  //       this.setState({ channel, loading: false });
  //       this.setState({ classAcitve: 'chat-scroll' }); 
  //     } catch {
  //       throw new Error("unable to create channel, please reload this page");
  //     }
  //   }
  // }
  

chatfunction = async(room,email,id,nextID) => {

    // const { location } = this.props;
    // const { state } = location || {};
    // const { email, room } = state || {};
 

var string=id;
console.log('chatscreen data');
console.log(string);
localStorage.setItem("onChangeId", id);
var string_first_concate=string.toString().split("_")[0];
var string_last_concate=string.toString().split("_")[1]; 

localStorage.getItem('globaluserid');
localStorage.getItem('globalspecialistid');



if(string_first_concate=='user')
{

    axios.get(process.env.REACT_APP_BASE_URL+'/customerAPI/GetCustomerDetailsByID?customer_id='+parseInt(string_last_concate))
    .then(res => {
          console.log('users data-----!');
         this.setState({ocname : res.data[0]['first_name']}); 
         this.setState({oclastname : res.data[0]['last_name']}); 
         if(res.data[0]['user_image']!=null)
         this.setState({ocimage : process.env.REACT_APP_BASE_URL+'/public/uploads/profile/'+res.data[0]['user_image']});
         this.setState({sname : res.data[0]['first_name']+' '+res.data[0]['last_name']}); 
         if(res.data[0]['user_image']!=null)
         this.setState({simage : process.env.REACT_APP_BASE_URL+'/public/uploads/profile/'+res.data[0]['user_image']});
        });  
 
      // axios.get('/specilistAPI/GetSpecialistPrivateDetailsByID?specialist_id='+parseInt(nextID))
      // .then(res => {
      //   console.log('specialist data');
      //   console.log(res);
      //       this.setState({uname : res.data[0]['first_name']+' '+res.data[0]['last_name']});  
      //       this.setState({uimage : '/public/uploads/docs/profileresize/'+res.data[0]['profile_photo']}); 
                    
      //     });  
}



if(string_first_concate=='spec')
{
  axios.get(process.env.REACT_APP_BASE_URL+'/specilistAPI/GetSpecialistPrivateDetailsByID?specialist_id='+parseInt(string_last_concate))
    .then(res => {
          console.log('specialist data');
          console.log(res);
          this.setState({ocname : res.data[0]['first_name']}); 
          this.setState({oclastname : res.data[0]['last_name']});
          if(res.data[0]['profile_photo']!=null)
          this.setState({ocimage : process.env.REACT_APP_BASE_URL+'/public/uploads/docs/profileresize/'+res.data[0]['profile_photo']}); 

          this.setState({sname : res.data[0]['first_name']+' '+res.data[0]['last_name']});  
          if(res.data[0]['profile_photo']!=null)
          this.setState({simage : process.env.REACT_APP_BASE_URL+'/public/uploads/docs/profileresize/'+res.data[0]['profile_photo']}); 
                  
        }); 

        // axios.get('/customerAPI/GetCustomerDetailsByID?customer_id='+parseInt(nextID))
        // .then(res => {
        //   console.log('users data');
        //      this.setState({uname : res.data[0]['first_name']+' '+res.data[0]['last_name']}); 
        //      this.setState({uimage : '/public/uploads/profile/'+res.data[0]['user_image']});


        //     });  

}




if(localStorage.getItem('globaluserid')!=null){ 
  axios.get(process.env.REACT_APP_BASE_URL+'/customerAPI/GetCustomerDetailsByID?customer_id='+parseInt(nextID))
  .then(res => {
    console.log('users data');
       this.setState({uname : res.data[0]['first_name']+' '+res.data[0]['last_name']}); 

       if(res.data[0]['user_image']!=null)
       this.setState({uimage : process.env.REACT_APP_BASE_URL+'/public/uploads/profile/'+res.data[0]['user_image']}); 


      });  

}

if(localStorage.getItem('globalspecialistid')!=null){
axios.get(process.env.REACT_APP_BASE_URL+'/specilistAPI/GetSpecialistPrivateDetailsByID?specialist_id='+parseInt(localStorage.getItem('globalspecialistid')))
.then(res => {
console.log('specialist data');
console.log(res);
    this.setState({uname : res.data[0]['first_name']+' '+res.data[0]['last_name']});  
    this.setState({uimage : process.env.REACT_APP_BASE_URL+'/public/uploads/docs/profileresize/'+res.data[0]['profile_photo']}); 
            
  });  
}


    console.log(`/specilistAPI/GetUserQuery?payment_id=`+room);

   await axios.get(process.env.REACT_APP_BASE_URL+`/specilistAPI/GetUserQuery?payment_id=`+room)
		.then(res => {
          console.log('specialist query');  
          console.log(res.data);
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
    // console.log('this.state.emailOwner' + email);
    // console.log(this.state.emailOwner);
  

  // this.setState({triggerMessage:false});

    // if (!email || !room) {
    //  // this.props.history.replace("/");
    // }
    // console.log('location'); console.log(location);
    // console.log('state'); console.log(state);
    // console.log('room'); console.log(room);

    console.log('first 1 step'); 
    this.setState({ loading: true });  
    this.setState({ classAcitve: 'chat-scroll-avtive' }); 
    try {
      token = await this.getToken(email)
;
      console.log('token new ');
      console.log(token);
   } catch {
      throw new Error("unable to get token, please reload this page");
    } 
    const client = await Chat.Client.create(token);

    console.log('client');
    console.log(client);

    client.on("tokenAboutToExpire", async () => {
      const token = await this.getToken(email)
;
      client.updateToken(token);
    });

    client.on("tokenExpired", async () => {
      const token = await this.getToken(email)
;
      client.updateToken(token);
    });

    client.on("channelJoined", async (channel) => { 
     

     console.log('messages1');
      // getting list of all messages since this is an existing channel
      const messages = await channel.getMessages(); 

console.log('messages');
console.log(messages);


      this.setState({ messages: messages.items || [] });

    //   console.log('messages Console'); 
    //   console.log(messages);

    //  var fruites=[]; 
            
    //   messages.items.forEach(message => {  
      
    //   if(message.type === 'media') 
    //   {  
    //     message.media.getContentTemporaryUrl().then(function(url) { 
    //     fruites.push(url); 
    //   if(message.media.contentType==='image/png'||message.media.contentType==='image/jpeg')
    //   {
    //      localStorage.setItem('mediaurl'+message.sid,url); 
    //   }
    //   else
    //   {
    //     localStorage.setItem('mediaurl'+message.sid,url+'&image=false'); 
    //   }
    //   });
    //   } else { 
    //   fruites.push('text'); 
    //   localStorage.setItem('mediaurl'+message.sid,'text');
    //   this.setState({messageMedia:fruites || []}); 

    //   } 

    //   });


      this.scrollToBottom();
    }); 

    console.log('first 2 step'); 

    try {  
      console.log('first 2 step'+room);  
      const channel = await client.getChannelByUniqueName(room);
      console.log('first 3 step'); 
      console.log(channel); 
      await this.joinChannel(channel);
      this.setState({ channel, loading: false });
      this.setState({ classAcitve: 'chat-scroll' }); 
    } catch {
      try {
        console.log('first try 4  step'); 
        const channel = await client.createChannel({
          uniqueName: room,
          friendlyName: room,
        });
        console.log('first 4 step'); 
        await this.joinChannel(channel);
        this.setState({ channel, loading: false });
        this.setState({ classAcitve: 'chat-scroll' }); 
      } catch {
        throw new Error("unable to create channel, please reload this page");
      }
    }
  }
  

  handleMessageAdded = (message) => { 
    console.log('Final message');
    console.log(message.body);
   // console.log(message.media.state.contentType=='audio/webm');
    console.log('Final message Ebd');
    const { messages } = this.state;
     console.log('this.state222222-----');
     console.log('message.items true or false :' );
     console.log(this.state.triggerMessage); 

     console.log('this.authoer and owner-----');
     console.log(message.author);
     console.log(this.state.emailOwner);

     if(message.author!==this.state.emailOwner) 
     
      // this.setState({triggerMessageSpecialist:true}); 


      console.log('triggerMessageSpecialist-----'); 
      console.log(this.state.triggerMessageSpecialist);

       if(this.state.triggerMessageSpecialist) {   
        this.setState(
          {
            messages: !!messages ? [...messages, message] : [message],
          },
          this.scrollToBottom
         );  
         console.log('Step111-----'); 
         console.log(this.state.messages);
        // message.body = ''; 
         this.setState({triggerMessageSpecialist:false}); 
        // this.setState({refreshPage:true}); 
     }


     console.log('triggerMessage-----'); 
     console.log(this.state.triggerMessage);
    if(this.state.triggerMessage) {   
      this.setState(
        {
          messages: !!messages ? [...messages, message] : [message],
        },
        this.scrollToBottom
       );  
       console.log('Step222-----'); 
       console.log(this.state.messages);
      // message.body = ''; 
       this.setState({triggerMessage:false}); 
       this.setState({triggerMessageSpecialist:true});  
   }
    

   if(message.media!=null && message.media.state.contentType=='audio/webm'){
      window.location.reload();
   }
   
  };

  scrollToBottom = () => {
     const messages = document.getElementById('asc');
     let scrollHeight = messages.scrollHeight;
     let height = messages.clientHeight;
     let maxScrollTop = scrollHeight - height;
     messages.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
  };

  // sendMessage = () => {
  //   this.setState({triggerMessage:true});
  //   console.log("fsdfsdssssssss----"+this.state.triggerMessage);
  //   const { text, channel } = this.state;
  //   console.log("dfsdfsfdfsdff----"+this.state.triggerMessage); 
  //   console.log(String(text).trim()); 
  //   if (text && String(text).trim()) {
  //     this.setState({ loading: true });
  //     channel && channel.sendMessage(text); 
  //     this.setState({ text: "", loading: false });
  //     this.setState({triggerMessage:true});
  //     //channel.on("messageAdded", this.handleMessageAdded); 
  //     // channel.leave();
  //   } 
  // };

  sendMessage = () => {
   // document.getElementById("recordings").innerHTML = ""; 
    this.setState({recording_url:null});    
    this.setState({image_preview:null});
        this.setState({triggerMessage:true}); 
        const { text, channel,image } = this.state;  

        if (text && String(text).trim()) {
          this.setState({ loading: true }); 
           channel && channel.sendMessage(text);  
           this.setState({ text: "", loading: false });
           this.setState({triggerMessage:true}); 
        }   else  {
 
//   if(document.getElementById('rimage').value===null || document.getElementById('rimage').value===undefined || document.getElementById('rimage').value==='')
// { 
      const formData = new FormData();
      formData.append('file', document.getElementById('formInputFile')[0].files[0]);
      console.log('aaa');
      console.log(formData); 
      channel.sendMessage(formData);
//}
// else
// {
 
// var audioBlob=document.getElementById('rimage2').value;
// const str = "http://localhost:3000/assets/img/doctors/doctor-thumb-02.jpg";
// // convert string to Buffer 
// channel.sendMessage(audioBlob);

 
// }

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
 

    console.log('loading'); 
    console.log(loading);

    return (
      <React.Fragment>
      <div class="chat-cont-left">
      <div class="chat-header">
        <span>Chats</span>
        <a href="javascript:void(0)" class="chat-compose">
          <i class="material-icons">control_point</i>
        </a>
      </div>
      <form class="chat-search">
        <div class="input-group">
          <div class="input-group-prepend">
            <i class="fas fa-search"></i>
          </div>
          <input type="text" class="form-control" placeholder="Search"  onChange={this.handleChange.bind(this)} />
        </div>
      </form>
      <div class="chat-users-list">
      <div class="chat-scroll" >  

 {this.state.booking_chat_channel.filter( (channel)=> {  
    	console.log('searching chating');
      console.log(channel);
 //return (this.state.searchvalue===null||this.state.searchvalue===undefined ||this.state.searchvalue==='')?channel:channel.first_name.toLowerCase()===this.state.searchvalue.toLowerCase();
 return (this.state.searchvalue===null || this.state.searchvalue===undefined  ||this.state.searchvalue==='')?channel: (channel.first_name.toLowerCase().includes(this.state.searchvalue.toLowerCase()) || channel.last_name.toLowerCase().includes(this.state.searchvalue.toLowerCase()) ||  (channel.first_name+' '+channel.last_name).toLowerCase().includes(this.state.searchvalue.toLowerCase()));
   }).map( (channel)=> ( 
      
<a href="javascript:void(0);" class="media"  onClick={()=>this.chatfunction(channel['payment_stripe_id'],channel['twilio_chat_id1'],'spec_'+channel['specialist_id'],channel['user_id'])}>
         <div class="media-img-wrap specilaist">
           <div class="avatar avatar-away " id="user_part">
             <img src={channel['profile_photo']!=null?`${process.env.REACT_APP_BASE_URL}/public/uploads/docs/profileresize/${channel['profile_photo']}` : this.state.defaultImage} alt={channel['first_name'] +' '+channel['last_name']} class="avatar-img rounded-circle" />
           </div>
         </div>
         <div class="media-body">
           <div>
             <div class="user-name">{channel['first_name']} {channel['last_name']}</div> 
             <div class="user-last-chat">
                  {channel['last_message']} 
              </div>
           </div>
           <div>
             <div class="last-chat-time block">0 min</div>
             <div class="badge badge-success badge-pill">15</div>
           </div>
         </div>
 </a>


))}


{this.state.booking_chat_channel2.filter( (channel)=> {  
 return (this.state.searchvalue===null || this.state.searchvalue===undefined  ||this.state.searchvalue==='')?channel: (channel.first_name.toLowerCase().includes(this.state.searchvalue.toLowerCase()) || channel.last_name.toLowerCase().includes(this.state.searchvalue.toLowerCase()) ||  (channel.first_name+' '+channel.last_name).toLowerCase().includes(this.state.searchvalue.toLowerCase()));
   }).map( (channel)=> (	  
             <a href="javascript:void(0);" class="media"  onClick={()=>this.chatfunction(channel['payment_stripe_id'],channel['twilio_chat_id2'],'user_'+channel['user_id'],channel['specialist_id'])}>
                      <div class="media-img-wrap">
                         <div class="avatar avatar-away" id="specialist_part">
                           {channel['user_image'] && channel['user_image']!=null ?
                           <img src={`${process.env.REACT_APP_BASE_URL}/public/uploads/profile/${channel['user_image']}`} alt={channel['first_name'] +' '+channel['last_name']} class="avatar-img rounded-circle" />:
                           <img src={`${process.env.REACT_APP_URL}/assets/img/doctors/doctor-thumb-02.jpg`} alt="User Image" class="avatar-img rounded-circle" />
                          }
                         </div>
                      </div>
                      <div class="media-body">
                        <div>
                          <div class="user-name">{channel['first_name'] +' '+channel['last_name']}</div>
                        </div>
                        <div>
                          <div class="last-chat-time block">2 min</div>
                          <div class="badge badge-success badge-pill">15</div>
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
                      <div className="avatar avatar-online">
                         <img src={`${this.state.ocimage}`} alt="User Image22" class="avatar-img rounded-circle" />
                      </div>
                    </div>
                    <div className="media-body">
                      <div className="user-name">  
                       <div className="user-name"
                       > {this.state.ocname+' '+this.state.oclastname}
                      
                      
                      <div class="input-group-prepend">
                        <div class="btn-file btn">
                          <i class="fa fa-paperclip"></i>
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
    <div class={this.state.classAcitve}  id="asc"> 
    {this.state.queryBox && this.state.queryBox!='null' ?
    <li class="MuiListItem-root tets MuiListItem-gutters"><div>
        <div style={styles.author}>
            <div class="avatar">
              <img src={this.state.userQueryImage} alt="User Image22" class="avatar-img rounded-circle" />
            </div> 
            {this.state.ocname+' '+this.state.oclastname}
         </div>
         {(this.state.queryString && this.state.queryString!=null)  ?
          <div style={styles.container}>
              {(this.state.queryString && this.state.queryString!=null)  ? this.state.queryString  : '' } 
              <div class="chat-time"> 
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
           <div class="input-group d-flex"> 
           <Recorder
            record={true}
            title={"New recording"}
            audioURL={this.state.audioDetails.url}
            showUIAudio
            handleAudioStop={data => this.handleAudioStop(data)}
            handleOnChange={(value) => this.handleOnChange(value, 'firstname')}
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
  sendButton: { backgroundColor: "#0de0fe" },
  sendIcon: { color: "white" },
  mainGrid: { paddingTop: 100, borderWidth: 1 }, 
  author: { fontSize: 10, color: "gray" },
};



export default ChatScreen;
