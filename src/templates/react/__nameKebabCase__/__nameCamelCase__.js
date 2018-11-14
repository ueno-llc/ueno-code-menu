import React, { <%= componentType %> } from 'react';
import PropTypes from 'prop-types';
<% if (stylesExtension) { %>import s from './<%= nameCamelCase %>.<%= stylesExtension %>';
<% } %>
export default class <%= nameCamelCase %> extends <%= componentType %> {

  static propTypes = {
    children: PropTypes.node,
  }

  static defaultProps = {
    children: undefined,
  }

  render() {
    return (
      <div className={s.<%= nameCamelCase %>}>
        {this.props.children}
      </div>
    );
  }
}
