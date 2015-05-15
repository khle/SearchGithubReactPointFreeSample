var React = require('react')
var Navigate = require('react-mini-router').navigate
var My = require('../utils/myfunctors')

var Repos = require('./repos.jsx')
var Navigate = require('react-mini-router').navigate

var Github = React.createClass({
    render() {        
        return ((context, props, state) => {
            var onReposClick = ((event) => {                 
                var userName = this.props.data.githubData.login                 
                if (userName.length > 0) Navigate(`/repos/${userName}`)
            }).bind(context)
            
            var renderGithubData = githubData => {                
                return (
                    <div className="container">                
                        <div className="row center-align">
                            <div className="col s12 m8 offset-m2">
                                <div className="card">
                                    <div className="card-image">
                                        <img src={ githubData.avatar } />
                                        <span className="card-title">{ githubData.name }</span>
                                    </div>
                                    <div className="card-content">
                                        { githubData.login }
                                        <p><a style={{cursor:'pointer'}} onClick={onReposClick}>{ githubData.public_repos  } Repos</a></p>
                                    </div>
                                </div>                
                            </div>
                        </div>

                        <div className="row">
                            <div className="col s12 m8 offset-m2">
                                <div className="card-panel teal">
                                    <div className="white-text">Company: { githubData.company }</div>
                                    <div className="white-text">Location: { githubData.location }</div>
                                    <div className="white-text">Followers: { githubData.followers  }</div>
                                    <div className="white-text">Following: { githubData.following  }</div>
                                    <div className="white-text">Email: { githubData.email  }</div>
                                    <div className="white-text">Bio: { githubData.bio  }</div>
                                </div>
                            </div>
                        </div>



                        <div className="row center-align">
                            <div className="row center-align">                
                                <a href="#!" className="waves-effect waves-light btn">New Search</a>
                            </div>
                        </div>
                    </div>
                )    
            }
            
            var showUserNotFound = githubData => { Navigate(`/notfound/${githubData.id}`); return <div>Done</div> }
                                    
            var show = R.ifElse(R.propEq('error', null), ghd => renderGithubData(ghd), ghd => showUserNotFound(ghd))
            
            return show(props.data.githubData)
            
        })(this, this.props, this.state)                
    }
})

module.exports = Github
