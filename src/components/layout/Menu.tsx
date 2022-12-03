import { useRouter } from "next/router";
import { Text } from '@nextui-org/react';

import menuNavigations from "./menuNavigations";

const Menu = ({ centered = false, menuIndex = 0 }) => {
  const router = useRouter();

  window.location.pathname
  return (
    <div className={`menu-container ${centered && 'menu-centered'}`}>
      {
        menuNavigations.map((nav, index) => (
          <Text
            h6
            className="menu-item"
            onClick={() => {
              if (nav.route) router.push(nav.route)
            }}
            style={nav.disabled && { cursor: 'not-allowed' }}
            size={nav.route === window.location.pathname ? 30 : 25} color={nav.route === window.location.pathname ? 'purple' : nav.disabled ? '#d0d0d0' : 'gray'}
          >
            {nav.name}
          </Text>
        ))
      }
    </div>
  )
}

export default Menu;
