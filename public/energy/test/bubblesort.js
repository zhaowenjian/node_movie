//生成随机数组
// http://stackoverflow.com/questions/962802#962890
function shuffle(n) {
    for (var array = [], i = 0; i < n; ++i) array[i] = i;
    var tmp, current, top = array.length;
    if (top)
        while (--top) {
            current = Math.floor(Math.random() * (top + 1));
            tmp = array[current];
            array[current] = array[top];
            array[top] = tmp;
        }
    return array;
}

function swap(items, firstIndex, secondIndex){
    var temp = items[firstIndex];
    items[firstIndex] = items[secondIndex];
    items[secondIndex] = temp;
}

function bubbleSort(items){

    var len = items.length,
        i, j, stop;

    for (i=0; i < len; i++){
        for (j=0, stop=len-i; j < stop; j++){
            if (items[j] > items[j+1]){
                swap(items, j, j+1);
            }
        }
    }

    return items;
}

onmessage = function(event) {
  var data = event.data;
  var start = Date.now();
  var res = bubbleSort(shuffle(data));
  var current = Date.now();
  var runtime = current - start;
  var response = "data," + data + ",res," + "res" + ",runtime," + runtime;
	postMessage(response);
};