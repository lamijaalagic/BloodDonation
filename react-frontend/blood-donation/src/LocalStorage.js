const jwt = require("jsonwebtoken")

const LocalStorageService = (function() {
    var _service;

    function _getService() {
        if (!_service) {
            _service = this;
            return _service
        }
        return _service
    }

    function _setToken(tokenObj) {
        localStorage.setItem('access_token', tokenObj.token);
        const decoded_token = jwt.decode(tokenObj.token)
        console.log(decoded_token)
        localStorage.setItem('role', decoded_token.role);
        localStorage.setItem('userId', decoded_token.id);
        localStorage.setItem('username', decoded_token.username);
    }

    function _getUserId() {
        return localStorage.getItem('userId');
    }

    function _getAccessToken() {
        return localStorage.getItem('access_token');
    }

    function _getRole() {
        return localStorage.getItem('role');
    }

    function _getUsername() {
        return localStorage.getItem('username')
    }

    function _clearToken() {
        localStorage.removeItem('access_token');
        localStorage.removeItem('role');
    }
    return {
        getService: _getService,
        setToken: _setToken,
        getAccessToken: _getAccessToken,
        getRole: _getRole,
        getUserId: _getUserId,
        getUsername:_getUsername,
        clearToken: _clearToken
    }
})();
export default LocalStorageService;