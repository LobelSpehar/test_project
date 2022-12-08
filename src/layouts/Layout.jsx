import { Navigation } from 'components';

export function Layout({ children, navLinks }) {
  return (
    <>
      <Navigation navLinks={navLinks} />
      <main>{children}</main>
    </>
  );
}
