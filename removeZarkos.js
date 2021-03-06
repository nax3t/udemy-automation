require('dotenv').config();

var webdriver = require('selenium-webdriver'),
		By 				= webdriver.By,
		until 		= webdriver.until,
		fs 				= require('fs');

var driver = new webdriver.Builder()
.forBrowser('chrome')
.build();

var urls = [
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2786024',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2788576',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2789110',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2791002',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2791176',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2792224',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2792794',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2792888',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2793258',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2793470',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2793604',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2794028',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2794048',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2794506',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2794692',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2794774',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2794886',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2795038',
    'https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2795132',
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2757432", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2777558", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2778340", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2778746", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2451186", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2777380", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2780658", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2781142", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2780940", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2078848", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2775624", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2782480", 
    "https://www.udemy.com/the-ultimate-mysql-bootcamp-go-from-sql-beginner-to-expert/learn/v4/questions/2782532", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2782548", 
    "https://www.udemy.com/the-ultimate-mysql-bootcamp-go-from-sql-beginner-to-expert/learn/v4/questions/2782576", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2782598", 
    "https://www.udemy.com/the-ultimate-mysql-bootcamp-go-from-sql-beginner-to-expert/learn/v4/questions/2740418", 
    "https://www.udemy.com/the-ultimate-mysql-bootcamp-go-from-sql-beginner-to-expert/learn/v4/questions/2740418", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2782806", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2778448", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2751396", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2782872", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2780580", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2782938", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2776176", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2780664", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2783044", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2776018", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2783104", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2780580", 
    "https://www.udemy.com/the-ultimate-mysql-bootcamp-go-from-sql-beginner-to-expert/learn/v4/questions/2779404", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2781254", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2783230", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2780012", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2783362", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2783638", 
    "https://www.udemy.com/the-ultimate-mysql-bootcamp-go-from-sql-beginner-to-expert/learn/v4/questions/2775188", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2764254", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2783808", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2775952", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2783846", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2719540", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2759594", 
    "https://www.udemy.com/the-ultimate-mysql-bootcamp-go-from-sql-beginner-to-expert/learn/v4/questions/2784036", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2777290", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2784122", 
    "https://www.udemy.com/the-ultimate-mysql-bootcamp-go-from-sql-beginner-to-expert/learn/v4/questions/2784212", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2784228", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2780940", 
    "https://www.udemy.com/the-ultimate-mysql-bootcamp-go-from-sql-beginner-to-expert/learn/v4/questions/2784036", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2451186", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2784558", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2766776", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2784676", 
    "https://www.udemy.com/the-ultimate-mysql-bootcamp-go-from-sql-beginner-to-expert/learn/v4/questions/2784212", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2784746", 
    "https://www.udemy.com/the-ultimate-mysql-bootcamp-go-from-sql-beginner-to-expert/learn/v4/questions/2784818", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2784832", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2451186", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2779036",
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2777380", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2783478", 
    "https://www.udemy.com/the-ultimate-mysql-bootcamp-go-from-sql-beginner-to-expert/learn/v4/questions/2668450", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2759594", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2781468", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2757432", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2767846", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2785136", 
    "https://www.udemy.com/the-ultimate-mysql-bootcamp-go-from-sql-beginner-to-expert/learn/v4/questions/2785148", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2768606", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2781510", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2777290", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2785300", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2785306", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2520790", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2689946", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2785488", 
    "https://www.udemy.com/the-ultimate-mysql-bootcamp-go-from-sql-beginner-to-expert/learn/v4/questions/2762330", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2451186", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2776176", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2785612", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2766776", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2785742", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2782212", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2785842", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2764032", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2785996", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2782030", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2697838", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2786258", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2569084", 
    "https://www.udemy.com/jquery-ajax/learn/v4/questions/2731458", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2786492", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2761088", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2786530", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2761088", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2766776", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2761088", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2761088", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2786736", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2697838", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2761088", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2764032", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2761088", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2767846", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2757432", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2786894", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2782194", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2782194", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2778886", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2078848", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2356658", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2787052", 
    "https://www.udemy.com/the-ultimate-mysql-bootcamp-go-from-sql-beginner-to-expert/learn/v4/questions/2787186", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2780012", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2787344", 
    "https://www.udemy.com/the-ultimate-mysql-bootcamp-go-from-sql-beginner-to-expert/learn/v4/questions/2787388", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2787464", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2787480", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2780658", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2787608", 
    "https://www.udemy.com/the-ultimate-mysql-bootcamp-go-from-sql-beginner-to-expert/learn/v4/questions/2787688", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2787790", 
    "https://www.udemy.com/the-ultimate-mysql-bootcamp-go-from-sql-beginner-to-expert/learn/v4/questions/2785220", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2787908", 
    "https://www.udemy.com/jquery-ajax/learn/v4/questions/2731458", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2788220", 
    "https://www.udemy.com/the-ultimate-mysql-bootcamp-go-from-sql-beginner-to-expert/learn/v4/questions/2770708", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2770634", 
    "https://www.udemy.com/the-ultimate-mysql-bootcamp-go-from-sql-beginner-to-expert/learn/v4/questions/2788332", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2788352", 
    "https://www.udemy.com/the-ultimate-mysql-bootcamp-go-from-sql-beginner-to-expert/learn/v4/questions/2787186", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2788404", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2750318", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2788478", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2780012", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2788528", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2770634", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2788576", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2775698", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2788638", 
    "https://www.udemy.com/the-ultimate-mysql-bootcamp-go-from-sql-beginner-to-expert/learn/v4/questions/2770708", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2775390", 
    "https://www.udemy.com/the-ultimate-mysql-bootcamp-go-from-sql-beginner-to-expert/learn/v4/questions/2788818", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2788856", 
    "https://www.udemy.com/the-ultimate-mysql-bootcamp-go-from-sql-beginner-to-expert/learn/v4/questions/2788926", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2788930", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2775698", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2789110", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2470322", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2789246", 
    "https://www.udemy.com/the-ultimate-mysql-bootcamp-go-from-sql-beginner-to-expert/learn/v4/questions/2789332", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2789368", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2776176", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2768972", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2789838", 
    "https://www.udemy.com/the-ultimate-mysql-bootcamp-go-from-sql-beginner-to-expert/learn/v4/questions/2790118", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2790188", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/1736170", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2753400", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2780658", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2790518", 
    "https://www.udemy.com/the-ultimate-mysql-bootcamp-go-from-sql-beginner-to-expert/learn/v4/questions/2787688", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2790730", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2753400", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2790944", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2775698", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2766776", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2791158", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2770634", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2791176", 
    "https://www.udemy.com/the-ultimate-mysql-bootcamp-go-from-sql-beginner-to-expert/learn/v4/questions/2735436", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2719538", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2791474", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2791598", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2719538", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2448564", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2792224", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2792334", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2470322", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2779524", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2792730", 
    "https://www.udemy.com/the-ultimate-mysql-bootcamp-go-from-sql-beginner-to-expert/learn/v4/questions/2793162", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2793258", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2793470", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2704178", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2793604", 
    "https://www.udemy.com/the-ultimate-mysql-bootcamp-go-from-sql-beginner-to-expert/learn/v4/questions/2793708", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2582010", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2794028", 
    "https://www.udemy.com/the-ultimate-mysql-bootcamp-go-from-sql-beginner-to-expert/learn/v4/questions/2794110", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2778024", 
    "https://www.udemy.com/the-ultimate-mysql-bootcamp-go-from-sql-beginner-to-expert/learn/v4/questions/2794266", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2758358", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2794506", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2744428", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2794692", 
    "https://www.udemy.com/the-ultimate-mysql-bootcamp-go-from-sql-beginner-to-expert/learn/v4/questions/2794832", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2794886", 
    "https://www.udemy.com/the-ultimate-mysql-bootcamp-go-from-sql-beginner-to-expert/learn/v4/questions/2740490", 
    "https://www.udemy.com/the-ultimate-mysql-bootcamp-go-from-sql-beginner-to-expert/learn/v4/questions/2785220", 
    "https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/2795192"
];

console.log(`${urls.length} questions`);

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
    var i = urls.length - 1;
    for(; i >= 0; i--) {
        try { 
    		await driver.get(urls[i]);
			await driver.wait(until.elementLocated(By.css("a[ng-href='/user/zarko-maslaric/']")), 2500);
			console.log('Zarko found');
			urls.splice(i, 1);
		} catch (err) {
			console.log('Zarko not found');
		}
    }
    console.log(`${urls.length} questions left after removals`);
    createLogFile();
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