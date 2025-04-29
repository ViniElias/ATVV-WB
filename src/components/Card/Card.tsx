import React, { Component } from 'react';
import './Card.css';

type Props = {
  title: string;
  text: string;
  click: () => void;
};

export default class Card extends Component<Props> {
  render() {
    const {title, text, click} = this.props;
    return (
      <div className="card" onClick={click}>
        <h1>{title}</h1>
        <p>{text}</p>
      </div>
    );
  }
}