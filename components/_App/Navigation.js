import { Menu, Container, Icon, Input, Image } from "semantic-ui-react";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { handleLogout } from '../../utils/auth';

function Header({ user }) {
  const router = useRouter();

  const options = [
    {key: 'all', text: 'All', value: 'all'},
    {key: 'newsletters', text: 'Newsletters', value: 'newsletters'},
    {key: 'podcasts', text: 'Podcasts', value: 'podcasts'},
    {key: 'blogs', text: 'Blogs', value: 'blogs'}
  ]

  function isActive(route) {
    return route === router.pathname;
  }

  return (
    <Menu attached stackable fluid id="menu" inverted color="teal">
      <Container>
        <Link href="/">
          <Menu.Item header>
            <Image
                size="small"
                src="/static/logo_horizontal.png"
              />
          </Menu.Item>
        </Link>

        <Link href="/newsletters">
            <Menu.Item header active={isActive("/cart")}>
                <Icon name="newspaper outline" size="large" />
                Newsletters
            </Menu.Item>
        </Link>

        <Link href="/podcasts">
            <Menu.Item header active={isActive("/create")}>
                <Icon name="microphone" size="large" />
                Podcasts
            </Menu.Item>
        </Link>

        <Link href="/blogs">
            <Menu.Item header active={isActive("/create")}>
                <Icon name="write" size="large" />
                Blogs
            </Menu.Item>
        </Link>
        <Menu.Menu position='right'>
          <Input 
            inverted
            transparent
            icon='search'
            placeholder='Search...'
          />
          {user ? (
          <>
            <Link href="/account">
              <Menu.Item header active={isActive("/account")}>
                <Icon name="user" size="large" />
                Account
              </Menu.Item>
            </Link>

            <Menu.Item onClick={handleLogout} header>
              <Icon name="sign out" size="large" />
              Logout
            </Menu.Item>
          </>
        ) : (
          <>
            <Link href="/login">
              <Menu.Item header active={isActive("/login")}>
                <Icon name="sign in" size="large" />
                Login
              </Menu.Item>
            </Link>

            <Link href="/signup">
              <Menu.Item header active={isActive("/signup")}>
                <Icon name="signup" size="large" />
                Signup
              </Menu.Item>
            </Link>
          </>
        )}
        </Menu.Menu>
      </Container>
    </Menu>
  );
}

export default Header;
