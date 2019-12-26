const React = require('react');

const Icon = require('./Icon');

import { connect } from 'react-redux';

const Compiler = require('../compilers/Compiler');

class Header extends React.Component{

    render(){
        return (
            <header className="header">
                <div className="header__left-side">
                    <div className="header__side-icon">
                        <Icon onClick={this.disconnect.bind(this)} clickable={true} color='red' icon='power_settings_new' />
                    </div>
                </div>
                <div className="header__ip-address">
                    {this.props.general.ip}:{this.props.general.port}
                </div>
                <div className="header__right-side">
                    <div className="header__side-icon">
                        <input id='chat-message' type='text'></input>
                        <Icon onClick={this.sync.bind(this)} clickable={true} icon='check' />
                        <Icon onClick={this.sync2.bind(this)} clickable={true} icon='sync' />                    
                        <Icon onClick={this.run.bind(this)} clickable={true} color='green' icon='play_arrow' />
                    </div>
                </div>
            </header>
        );
    }

    run(){

        socketHandler.emit('run',{});

        Compiler.compile(this.props.selectedLanguage.latinName, mainEditor.getValue());

    }

    disconnect(){

        socketHandler.disConnect();

        // Let's show the choosingPage

        this.props.dispatch({
            type: 'SHOW_LOGIN'
        })
    }
    
    sync2(){
        socketHandler.clientEmit('refresh',{});
        socketHandler.serverEmit('refresh',{});
    }

    sync(){
        console.log("sync")
       
        var ddd =  $('#chat-message').value;
        socketHandler.clientEmit('letsSync',ddd);
        socketHandler.serverEmit('letsSync',ddd);
        $('#chat-message').value = '';
    }

}

module.exports = connect((state)=>{
    return {
        selectedLanguage: state.selectedLanguage,
        general: state.general
    };
})(Header);