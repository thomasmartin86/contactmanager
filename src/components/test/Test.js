import React, { Component } from 'react';

//exists to test react lifecycle methods

class Test extends Component {
  //dummy state
  state = {
    title: '',
    body: ''
  };
  //fires when a component mounts
  //generally where you make ajax and http calls to an api
  componentDidMount() {
    //fetch returns a promise which we map to Json format then log the json result
    fetch('https://jsonplaceholder.typicode.com/posts/1')
      .then(response => response.json())
      .then(data =>
        this.setState({
          title: data.title,
          body: data.body
        })
      );
  }
  /*
  //runs when component will mount
  componentWillMount() {
    console.log('componentWillMount...');
  }
  //only runs when something did update
  componentDidUpdate() {
    console.log('componentDidUpdate...');
  }
  //only runs when something will update
  componentWillUpdate() {
    console.log('componentWillUpdate...');
  }
  //primarily used with redux to pass state as props... deprecated now
  componentWillReceiveProps(nextProps, nextState) {
    console.log('componentWillReceiveProps...');
  }

  //used this instead of componentWillReceiveProps
  static getDerivedStateFromProps(nextProps, prevState) {
    //you return the state here rather than call setState()
    return {
      test: 'something'
    };
  }

  //
  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('getSnapShotBeforeUpdate...');
  }
*/
  render() {
    const { title, body } = this.state;
    return (
      <div>
        <h1>Test Component</h1>
        <h2>{title}</h2>
        <p>{body}</p>
      </div>
    );
  }
}

export default Test;
