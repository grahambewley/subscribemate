import { Menu, Container, Icon, Input, Dropdown } from "semantic-ui-react";
import Link from "next/link";
import Router, { useRouter } from "next/router";

Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

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
          <Menu.Item header active={isActive("/")}>
            SubscribeMate
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
        </Menu.Menu>
      </Container>
    </Menu>
  );
}

export default Header;
