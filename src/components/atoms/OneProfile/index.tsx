import { FC, ReactElement, ReactNode } from 'react';
import { Avatar } from 'antd';
import './style.less';

interface OneAvatarProps {
  onClick: () => void;
  name: string;
  profile: string;
  image: ReactNode;
}

const OneProfile: FC<OneAvatarProps> = (props: OneAvatarProps): ReactElement => {
  const { onClick, image, name, profile } = props;

  return (
    <div className="avatar" onClick={onClick}>
      <h2>{name}</h2>
      <p>{profile}</p>
      <Avatar className="avatar-thumb" src={image} size={40} />
    </div>
  );
};

export default OneProfile;
