'use strict';

(function() {

	var xhr = new XMLHttpRequest();
	xhr.open("GET", "https://d929277f-aec8810cdf6a.my.apitools.com/terms/domain/" + document.domain);

	var submitButton = null, data;

	var showDialog = function() {

		var backdrop = document.createElement('div');
		backdrop.style.cssText = 'z-index: 1000000 !important; opacity: 0.6 !important; position: fixed !important; top: 0 !important; right: 0 !important; bottom: 0 !important; left: 0 !important; width: 100vw !important; height: 100vh !important; background-color: black !important; display: block !important;';
		document.body.appendChild(backdrop);

		var dialog = document.createElement('div');
		dialog.style.cssText = 'position: fixed !important; outline: none !important; z-index: 10000000 !important; left: 50% !important; top: 50% !important; transform: translate(-50%, -50%) !important; -webkit-transform: translate(-50%, -50%) !important; background: white !important; color: rgba(0, 0, 0, 0.87) !important; overflow: visible !important;';

		var shadow = document.createElement('div');
		shadow.style.cssText = 'position: absolute !important; top: 0 !important; right: 0 !important; bottom: 0 !important; left: 0 !important;';

		var shadowBottom = document.createElement('div');
		shadowBottom.style.cssText = 'pointer-event: none !important; box-shadow: 0 12px 15px 0 rgba(0, 0, 0, 0.24) !important; position: absolute !important; top: 0 !important; right: 0 !important; bottom: 0 !important; left: 0 !important;';

		var shadowTop = document.createElement('div');
		shadowBottom.style.cssText = 'pointer-event: none !important; box-shadow: 0 17px 50px 0 rgba(0, 0, 0, 0.19) !important; position: absolute !important; top: 0 !important; right: 0 !important; bottom: 0 !important; left: 0 !important;';

		shadow.appendChild(shadowBottom);
		shadow.appendChild(shadowTop);

		var scroller = document.createElement('div');
		scroller.style.cssText = 'overflow: auto !important; box-sizing: border-box !important; padding: 24px 24px 0 24px !important; position: relative !important;';

		var title = document.createElement('h1');
		title.style.cssText = 'font-family: Roboto, Arial !important; font-size: 24px !important; line-height: 32px !important; border: none !important; margin: 0 0 10px 0 !important; padding: 0 !important; text-align: left !important; -webkit-font-smoothing: antialiased;';
		title.innerHTML = 'Long Terms. Short Version.';
		scroller.appendChild(title);

		var length = 2;

		data.aspects.sort(function(a, b) {
			return b.weight - a.weight;
		});

		data.aspects.forEach(function(value, index) {
			var item = document.createElement('div');
			item.style.cssText = 'font-family: Roboto, Arial !important; font-size: 16px !important; line-height: 28px !important; text-align: left !important; display: flex !important; flex-direction: row !important; align-items: baseline !important;';

			var badge = document.createElement('div');
			badge.style.cssText = 'font-family: Roboto, Arial !important; font-size: 16px !important; width: 28px !important; height: 28px !important; background-color: #cb0000 !important; font-weight: bold !important; color: #fff !important; text-align: center; margin-right: 16px !important; -webkit-font-smoothing: antialiased;';
			badge.innerHTML = value.weight;

			var aspect = document.createElement('div');
			aspect.style.cssText = 'padding-top: 20px !important; padding-bottom: 20px !important; flex: 1 !important; -webkit-font-smoothing: antialiased;';
			if (index < data.aspects.length - 1) {
				aspect.style.cssText += ' border-bottom: 1px solid #ccc !important;';
			}

			var text = value.aspect.text;

			text = text.replace(new RegExp('(the )?service', 'gi'), data.name);

			aspect.innerHTML = text;

			item.appendChild(badge);
			item.appendChild(aspect);

			scroller.appendChild(item);
		});

		var actions = document.createElement('div');
		actions.style.cssText = 'padding: 16px !important; display: flex !important; flex-direction: row !important; position: relative !important; align-items: center !important;';

		var leeglAnchor = document.createElement('a');
		leeglAnchor.setAttribute('href', 'https://leegl.org');
		leeglAnchor.setAttribute('target', '_blank');

		var leegl = document.createElement('img');
		leegl.setAttribute('src', chrome.extension.getURL('images/leegl.svg'));
		leegl.style.cssText = 'height: 28px !important; padding: 0 0.57em !important;';
		leeglAnchor.appendChild(leegl);
		actions.appendChild(leeglAnchor);

		var flex = document.createElement('div');
		flex.style.cssText = 'flex: 1 !important; flex-basis: 0.000000001px !important; display: block !important;';
		actions.appendChild(flex);

		var declineButton = document.createElement('div');
		declineButton.style.cssText = 'display: inline-block !important; position: relative !important; box-sizing: border-box !important; min-width: 5.14em !important; margin: 0 0.29em !important; background: transparent !important; text-align: center !important; font: inherit !important; text-transform: uppercase !important; outline: none !important; cursor: pointer !important; color: rgba(0, 0, 0, 0.87) !important;';
		var declineButtonContent = document.createElement('div');
		declineButtonContent.style.cssText = 'font-family: Roboto, Arial !important; font-size: 14px !important; justify-content: center !important; align-items: center !important; flex-direction: row !important; position: relative !important; padding: 0.7em 0.57em !important; -webkit-font-smoothing: antialiased;';
		declineButtonContent.innerHTML = 'Decline';
		declineButton.appendChild(declineButtonContent);

		declineButton.addEventListener('click', function(e) {
			dialog.parentNode.removeChild(dialog);
			backdrop.parentNode.removeChild(backdrop);
		});

		actions.appendChild(declineButton);

		var acceptButton = document.createElement('div');
		acceptButton.style.cssText = 'display: inline-block !important; position: relative !important; box-sizing: border-box !important; min-width: 5.14em !important; margin: 0 0.29em !important; background: transparent !important; text-align: center !important; font: inherit !important; text-transform: uppercase !important; outline: none !important; cursor: pointer !important; color: rgba(0, 0, 0, 0.87) !important; color: #03a9f4 !important;';
		var acceptButtonContent = document.createElement('div');
		acceptButtonContent.style.cssText = 'font-family: Roboto, Arial !important; font-size: 14px !important; justify-content: center !important; align-items: center !important; flex-direction: row !important; position: relative !important; padding: 0.7em 0.57em !important; -webkit-font-smoothing: antialiased;';
		acceptButtonContent.innerHTML = 'Accept';

		acceptButton.addEventListener('click', function(e) {
			dialog.parentNode.removeChild(dialog);
			backdrop.parentNode.removeChild(backdrop);
			submitButton.removeEventListener('click', onClick);
			submitButton.click();
		});

		acceptButton.appendChild(acceptButtonContent);

		actions.appendChild(acceptButton);

		dialog.appendChild(shadow);
		dialog.appendChild(scroller);
		dialog.appendChild(actions);

		document.body.appendChild(dialog);

		var onResize = function() {
			scroller.style.maxWidth = (window.innerWidth - 64) + 'px';
			scroller.style.maxHeight = (window.innerHeight - 64 - actions.clientHeight) + 'px';
		};

		onResize();

		window.addEventListener('resize', onResize);

	}

	var onClick = function(e) {
		e.preventDefault();

		submitButton = e.target;

		showDialog();

		return false;
	};

	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			data = JSON.parse(xhr.responseText)[0];

			if (!data) {
				return;
			}

			var rx = new RegExp(data.registrationUrl);

			if (rx.test(document.location.href)) {
				var webfont = document.createElement('link');
				webfont.href = chrome.extension.getURL('styles/Roboto.css');
				webfont.type = 'text/css';
				webfont.setAttribute('rel', 'stylesheet');

				document.getElementsByTagName('head')[0].appendChild(webfont);

				[].forEach.call(document.querySelectorAll(data.selector), function(item) {
					item.addEventListener('click', onClick);
				});
			}
		}
	}

	xhr.send();

})();
