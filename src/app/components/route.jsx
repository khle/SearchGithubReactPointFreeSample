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
        
        //'/dashboard': 'dashboard', //not working
        //'dashboard': 'dashboard', //correct
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






/*
var React = require('react')
var Router = require('react-router-component')
Main = require('./main.jsx')
Dashboard = require('./dashboard.jsx')

var Locations = Router.Locations
var Location = Router.Location

var Route = React.createClass({

  render: function() {
    return (
      <Locations hash >
        <Location path="/" handler={Main} />
        <Location path="/dashboard" handler={Dashboard} />
      </Locations>
    )
  }
})*/

module.exports = Route