const React = require('react');
import { connect } from 'react-redux';

const SingleJoinedUser = require('./subComponents/SingleJoinedUser');

class JoinedUsers extends React.Component{

    constructor(props){
        super(props)
        console.log(props)
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
    get joinedUsers(){
        return this.props.joinedUsers.map(item=>{
            return (<div key={item.userName} className="users__user" data-id={item.socket.id}>
                <div className="users__username">
                    {item.userName}
                </div>
                
            </div>);
        });
    }

    render(){
        return (
            <div className='users'>
                {this.joinedUsers}
            </div>
        );
    }

}

module.exports = connect((state)=>{
    return {
        joinedUsers: state.joinedUsers,
        chatReducer: state.chatReducer
    };
})(JoinedUsers);