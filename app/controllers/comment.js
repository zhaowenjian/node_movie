
var mongoose = require('mongoose')
var Comment = require('../models/comment')

exports.save = function( req, res){
    var _comment = req.body.comment
console.log('_comment : ')
console.log(_comment)
    var comment = new Comment(_comment)
    comment.save(function( err, comment){
        if(err){
            console.log(err)
        }
        Comment
            .findOne({ _id: comment._id})
            .populate( 'from', 'name')
            .populate( 'reply')
            .exec(function( err, comments){
        console.log('comments : ')
        console.log(comments)
                res.json({data: comments})
            })
    })
}