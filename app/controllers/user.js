
var mongoose = require('mongoose')
var User = require('../models/user')


exports.showSignIn = function( req, res){

    res.render( 'signIn', {
        title: 'Sing In us....'
    })
    
}

exports.showSignUp = function( req, res){

    res.render( 'signUp', {
        title: 'Sign up to joy...'
    })

}

exports.signUp = function( req, res){

    var _user = req.body.user

    User.findOne( {name: _user.name}, function( err, user){
        if(err){
            console.log(err)
        }
        if( user ){
            res.redirect('/user/signIn')
        } else {
            user = new User( _user )
            user.save(function( err, user){
                if(err){
                    console.log(err)
                }
                res.redirect('/')
            })
        }
    })

}

exports.signIn = function ( req, res){

    var _user = req.body.user
    var _name = _user.name
    var _password = _user.password

    User.findOne( {name: _name}, function( err, user){
        if(err){
            console.log(err)
        }

        if(!user){
            return res.redirect('/user/signUp')
        }

        user.comparePassword( _password, function( err, isMatch){
            if(err){
                console.log(err)
            }

            if(isMatch){
                //登录成功
                req.session.user = user
                
                return res.redirect( '/' );
            } else {
                return res.redirect( '/user/signIn')
            }
            
        })
    })

};

exports.logout = function( req, res){
    delete req.session.user

    res.redirect('/')
};

exports.loginRequired = function( req, res, next){
    var _user  = req.session.user

    if( _user ){
        next()
    } else {
        return res.redirect('/')
    }

}

exports.list = function( req, res){

    User.fetch(function( err, users){
        if(err){
            console.log(err)
        }
        res.render( 'userList', {
            title: 'User list...',
            users: users
        })
    })
    
}

exports.adminRequired = function( req, res, next){
    var _user  = req.session.user

    if( _user.role >= 10 ){
        next()
    } else {
        return res.redirect('/')
    }

}