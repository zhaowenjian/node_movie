
var mongoose = require('mongoose')
var Comment = require('../models/comment')

exports.save = function( req, res){
    var _comment = req.body.comment
 console.log('_comment : ')
console.log(_comment)   
    if( _comment.cid ){
        Comment.findOne( {_id: _comment.cid}, function( err, comment){
            if(err){
                console.log(err)
            } 
            console.log(comment)
            var reply = {
                from: _comment.from,
                to: _comment.tid,
                content: _comment.content,
                meta: {
                    createAt: Date.now()
                }
            }
            comment.reply.push(reply)

            comment.save(function(err,comment){
                if(err){
                    console.log(err)
                }

                Comment
                    .findOne({ _id: comment._id})
                    .populate( 'from', 'name')
                    .populate( 'reply.from reply.to', 'name')
                    .exec(function( err, comments){
                console.log('comments : ')
                console.log(comments)
                        res.json({data: comments})
                    })
                //res.redirect('/movie/' + _comment.movie)
            })

        })
    } else {
        var comment = new Comment(_comment)
        comment.save(function( err, comment){
            if(err){
                console.log(err)
            }
            Comment
                .findOne({ _id: comment._id})
                .populate( 'from', 'name')
                .populate( 'reply.from reply.to', 'name')
                .exec(function( err, comments){
            console.log('comments : ')
            console.log(comments)
                    res.json({data: comments})
                })
        })
    }

    
}