var webdriver = require('selenium-webdriver'),
		By 				= webdriver.By,
		until 		= webdriver.until,
		fs 				= require('fs');

var driver = new webdriver.Builder()
.forBrowser('chrome')
.build();

var urls = [
  'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/1234'
];

var counter = urls.length - 1;
console.log(`${counter + 1} questions`);

async function createLogFile() {
	console.log("Creating log file!");
	var date = Date.now().toString();
	fs.writeFile(`./logs/zarko${date}.txt`, urls, function(err) {
	    if(err) {
	        return console.log(err);
	    }
	    console.log("The file was saved!");
	}); 
}

async function checkForZarko() {
	try {
		await driver.get(urls[counter]);
		try { 
				await driver.wait(until.elementLocated(By.css("a[ng-href='/user/zarko-maslaric/']")), 2000);
				console.log('Zarko found');
				urls.splice(counter, 1);
		} catch (err) {
				console.log('Zarko not found');
		}
		counter--;
		if(counter >= 0) {
			checkForZarko();
		} else {
				console.log(`${urls.length} questions left after removals`);
				createLogFile();
		}
	} catch(err) {
			return err;
	}
}

async function getLoginPage() {
	try {
			await driver.get('http://udemy.com/join/login-popup/');
			let emailInput = await driver.wait(until.elementLocated(By.id('id_email')), 10000);
			emailInput.sendKeys("iantskon@gmail.com");
			let pwInput = await driver.findElement(By.id('id_password'));
			pwInput.sendKeys(process.env.UDEMY_AUTH);
			let loginButton = await driver.findElement(By.id('submit-id-submit'));
			await loginButton.click();
			return checkForZarko();
	} catch(err) {
			console.log(err);
			return err;
	}
}

getLoginPage();