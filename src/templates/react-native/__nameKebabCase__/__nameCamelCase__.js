import React, { <%= componentType %> } from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';

export default class <%= nameCamelCase %> extends <%= componentType %> {

  static propTypes = {
    children: PropTypes.node,
  }

  static defaultProps = {
    children: undefined,
  }

  render() {
    return (
      <View style={styles.host}>
        {this.props.children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  host: {
    flex: 1,
  },
});
