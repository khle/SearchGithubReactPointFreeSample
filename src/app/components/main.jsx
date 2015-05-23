var React = require('react')
var Navigate = require('react-mini-router').navigate
var R = require('ramda') 

var My = require('../utils/myfunctors')
var GHConst = require('../utils/constants')
var ErrorConst = require('../utils/errors')

var Main = React.createClass({
    
    render() {
        
        return ((context, props, state) => {         
            
            var onSearchClick = ((event) => { 
                
                //Impure
                var element = this.refs.searchText.getDOMNode()       
                var focusElement = element => { element.value = ''; element.focus() }
                var showResult = element => { Navigate(`/dashboard/${element.value}`) }
                                                                                                
                //Pure
                var getInput = element => element.value
                var isInputEmpty = R.eq('')
                var checkInput = R.compose(isInputEmpty, R.trim, getInput)
                var handleClick = R.ifElse(checkInput, focusElement, showResult)
                      
                //Kick things off                
                handleClick(element)
                
            }).bind(context)  
            
            var onKeyDownHandler = ((event) => {
                
                //Impure
                var element = this.refs.searchText.getDOMNode()
                var focusElement = ((value) => { this.refs.searchText.getDOMNode().value = '' }).bind(this)
                var showResult = value => { Navigate(`/dashboard/${value}`) }                                
                
                //Pure                
                var isInputEmpty = R.eq('')
                var checkInput = R.compose(isInputEmpty, R.trim)
                var search = R.ifElse(checkInput, focusElement, showResult)                
                var getKeyCodePressed = event => event.keyCode
                var handleNonEnterKeyPressed = evt => val => { return }
                var handleEnterKeyPressed = evt => val => { search(val) } //impure
                var isEnterPressed = R.eq(13)
                var checkEnterKeyPressed = R.compose(isEnterPressed, getKeyCodePressed)                
                var handleKeyPressed = R.ifElse(checkEnterKeyPressed, handleEnterKeyPressed, handleNonEnterKeyPressed)                
                var handleEvent = handleKeyPressed(event)
                
                //Kick things off 
                var text = element.value               
                handleEvent(text)
                
                //handleKeyPressed(event)(element.value)                
                
            }).bind(context)
                                
            var displayUserName = R.ifElse(R.eq(null), x => '', R.identity)
            var displayError = R.ifElse(R.eq(null), x => '', x => ' user not found.')
        
            return <div className="container">
                
                <div className="row">
                    <div className="input-field col s12 m8 offset-m2">
                        <input placeholder="Github username" id="search-text" type="text" className="validate" onKeyDown={onKeyDownHandler} ref="searchText" />
                        <label className="active" for="search-label">Search Github user</label>
                    </div>
                </div>
            
                <div className="row center-align">
                    {displayUserName(props.data)} {displayError(props.data)}
                </div>
            
                <div className="row center-align">                
                    <a className="waves-effect waves-light btn" onClick={onSearchClick}>Search</a>
                </div>
            </div>
        })(this, this.props, this.state)
    }

})

module.exports = Main