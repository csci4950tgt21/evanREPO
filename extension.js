const { executionAsyncResource } = require('async_hooks');
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('se.runSecurity', function () {
		let exampleString = "This is meant to contain email, IP, and url, "+
							// Email examples
							 "person@gmail.com "+
							 "guy2232@hotmail.net "+
							// Not an email
							 "notemail@not "+
							 "alsonotemail@not. "+
							// Website/url examples
							 "alsonotemail.not "+
							 "coronavirusapp.site "+
							 "malSite.com "+
							 "a.com "+
							 "www.youtube.com "+
							 "notaphishingsite.org/0/u/bannananana/en-US/babab00ey/?v=/ "+
							 "https://youtube.com "+
							 "http://google.com "+
							 "https://login.umn.edu/idp/profile/SAML2/Redirect/SSO;jsessionid=wwo0zfbfehg496at6apitn3h?execution=e1s1 "+
							// Not a website
							 ".site "+
							 "https:// "+
							// IP examples (IPv4, addresses in 0-255.0-255.0-255.0-255)
							 "17.23.11.223 "+
							 "10.0.0.0 "+
							 "10.255.255.255 "+
							 "172.16.0.0 "+
							 "172.31.255.255 "+
							 "192.168.0.0 "+
							 "192.168.255.255 "+
							 "0.0.0.22 "+
							// IP examples (IPv6, addresses in eight 16bit hexadecimals)
							 "141:0:0:0:15:0:0:1 "+
							 "6384:1319:7700:7631:446A:5511:8940:2552 "+
							 "2001:0db8:85a3:0000:0000:8a2e:0370:7334 "+
							 "2001:0000:3238:DFE1:0063:0000:0000:FEFB "+
							 "2001:0000:3238:DFE1:63:0000:0000:FEFB "+
							 "2001:0000:3238:DFE1:63::FEFB "+
							 "2001:0:3238:DFE1:63::FEFB "+
							// Not an IPv4 address
							 "F.0.0.0 "+
							 "0.F.0.0 "+
							 "0.0.0.F "+
							 "0.0 "+
							 "0 "+
							 "0.0.0 "+
							 "1234.0.0.0 "+
							 "0.1234.0.0 "+
							 "0.0.0.1234 "+
							 "0.0.0.0.0 "+
							// Not an IPv6 address
							 "FFFFF:0:0:0:15:0:0:1 "+
							 "68000:0db8:85a3:0000:0000:8a2e:0370:7334 "+
							 "2001:0db8:85a3:0000:0000:8a2e:0370:7334:9999 ";

		let emails = findEmail(exampleString);
		for (const match of emails) {
			console.log(match[0] + " at index " + match.index);
		}

		let urls = findURL(exampleString);
		for (const match of urls) {
			console.log(match[0] + " at index " + match.index);
		}

		let ips = findIP(exampleString);
		for (const match of ips) {
			console.log(match[0] + " at index " + match.index);
		}
	});

	context.subscriptions.push(disposable);
}
exports.activate = activate;

// Parse text and find email addresses
function findEmail(myString) {
	var emailRegex = /(?<=\s|^)\w+@\w+\.\w+/g;
	return myString.matchAll(emailRegex);
}

// Parse text and find urls/websites
function findURL(myString) {
	var urlRegex = /(?<=\s|^)https?:\/\/[\S]+|(?<=\s|^)\w+\.[a-zA-Z]+[\S]*/g;
	return myString.matchAll(urlRegex);
}

// Parse text and find IP addresses
function findIP(myString) {
	var IPRegex = /(?<=\s|^)(\d{1,3}\.){3}\d{1,3}(?=\s|$)|(?<=\s|^)(\w{1,4}\:){7}\w{1,4}(?=\s|$)|(?<=\s|^)\w{1,4}\:(\w{0,4}\:){5}\w{1,4}(?=\s|$)/g;
	return myString.matchAll(IPRegex);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}