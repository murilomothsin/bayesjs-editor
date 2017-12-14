import React, { PropTypes } from 'react';
import { isUndefined } from 'lodash';
import * as d3 from 'd3';

class SvgText extends React.PureComponent {
  componentDidMount() {
    const { element } = this.refs;
    const { width } = this.props;
    const length = element.getComputedTextLength();
    const widthInt = parseInt(width, 10);

    if (length > widthInt) {
      this.wrap(widthInt, element, d3.select(element));
    }
  }

  wrap(maxWidth, element, d3Element) {
    const textLength = element.getComputedTextLength();
    const text = d3Element.text().replace(/[.]{3}$/, '');

    if (textLength > maxWidth) {
        const newText = `${text.slice(0, -1)}...`;
        
        d3Element.text(newText);
        this.wrap(maxWidth, element, d3Element);
    }
  }
  
  render() {
    const {
      x,
      y,
      height,
      width,
      title,
    } = this.props;

    return (
      <text x={x}
        y={y} 
        ref="element"
        height={height || 15}
        width={width || '75'}
        title={title}
        style={{
          margin: 0,
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
        }}
      >
      {title}
    </text>
    );
  }
}

SvgText.propTypes = {
  x: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  y: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  title: PropTypes.string.isRequired,
};

export default SvgText;