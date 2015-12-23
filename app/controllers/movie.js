
var mongoose = require('mongoose')
var Movie = mongoose.model('Movie')
var _ = require('underscore')

exports.new = function( req, res){
    res.render( 'admin', {
        title: 'Admin movie...',
        movie:{

        }
    });
}

exports.update = function( req, res){
    var _id = req.params._id;

    Movie.findById( _id, function( err, movie){
        res.render( 'admin', {
            title: 'Update movie...',
            movie: movie
        })
    })
}

exports.delete = function( req, res){
    var _id = req.params._id
    Movie.remove({_id: _id}, function( err, movie){
        if(err){
            console.log(err)
            res.json({success: 0})
        } else {
            res.json({success: 1})
        }
    })
}

exports.detail = function( req, res){
    var _id = req.params._id;

    Movie.findById( _id, function( err, movie){
        if(err){
            console.log(err)
        }
        res.render( 'detail', {
            title: 'Detail ' + _id + '....',
            movie: movie
        })
    })
}

exports.save = function( req, res){
    var _id = req.body.movie._id;
    var movieObj = req.body.movie;

    var _movie

    if(_id){
        Movie.findById( _id, function( err, movie){
            if(err){
                console.log(err)
            }
            _movie = _.extend( movie, movieObj)
            _movie.save(function( err, movie){
                if(err){
                    console.log('save:')
                    console.log(err)
                } 

                res.redirect('/movie/' + movie._id)
            })

        })
    } else {
        _movie = new Movie(movieObj);
        _movie.save(function( err, movie){
            if(err){
                console.log('save:')
                console.log(err)
            } 

            res.redirect('/movie/' + movie._id)
        })
    }
}

exports.list = function( req, res){

    Movie.fetch(function( err, movies){
        res.render( 'list', {
            title: 'Movie list...',
            movies: movies
        })
    })
    
}