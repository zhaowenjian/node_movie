
var mongoose = require('mongoose')
var commentShema = require('../schemas/comment')
var Comment = mongoose.model( 'Comment', commentShema)

module.exports = Comment
