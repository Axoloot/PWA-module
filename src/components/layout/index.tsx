import { Container } from '@nextui-org/react';

import Header from "./header";

const Layout = ({ children }: any) => (
  <div className="layout-container">
    <div className="layout-header-container">
      <Container>
        <Header />
      </Container>
    </div>
    <Container>
      <div className="layout-children">
        {children}
      </div>
    </Container>
  </div>
)

export default Layout;
