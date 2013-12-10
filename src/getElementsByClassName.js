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
// hasOwnProperty

var getElementsByClassName = function (className) {

  console.log('**** Let\'s START:', className);
	var obj = window.document;   						// this is a node and an object
	var value = null;
	var result = [];

	var lookForClass = new RegExp("\\b" + className + "\\b");
	console.log("lookForClass", lookForClass);

  var getClassName = function(obj) {
  	console.log('CHECK', obj.className, 'and obj is:', obj);

  	if (lookForClass.test(obj.className)) {
  		console.log("Found it :", obj.className);  
  		result.push(obj.className);  
  	}

   	_.each(obj, function(value, key) {
      if (value.nodeType != 1) {				// if not an element node skip this iteration
      	return;
      }
      console.log('Recurse!! value', value);
      getClassName(value);
    }); 
 	
 		return true;
  };
  
  var result = getClassName(obj); 

	//console.log('EXPECTED', document.getElementsByClassName('targetClassName') );
	//console.log('EXPECTED2', window.document.getElementsByClassName('targetClassName') );
	console.log('result: ', result);
	//return getClassName(obj);  
	return result;
};
