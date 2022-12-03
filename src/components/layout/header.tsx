import Image from 'next/image'
import { Text } from '@nextui-org/react';
import { Avatar } from '@nextui-org/react';
import { Twirl as Hamburger } from 'hamburger-react'

import logoSvg from '/public/logo.svg';
import { useRouter } from "next/router";

const Header = ({ userUrl, width, isMenuOpen, setIsMenuOpen }: any) => {
  const router = useRouter();

  return (
    <div className="layout-header">
      <Image alt="logo" src={logoSvg} width={50} height={50} />
      <div className="header-button">
        <button
          style={{
            cursor: 'pointer',
            width: 130,
            height: 40,
            borderRadius: 5,
            backgroundColor: '#480048',
          }}
          onClick={() => router.push('/create')}
        >
          <Text h4 color="white" style={{ padding: 0, margin: 0 }}>
            Créer un post
          </Text>
        </button>
      </div>
      <div className="header-avatar">
        <Avatar
          squared
          src={userUrl || "https://i.pravatar.cc/150?u=a042581f4e29026704d"}
        />
        {width < 960 && (
          <Hamburger toggled={isMenuOpen} toggle={setIsMenuOpen} />
        )}
      </div>
    </div>
  )
};

export default Header;
