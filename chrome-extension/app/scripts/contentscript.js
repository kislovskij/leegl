'use strict';

var xhr = new XMLHttpRequest();
xhr.open("GET", "http://192.168.178.40:3000/terms/domain/" + document.domain);

xhr.onreadystatechange = function() {
	if (xhr.readyState === 4) {
		console.log(xhr.responseText);
	}
}

xhr.send();
