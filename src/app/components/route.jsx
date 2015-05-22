var React = require('react'),
    RouterMixin = require('react-mini-router').RouterMixin,
    Main = require('./main.jsx'),
    Dashboard = require('./dashboard.jsx'),
    Repos = require('./repos.jsx')

var Route = React.createClass({

    mixins: [RouterMixin],

    routes: {
        '/': 'home'        
        ,'notfound/:userName': 'notfound'
        ,'dashboard/:userName': 'dashboard'
        ,'repos/:userName': 'repos'
    },

    render: function() {
        return this.renderCurrentRoute()
    },

    home: function(userName) {
        return <Main data = { null } />
    },
    
    notfound: function(userName) {
        return <Main data = { userName }/>
    },

    dashboard: function(userName) {
        return <Dashboard data = { userName }/>
    },
    
    repos: function(userName) {
        return <Repos data = { userName }/>
    },

    notFound: function(path) {
        return <div class="not-found">Page is not found: {path}</div>;
    }

})


module.exports = Route