import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from './styles.css';
import ContextMenu from '../ContextMenu';
import AddNodeModal from '../AddNodeModal';
import { v4 } from 'uuid';
import { find } from 'lodash';
import $ from 'jquery';
import ArrowList from '../ArrowList';
import ArrowDefs from '../ArrowDefs';

export const ContextMenuType = {
  NODE: 'CONTEXT_MENU_NODE',
  ARROW: 'CONTEXT_MENU_ARROW',
  CANVAS: 'CONTEXT_MENU_CANVAS',
};

import {
  getNetwork,
  getNodesWithPositions,
  getInferenceResults,
} from '../../selectors';
import { calcNodeWidthHeight } from '../../utils/index';

class Network extends Component {
  constructor(props) {
    super(props);

    this.state = {
      arrows: [],
      addingChildArrow: null,
      contextMenuItems: [],
      movingNodePlaceholder: null,
      nodeToAddChildTo: null,
      nodeToAddChildToBounds: null,
      newNode: null,
    };

    this.movingNode = null;
    this.canChangeNodePostion = typeof this.props.changeNodePosition === 'function';
    this.onMouseMoveProps = typeof this.props.onMouseMove === 'function' ? this.props.onMouseMove : () => {};
  }

  startConnection = (nodeToAddChildTo) => {
    const { id, name } = nodeToAddChildTo
    const nodeId = (name || id);
    const domList = $(`[data-node-id="${nodeId}"]`);
    const dom = domList.get(0);
    const bounds = dom.getBoundingClientRect()
    
    this.setState({ 
      nodeToAddChildTo,
      nodeToAddChildToBounds: bounds,
    });
  };

  createNode = (newNodePosition) => {
    const newNode = this.props.requestCreateNode(newNodePosition, () => this.setState({ newNode: null }));

    if (newNode) {
      this.setState({ newNode });
    }
  };

  handleArrowMouseDown = (arrow, e) => {
    
    if (e.button === 2) {
      e.stopPropagation();

      this.contextMenuArrow = arrow;
      this.setState({ contextMenuItems: this.props.getContextItems(ContextMenuType.ARROW) });
      this.contextMenu.handleContainerMouseDown(e, arrow);
    }
  };

  handleNodeMouseDown = (node, e) => {
    e.stopPropagation();
    const {
      onClickNode, onSelectNodes, onAddConnection, getContextItems,
    } = this.props;

    onSelectNodes([node.id]);
    if (typeof onClickNode === 'function') {
      onClickNode(node, e);
    }

    if (e.button === 0) {
      this.contextMenu.hide();

      if (this.state.nodeToAddChildTo !== null) {
        onAddConnection(node.id, this.state.nodeToAddChildTo.id);
        this.setState({ 
          addingChildArrow: null, 
          nodeToAddChildTo: null,
          nodeToAddChildToBounds: null,
        });
      }

      this.movingNode = {
        id: node.id,
        initialPosition: {
          x: node.position.x,
          y: node.position.y,
        },
        initialMousePosition: {
          x: e.clientX,
          y: e.clientY,
        },
      };
    } else if (e.button === 2) {
      this.contextMenuNode = node;
      this.setState({ contextMenuItems: getContextItems(ContextMenuType.NODE) });
      this.contextMenu.handleContainerMouseDown(e, node);
    }
  };

  handleMouseDown = (e) => {
    // Use setTimeout to ensure that the blur event of inputs in the properties panel is fired.
    setTimeout(() => {
      this.props.onSelectNodes([]);
    }, 0);

    if (this.state.nodeToAddChildTo !== null) {
      this.props.onCancelConnection();
      this.setState({ 
        addingChildArrow: null, 
        nodeToAddChildTo: null,
        nodeToAddChildToBounds: null,
      });
    }

    if (e.button === 2) {
      const rect = this.canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      this.contextMenuPosition = { x, y };
      this.setState({ contextMenuItems: this.props.getContextItems(ContextMenuType.CANVAS) });
      this.contextMenu.handleContainerMouseDown(e, this.contextMenuPosition);
    }
  };

  handleMouseMove = (e) => {
    this.onMouseMoveProps(e);

    if (this.canChangeNodePostion && this.movingNode !== null) {
      const { nodes } = this.props
      const { id, initialPosition, initialMousePosition } = this.movingNode;
      const node = find(nodes, node => node.id === id)
      const { width, height } = calcNodeWidthHeight(node)
      const difX = e.clientX - initialMousePosition.x;
      const difY = e.clientY - initialMousePosition.y;

      const movingNodePlaceholder = {
        x: initialPosition.x + difX,
        y: initialPosition.y + difY,
        height,
        width,
      };

      this.setState({ movingNodePlaceholder });
    }

    this.handleNodeToAddChildTo(e);
  };

  findNodeReact = target => {
    const e = $(target);
    debugger
    const node = e.closest('[data-node]')

    console.log(node)
  }

