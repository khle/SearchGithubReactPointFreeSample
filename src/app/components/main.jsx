var React = require('react')
var Navigate = require('react-mini-router').navigate
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

    /*
    handleSearchClick(event) {        
        var userName = this.refs.searchText.getDOMNode().value 
        if (userName.length > 0) Navigate(`/dashboard/${userName}`)                
    },*/
    
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
                
                //Impure
                var noop = element => { return (() => { element.value = ''; element.focus() }) }
                var showResult = element => { return (() => Navigate(`/dashboard/${element.value}`)) }
                var element = this.refs.searchText.getDOMNode()
                                                                                                
                //Pure
                var getInput = element => element.value
                var isInputEmpty = R.eq('')
                var checkInput = R.compose(isInputEmpty, R.trim, getInput)
                var handler = R.ifElse(checkInput, noop, showResult)
                                
                                
                handler(element)()
                
            }).bind(context)
            
            var onCancelSearchClick = context.handleCancelSearchClick
                                
            var displayUserName = R.ifElse(R.eq(null), x => '', R.identity)
            var displayError = R.ifElse(R.eq(null), x => '', x => ' user not found.')
        
            return <div className="container">
                
                <div className="row">
                    <div className="input-field col s12 m8 offset-m2">
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