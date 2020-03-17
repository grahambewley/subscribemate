const baseUrl = process.env.NODE_ENV === "production" 
    ? 'https://feed-seek.com'
    : 'http://localhost:3000';

export default baseUrl;