class Cookie {
	constructor(name, exdays=365) {
		this.name = name;
		this.exdays = exdays;
	}
	
	clear() {
		var tmp = this.exdays;
		this.exdays = -1;
		this.set("");
		this.exdays = tmp;
	}
	
	set(value) {
		var d = new Date();
		d.setTime(d.getTime() + (this.exdays*86400000));
		var expires = "expires="+d.toUTCString();
		document.cookie = this.name+"="+value+";"+expires+";path=/";
	}
	
	get() {
		var nm = this.name+"=";
		var dc = decodeURIComponent(document.cookie);
		var ca = dc.split(';');
		for(var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while(c.charAt(0) == ' ') {
				c = c.substring(1);
			}
			if(c.indexOf(nm) == 0) {
				return c.substring(nm.length, c.length);
			}
		}
		return "";
	}
}