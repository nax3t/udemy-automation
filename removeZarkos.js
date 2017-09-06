require('dotenv').config();

var webdriver = require('selenium-webdriver'),
		By 				= webdriver.By,
		until 		= webdriver.until,
		fs 				= require('fs');

var driver = new webdriver.Builder()
.forBrowser('chrome')
.build();

var urls = [
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2760156',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2778274',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2719540',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2778448',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2778750',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/1989586',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2763284',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2779034',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2689168',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2451186',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2779098',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2764086',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2719934',
    'https://www.udemy.com/the-ultimate-mysql-bootcamp-go-from-sql-beginner-to-expert/learn/v4/questions/2779404',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2779442',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2779634',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2719196',
    'https://www.udemy.com/the-ultimate-mysql-bootcamp-go-from-sql-beginner-to-expert/learn/v4/questions/2668450',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2779798',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2776018',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2775114',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2780012',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2766252',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2780152',
    'https://www.udemy.com/intro-to-git/learn/v4/questions/2774454',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2398632',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2777472',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2776176',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2780282',
    'https://www.udemy.com/the-ultimate-mysql-bootcamp-go-from-sql-beginner-to-expert/learn/v4/questions/2780300',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2780408',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2776936',
    'https://www.udemy.com/the-ultimate-mysql-bootcamp-go-from-sql-beginner-to-expert/learn/v4/questions/2780522',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2780580',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2246990',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2777388',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2777380',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2780658',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2780664',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2777290',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2780770',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2768606',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2780876',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2780940',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2764824',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2777096',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2781190',
    'https://www.udemy.com/the-ultimate-mysql-bootcamp-go-from-sql-beginner-to-expert/learn/v4/questions/2781200',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2781254',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2764254',
    'https://www.udemy.com/jquery-ajax/learn/v4/questions/2762974',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2377910',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2781414',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2781458',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2781510',
    'https://www.udemy.com/the-ultimate-mysql-bootcamp-go-from-sql-beginner-to-expert/learn/v4/questions/2781758',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2781796',
    'https://www.udemy.com/the-ultimate-mysql-bootcamp-go-from-sql-beginner-to-expert/learn/v4/questions/2781808',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2781872',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2774736',
    'https://www.udemy.com/the-ultimate-mysql-bootcamp-go-from-sql-beginner-to-expert/learn/v4/questions/2775188',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2782030',
    'https://www.udemy.com/the-ultimate-mysql-bootcamp-go-from-sql-beginner-to-expert/learn/v4/questions/2782032',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2768356',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2782092',
    'https://www.udemy.com/jquery-ajax/learn/v4/questions/2731458',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2782116',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2778024',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2778038',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2778062',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2778094',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2778096',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2778274',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2778298',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2778314',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2778340',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2778386',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2778448',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2778462',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2778580',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2778716',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2778746',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2778750',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2778790',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2778846',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2778886',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2778914',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2779034',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2779036',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2779098',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2779168',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2779442',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2779458',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2779524',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2779634',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2779798',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2780012',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2780152',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2780282',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2780408',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2780436',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2780580',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2780658',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2780664',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2780770',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2780792',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2780876',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2780940',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2781016',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2781090',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2781142',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2781190',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2781254',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2781414',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2781458',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2781468',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2781510',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2781610',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2781688',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2781796',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2781872',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2782030',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2782092',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2782116',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2782156',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2782194',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2782212'
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
	    console.log(`The zarko${date} file was saved!`);
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