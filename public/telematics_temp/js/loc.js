window.onload = function(){

	window.addEventListener('message', function(e){
			//接受位置信息
			var loc = e.data;

			
			if(loc && loc.module == 'locationPicker'){
				alert('location: ' + JSON.stringify(loc));
			}
		}, false);
	
	var sendLoc = document.getElementById('sendLoc');

	sendLoc.addEventListener('click', function(){

	});



















}