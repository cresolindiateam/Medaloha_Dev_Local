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
import { EmojiTransportationOutlined, Send } from "@material-ui/icons";
import axios from "axios";
import ChatItem from "../Components/ChatItem";
const Chat = require("twilio-chat");
require('dotenv').config();


class ChatScreenForSpecialist extends React.Component {
  constructor(props) {
    super(props); 
    this.state = {
      text: "",
      messages: [],
      loading: false,
      channel: null,
      booking_chat_channel:[],
      triggerMessage : false ,
      emailOwner:''
    }; 
    this.scrollDiv = React.createRef();
   
  }

 

  getToken = async (email) => { 
    console.log(email);
    const response = await axios.get(process.env.REACT_APP_BASE_URL+`/chatAPI/token/`+email);
    const { data } = response;
    return data.token;
  };

  componentDidMount = async () => { 


  console.log("testing ajay"); 
    this.setState({ loading: true });  
    axios.get(process.env.REACT_APP_BASE_URL+`/specilistAPI/GetSpecialistChatChannel?specialist_id=`+localStorage.getItem('specialist_id'))
		.then(res => { 
			   this.setState({booking_chat_channel : res.data});  
         if(res.data){ 
          this.setState({chatmasterName:'Dr.' +res.data[0]['first_name']+' '+res.data[0]['last_name']}); 
          this.chatfunction(res.data[0]['payment_stripe_id'],res.data[0]['twilio_chat_id2']); 
        }
		 });  
  };

 
  joinChannel = async (channel) => {
      if (channel.channelState.status !== "joined") {
        await channel.join();
      }  
      console.log('first 6  step');   
      channel.on("messageAdded", this.handleMessageAdded);
     // channel.unbind("messageAdded", this.handleMessageAdded);  
     // console.log('first 7 step'); 
     // channel.off('messageAdded', this.messageAdded); 
  };

 
  chatfunction = async(room, email) => {

    // const { location } = this.props;
    // const { state } = location || {};
    // const { email, room } = state || {};
 
    let token = "";

    this.setState({emailOwner:email});
    // console.log('this.state.emailOwner' + email);
    // console.log(this.state.emailOwner);
  

    this.setState({triggerMessage:false});

    // if (!email || !room) {
    //  // this.props.history.replace("/");
    // }
    // console.log('location'); console.log(location);
    // console.log('state'); console.log(state);
    // console.log('room'); console.log(room);

    console.log('first 1 step'); 

    try {
      token = await this.getToken(email);
      console.log('token new ');
      console.log(token);
   } catch {
      throw new Error("unable to get token, please reload this page");
    } 
    const client = await Chat.Client.create(token);

    console.log('client');
    console.log(client);

    client.on("tokenAboutToExpire", async () => {
      const token = await this.getToken(email);
      client.updateToken(token);
    });

    client.on("tokenExpired", async () => {
      const token = await this.getToken(email);
      client.updateToken(token);
    });

console.log('messagesexist');  
     

    client.on("channelJoined", async (channel) => {
     
      // getting list of all messages since this is an existing channel
      const messages = await channel.getMessages();
      console.log('messages222');  
     

      console.log(messages);
      console.log('channel:');  
      console.log(channel); 
      console.log('messages233332');  
      this.setState({ messages: messages.items || [] });
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
      } catch {
        throw new Error("unable to create channel, please reload this page");
      }
    }
  }


  handleMessageAdded = (message) => {
    const { messages } = this.state;
     console.log('this.state222222-----');
     console.log('message.items true or false :' );
     console.log(this.state.triggerMessage); 

  //   this.state.triggerMessage=true;
     if(this.state.triggerMessage) { 
      this.setState(
        {
          messages: !!messages ? [...messages, message] : [message],
        },
        this.scrollToBottom
       ); 
       console.log('this.state233332-----'); 

       this.setState({triggerMessage:false}); 
     }
    
   
  };

  scrollToBottom = () => {
    // const scrollHeight = this.scrollDiv.current.scrollHeight;
    // const height = this.scrollDiv.current.clientHeight;
    // const maxScrollTop = scrollHeight - height;
    // this.scrollDiv.current.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
  };

  sendMessage = () => {
    this.setState({triggerMessage:true});
    const { text, channel } = this.state;
    console.log("dfsdfsfdfsdff----");

    console.log(String(text).trim());

    if (text && String(text).trim()) {
      this.setState({ loading: true });
      channel && channel.sendMessage(text); 
      this.setState({ text: "", loading: false });

      //channel.on("messageAdded", this.handleMessageAdded);

     // channel.leave();
    } 
  };

  render() {
    const { loading, text, messages, channel } = this.state;
    const { location } = this.props;
    const { state } = location || {};
   // const { email2, room } = state || {};
    //const {email2}  =  this.state.emailOwner;

    //  console.log('emailname'); 
    //  console.log(this.state);

    return (
      <React.Fragment>
      <div class="chat-cont-left test">
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
          <input type="text" class="form-control" placeholder="Search" />
        </div>
      </form>
      <div class="chat-users-list">
      <div class="chat-scroll"> 
        
         
      {this.state.booking_chat_channel.map( (channel)=> (	 
             <a href="javascript:void(0);" class="media"  onClick={()=>this.chatfunction(channel['payment_stripe_id'],channel['twilio_chat_id2'])}>
                      <div class="media-img-wrap">
                        <div class="avatar avatar-away">
                          <img src="assets/img/doctors/doctor-thumb-01.jpg" alt="User Image" class="avatar-img rounded-circle" />
                        </div>
                      </div>
                      <div class="media-body">
                        <div>
                          <div class="user-name">{channel['twilio_chat_id2']}</div>
                          <div class="user-last-chat">Hey, How are you?</div>
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
                        <img src="assets/img/doctors/doctor-thumb-02.jpg" alt="User Image" class="avatar-img rounded-circle" />
                      </div>
                    </div>
                    <div className="media-body">
                      <div className="user-name">Dr. Darren Elder</div>
                   
                    </div>
                  </div>

                  <div className="input-group-prepend"> 
                    </div>

                 
                </div>

                <div className="chat-body">
                <div class="chat-scroll">
  
  {console.log("hello")}
  
    {console.log(messages)}
   
      {messages &&
              messages.map((message) => (
              

                <ChatItem
                  key={message.index}
                  message={message}
                  email={this.state.emailOwner}
                />
              ))} 

              </div>
                </div>
           
           <div className="chat-footer">
           <div class="input-group d-flex">
              <img src="assets/icon/microfono.png" class="microfono_sm_css" style={{height: "42px"}}/>
      
              <TextField
                required

                className="form-control box_sm"
                
                placeholder="Type Here"
               
                multiline
                rows={2}
                value={text}
                disabled={!channel}
                onChange={(event) =>
                  this.setState({ text: event.target.value })
                }
              /> 
              <IconButton
                style={styles.sendButton}
                onClick={this.sendMessage}
                disabled={!channel || !text}
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
  textField: { width: "100%", borderWidth: 0, borderColor: "transparent" },
  textFieldContainer: { flex: 1, marginRight: 12 },
  gridItem: { paddingTop: 12, paddingBottom: 12 },
  gridItemChatList: { overflow: "auto", height: "70vh" },
  gridItemMessage: { marginTop: 12, marginBottom: 12 },
  sendButton: { backgroundColor: "#0de0fe" },
  sendIcon: { color: "white" },
  mainGrid: { paddingTop: 100, borderWidth: 1 },
};

export default ChatScreenForSpecialist;
