// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
// Use a recursive descent parser

var parseJSON = function (json) {
	//why are null, true, false read as string?
	//console.log('%c*** START json is:', 'background-color:yellow;', json, 'typeof is', typeof json);
	var	text;
	var at;							// index of current character
	var ch;							// current character

	// Set up error handling
	var error = function (m) {
		throw {
			name: 		'SyntaxError',
			message: 	m,
			at: 	  	at,
			text:   	text 
		};
	};

	// If c is passed check that it is equal to ch as expected
	var next = function (c) {
		if (c && c !== ch) {
			error("Expected '" + c + "' instead of '" + ch + "'");
		}
		at++
		ch = text.charAt(at);
		//console.log("IN next. ch:", ch, 'at', at, 'text', text);
		return ch;
	};

	// Handle white space (to do)
	var white = function () {

	}; 

	// Parse a number
	var number = function () {
		//console.log("IN number. ch is", ch );
		var number;
		var string = '';

		while (ch >= '0' && ch <= '9' || ch === '.' || ch === '-') {
			string += ch;
			next();
		}

		number = +string;								// + turns string into number type  			
		return number;
	};

	// Parse a string (does not account for escaped characters)
	var string = function () {
		//string will always be enclosed with "", use this as marker
		//console.log("IN string. ch is", ch, 'test', ch < 'z');
		var string = '';

		if (ch == '"') {
			next();
		}
		while ( ch != '"') {
			string += ch;
			next();
		}
		next('"');  						// move to end of string 
		
		return string;
	};

	// Parse special words
	var specialWords = function () {
		//console.log("IN specialWords. ch is", ch, 'test', ch < 'z', ch > 'A');
		var string = '';

		while ( ch >= 'A' && ch <= 'z') {
			string += ch;
			next();
		}
		if (string === 'null')
			return null;
		if (string === 'false')
			return false;
		if (string === 'true')
			return true;
		error('Unexpected "' + ch + '"');
	};

	var array = function () {
		//console.log("IN array, ch is:", ch)
		var pArray = [];
		if (ch == '[') {
			next('[');

			while (ch) {				
				if (ch == ']') {
					next(']');				
					return pArray;
				}
				pArray.push(value()); 
				if (ch == ']') {
					next(']');
					return pArray
				}
				next(',');	
			}
		}

		return pArray;
	}; 

	var object = function (){
		//console.log("In object function");
		var obj = {};
		var key = '', val = '';

		if (ch == '{') {
			next('{');
		}

		while (ch) {
			if (ch == '}') {
				next('}')
				return obj;
			}
			while (ch != ':') {
				key = value();
			}
			next(':');

			val = value();
			obj[key] = val;
			if (ch == '}') {
				next('}');
				return obj;				
			}
			
			next(',');
		}
		
		return obj;	
	};

	// Main 'switchboard' to route item to be parsed
	var value = function () {
		//console.log('IN value. ch:', ch);
		switch (ch) {
			case '[':
				return array();
			case '{':
				return object();
			case '"':
				return string();
			case '-':
				return number();
			default: 
				return ch >= '0' && ch <= '9' ? number() : specialWords();
		}
	};

	// Start the process, initialize stuff here
	var result = function () {  
		text = json;
		at = 0;
		ch = text[0];
		//console.log("here");
		var parsed = value();
		//console.log('%cJSON.parse is: ', 'background-color: pink;', JSON.parse(json), typeof JSON.parse(json));
		//console.log('%cmy parse is:', 'background-color: pink;', parsed, ' and typeof', typeof parsed);
		return parsed;
	};

	return result(); 
};
