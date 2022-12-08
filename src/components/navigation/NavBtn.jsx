import { Link } from 'react-router-dom';

export function NavBtn({ link, pathname }) {
  return (
    <Link
      style={pathname === link.path ? { backgroundColor: '#01b893' } : null}
      to={link.path}
    >
      {link.title}
    </Link>
  );
}
