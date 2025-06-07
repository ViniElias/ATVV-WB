import React from 'react';
import './Card.css';

type Props = {
  title: string;
  text: string;
  click: () => void;
};

const Card: React.FC<Props> = ({ title, text, click }) => {
  return (
    <div className="card" onClick={click}>
      <h1>{title}</h1>
      <p>{text}</p>
    </div>
  );
};

export default Card