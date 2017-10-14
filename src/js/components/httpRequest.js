
class HttpRequest {
	constructor() {
		this.baseUrl = "http://ec2-52-14-165-9.us-east-2.compute.amazonaws.com:3000";
		this.url = "";
	}

	request(obj) {console.log(obj);
		return new Promise((resolve, reject) => {
	        let xhr = new XMLHttpRequest();console.log(1);

	        if(obj.query) {
	        	this.url = this.baseUrl + obj.query;
	        }
	        console.log(this.url);
	        xhr.open(obj.method || "GET", this.url);
	        if(obj.headers) {
	            Object.keys(obj.headers).forEach(key => {
	                xhr.setRequestHeader(key, obj.headers[key]);
	            });
	        }
	        if(obj.method === "POST") {
	        	xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	        }
	        xhr.onload = () => {
	            if (xhr.status >= 200 && xhr.status < 300) {
	                resolve(xhr.response);
	            } else {
	                reject(xhr.statusText);
	            }
	        };
	        xhr.onerror = () => reject(xhr.statusText);
	        xhr.send(obj.body);
	    });
	}


}

export let httpRequest = new HttpRequest();
