import React from 'react';

export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      message: 'loading...',
    }
  }

  componentDidMount() {
    fetch('/api/home')
      .then(res => res.text())
      .then(res => this.setState({ message: res }));
  }

  render() {
    return (
      <section>
        <h1>Home</h1>
        <p>{this.state.message}</p>
      </section>
    )
  }
}