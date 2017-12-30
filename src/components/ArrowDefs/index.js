import React, { Component } from 'react';

class ArrowDefs extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <defs>
        <marker
          id="triangle"
          viewBox="0 0 10 10"
          markerWidth="6"
          markerHeight="6"
          refX="8"
          refY="5"
          orient="auto"
        >
          <path d="M0,0 L10,5 L0,10" fill="#333" />
        </marker>

        <marker
          id="triangle-opacity"
          viewBox="0 0 10 10"
          markerWidth="6"
          markerHeight="6"
          refX="8"
          refY="5"
          orient="auto"
          opacity="0.2"
        >
          <path d="M0,0 L10,5 L0,10" fill="#333" />
        </marker>
      </defs>
    );
  }
}

export default ArrowDefs;
