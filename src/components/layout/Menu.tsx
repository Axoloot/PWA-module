import { Text } from '@nextui-org/react';

import menuNavigations from "./menuNavigations";

const Menu = ({ centered = false }) => (
  <div className={`menu-container ${centered && 'menu-centered'}`}>
    {
      menuNavigations.map((nav, index) => (
        <Text h6 size={index === 2 ? 30 : 25} color={index === 2 ? 'purple' : 'gray'} className="menu-item">
          {nav.name}
        </Text>
      ))
    }
  </div>
);

export default Menu;
