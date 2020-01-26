import cookie from 'js-cookie';
import Router from 'next/router';

export function handleLogin(token) {
    // Using js-cookie library to store this JSON web token as a cookie called 'token'
    cookie.set('token', token);
    // Redirect to the home page
    Router.push('/');
}

export function redirectUser(ctx, location) {
    // If we have access to ctx then we know we're on the server and not the client
    if(ctx.req) {
        // This is a Node.js way of performing a redirect from the server
        ctx.res.writeHead(302, { Location: location });
        // Stop writing to the response
        ctx.res.end();
    } 
    // Otherwise, redirect on the client side
    else {
        Router.push(location);
    }
}

export function handleLogout() {
    cookie.remove('token');
    Router.push('/login');
    window.localStorage.setItem('logout', Date.now());
}