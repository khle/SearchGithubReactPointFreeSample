var React = require('react')
var R = require('ramda') 

var My = require('../utils/myfunctors')

var ReposList = React.createClass({
    propTypes: {
        data: React.PropTypes.array.isRequired
    },
    
    render() {
        var renderList = (context, props, state) => {            
            var buildJsx = x => <a key={x.id} className='collection-item' href={x.html_url} target='_blank'>{x.name}</a>                        
            
            return R.map(buildJsx, props.data)                        
        }
        
        return (
            <div className="container">                
                <div className="row">
                    <div className="col s12 m8 offset-m2">
                        <nav>
                            <div className="nav-wrapper">      
                                <ul id="nav-mobile" className="right hide-on-med-and-down">
                                    <li><a href="#!">New Search</a></li>                                    
                                </ul>
                            </div>
                        </nav>
                        <div className="collection">
                            {renderList(this, this.props, this.state)}
                        </div>
                    </div>
                </div>
            </div>
        )        
    }
})

module.exports = ReposList