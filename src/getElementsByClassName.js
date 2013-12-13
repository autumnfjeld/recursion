// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But in stead we're going to implement it from scratch:

// Outline:
// produce an array that contains all elements which contain the specified class
// Loop thru document object recursively to find all instances of className
// document object contains strings and objects
// CANNOT do a straight recursion loop into object, this results in stack overflow



var getElementsByClassName = function (className) {
	var obj = window.document.body;   					
	var result = [];

	var lookForClass = new RegExp("\\b" + className + "\\b");

  var getClassName = function(obj) {

  	if (lookForClass.test(obj.classList)) {
  		result.push(obj);  
  	}
  	
		var children = obj.childNodes;					// returns collection of node-objects, NOT an array 

   	_.each(children, function(value, key) {
      if (value.nodeType != 1) {					// if not an element node skip this iteration
      	return;												
      }
      getClassName(value);
    }); 

  };
  
 	getClassName(obj); 

	return result;
};


/*
// ToDo:  Using walk the DOM approach.
var getElementsByClassName = function (className) {

};
*/







