import Image from 'next/image'
import { Avatar } from '@nextui-org/react';
import { HamburgerSpin } from 'react-animated-burgers'

import logoSvg from '/public/logo.svg';

const Header = ({ width, isMenuOpen, setIsMenuOpen }: any) => {
  return (
    <div className="layout-header">
      <Image alt="logo" src={logoSvg} width={50} height={50} />
      <div className="header-avatar">
        <Avatar
          squared
          src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
        />
        {
          width < 960 && (
            <HamburgerSpin buttonWidth={40} isActive={isMenuOpen} toggleButton={() => setIsMenuOpen(!isMenuOpen)} />
          )
        }
      </div>
    </div>
  )
};

export default Header;
