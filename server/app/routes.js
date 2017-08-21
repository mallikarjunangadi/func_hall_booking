var dbService = require('./service/dbService');

module.exports = function(app) {
    app.post('/loginAuth', dbService.loginAuthantication);
    app.post('/signUp', dbService.signUp);
}