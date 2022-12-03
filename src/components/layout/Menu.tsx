import { useRouter } from "next/router";
import { Text } from '@nextui-org/react';


const navigations = [
  {
    name: 'Dernières',
    route: '/home'
  },
  {
    name: 'Tendance',
    route: '/trending'
  },
  {
    name: 'Arrive Bientôt',
    disabled: true,
  },
]

const Menu = ({ centered = false, menuIndex = 0 }) => {
  const router = useRouter();

  return (
    <div className={`menu-container ${centered && 'menu-centered'}`}>
      {
        navigations.map((nav, index) => (
          <Text
            h6
            className="menu-item"
            onClick={() => {
              if (nav.route) router.push(nav.route)
            }}
            style={{ cursor: nav.disabled ? 'not-allowed' : '' }}
            size={index === menuIndex ? 30 : 25} color={index === menuIndex ? 'purple' : nav.disabled ? '#d0d0d0' : 'gray'}
          >
            {nav.name}
          </Text>
        ))
      }
    </div>
  )
}

export default Menu;
