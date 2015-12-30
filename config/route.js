
var mongoose = require('mongoose')
var Movie = require("../app/models/movie")
var Index = require("../app/controllers/index")
var Movie = require("../app/controllers/movie")
var User = require("../app/controllers/user")
var Comment = require("../app/controllers/comment")

module.exports = function(app){

    app.use(function( req, res, next){
        var _user = req.session.user
        
            app.locals.user = _user
        
        next()
    });

//Movie
    app.get( '/', Index.index);
    //detail page
    app.get( '/movie/:_id', Movie.detail);
    //admin 录入页
    app.get( "/admin", User.loginRequired, User.adminRequired, Movie.new);
    //后台 电影列表页
    app.get( '/admin/list', User.loginRequired, User.adminRequired, Movie.list);
    //update 页面
    app.get( '/admin/movie/update/:_id', User.loginRequired, User.adminRequired, Movie.update)
    //储存 Movie
    app.post( '/admin/movie/new', User.loginRequired, User.adminRequired, Movie.save)
    // delete 页
    app.delete( '/admin/movie/delete/:_id', User.loginRequired, User.adminRequired, Movie.delete)

//User
    //signIn
    app.get( '/user/signIn', User.showSignIn)
    //signUp
    app.get( '/user/signUp', User.showSignUp)
    //user list
    app.get( '/admin/user/list', User.loginRequired, User.adminRequired, User.list)
    //signIn
    app.post( '/user/signIn', User.signIn)
    //signUp
    app.post( '/user/signUp', User.signUp)
    //logout
    app.get( '/user/logout', User.logout)

//comment
    app.post( '/admin/comment', User.loginRequired, Comment.save)
}

