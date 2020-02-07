import App from 'next/app';
import Layout from '../components/_App/Layout';
import { parseCookies, destroyCookie } from 'nookies';
import { redirectUser } from '../utils/auth';
import baseUrl from '../utils/baseUrl';
import axios from "axios";

class MyApp extends App {

    static async getInitialProps({ Component, ctx }) {
        // Use nookies library to get cookies from context object
        const { token } = parseCookies(ctx);

        let pageProps = {};

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }

        // If there is no token then user is not authenticated 
        if(!token) {
            // Determine if the page being visted is a protected one
            const isProtectedRoute = ctx.pathname === '/account';
            // If so, redirect to the login page
            if(isProtectedRoute) {
                redirectUser(ctx, '/login');
            }
        }
        // Otherwise, user is authenticated
        else {
            try {
                // JWTs must be passed as authorization headers
                const payload = { headers: { Authorization: token } };
                const url = `${baseUrl}/api/account`;
                const response = await axios.get(url, payload);
                const user = response.data;

                // Add user to pageProps on each page
                pageProps.user = user;
            } catch(error) {
                console.error("Error getting current user", error);
                // Throw out invalid token
                destroyCookie(ctx, "token");
                // Redirect to login page
                redirectUser(ctx, "/login");
              }
        }

        return { pageProps };
    }

    render() {
        const { Component, pageProps } = this.props;
        return (<div className='pageWrapper'>
            <Layout {...pageProps}>
                <Component {...pageProps} />
            </Layout>
            <style jsx>{`
            .pageWrapper {
                background-color: #f6f6f6;
            }
            `}</style>
        </div>);
    }
}

export default MyApp;