

$(function(){
    $('.del').click(function(e){
        
        var target = $(e.target)
        var id = target.data('id')
        var tr = $('.item-id-' + id)
        $.ajax({
            url: '/admin/movie/delete/' + id,
            type: 'delete',
        }).done(function(results){
            if( results.success === 1){
                if( tr.length > 0 ){
                    tr.remove()
                }
            }
        })
    });


    $('#idInput').blur(function(){
        var idInput = $('#idInput');
        var _id = idInput.val();

        if(_id){
            $.ajax({
                url: 'https://api.douban.com/v2/movie/subject/' + _id,
                cache: true,
                type: 'GET',
                dataType: 'jsonp',
                crossDomain: true,
                jsonp: 'callback',
                success: function( data ){
                    $('#nameInput').val(data.title);
                    $('#doctorInput').val(data.directors[0].name);
                    $('#countryInput').val(data.countries[0]);
                    $('#yearInput').val(data.year);
                    $('#summaryInput').val(data.summary);
                    $('#summaryInput').val(data.summary);
                    $('#posterInput').val(data.images.large);
                }
            })
        }
    })

})