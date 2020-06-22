import React, { ReactElement, ReactNode } from 'react';

interface Props<T> {
  collection: T[];
  renderElement: (el: T) => ReactNode;
  divider?: string;
}

export const LinksGroup = <T extends object>(props: Props<T>): ReactElement => {
  const { collection, renderElement, divider = ', ' } = props;
  return (
    <span>
      {collection.map((el, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <React.Fragment key={i}>
          {renderElement(el)}
          {i !== collection.length - 1 && divider}
        </React.Fragment>
      ))}
    </span>
  );
};
