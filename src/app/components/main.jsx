var React = require('react')
var Navigate = require('react-mini-router').navigate
var Bootstrap = require('react-bootstrap')

var Navigation = require('./navigation.jsx')

var Future = require('data.future')
var Promise = require('promise') 
var request = Promise.denodeify(require('then-request'))
var R = require('ramda') 

var My = require('../utils/myfunctors')
var GHConst = require('../utils/constants')
var ErrorConst = require('../utils/errors')

var Main = React.createClass({

    getInitialState() {
		return {
			username: '',
            isSearching: false
		}
	},

    handleChange(event) {
        var userName = event.target.value
        
        this.setState({
            userName,
            isSearching: false
        })
    },

    handleSearchClick(event) {        
        var userName = this.refs.searchText.getDOMNode().value 
        if (userName.length > 0) Navigate(`/dashboard/${userName}`)                
    },
    
    handleCancelSearchClick(event) {
        this.setState({
            userName: '',
            isSearching: false
        })    
    },

    render() {
        
        return ((context, props, state) => {         
            var onChangeHandler = context.handleChange
            //var onSearchClick = context.handleSearchClick
            var onSearchClick = ((event) => { 
                var userName = this.refs.searchText.getDOMNode().value 
                if (userName.length > 0) Navigate(`/dashboard/${userName}`)
            }).bind(context)
            
            var onCancelSearchClick = context.handleCancelSearchClick
                                
            var displayUserName = R.ifElse(R.eq(null), x => '', R.identity)
            var displayError = R.ifElse(R.eq(null), x => '', x => ' user not found.')
        
            return <div className="container">
                
                <div className="row">
                    <div className="input-field col s12">
                        <input placeholder="Github username" id="search-text" type="text" className="validate" value={context.state.userName} onChange={onChangeHandler} ref="searchText" />
                        <label className="active" for="search-label">Search Github user</label>
                    </div>
                </div>
            
                <div className="row center-align">
                    {displayUserName(context.props.data)} {displayError(context.props.data)}
                </div>
            
                <div className="row center-align">                
                    <a className="waves-effect waves-light btn" onClick={onSearchClick}>Search</a>
                </div>
            </div>
        })(this, this.props, this.state)
    }

})

module.exports = Main