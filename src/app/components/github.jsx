var React = require('react')
var Navigate = require('react-mini-router').navigate

var Github = React.createClass({
    render() { 
        console.log('====-> ', this.props)
        console.log('=====-> ', this.props.data)
        console.log('======-> ', this.props.data.state)
        if (this.props.data.state.error === null) {
            return (
                <div className="container">                
                    <div className="row center-align">
                        <div className="col s12">
                            <div class="card">
                                <div class="card-image">
                                    <img src={ this.props.data.state.avatar } />
                                </div>
                            </div>                
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
