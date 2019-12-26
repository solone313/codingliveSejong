const React = require('react');

import { connect } from 'react-redux';

class MonacoEditor extends React.Component{

    constructor(props){
        super(props)
        this._editor;
    }

    componentDidMount() {      

        const path = require('path');

		const amdLoader = require('../../../../node_modules/monaco-editor/min/vs/loader.js');
		const amdRequire = amdLoader.require;
		const amdDefine = amdLoader.require.define;
		function uriFromPath(_path) {
			var pathName = path.resolve(_path).replace(/\\/g, '/');
			if (pathName.length > 0 && pathName.charAt(0) !== '/') {
				pathName = '/' + pathName;
			}
			return encodeURI('file://' + pathName);
		}
		amdRequire.config({
			baseUrl: uriFromPath(path.join(__dirname, '../../../../node_modules/monaco-editor/min'))
		});
		// workaround monaco-css not understanding the environment
        self.module = undefined;
        

        let selectedLanguage = this.props.selectedLanguage.name.toLowerCase();

		amdRequire(['vs/editor/editor.main'], ()=>{
			this._editor = monaco.editor.create(document.getElementById('monaco-editor'), {
                value: `<html>
    <head>
    <title>
        Title of the page
    </title>
    </head>
    <body>
                
    <p>
        Hello World
    </p>
                
    </body>
    </html>`,
                language: selectedLanguage,
                theme:'vs-dark'
            });
            
            window.mainEditor = this._editor;

            // Let's init socket events

            this.initSocketEvents();

            window.onresize = ()=>{
                this._editor.layout();
            }
        });

    }

    componentDidUpdate(){
        let selectedLanguage = this.props.selectedLanguage.latinName.toLowerCase();
        monaco.editor.setModelLanguage(this._editor.getModel(), selectedLanguage)

        mainEditor.layout();
    }

    initSocketEvents(){

        this.editor.cursor.onDidChange((data)=>{
            socketHandler.emit("cursorChange", data)
        })

        this.editor.getModel().onDidChangeContent((data)=>{
            socketHandler.emit("contentChange", data)
        })

        this.editor.onDidScrollChange((data)=>{
            socketHandler.emit("scrollChange", data)
        })        

    }

    get editor(){
        return this._editor;
    }
    
    render(){
        return (
            <div id="monaco-editor" className="monaco-editor"></div>
        );
    }

}

module.exports = connect((state)=>{
    return {
        selectedLanguage: state.selectedLanguage
    };
})(MonacoEditor);