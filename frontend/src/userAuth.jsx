import {loginAnonymouslyApi} from "./api/apiAuth";
import {randomString} from "./utils";

export function handleAuthenticationError(error) {
    // Check if error.response and error.response.status are defined
    if (error.response && error.response.status) {
        if (error.response.status === 401) {
            if (localStorage.getItem("email")) {
                logOutUser();
                window.location = "/signin/";
            } else {
                loginAnonymouslyApi({key: getAnonymousKey()}).then((response) => {
                    localStorage.setItem('authToken', response.data.token);
                    localStorage.setItem('isAdmin', "false");
                    window.location.reload();
                }).catch((loginError) => {
                    console.error('Error during anonymous login:', loginError);
                    // Handle the error (e.g., display a notification or redirect to an error page)
                });
            }
        }
        // You can add additional status code checks here if needed
    } else {
        console.error('An unexpected error occurred:', error);
        // Handle non-standard errors (e.g., network issues, server down, etc.)
    }
}

export function loginUser(email, data) {
    localStorage.setItem('email', email);
    localStorage.setItem('authToken', data.token);
    localStorage.setItem('isAdmin', data.admin);
}

export function logOutUser() {
    localStorage.removeItem("email");
    localStorage.removeItem("authToken");
    localStorage.removeItem("isAdmin");
    window.location = '/'
}

export function isLoggedIn() {
    return localStorage.getItem('email') !== null;
}

export function isAdmin() {
    return localStorage.getItem('isAdmin') === "true";
}

export function getToken() {
    return localStorage.getItem("authToken");
}

export function getAnonymousKey() {
    let anonymousKey = localStorage.getItem('anonymousKey');
    if (anonymousKey) return anonymousKey;
    anonymousKey = randomString(20);
    localStorage.setItem("anonymousKey", anonymousKey);
    return anonymousKey;
}