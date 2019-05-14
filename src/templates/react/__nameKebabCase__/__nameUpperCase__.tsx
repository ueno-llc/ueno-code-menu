import * as React from 'react';

<% if (stylesExtension) { %>import s from './<%= nameUpperCase %>.<%= stylesExtension %>';
<% } %>
interface I<%= nameUpperCase %>Props {
  children: React.ReactNode;
}

export const <%= nameUpperCase %> = ({ children }: I<%= nameUpperCase %>Props) => (
  <div className={s.<%= nameCamelCase %>}>
    {children}
  </div>
);
