
var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

var movieSchema = new Schema({
    name: String,
    doctor: String,
    country: String,
    year: Number,
    language: String,
    poster: String,
    flash: String,
    summary: String,
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
});

movieSchema.pre( 'save', function( next ){
    if( this.isNew ){
        this.meta.createAt = this.meta.updateAt = Date.now()
    } else {
        this.meta.updateAt = Date.now()
    }

    next()
})

movieSchema.statics = {
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

module.exports = movieSchema