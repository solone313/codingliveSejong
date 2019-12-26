const React = require('react');
import { connect } from 'react-redux';

class Chatlower extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            chat: [],
        }
    }
    get chatReducer(){
        return this.props.chatReducer.map(item=>{
            return (
                <div>
                    {item.chat}
                </div>
            );
        });
    }
    componentDidMount(){
        this.refs.chatReducer.onclick = () => {
            console.log("아야");
        }
    
    }
    render(){
        return (
            <div className='users'>
                {this.joinedUsers}
                <div className="chating_server">
                    <div>
                        <textarea id="chat-area" style={{width:"220px"}} rows="20" readOnly>{this.chatReducer}</textarea>
                    </div>
                    
                        <input type="text" id="chat-message" style={{width:"220px"}}/>
                    <div ref='chatReducer'>
                        <input type="button" id="chat-send"/>
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