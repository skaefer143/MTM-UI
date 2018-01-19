import React from 'react';
import { Link } from 'react-router-dom';

/**
 * NotFoundPage component shows the default message when a request cannot be routed to a component
 */
export default class NotFoundPage extends React.Component {

  render() {
    return (
      <div className="container">
        <div className="row text-center">
          404 - <Link to="/">Go home</Link>
        </div>
      </div>
    );
  }
}
