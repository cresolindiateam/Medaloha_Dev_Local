import React from "react";
import { ListItem } from "@material-ui/core";
import axios from "axios";
require('dotenv').config();


class ChatItem extends React.Component {


constructor(props) {
  super(props);
 this.state = {
    urldata:"",
    fname:""  ,
    mediaUrl:"",
    audioUrl:""
   } 
}
  

  formatAMPM= (date)=> {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

  componentDidMount(){
    const { message, email,id,name,path,c_name,c_path} = this.props;
    
       if(message.media){
        if(message.media.contentType=='image/png' || message.media.contentType=='image/jpeg' ){
          axios.get(process.env.REACT_APP_BASE_URL+'/authenticationAPI/TwilioApi?media='+message.media.sid)
          .then(res => { 
            console.log('mytwilorapi');
               console.log(res.data.links);
              // MediaData = res.data.links.content_direct_temporary;
               this.setState({mediaUrl:res.data.links.content_direct_temporary})
              // console.log(res.data);
           });  
        } else {
          axios.get(process.env.REACT_APP_BASE_URL+'/authenticationAPI/TwilioApi?media='+message.media.sid)
          .then(res => { 
            console.log('mytwilorapi');
               console.log(res.data.links);
              // MediaData = res.data.links.content_direct_temporary;
               this.setState({audioUrl:res.data.links.content_direct_temporary})
              // console.log(res.data);
           });  
        }
      
       }
       
   }


  render() { 
      // const { message, email } = this.props;
   
     const { message, email,id,name,path,c_name,c_path,MediaKey,Media } = this.props;
     const isOwnMessage = message.author === email;   

        let  MediaData =  this.state.mediaUrl;
        let  AudioData =  this.state.audioUrl;
     //const MediaData = Media; 
    // const params = new URLSearchParams(MediaData) 
   //  const paramsvalue=params.get('image');


     console.log('isOwnMessage');
     console.log(MediaData); 
     console.log(this.props); 
     console.log(message);  
     console.log('isOwnMessageEnd'); 

 
    return ( 
      <ListItem  className="tets" style={styles.listItem(isOwnMessage)}>
        <div  style={styles.author}> 
             <div class="avatar">
                  <img src={`${isOwnMessage?path:c_path}`}  alt="User Image" class="avatar-img rounded-circle"/> 
              </div>
            {`${isOwnMessage?name:c_name}`}
        </div>
           <div style={styles.container(isOwnMessage)}>
           {
            message.body===null?(AudioData!='')?<audio controls   ><source src={AudioData} /></audio>:<img src={`${MediaData}`} alt={MediaData} style={{width:'100px',height:'60px'}} />:message.body

           // message.body===null?<img src={`${MediaData}`} alt={MediaData} style={{width:'100px',height:'60px'}} />:message.body
           }
          <div className="chat-time">
          {(message.media===null)?'':<div class="chat-msg-attachments"><div class="chat-attachment"><img src={`${this.state.urldata}`} /><div class="chat-attach-caption">{this.state.fname}</div><a href={`${this.state.urldata+'?force=true'}`} target="_blank" class="chat-attach-download"><i class="fas fa-download"></i></a></div></div>}
            {  
             this.formatAMPM(new Date(message.dateCreated)) 
             //new Date(message.dateCreated.toISOString()).toLocaleString()
            }
          </div>
        </div>
      </ListItem>
    );
  }
}

const styles = {
  listItem: (isOwnMessage) => ({
    flexDirection: "column",
    alignItems: isOwnMessage ? "flex-end" : "flex-start",
  }),
  container: (isOwnMessage) => ({
    maxWidth: "75%",
    borderRadius: 12,
    padding: 16,
    color: "black",
    fontSize: 12,
    backgroundColor: isOwnMessage ? "#e3e3e3" : "#fff",
  }),
  author: { fontSize: 10, color: "gray" },
  timestamp: { fontSize: 8, color: "white", textAlign: "right", paddingTop: 4 },
};

export default ChatItem;