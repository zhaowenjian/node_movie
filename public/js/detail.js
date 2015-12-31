
$(function(){

    $('.media-list').on( 'click', function(e){
    console.log(e.target)
        var target = $(e.target)

        var toId = target.data('tid')
        var commentId = target.data('cid')
console.log('toId : ' + toId)
console.log('commentId : ' + commentId)
        target.parents('.media-body').attr( 'id', 'mediaBody')

        if($('#cId').length > 0){
            $('#cId').val(commentId)
        } else {
        
            $('<input>').attr({
                type: 'hidden',
                id: 'cId',
                name: 'comment[commentId]',
                value: commentId
            }).appendTo('#commentForm')

        }

        if($('#toId').length > 0){
            $('#toId').val(toId)
        } else {
       
            $('<input>').attr({
                type: 'hidden',
                id: 'toId',
                name: 'comment[tid]',
                value: toId
            }).appendTo('#commentForm')

        }

    })

    $('#comments button').on( 'click', function(e){
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url: '/admin/comment',
            data: {
                'comment[movie]': $('#comments input:eq(0)').val(),
                'comment[from]': $('#comments input:eq(1)').val(),
                'comment[content]': $('#comments textarea').val(),
                //reply
                'comment[tid]': $('#toId').val(),
                'comment[cid]': $('#cId').val()
            }
        }).done(function(results){
            var data = results.data || {}
            //将返回的数据添加到评论区
            if(data.reply.length){
                var len = data.reply.length

                $('#mediaBody').append('<li class="media",style="margin-left:30px;">' +
                  '<div class="pull-left"><img src="/img/war.png" style="width:60px;height:60px;" class="media-object"></div>' +
                  '<div class="media-body">' +
                    '<h4 class="media-heading">' + data.reply[len-1].to.name + '</h4>' +
                    '<p>' + data.reply[len-1].content + '</p><span class="createAt">' + data.reply[len-1].meta.createAt + ' &nbsp;&nbsp;&nbsp;</span><a href="#comments" data-cid="' + data.reply[len-1]._id + '" data.tid="' + data.reply[len-1].from._id + '" class="comment">Reply</a>' +
                  '</div></li><hr>')
                
            } else {
                $('.media-list').append('<li class="media">' +
                  '<div class="pull-left"><img src="/img/dota.png" style="width:60px;height:60px;" class="media-object"></div>' +
                  '<div class="media-body">' +
                    '<h4 class="media-heading">' + data.from.name + '</h4>' +
                    '<p>' + data.content + '</p><span class="createAt">' + data.meta.createAt + ' &nbsp;&nbsp;&nbsp;</span><a href="#comments" data-cid="' + data._id + '" data.tid="' + data.from._id + '" class="comment">Reply</a>' +
                  '</div></li><hr>')
                
            }
            $('#comments textarea').val('')
            $('#mediaBody').removeAttr('id')
            $('#commentForm input:gt(1)').remove() 
        })

    })

    function timeFormat(){

    }

})