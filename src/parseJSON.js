// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
// Use a recursive descent parser

var parseJSON = function (json) {
	//why are null, true, false read as string?
	console.log('%c*** START json is:', 'background-color:yellow;', json, 'typeof is', typeof json);
	var	text;
	var at;							// index of current character
	var ch;							// current character


	var error = function (m) {
		throw {
			name: 		'SyntaxError',
			message: 	m,
			at: 	  	at,
			text:   	text 
		};
	};

	// Move to next character
	// If c is passed check that it's not same as current character
	var next = function (c) {
		if (c && c !== ch) {
			console.log("Expected '" + c + "' instead of '" + ch + "'");
		}
		at++
		ch = text.charAt(at);
		console.log("IN next. ch:", ch, 'at', at, 'text', text);
		return ch;
	};

	// Handle white space
	var white = function () {

	}; 

	// Parse a number
	var number = function () {
		console.log("IN number. ch is", ch );
		var number;
		var string = '';

		while (ch >= '0' && ch <= '9' || ch === '.' || ch === '-') {
			string += ch;
			next();
		}

		number = +string;  			// why not just return string? and what is + here?
		console.log("is this a number", typeof number);
		return number;
	};

	// Parse a string (does not account for escaped characters)
	var string = function () {
		//string will always be enclosed with ""
		console.log("IN string. ch is", ch, 'test', ch < 'z');
		var string = '';

		if (ch == '"') {
			next();
		}
		while ( ch != '"') {
		//while ( ch >= 'A' && ch <= 'z') {
			console.log('in stringfunc while loop. ch is:', ch);
			string += ch;
			next();
		}
		return string;
	};

	// Parse special words
	var specialWords = function () {
		console.log("IN specialWords. ch is", ch, 'test', ch < 'z', ch > 'A');
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
		console.log("IN array, ch is:", ch)
		var pArray = [];
		if (ch == '[') {
			next('[');

			while (ch) {					// don't think this tests anything, just keeps the loop going
				if (ch == ']') {
					next(']');				// must move forward 
					return pArray;
				}
				console.log('in while loop, pArray', pArray);
				pArray.push(value()); 
				if (ch == ']') {
					return pArray
				}
				next(',');	
			}
		}

		return pArray;
	}; 

	var object = function (){
		console.log("In object function");
		var obj = {};

		if (ch == '{') {
			next('{');
			return obj;
		}

		while (ch) {
			if (ch == '{') {
				next('{')
			}
			next(',');
		}
		
		return obj;	
	};


	var value = function () {
		console.log('IN value. ch:', ch);
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

	var result = function () {  
		// Initialize stuff here
		text = json;
		console.log('typeof text',typeof text);
		at = 0;
		ch = text[0];
		//console.log("here");
		var parsed = value();
		console.log('%cJSON.parse is: ', 'background-color: pink;', JSON.parse(json), typeof JSON.parse(json));
		console.log('%cmy parse is:', 'background-color: pink;', parsed, ' and typeof', typeof parsed);
		return parsed;
	};

	//return 'autumn';
	//console.log('RESULT', result());
	return result();  //why is the return value of parsed not returned for parseJSON ?

};
