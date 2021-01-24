import { FC, ReactElement } from 'react';
import { Button } from 'antd';
import { ButtonProps } from 'antd/lib/button';
import './style.less';

const NewButton: FC<ButtonProps> = (props: ButtonProps): ReactElement => {
  return <Button {...props} />;
};

export default NewButton;
