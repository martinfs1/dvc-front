export default {
    isAuthenticated: () => {
        return localStorage.getItem('token') ? true : false
    },
    logedIn: (token, fullname) => {
        localStorage.setItem('token', token);
        localStorage.setItem('username', fullname);
        console.log(token, fullname);
    },
    logOut: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
    },
}

