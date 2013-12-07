// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But in stead we're going to implement it from scratch:

// Assuming we can use underbar
/*
var getElementsByClassName = function (className) {
	console.log('**** Let\'s START:', 'typeof:', typeof(className), 'className:', className);
	var huh = document.getElementsByClassName(className);
	console.log('huh', huh);
	console.log('direct', document.getElementsByClassName('targetClassName') );
	return document.getElementsByClassName(className);

};
*/

var getElementsByClassName = function (className) {
  console.log('**** Let\'s START:', className);
	//  console.log(typeof(document));
	var obj = window.document;
	console.log(obj);

  var getClassName = function(obj) {
  	console.log('CHECK', obj.className);

  	if (obj.className === className) {
  		console.log("Found it :", obj.className);  
  		return "HI";	
  		console.log("this should never show")	;
  	}
  	else {
    	_.each(obj, function(value, key) {
  		  if (typeof(value) === 'object') {
  		  	console.log('Recurse!! value', value);
  		  	getClassName(value);
  		  }
    	}); 
    }
  };
  
  var result = getClassName(obj);   // i think this immediately calls the function ???

	//console.log('EXPECTED', document.getElementsByClassName('targetClassName') );
	console.log('EXPECTED2', window.document.getElementsByClassName('targetClassName') );
	//console.log('result: ', result);
	//return getClassName(obj);  
	return result;
};
