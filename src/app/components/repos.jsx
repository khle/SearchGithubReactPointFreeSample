var React = require('react')

var Main = require('./main.jsx')
var Spinner = require('./spinner.jsx')
var Github = require('./github.jsx')
var ReposList = require('./reposList.jsx')

var Future = require('data.future')
var R = require('ramda') 
var request = require('request')

var My = require('../utils/myfunctors')
var GHConst = require('../utils/constants')

var Repos = React.createClass({
    getInitialState() {
        return {isLoading: true}    
    },
    componentDidMount() {        
        var _My = new My()
        var L = _My.MakeLenses(GHConst.githubApiFields)
                
        var getGithub = function(url) {
            return new Future(function(reject, response) {               
                $.getJSON(url)
                .done(function(data) {
                    response(data)                    
                })
                .fail(function(error) {
                    reject(error)
                })
            })
        }        
        
        var githubUrl = `https://api.github.com/users/${this.props.data}/repos` 
        
        
        var context = this
        
        var displayError = error => { context.setState({error, isLoading: false, id: this.props.data }) }        
        var displayData = data => { context.setState({
            error: null, 
            isLoading: false,            
            data
        })}
        
        getGithub(githubUrl).fork(displayError, displayData)
    },
    render() {
        return ((context, props, state) => {                        
            var _My = new My()
            var L = _My.MakeLenses(['isLoading'])
                                
            var show = R.ifElse(L.isLoading, s => <Spinner />, s => <ReposList data = { s.data }/>)
            return show(state)                                    
            
        })(this, this.props, this.state)
    }
})

module.exports = Repos