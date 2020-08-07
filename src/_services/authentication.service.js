import { BehaviorSubject } from 'rxjs';
// import config from 'config';
import { handleResponse } from '../../src/_helpers/handler-response';
import Api from '../../src/Api'
const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

export const authenticationService = {
    Login,
    logout,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue () { return currentUserSubject.value }
};



function Login(email, password) {

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    };

    return fetch(Api.url + "/auth/login", requestOptions)
        .then(handleResponse)
        .then(user => {
            if(user.message === 'incorrect'){
                return 'incorrect';
            }else{
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                currentUserSubject.next(user);
                return user;
            }
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
}