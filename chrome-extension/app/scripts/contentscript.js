'use strict';

var xhr = new XMLHttpRequest();
xhr.open("GET", "https://d929277f-aec8810cdf6a.my.apitools.com/terms/domain/" + document.domain);

xhr.onreadystatechange = function() {
	if (xhr.readyState === 4) {
		console.log(xhr.responseText);
	}
}

xhr.send();
