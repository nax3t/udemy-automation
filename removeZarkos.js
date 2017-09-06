require('dotenv').config();

var webdriver = require('selenium-webdriver'),
		By 				= webdriver.By,
		until 		= webdriver.until,
		fs 				= require('fs');

var driver = new webdriver.Builder()
.forBrowser('chrome')
.build();

var urls = [
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
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2782212',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2782280',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2782480',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2782518',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2782548',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2782570',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2782598',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2782608',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2782626',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2782650',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2782712',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2782762',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2782778',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2782806',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2782826',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2782872',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2782938',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2783044',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2783104',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2783146',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2783230',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2783362',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2783416',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2783478',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2783638',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2783808',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2783846',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2783926',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2784122',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2784170',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2784172',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2784210',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2784228',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2784302',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2784304',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2784316',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2784558',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2784628',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2784676',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2784746',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2784832',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2784846',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2785136',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2785300',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2785306',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2785418',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2785420',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2785488',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2785612',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2785742',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2785842',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2785908',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2785996',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2786024',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2786258',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2786492',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2786530',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2786736',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2786894',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2787052',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2787344',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2787464',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2787480',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2787608',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2787790',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2787814',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2787908',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2788038',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2788078',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2788094',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2788104',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2788220',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2788352',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2788404',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2788478',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2788528',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2788576',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2788608',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2788638',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2788856',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2788930',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2789042',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2789110',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2789130',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2789162',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2789246',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2789258',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2789368',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2789536',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2789838',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2789852',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2789998',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2790188',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2790312',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2790518',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2790578',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2790730',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2790844',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2790944',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2790994',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2790996',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2791002',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2791046',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2791158',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2791176',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2791266',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2791474',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2791484',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2791588',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2791598',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2791630',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2791644',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2791700',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2791934',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2791940',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2791960',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2792096',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2792164',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2792224',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2792334',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2792356',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2792402',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2792404',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2792730',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2792794',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2792888',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2793258',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2793358',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2793470',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2793604',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2794028',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2794048',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2794506',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2794692',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2794774',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2794886',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2795038',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2795132'
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