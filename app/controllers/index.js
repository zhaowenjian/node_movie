
var mongoose = require('mongoose')
var Movie = mongoose.model('Movie')

exports.index = function( req, res){

console.log('req.session.user : ')
console.log(req.session.user)

    Movie.fetch(function( err, movies){
        res.render( 'index', {
            title: 'Movie index...',
            movies: movies
        })
    })
}

exports.serch = function( req, res){

}