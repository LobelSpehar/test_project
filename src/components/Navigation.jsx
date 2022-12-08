import { useLocation } from 'react-router-dom';

import { NavBtn } from 'components';

export function Navigation({ navLinks }) {
  const pathname = useLocation().pathname;
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
