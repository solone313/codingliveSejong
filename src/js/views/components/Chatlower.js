const React = require('react');
import { connect } from 'react-redux';

class Chatlower extends React.Component{

    constructor() {
        super();
        this.state = { time: {}, seconds: 11 };
        this.timer = 0;
        this.startTimer = this.startTimer.bind(this);
        this.countDown = this.countDown.bind(this);
      }
    
      secondsToTime(secs){
        let hours = Math.floor(secs / (60 * 60));
    
        let divisor_for_minutes = secs % (60 * 60);
        let minutes = Math.floor(divisor_for_minutes / 60);
    
        let divisor_for_seconds = divisor_for_minutes % 60;
        let seconds = Math.ceil(divisor_for_seconds);
    
        let obj = {
          "h": hours,
          "m": minutes,
          "s": seconds
        };
        return obj;
      }
    
      componentDidMount() {
        let timeLeftVar = this.secondsToTime(this.state.seconds);
        this.setState({ time: timeLeftVar });
        this.startTimer();
      }
    
      startTimer() {
        if (this.timer == 0 && this.state.seconds > 0) {
          this.timer = setInterval(this.countDown, 1000);
        }
      }
    
      countDown() {
        // Remove one second, set state so a re-render happens.
        let seconds = this.state.seconds - 1;
        this.setState({
          time: this.secondsToTime(seconds),
          seconds: seconds,
        });
        
        // Check if we're at zero.
        if (seconds == 1) { 
          this.state.seconds = 11;
        }
      }
    
    render(){
        return (

            <div className='users'>
                {this.joinedUsers}
                <div className="chating_server">
                    <div className="timer">
         {this.state.time.m}분 {this.state.time.s}초 후 교대</div>
                    <div>
                        <textarea id="chat-area" style={{width:"220px"}} rows="20" readOnly></textarea>
                    </div>
                    <div ref='chatReducer'>
                        <input type="text" id="chat-message" style={{width:"220px"}}/>
                    
                        <input type="button" id="chat-send" value="send"/>
                    </div>
                </div>
            </div>
        );
    }

}

module.exports = connect((state)=>{
    return {
        chatReducer: state.chatReducer
    };
})(Chatlower);