  handleNodeToAddChildTo = (e) => {
    const { 
      nodeToAddChildTo,
      nodeToAddChildToBounds,
    } = this.state

    if (nodeToAddChildTo !== null) {
      const canvasRect = this.canvas.getBoundingClientRect();
      const { left, top, width, height } = nodeToAddChildToBounds;

      const from = {
        x: left + (width / 2) - canvasRect.left,
        y: top + (height / 2) - canvasRect.top,
      };

      const to = {
        x: e.clientX - canvasRect.left,
        y: e.clientY - canvasRect.top,
      };

      // Without it, sometimes the mouse is over the adding arrow
      // It needs to be over the node to be added
      to.x += from.x < to.x ? -3 : 3;
      to.y += from.y < to.y ? -3 : 3;

      this.setState({
        addingChildArrow: { from, to },
      });
    }
  }

  handleMouseUp = (e) => {
    if (this.movingNode !== null) {
      const { id, initialPosition, initialMousePosition } = this.movingNode;
      const { changeNodePosition } = this.props;

      const difX = e.clientX - initialMousePosition.x;
      const difY = e.clientY - initialMousePosition.y;

      const newX = initialPosition.x + difX;
      const newY = initialPosition.y + difY;

      if (this.canChangeNodePostion) {
        changeNodePosition(id, newX, newY);
      } else {
        console.warn('changeNodePosition not defined in the props of Network');
      }

      this.setState({ movingNodePlaceholder: null });
      this.movingNode = null;
    }
  };

  handleMouseLeave = () => {
    if (this.movingNode !== null) {
      this.movingNode = null;
      this.setState({ movingNodePlaceholder: null });
    }

    if (this.state.nodeToAddChildTo !== null) {
      this.props.onCancelConnection();
      this.setState({ 
        addingChildArrow: null, 
        nodeToAddChildTo: null,
        nodeToAddChildToBounds: null,
      });
    }
  };

  renderNodes = () => {
    const { nodes, renderNode, onDoubleClickNode } = this.props;

    return nodes.map((node) => {
      const onMouseDown = e => this.handleNodeMouseDown(node, e);
      const onDoubleClick = (e) => {
        if (typeof onDoubleClickNode === 'function') {
          onDoubleClickNode(node, e);
        }
      };

      return renderNode(node, { onMouseDown, onDoubleClick });
    });
  };

  render() {
    let addingChildArrow = null;
    let movingNodePlaceholder = null;

    if (this.state.addingChildArrow !== null) {
      const { from, to } = this.state.addingChildArrow;

      addingChildArrow = (
        <path
          d={`M${from.x},${from.y} ${to.x},${to.y}`}
          fill="none"
          stroke="#333"
          strokeWidth="2"
          strokeDasharray="5,5"
          markerEnd="url(#triangle)"
        />
      );
    }

    if (this.state.movingNodePlaceholder !== null) {
      const {
        x, y, height, width,
      } = this.state.movingNodePlaceholder;

      movingNodePlaceholder = (
        <rect
          x={x}
          y={y}
          height={height}
          width={width}
          fill="none"
          stroke="#333"
          strokeWidth="2"
          strokeDasharray="5,5"
        />
      );
    }

    return (
      <div>
        <svg
          className={styles.canvas}
          onContextMenu={e => e.preventDefault()}
          onMouseDown={this.handleMouseDown}
          onMouseMove={this.handleMouseMove}
          onMouseUp={this.handleMouseUp}
          onMouseLeave={this.handleMouseLeave}
          height={this.props.network.height}
          width={this.props.network.width}
          ref={ref => (this.canvas = ref)}
        >
          <g>
            <ArrowDefs />
            <ArrowList 
              renderArrow={this.props.renderArrow}
              list={this.props.arrows}
              onMouseDown={this.handleArrowMouseDown} />
          </g>
          <g>
            {this.renderNodes()}
          </g>
          <g>
            {addingChildArrow}
          </g>
          <g>
            {movingNodePlaceholder}
          </g>
          <g>
            {this.props.children}
          </g>
        </svg>

        <ContextMenu
          ref={ref => (this.contextMenu = ref)}
          items={this.state.contextMenuItems}
        />

        {this.state.newNode}
        {this.props.children}
      </div>
    );
  }
}

// / optional props
// onClickNode,
// onDoubleClickNode,
// onClickArrow,
// onSelectNodes,
// changeNodePosition,

Network.propTypes = {
  network: PropTypes.object.isRequired,
  nodes: PropTypes.array.isRequired,
  arrows: PropTypes.func.isRequired,
  renderArrow: PropTypes.func.isRequired,
  renderNode: PropTypes.func.isRequired,
  requestCreateNode: PropTypes.func.isRequired,
  onAddConnection: PropTypes.func.isRequired,
  onCancelConnection: PropTypes.func.isRequired,
  onSelectNodes: PropTypes.func.isRequired,
  getContextItems: PropTypes.func.isRequired,
  onMouseMove: PropTypes.func,
};

const mapStateToProps = state => ({
  network: getNetwork(state),
  nodes: getNodesWithPositions(state),
});

// export default connect(mapStateToProps)(Network);
export default Network;
