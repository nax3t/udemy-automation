var webdriver = require('selenium-webdriver'),
By = webdriver.By,
until = webdriver.until;

var driver = new webdriver.Builder()
.forBrowser('chrome')
.build();

var urls = [];
var questionCounter;

async function lookForStopQuestion() {
    try {
        let question = await driver.findElement(By.xpath("//*[contains(text(), 'Can we add normalization and transaction section in this course?')]")); // Fill in question text here
        return findAllQuestions();
    } catch (err) {
        return clickLoadMoreButton();
    }
}

async function clickLoadMoreButton() {
	try {
	    let loadMore = await driver.wait(until.elementLocated(By.css("button[ng-click='loadMore()']")), 10000);
  		loadMore.click();
  		setTimeout(lookForStopQuestion, 1000);
	} catch (err) {
	    return err;
	}
}

async function findAllQuestions() {
	try {
			let questions = await driver.findElements(By.className("course-questions__question"));
			console.log(`There are ${questions.length} questions to answer`);
			questionCounter = questions.length - 1;
			return clickAllQuestions(questions);
	} catch (err) {
			return err;
	}
}

async function findAllQuestionsNoCount() {
	console.log("Find all questions, no count");
	try {
			console.log("is this working?");
			let questions = await driver.findElements(By.className("course-questions__question"));
			console.log(`There are ${questionCounter} questions left to copy urls from`);
			return clickAllQuestions(questions);
	} catch (err) {
			console.log("error", err);
			return err;
	}
}

async function clickAllQuestions(questions) {
	console.log("Click all questions");
	try {
			await questions[questionCounter].click();
			questionCounter--;
			let url = await driver.getCurrentUrl();
			urls.push(url);
			console.log("Urls:", urls);
			return clickBack();
	} catch (err) {
			return err;
	}
}

async function clickBack() {
	console.log("Click back");
	try {
			await driver.findElement(By.css("a[ng-click='back()']")).click();
			return findAllQuestionsNoCount();
	} catch(err) {
			return err;
	}
}

driver.get('http://udemy.com/join/login-popup/');

driver.wait(until.elementLocated(By.id('id_email')), 10000)
.then(function(element){
	element.sendKeys("iantskon@gmail.com");
	driver.findElement(By.id('id_password')).sendKeys(process.env.UDEMY_AUTH);
}).then(function() {
	driver.findElement(By.id('submit-id-submit')).click();
}).then(function() {
	driver.wait(until.elementLocated(By.className('dropdown__avatar')), 10000)
	.then(function() {
		driver.get("https://www.udemy.com/the-ultimate-mysql-bootcamp-go-from-sql-beginner-to-expert/learn/v4/questions");
		driver.wait(until.elementsLocated(By.className("checkbox-label")), 10000)
			.then(function(unreads) {
				unreads[5].click()
					.then(lookForStopQuestion);
			})
	});
});
