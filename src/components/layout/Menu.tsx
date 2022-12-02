import { useRouter } from "next/router";
import { Text } from '@nextui-org/react';

import menuNavigations from "./menuNavigations";

const Menu = ({ centered = false, menuIndex = 0 }) => {
  const router = useRouter();

  return (
    <div className={`menu-container ${centered && 'menu-centered'}`}>
      {
        menuNavigations.map((nav, index) => (
          <Text onClick={() => router.push(nav.route)} h6 size={index === menuIndex ? 30 : 25} color={index === menuIndex ? 'purple' : 'gray'} className="menu-item">
            {nav.name}
          </Text>
        ))
      }
    </div>
  )
}

export default Menu;
