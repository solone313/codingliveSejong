const React = require('react');

const Link = require('./Link');

class CopyRight extends React.Component{
    
    render(){
        return (
            <div className='copyRight'>
                Fork Me On <Link href='https://github.com/solone313/codingliveSejong'>GitHub</Link>
            </div>
        );
    }

}

module.exports = CopyRight;