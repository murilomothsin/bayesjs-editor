import React from 'react';
import PropTypes from 'prop-types';

const ArrowMsbn = ({ key, from, to, title, onMouseDown, onClick }) => (
  <Arrow
    key={key}
    from={from}
    to={to}
    markEnd={false}
    title={title}
    onMouseDown={onMouseDown}
    onClick={onClick}
  />
)

ArrowMsbn.propTypes = {
  key: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]).isRequired,
  from: PropTypes.object.isRequired,
  to: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  onMouseDown: PropTypes.func,
  onClick: PropTypes.func,
}

export default ArrowMsbn