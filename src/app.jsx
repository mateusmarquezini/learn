require('bootstrap/dist/css/bootstrap.min.css');
const React = require('react');
const LearnMath = require('./learn-math');
const LearnSetup = require('./setup');
const constants = require('./constants');
const { Link, Route } = require('react-router-dom');

class App extends React.Component {
  constructor() {
    super();
    let settings;
    try {
      settings = JSON.parse(localStorage.getItem(constants.settings) || '{}');
    } catch (e) {
      settings = {};
    }

    this.state = Object.assign({
      lower: 0,
      setup: true,
      sign: '+',
      upper: 10,
    }, settings);
    this.saveSettings = this.saveSettings.bind(this);
    this.toggleSetup = this.toggleSetup.bind(this);
    this.simple = this.simple.bind(this);
    this.setup = this.setup.bind(this);
  }

  setup() {
    return (<LearnSetup
      lower={this.state.lower}
      sign={this.state.sign}
      saveSettings={this.saveSettings}
      upper={this.state.upper}
    />);
  }

  simple() {
    return (<LearnMath
      lower={this.state.lower}
      sign={this.state.sign}
      toggleSetup={this.toggleSetup}
      upper={this.state.upper}
    />);
  }

  toggleSetup() {
    this.setState({
      setup: !this.state.setup,
    });
  }

  saveSettings(settings) {
    localStorage.setItem(constants.settings, JSON.stringify(settings));
    this.setState(Object.assign({},
      settings,
      { setup: false }));
  }

  render() {
    return (
      <div>
        <nav>
          <Link to="/setup">Setup</Link>
          <Link to="/simple">Simple</Link>
          <Link to="/drill">Drill</Link>
        </nav>
        <div>
          <Route path="/setup" render={this.setup} />
        </div>
        <div>
          <Route path="/simple" render={this.simple} />
        </div>
      </div>
    );
  }
}

module.exports = App;
