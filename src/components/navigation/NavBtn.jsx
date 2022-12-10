import { Link } from 'react-router-dom';

export function NavBtn({ link, pathname }) {
  return (
    <Link className={pathname === link.path ? 'selected' : ''} to={link.path}>
      {link.title}
    </Link>
  );
}
