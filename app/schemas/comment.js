
var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

var commentSchema = new Schema({
    movie: {
        type: ObjectId,
        ref: 'Movie'
    },
    //对评论人的回复
    reply: [ 
        {
            from: {
                type: ObjectId,
                ref: 'User'
            },
            //被评论人
            to: {
                type: ObjectId,
                ref: 'User' 
            },
            content: String,
            meta: {
                createAt: {
                    type: Date,
                    default: Date.now()
                }
            }
        }
    ],
    //评论人
    from: {
        type: ObjectId,
        ref: 'User'
    },
    content: String,
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }

})

commentSchema.statics = {
    fetch: function(cb){
        return this
            .find({})
            .sort('meta.updateAt')
            .exec(cb)
    },
    findById: function( id, cb){
        return this
            .findOne({_id: id})
            .exec(cb)
    }
}

commentSchema.pre( 'save', function(next){
    if(this.isNew){
        this.meta.createAt = this.meta.updateAt = Date.now()
    } else {
        this.meta.updateAt = Date.now()
    }
    next()
})

module.exports = commentSchema