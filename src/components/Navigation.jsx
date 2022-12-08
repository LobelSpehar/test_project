import { Link, useLocation } from 'react-router-dom';

export function Navigation({ navLinks }) {
  const pathname = useLocation().pathname;
  return (
    <nav>
      <ul>
        {navLinks.map((link) => (
          <li key={link.title}>
            <Link
              style={
                pathname === link.path ? { backgroundColor: '#01b893' } : null
              }
              to={link.path}
            >
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
