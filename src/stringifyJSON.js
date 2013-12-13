// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to have to write it from scratch:
// Function, RegExp, and Error objects and undefined value cannot be serialized

var stringifyJSON = function (obj) {
	args = Array.prototype.slice.call(arguments);
	var valid = null;
	var strObj = null;

	var getElement = function(obj) {
		if (Array.isArray(obj)) {
			obj = _.map(obj, getElement);
			return "[" + obj + "]";
		}
		else if (typeof(obj) === 'object' && obj !== null) {
				strObj = "";
			_.each(obj, function(value, key) {
				valid = (typeof(value) === 'function' || value === void 0) ? false : true;
				if (!valid) {
					strObj = '';
				} 
				else {
				strObj = strObj + ',' + getElement(key) + ":" + getElement(value);					
				}
			});
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
		} 
		else if (typeof(obj) === 'string') {
			return '"' + obj + '"' ;

		}
		else if (typeof(obj) === 'boolean') {
			return obj.toString();
		}
	};
	
	return getElement(obj);
};
