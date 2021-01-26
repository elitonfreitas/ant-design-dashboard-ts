import { FC, ReactElement, useContext } from 'react';
import { Avatar, Button } from 'antd';
import AppContext from 'contexts/AppContext';
import Constants from 'utils/Constants';
import './style.less';

interface OneAvatarProps {
  onClick: () => void;
}

const OneProfile: FC<OneAvatarProps> = (props: OneAvatarProps): ReactElement => {
  const { changeLogged } = useContext(AppContext);
  const { onClick } = props;
  const user = JSON.parse(localStorage.getItem(Constants.storage.USER) || '{"name": "", image: "", profiles: []}');
  const { name, image, profiles } = user;
  const profileName = profiles.join(', ');

  const logout = () => {
    localStorage.removeItem(Constants.storage.USER);
    localStorage.removeItem(Constants.storage.LOGGED);
    localStorage.removeItem(Constants.storage.TOKEN);
    localStorage.removeItem(Constants.storage.LANG);
    changeLogged(false);
  };

  return (
    <>
      <div className="profile" onClick={onClick}>
        <h2>{name}</h2>
        <p>{profileName}</p>
        <Avatar className="profile-thumb" src={image || ''} size={40} />
      </div>
      <div className="profile-logout">
        <Button type="link" onClick={logout}>
          Logout
        </Button>
      </div>
    </>
  );
};

export default OneProfile;
