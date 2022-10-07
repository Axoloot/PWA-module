import { Container } from '@nextui-org/react';

import Menu from "./Menu";
import Header from "./header";
import useWindowSize from "../useWindowSize";
import {useState} from "react";

const Layout = ({ children }: any) => {
  const { width } = useWindowSize();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="layout-container">
      <div className="layout-header-container">
        <Container>
          <Header width={width} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        </Container>
      </div>
      {
        width > 960 ? (
          <Container>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <div style={{ width: '20%' }}>
                <Menu />
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
