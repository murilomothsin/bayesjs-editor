import React from 'react';
import PropTypes from 'prop-types';

const ArrowBn = ({ key, from, to, markEnd, title, onMouseDown, onClick }) => (
  <Arrow
    key={key}
    from={from}
    to={to}
    markEnd={markEnd}
    title={title}
    onMouseDown={onMouseDown}
    onClick={onClick}
  />
)

ArrowBn.propTypes = {
  key: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]).isRequired,
  from: PropTypes.object.isRequired,
  to: PropTypes.object.isRequired,
  markEnd: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  onMouseDown: PropTypes.func,
  onClick: PropTypes.func,
}

export default ArrowBn