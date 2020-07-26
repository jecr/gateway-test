import React from 'react';

export default class Secret extends React.Component {
  constructor() {
    super();
    this.state = {
      message: 'loading...',
    }
  }

  componentDidMount() {
    fetch('/api/secret')
      .then(res => res.text())
      .then(res => this.setState({ message: res }));
  }

  render() {
    return (
      <section>
        <h1>Secret</h1>
        <p>{this.state.message}</p>
      </section>
    )
  }
}