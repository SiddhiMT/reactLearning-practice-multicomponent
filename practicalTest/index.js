import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <h1>Hello, React!</h1>
      </div>
    )
  }
}
ReactDOM.render(<App />, document.getElementById('root'))

/** ticking clock example start */
/* const root = ReactDOM.createRoot(document.getElementById('root'));  
function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  root.render(element);
}
setInterval(tick, 1000); */
/** ticking clock example end */

/** ticking clock example by encapsulating start */
/* const root = ReactDOM.createRoot(document.getElementById('root'));

function Clock(props) {
  return (
    <div>
      <h1>Hii, Hope you are doing good..!</h1>
      <h2>It is {props.date.toLocaleTimeString()}.</h2>
    </div>
  );
}

function tick() {
  root.render(<Clock date={new Date()} />);
}

setInterval(tick, 1000); */
/** ticking clock example by encapsulating end */

/** ticking clock example by converting function to a class start */
const root = ReactDOM.createRoot(document.getElementById('root'));
class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Heyaa Pooja, What's up..!</h1>
        <h2>It is {this.props.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
function tick() {
  root.render(<Clock date={new Date()} />);
}

setInterval(tick, 1000);
/** ticking clock example by converting function to a class end */
