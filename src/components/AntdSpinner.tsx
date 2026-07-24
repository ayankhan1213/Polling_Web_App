import React from 'react';
import { Spin } from 'antd';
import type { GetProp, SpinProps } from 'antd';
import { createStaticStyles } from 'antd-style';

const classNames = createStaticStyles(({ css }) => ({
  root: css`
    padding: 3px;
  `,
}));


const stylesFn: SpinProps['styles'] = ({ props }): GetProp<SpinProps, 'styles', 'Return'> => {
  if (props.size === 'small') {
    return {
      indicator: {
        color: '#fff',
      },
    };
  }
  return {};
};

const App: React.FC = () => {
  const sharedProps: SpinProps = {
    spinning: true,
    percent: 0,
    classNames: { root: classNames.root },
  };

  return (
      <Spin {...sharedProps} styles={stylesFn} size="small" />
  );
};

export default App;