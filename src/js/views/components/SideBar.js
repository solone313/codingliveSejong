const React = require('react');

const JoinedUsers = require('./JoinedUsers');
const Chatlower = require('./Chatlower');
class SideBar extends React.Component{

    render(){
        return (
            <aside className='aside'>
                <JoinedUsers />
                <Chatlower />
            </aside>
        );
    }

}

module.exports = SideBar;