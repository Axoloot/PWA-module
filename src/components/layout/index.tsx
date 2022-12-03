import {useRouter} from "next/router";
import { useEffect, useState } from "react";
import { Container } from '@nextui-org/react';

import Menu from "./Menu";
import Header from "./header";
import useWindowSize from "../useWindowSize";
import { useUserContext } from "../../providers/userProvider";

const Layout = ({ children, menuIndex }: any) => {
  const router = useRouter();

  const { user } = useUserContext();
  const { width } = useWindowSize();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push('/');
    }
  }, [user]);

  console.log(width)
  return (
    <div className="layout-container">
      <div className="layout-header-container">
        <Container>
          <Header userUrl={user?.profilImg} width={width} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        </Container>
      </div>
      {
        width > 960 || width === 0 ? (
          <Container>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <div style={{ width: '20%' }}>
                <Menu menuIndex={menuIndex} />
              </div>
              <div className="layout-children">
                {children}
              </div>
            </div>
          </Container>
        ) : (
          <Container>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              {
                isMenuOpen ? (
                  <Menu centered={true} />
                ) : (
                  <div className="layout-children">
                    {children}
                  </div>
                )
              }
            </div>
          </Container>
        )
      }
    </div>
  )
};

export default Layout;
