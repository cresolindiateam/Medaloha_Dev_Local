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
  
componentWillUnmount() {
  if (this.state.channel) {
    this.state.channel.removeListener("messageAdded", this.handleMessageAdded);
  }
}

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
      // if (channel.channelState.status !== "joined") {
      //   await channel.join();
      // }  
      channel.on("messageAdded", this.handleMessageAdded);
    
  };

 
  chatfunction = async(room, email) => 
  {
    let token = "";
    this.setState({emailOwner:email});
    this.setState({triggerMessage:false});
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
    console.log("Joining existing channel:", room);
    
    await this.joinChannel(channel);
    this.setState({ channel, loading: true });
  } catch (error) {
    console.error("Error joining existing channel:", error);
    
    try {
      const channel = await client.createChannel({
        uniqueName: room,
        friendlyName: room,
      });
      console.log("Created new channel:", room);

      await this.joinChannel(channel);
      this.setState({ channel, loading: false });
    } catch (createError) {
      console.error("Error creating new channel:", createError);
      throw new Error("Unable to create or join channel, please reload this page");
    }
  }
    // try {  
    //   const channel = await client.getChannelByUniqueName(room);
    //   await this.joinChannel(channel);
    //   this.setState({ channel, loading: true });
    // } catch {
    //   try {
    //     const channel = await client.createChannel({
    //       uniqueName: room,
    //       friendlyName: room,
    //     });
    //     await this.joinChannel(channel);
    //     this.setState({ channel, loading: false });
    //   } catch {
    //     throw new Error("unable to create channel, please reload this page");
    //   }
    // }
  }

  handleMessageAdded = (message) => {
    const { messages } = this.state;
     if(this.state.triggerMessage) { 
      this.setState(
        {
          messages: !!messages ? [...messages, message] : [message],
        },
        this.scrollToBottom
       ); 
     }
  };




  scrollToBottom = () => {
     const messages = document.getElementById('asc');
     let scrollHeight = messages.scrollHeight;
     let height = messages.clientHeight;
     let maxScrollTop = scrollHeight - height;
     messages.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
  };

  sendMessage = () => {
    // this.setState({triggerMessage:true});
    const { text, channel } = this.state;
 
if (text && String(text).trim()) {
    console.log("Sending message");
    this.setState({ loading: true }, () => {
        console.log("Loading state set to true");
    });
    channel && channel.sendMessage(text).then(() => {
        console.log("ajay"+text);
        this.setState({ text: "", loading: false }, () => {
            console.log("Text reset and loading state set to false");
        });
        this.setState({triggerMessage:true});
       }).catch(error => {
        console.error("Error sending message:", error);
    });
}

  };

  render() {
    const { loading, text, messages, channel } = this.state;
    const { location } = this.props;
    const { state } = location || {};
   

    return (
      <React.Fragment>
      <div class="chat-cont-left test">
      <div class="chat-header">
        <span>Chatsdhbhbdhbdbhdh</span>
        
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
             <a href="javascript:void(0);" class="media"  onClick={()=>this.chatfunction(channel['payment_stripe_id'],channel['twilio_chat_id2']))}>
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
                          <div class="last-chat-time block"></div>
                          <div class="badge badge-success badge-pill"></div>
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
