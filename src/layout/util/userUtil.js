export const isLoggedIn=()=>{
    return !!localStorage.getItem(process.env.REACT_APP_ONLINE_SHOPPING);
};

export const getToken=()=>{
    return localStorage.getItem(process.env.REACT_APP_ONLINE_SHOPPING);
};