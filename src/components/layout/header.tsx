import { Avatar } from '@nextui-org/react';

const Header = () => (
  <div className="layout-header">
    <div>
      Logo
    </div>
    <div className="header-avatar">
      <Avatar
        squared
        src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
      />
    </div>
  </div>
);

export default Header;
