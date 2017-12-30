import React, { PureComponent } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getNodesWithPositions, getLinkages } from '../../selectors/index';
import { calcNodeWidthHeight } from '../../utils/index';

class ArrowList extends PureComponent {
  state = {
    indexFocus: null,
  }

  getNodeLinksPositions = (node) => {
    const { width, height } = calcNodeWidthHeight(node)
  
    const top = {
      x: (node.position.x + width / 2),
      y: node.position.y,
      type: 'top',
    };
  
    const right = {
      x: node.position.x + width,
      y: (node.position.y + height / 2),
      type: 'right',
    };
  
    const bottom = {
      x: (node.position.x + width / 2),
      y: node.position.y + height,
      type: 'bottom',
    };
  
    const left = {
      x: node.position.x,
      y: (node.position.y + height / 2),
      type: 'left',
    };
  
    return [top, right, bottom, left];
  };
  
  getDistance = (p1, p2) => (
    Math.sqrt((Math.abs(p2.x - p1.x) ** 2) + (Math.abs(p2.y - p1.y) ** 2))
  );
  
  corretion = (p, value) => {
    if (['top', 'bottom'].indexOf(p.type) !== -1) {
      p.x += value;
    } else {
      p.y += value;
    }
  };
  
  getNearestPoints = (node1, node2) => {
    const ps1 = this.getNodeLinksPositions(node1);
    const ps2 = this.getNodeLinksPositions(node2);
  
    let p1 = ps1[0];
    let p2 = ps2[0];
  
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (this.getDistance(p1, p2) > this.getDistance(ps1[i], ps2[j])) {
          p1 = ps1[i];
          p2 = ps2[j];
        }
      }
    }
  
    // this.corretion(p1, -10);
    // this.corretion(p2, 10);
  
    return { p1, p2 };
  };
  
  calcArrowsInfos = (nodes, arrows) => {
    return arrows.map((arrow, index) => {
      const { from, to } = arrow;
      const points = this.getNearestPoints(from, to);
  
      return {
        key: `${from.id}-${to.id}`,
        from: points.p1,
        to: points.p2,
        parentId: from.id,
        childId: to.id,
        arrow,
        index,
      };
    });
  };

  onMouseOver = index => (e) => {
    this.setState({
      indexFocus: index,
    });
  };

  onMouseLeave = index => (e) => {
    this.setState({
      indexFocus: null,
    });
  };

  getStrokeOpacity = (index, indexFocus) => {
    if (indexFocus != null) {
      if (index != indexFocus) return 0.2;
    }

    return 1;
  };

  getArrow = (arrow, index, indexFocus) => {
    const value = this.getStrokeOpacity(index, indexFocus);

    return React.cloneElement(
      arrow,
      { markEndStyle: value === 1 ? 'url(#triangle)' : 'url(#triangle-opacity)' },
    );
  };

  makeRenderArrow = (render, onMouseDown, indexFocus) => (info, i) => {
    const arrow = render(info)

    return (
      <g 
        key={i}
        onMouseDown={onMouseDown.bind(null, info)}
        onMouseOver={this.onMouseOver(i)}
        onMouseLeave={this.onMouseLeave(i)}
        strokeOpacity={this.getStrokeOpacity(i, indexFocus)}>
        {this.getArrow(arrow, i, indexFocus)}
      </g>
      )
  }

  render() {
    const { 
      nodesWithPositions, 
      list,
      renderArrow,
      onMouseDown,
    } = this.props
    const { indexFocus } = this.state;
    const positions = this.calcArrowsInfos(nodesWithPositions, list());
    const arrowRender = this.makeRenderArrow(renderArrow, onMouseDown, indexFocus);

    return positions.map(arrowRender)
  }
}

ArrowList.propTypes = {
  list: PropTypes.func.isRequired,
  renderArrow: PropTypes.func.isRequired,
  onMouseDown: PropTypes.func,
}

const mapStateToProps = state => ({
  nodesWithPositions: getNodesWithPositions(state),
  linkages: getLinkages(state),//used to refresh component in MSBN
});

export default connect(mapStateToProps)(ArrowList);