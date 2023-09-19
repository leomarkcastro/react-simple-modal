import React, { HTMLAttributes, PropsWithChildren } from 'react';

export interface SimpleModalCardProps extends PropsWithChildren<HTMLAttributes<HTMLDivElement>> {
  children?: React.ReactNode;
  hasWhiteBackground?: boolean;
}

const SimpleModalCard: React.FC<SimpleModalCardProps> = (props) => {
  const { hasWhiteBackground, children, ...otherProps } = props;

  return (
    <div
      {...otherProps}
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        backgroundColor: hasWhiteBackground ? 'white' : '',
        ...otherProps.style,
      }}
    >
      {children}
    </div>
  );
};

export { SimpleModalCard };
