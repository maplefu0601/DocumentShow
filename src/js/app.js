'use strict';

import {httpRequest} from "./components/httpRequest.js";

window.userAuthed = false;


class Text {
	constructor() {}
	getSelectedText() {
		var text = "";
	    if (typeof window.getSelection != "undefined") {
	        text = window.getSelection().toString();
	    } else if (typeof document.selection != "undefined" && document.selection.type == "Text") {
	        text = document.selection.createRange().text;
	    }
	    return text;
	}
	doSelectedText() {
		let selectedText = this.getSelectedText();
		if(selectedText) {
			console.log('selected '+selectedText);
			this.highLightText(selectedText);
		}
	}
	highLightText(word) {
		
		document.querySelector('#content').innerHTML = document.querySelector('#content').innerHTMLBAK;
		var query = new RegExp("(\\b" + word + "\\b)", "gim");
	    var str = document.querySelector('#content').innerHTML;
	    var enew = str.replace(/(<span class='highlight'>|<\/span>)/igm, "");
	    document.querySelector('#content').innerHTML = enew;
	    var newe = enew.replace(query, "<span class='highlight'>$1</span>");
	    document.querySelector('#content').innerHTML = newe;

		//console.log(document.querySelector('#content').innerHTML);
	}

}

function getDocument(docid) {
	
	if(!window.userAuthed) {
		showLogin(true);
	} else {
		showLogin(false);
		sendRequest(docid);
	}
}

function showLogin(show) {
	document.querySelector('#user').style.display = show?'block':'none';
}

function sendRequest(docid) {
	let obj = {};
	obj.method = "GET";
	obj.query = '/documents/' + docid;

	console.log(httpRequest);
	if(httpRequest) {
		httpRequest.request(obj)
			.then(data => {
				data = JSON.parse(data);
				if(data.success) {
					window.userAuthed = true;
					showDocument(data.doc);
				} else {
					showErrorUser(data.error);
				}
			}).catch(error => {
				console.log(error);
				document.body.innerHTML = error;
			});
	}
}

function checkUser(form) {
	let obj = {};
	obj.method = "POST";
	obj.query = '/user';
	obj.body = 'username='+form.username.value+'&password='+form.password.value;

	console.log(httpRequest);
	if(httpRequest) {
		httpRequest.request(obj)
			.then(data => {
				data = JSON.parse(data);
				if(data.success) {
					window.userAuthed = true;
					showLogin(false);
				} else {
					showErrorUser(data.error);
				}
			}).catch(error => {
				console.log(error);
				document.body.innerHTML = error;
			});
	}
}

function showDocument(doc) {
	console.log('login success.');
	showLogin(false);
	let contentDiv = document.querySelector('#content');
	if(contentDiv) {
		contentDiv.innerHTML = doc;
		contentDiv.innerHTMLBAK = doc;
	}
}

function showErrorUser(error) {
	console.log('error:'+error);
	alert(error);
}

let text = new Text();
window.onload = () => {
	let authBtn = document.querySelector('#authBtn');
	if(authBtn) {
		authBtn.addEventListener('click', (event) => {checkUser(document.forms.login)});
	}
	let getDocBtn = document.querySelector('#getDocBtn');
	if(getDocBtn) {
		getDocBtn.addEventListener('click', (event) => { getDocument(document.getElementsByName('docid')[0].value);});
	}
	let content = document.querySelector('#content');
	if(content) {
		content.addEventListener('mouseup', () => { text.doSelectedText(); });
	}

};

window.addEventListener('hashchange', function(e) {alert(e)}, false);