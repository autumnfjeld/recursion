// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to have to write it from scratch:
var stringifyJSON = function (obj) {
	args = Array.prototype.slice.call(arguments);
	//console.log('args', args);
	var valid = null;
	var strObj = null;

	var getElement = function(obj) {
		if (Array.isArray(obj)) {
			//console.log('in array');
			obj = _.map(obj, getElement);
			//console.log('stuff', obj);
			return "[" + obj + "]";
		}
		else if (typeof(obj) === 'object' && obj !== null) {
				strObj = "";
			_.each(obj, function(value, key) {
				//console.log('key',key, 'value', value);
				// Function, RegExp, and Error objects and undefined value cannot be serialized
				valid = (typeof(value) === 'function' || value === void 0) ? false : true;
				//console.log('valid',valid);
				if (!valid) {
					strObj = '';
				} 
				else {
				strObj = strObj + ',' + getElement(key) + ":" + getElement(value);					
				}
				//console.log('changing object ', strObj);
			});
			//console.log('end of object processing.  obj is', strObj)
			return   "{" + strObj.substring(1) + "}";
		}
		else if (typeof(obj) === 'function' || obj === void 0) {
			return '';
		}
		else if (obj === null){
			return 'null';
		}
		else if (typeof(obj) === 'number') {
			return obj.toString();
			//console.log('in number', item);
			//return item;
		} 
		else if (typeof(obj) === 'string') {
			return '"' + obj + '"' ;

		}
		else if (typeof(obj) === 'boolean') {
			return obj.toString();
		}
		//else
			//return "No match found. FIGURE IT OUT";
	};
	
	return getElement(obj);

	//console.log('item: ', item, 'count',count)
	//return item;

  // your code goes here
};
