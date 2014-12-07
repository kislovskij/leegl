'use strict';

var xhr = new XMLHttpRequest();
xhr.open("GET", "http://leegl.org/terms/domain/" + document.domain);

xhr.onreadystatechange = function() {
	if (xhr.readyState === 4) {
		console.log(xhr.responseText);
	}
}

xhr.send();
