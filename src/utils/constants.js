let apiRoot = '';
if (process.env.BUILD_MODE === 'dev') {
    apiRoot = 'http://localhost:3000'
}
if (process.env.BUILD_MODE === 'production') {
    apiRoot = 'https://blog-api-bvh2.onrender.com'
}
export const API_ROOT = apiRoot;