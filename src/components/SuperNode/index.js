import React from 'react';
import PropTypes from 'prop-types';
import NodeGeneric from '../NodeGeneric';
import NodeState from '../NodeState';
import { calcNodeHeight } from '../../utils/index';

const SuperNode = (props) => {
  const { nodes, sumHeight } = props;
  const title = `${nodes.length} nodo${nodes.length === 1 ? '' : 's'}`;

  return (
    <NodeGeneric
      height={calcNodeHeight([], sumHeight)}
      {...props}
    >
      <foreignObject x="5" y="21" height="15" width="75">
        <p
          title={title}
          style={{
            margin: 0,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
          }}
        >
          {title}
        </p>
      </foreignObject>
    </NodeGeneric>
  );
};

SuperNode.propTypes = {
  id: PropTypes.string.isRequired,
  onMouseDown: PropTypes.func.isRequired,
  x: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  y: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  nodes: PropTypes.array.isRequired,
};

export default SuperNode;
