import React, { PropTypes } from 'react';
import NodeGeneric from '../NodeGeneric';
import NodeState from '../NodeState';
import SvgText from '../SvgText';

const SuperNode = (props) => {
  const { nodes } = props;
  const title = `${nodes.length} nodo${nodes.length === 1 ? '' : 's'}`;

  return (
    <NodeGeneric
      {...props}
    >
      <SvgText 
        x="5" 
        y="37" 
        height="15"
        width="75"
        title={title}
      />
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
