export default {
    isAuthenticated: () => {
        return localStorage.getItem('token') ? true : false
    },
    logedIn: (token, role, id, fullname) => {
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
        localStorage.setItem('id', id);
        localStorage.setItem('username', fullname);
    },
    logOut: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('id');
        localStorage.removeItem('username');
    },

    hasRole: role => {
        return localStorage.getItem('role') === role
    },
    hasID: id => {
        return localStorage.getItem('id') === id
    },


}

