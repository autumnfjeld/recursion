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
	//  console.log(typeof(document));
	var obj = window.document;   // this is both a node and an object
	var value = null;
	var result = [];


  var getClassName = function(obj) {
  	console.log('CHECK', obj.className);

  	if (obj.className === className) {
  		console.log("Found it :", obj.className);  
  		result.push(obj.className);  
  		console.log("this should never show")	;
  	}
  	else {
   	 	_.each(obj, function(value, key) {
        if (typeof(value) === 'object' && value !== null) {
          console.log('Recurse!! value', value);
          getClassName(value);
        }
      }); 
    }
  };
  
  var result = getClassName(obj);   // i think this immediately calls the function ???

	//console.log('EXPECTED', document.getElementsByClassName('targetClassName') );
	//console.log('EXPECTED2', window.document.getElementsByClassName('targetClassName') );
	console.log('result: ', result);
	//return getClassName(obj);  
	return result;
};
