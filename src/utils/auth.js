export default {
    isAuthenticated: () => {
        return localStorage.getItem('token') ? true : false
    },
    logedIn: (token) => {
        localStorage.setItem('token', token);
    },
    logOut: () => {
        localStorage.removeItem('token');
    },
}

