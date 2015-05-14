var React = require('react')
var Navigate = require('react-mini-router').navigate

var Github = React.createClass({
    render() {        
        if (this.props.data.state.error === null) {
            return (
                <div className="container">                
                    <div className="row center-align">
                        <div className="col s12 m8 offset-m2">
                            <div className="card">
                                <div className="card-image">
                                    <img src={ this.props.data.state.avatar } />
                                    <span className="card-title">{ this.props.data.state.name }</span>
                                </div>
                                <div className="card-content">
                                    { this.props.data.state.login }
                                    <p><a href="#">Repos</a></p>
                                </div>
                            </div>                
                        </div>
                    </div>
                
                    <div className="row">
                        <div className="col s12 m8 offset-m2">
                            <div className="card-panel teal">
                                <div className="white-text">Company: { this.props.data.state.company }</div>
                                <div className="white-text">Location: { this.props.data.state.location }</div>
                                <div className="white-text">Followers: { this.props.data.state.followers  }</div>
                                <div className="white-text">Following: { this.props.data.state.following  }</div>
                                <div className="white-text">Email: { this.props.data.state.email  }</div>
                                <div className="white-text">Bio: { this.props.data.state.bio  }</div>
                                <div className="white-text">Repos: { this.props.data.state.public_repos  }</div>
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
        } else {
            Navigate(`/notfound/${this.props.data.state.id}`)
            return <div>Done</div>
        }
    }
})

module.exports = Github
