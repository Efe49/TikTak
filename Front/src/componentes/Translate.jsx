import React, { Component } from 'react'
import  IdiomaContext  from '../Context/IdiomaContext'

import en from '../locales/en.json'
import es from '../locales/es.json'


export default class Translate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      langs: {
        en,
        es
      },
    };
  }
  render() {
    const { langs } = this.state;
    const { string } = this.props;
    return (
      <IdiomaContext.Consumer>
        {(value) => langs[value][string]}
      </IdiomaContext.Consumer>
    );
  }
}