import { useLocation } from 'react-router-dom';

import { NavBtn } from 'components';

export function Navigation() {
  const pathname = useLocation().pathname;
  const navLinks = [
    { path: '/home', title: 'Home' },
    { path: '/add/vehicleMake/', title: 'Add make' },
    { path: '/add/vehicleModel/', title: 'Add model' },
    { path: '/add/vehicle/', title: 'Add vehicle' },
  ];

  return (
    <nav>
      <ul>
        {navLinks.map((link) => (
          <li key={link.title}>
            <NavBtn link={link} pathname={pathname} />
          </li>
        ))}
      </ul>
    </nav>
  );
}
