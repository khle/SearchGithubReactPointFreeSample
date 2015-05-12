var React = require('react')

var Spinner = React.createClass({
    render() {
    console.log('====+> ', this.props)
        return (
            <div className="container">                
                <div className="row center-align">
                    <div className="col s12">
                        <div className="preloader-wrapper big active">
                            <div className="spinner-layer spinner-green-only">
                                <div className="circle-clipper left">
                                    <div className="circle"></div>
                                </div>
                                <div className="gap-patch">
                                    <div className="circle"></div>
                                </div>
                                <div className="circle-clipper right">
                                    <div className="circle"></div>
                                </div>
                            </div>
                        </div>    
                    </div>
                </div>
            </div>
        )
    }
})

module.exports = Spinner