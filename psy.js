var okButton;
var questBlock;
var testBlock;
var curTest;
var quests;

main();

function main() {
    okButton = document.querySelector('#ok-button');
    questBlock = document.querySelector('#quest-text');
    curTest = new Testing();
    quests = new Quests();

}

function okButton_Click() {
    var radio = document.querySelector('input[type="radio"]:checked')
    if (radio == null) {
        alert('Не выбран вариант ответа');
        return;
    }
    curTest.answers.push(parseInt(radio.value));
    curTest.curAnswerNumber++;
    if (curTest.curAnswerNumber == quests.texts.quests.length) {
        curTest.calcResults();
        prepareWindowForResult();
        showResult();

        return;
    }
    questBlock.innerHTML = quests.texts.quests[curTest.curAnswerNumber];
    radio.checked = false;
}

function prepareWindowForResult() {
    okButton = null;
    questBlock = null;
    testBlock = document.querySelector('#test-block');
    testBlock.innerHTML = '<div id="honesty-block"> Искренность ответов </div> <div id="testResult-short"> Коротко </div> <div id="testResult-long"> Развернуто </div>';
}

function showResult() {
    var shortResult, longResult;
    var honestyDiv = document.querySelector('#honesty-block');
    honestyDiv.innerHTML = getHonestyDescription();
    honestyDiv.style.background = getHonestyBlockColor();

    var shortDiv = document.querySelector('#testResult-short');
    var longDiv = document.querySelector('#testResult-long');

    if (curTest.getTestValue() >= 82) {
        longResult = curTest.descriptionsList.descriptions[0].long;
        shortResult = curTest.descriptionsList.descriptions[0].short;
        shortDiv.style.background = 'red';
    }
    if (curTest.getTestValue() >= 63 && curTest.getTestValue() <= 81) {
        longResult = curTest.descriptionsList.descriptions[1].long;
        shortResult = curTest.descriptionsList.descriptions[1].short;
        shortDiv.style.background = "yellow";
    }
    if (curTest.getTestValue() >= 37 && curTest.getTestValue() <= 62) {
        longResult = curTest.descriptionsList.descriptions[2].long;
        shortResult = curTest.descriptionsList.descriptions[2].short;
        shortDiv.style.background = "green";
    }
    if (curTest.getTestValue() >= 12 && curTest.getTestValue() <= 36) {
        longResult = curTest.descriptionsList.descriptions[3].long;
        shortResult = curTest.descriptionsList.descriptions[3].short;
        shortDiv.style.background = "yellow";
    }
    if (curTest.getTestValue() <= 11) {
        longResult = curTest.descriptionsList.descriptions[4].long;
        shortResult = curTest.descriptionsList.descriptions[4].short;
        shortDiv.style.background = "red";
    }

    shortDiv.innerHTML = shortResult;
    longDiv.innerHTML = longResult;
}

function getHonestyDescription() {
    var honestyDescription = '';
    if (curTest.getHonesty() == 4) { honestyDescription = 'Клиент был не до конца честен. В результатах теста следует сомневаться'; }
    if (curTest.getHonesty() >= 5) { honestyDescription = 'Клиент был не честен. Результатам теста верить нельзя'; }
    return honestyDescription;
}

function getHonestyBlockColor() {
    var color = '';
    if (curTest.getHonesty() == 4) { color = 'yellow'; }
    if (curTest.getHonesty() >= 5) { color = 'red'; }
    return color;
}

function _prepareControls(context) {
    document.querySelector('#quest-text').innerHTML = quests.texts.quests[0];
    document.querySelector('#ok-button').disabled = false;
}