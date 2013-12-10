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

  console.log('**** Let\'s START:', className);
	var obj = window.document.body;   						// this is an element, a node, and an object
	var result = [];

	var lookForClass = new RegExp("\\b" + className + "\\b");

  var getClassName = function(obj) {
  	//console.log('CHECK', obj.classList, 'and obj is:', obj);

  	if (lookForClass.test(obj.classList)) {
  		console.log("Found it :", obj.classList);  
  		result.push(obj);  
  	}
  	
		var children = obj.childNodes;				// returns collection of node-objects, NOT an array 
		//console.log('child', obj.childNodes, 'children array?', Array.isArray(children));

   	_.each(children, function(value, key) {
   		//console.log('value is', value);
      if (value.nodeType != 1) {				// if not an element node skip this iteration
      	return;												  // why illegal continue statement? continue or return?!?
      }
      //console.log('Recurse!! value', value);
      getClassName(value);
    }); 
 	
 	return true;  											// is this necessary?
  };
  
 	getClassName(obj); 

	console.log('EXPECTED', window.document.getElementsByClassName('targetClassName') );
	console.log('result: ', result);		// Why isn't this displayed in console?
 
	return result;
};


/*
// Using walk the DOM approach.
var getElementsByClassName = function (className) {

};
*/







