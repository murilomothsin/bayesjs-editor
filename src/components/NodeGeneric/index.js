import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';

const NodeGeneric = ({
  id,
  x,
  y,
  height,
  selected,
  onMouseDown,
  rectRef,
  onDoubleClick,
  stroke,
  title,
  canMove,
  opacity,
  children,
}) => (
  <g
    className={styles.node}
    onMouseDown={onMouseDown}
    onDoubleClick={onDoubleClick}
    transform={`translate(${x} ${y})`}
    data-node-id={id}
    style={{
      cursor: (canMove ? 'nove' : 'pointer'),
    }}
  >
    <rect
      height={height}
      width="160"
      fill={stroke || '#ff8'}
      fillOpacity={opacity || '1'}
      stroke="#333"
      strokeWidth={selected ? 3 : 1}
      ref={rectRef}
    />

    <foreignObject x="5" y="0" height="15" width="150">
      <p
        title={id}
        style={{
          margin: 0,
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
        }}
      >
        {id}
      </p>
    </foreignObject>

    <path d="M0,20 h160" stroke="#333" />

    {children}
  </g>
);

NodeGeneric.propTypes = {
  id: PropTypes.string.isRequired,
  x: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  y: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  height: PropTypes.number.isRequired,
  selected: PropTypes.bool.isRequired,
  onMouseDown: PropTypes.func.isRequired,
  rectRef: PropTypes.func.isRequired,
};

export default NodeGeneric;
