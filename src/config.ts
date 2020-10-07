export const config = {
  apiUrl: 'http://localhost:5000/api',
  // apiUrl: 'http://192.168.110.122:5000/api/',
  // apiUrl: 'http://ui-lib-demo-api.herokuapp.com',
  authRoles: {
    admin: ['admin'], // Only Super Admin has access
    // admin: ['SA', 'Admin'], // Only SA & Admin has access
    // editor: ['SA', 'Admin', 'Editor'], // Only SA & Admin & Editor has access
    // user: ['SA', 'Admin', 'Editor', 'User'], // Only SA & Admin & Editor & User has access
    // guest: ['SA', 'Admin', 'Editor', 'User', 'Guest'] // Everyone has access
  }
}