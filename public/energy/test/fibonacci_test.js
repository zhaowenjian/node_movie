 //fibonacci.js
 var fibonacci = function(n) {
 	return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2);
 };

 function memoizer(fundamental, cache) {   
  cachecache = cache || {};   
  var shell = function(arg) {   
      if (! (arg in cache)) {   
          cache[arg] = fundamental(shell, arg);   
      }   
      return cache[arg];   
  };   
  return shell;   
} 

/*var fibonacci = memoizer(function(recur, n) {   
  return recur(n - 1) + recur(n - 2);   
}, { "0": 0, "1": 1} ); */

function tco(f) {
    var value;
    var active = false;
    var accumulated = [];

    return function accumulator() {
        accumulated.push(arguments);

        if (!active) {
            active = true;

            while (accumulated.length) {
                value = f.apply(this, accumulated.shift());
            }

            active = false;

            return value;
        }
    }
}

/*var fibonacci = tco(function(n) {
    return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2);
});
*/
 onmessage = function(event) {
    var data = event.data;
    var start = Date.now();
    var res = fibonacci(data);
    var current = Date.now();
    var runtime = current - start;
    var response = "data," + data + ",res," + res + ",runtime," + runtime;
 	postMessage(response);
 };