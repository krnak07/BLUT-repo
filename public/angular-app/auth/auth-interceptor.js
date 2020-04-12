angular.module('bbApp')
.factory('AuthInterceptor',AuthInterceptor);

function AuthInterceptor($location,$q, AuthFactory) {

    return {
        request : request,
        response : response,
        responseError : responseError
    };

    function request(config){
        config.headers = config.headers || {};
        if(localStorage.getItem('token')){
            config.headers.authorization = 'Bearer '+localStorage.getItem('token');
        }
        return config;
    }
    function response(response){
        if(response.status == 200 && localStorage.getItem('token') && !AuthFactory.isLoggedIn){
            AuthFactory.isLoggedIn = true;
        }
        if(response.status == 401) {
            AuthFactory.isLoggedIn = false;
        }

        return response || $q.when(response)

    }
    function responseError(rejection){
        if(rejection.status == 401 || rejection.status == 403) {
            localStorage.removeItem('token');
            AuthFactory.isLoggedIn = false;
            $location.path('/login');
        }
        else if(rejection.status == 400){
            return rejection || $q.when(rejection)
        }
        $q.reject(rejection);
    }
}