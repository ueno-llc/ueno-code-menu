import * as React from 'react';
import { View } from 'react-native';

<% if (stylesExtension) { %>import s from './<%= nameUpperCase %>.<%= stylesExtension %>';
<% } %>
interface I<%= nameUpperCase %>Props {
  children: React.ReactNode;
}

export const <%= nameUpperCase %> = ({ children }: I<%= nameUpperCase %>Props) => (
  <View style={s.<%= nameCamelCase %>}>
    {children}
  </View>
);
