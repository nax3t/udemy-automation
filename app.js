require('dotenv').config();

var webdriver = require('selenium-webdriver'),
By 						= webdriver.By,
until 				= webdriver.until,
fs 						= require('fs');

var driver = new webdriver.Builder()
.forBrowser('chrome')
.build();

var urls = [];
var questionCounter;

getLoginPage();

async function getLoginPage() {
	try {
			await driver.get('http://udemy.com/join/login-popup/');
			let emailInput = await driver.wait(until.elementLocated(By.id('id_email')), 10000);
			emailInput.sendKeys("iantskon@gmail.com");
			let pwInput = await driver.findElement(By.id('id_password'));
			pwInput.sendKeys(process.env.UDEMY_AUTH);
			let loginButton = await driver.findElement(By.id('submit-id-submit'));
			await loginButton.click();
			// let avatar = await driver.wait(until.elementLocated(By.className('user__avatar')), 10000);
			await driver.get("https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions");
			return lookForStopQuestion();
	} catch(err) {
			console.log(err);
			return err;
	}
}

async function lookForStopQuestion() {
	console.log("Look for stop question");
    try {
        let question = await driver.findElement(By.xpath("//*[contains(text(), 'gender part')]")); // Fill in question text here
        return findAllQuestions();
    } catch (err) {
        return clickLoadMoreButton();
    }
}

async function clickByCssScroll(element) {
    driver.executeScript("arguments[0].scrollIntoView()", element);
    driver.sleep(300);
    element.click();
};

async function clickLoadMoreButton() {
	try {
	    let loadMore = await driver.wait(until.elementLocated(By.css("button[ng-click='loadMore()']")), 10000);
	    // scroll to bottom of page
	    await clickByCssScroll(loadMore);
  		setTimeout(lookForStopQuestion, 1000);
	} catch (err) {
	    return err;
	}
}

async function findAllQuestions() {
	try {
			let questions = await driver.findElements(By.className("course-questions__question"));
			questionCounter === undefined ? questionCounter = questions.length - 1 : "" ;
			console.log(`There are ${questionCounter} questions to answer`);
			return clickAllQuestions(questions);
	} catch (err) {
			return err;
	}
}

async function clickAllQuestions(questions) {
	console.log("Click all questions");
	try {
			if(questionCounter >= 0) {
					let question = questions[questionCounter];
					driver.executeScript("arguments[0].scrollIntoView()", question);
			    driver.sleep(300);
			    await question.click();
					questionCounter--;
					let url = await driver.getCurrentUrl();
					urls.push(url);
					return clickBack();
			} else {
					createLogFile();
			}
	} catch (err) {
			console.log(err);
			return err;
	}
}

async function clickBack() {
	console.log("Click back");
	try {
			await driver.findElement(By.css("a[ng-click='back()']")).click();
			return findAllQuestions();
	} catch(err) {
			return err;
	}
}

async function createLogFile() {
	console.log("Creating log file!");
	var date = Date.now().toString();
	fs.writeFile(`./logs/${date}.txt`, urls, function(err) {
	    if(err) {
	        return console.log(err);
	    }
	    console.log(`The ${date} file was saved!`);
	}); 
}