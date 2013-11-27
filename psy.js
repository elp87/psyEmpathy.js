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

function Testing() {
    var _honesty;
    var _testValue;
    _ctor(this);

    function _ctor(context) {
        context.SIGNIFICANT_QUESTS = [2, 5, 8, 9, 10, 12, 13, 15, 16, 19, 21, 22, 24, 25, 26, 27, 29, 32];
        context.DONT_KNOW_HONESTY = [3, 9, 11, 13, 28, 36];
        context.YES_HONESTY = [11, 13, 15, 27];
        context.answers = [];
        context.descriptionsList;
        context.curAnswerNumber = 0;

        _prepareJSON(context);
    }

    function _prepareJSON(context) {
        var path = 'json/resultDescriptions.json';
        var xhr = new XMLHttpRequest();
        xhr.open('GET', path, true);

        xhr.onreadystatechange = function() {
            if (xhr.status == 200 && xhr.responseText != '') {
                var jsString = xhr.response;
                context.descriptionsList = JSON.parse(jsString);
                xhr.onreadystatechange = function() {};
            }
        }

        xhr.send('');
    }

    function _calcHonesty(context) {
        var result = 0;
        for (var i = 0; i < context.DONT_KNOW_HONESTY.length; i++) {
            var  index = context.DONT_KNOW_HONESTY[i];
            if (context.answers[index - 1] == 0) { result++; }
        }
        for (var  i = 0; i < context.YES_HONESTY.length; i++) {
            var  index = context.YES_HONESTY[i];
            if (context.answers[index - 1] == 5) { result++; }
        }
        return result;
    }

    function _calcTestResult(context) {
        var result = 0;
        for (var i = 0; i < context.SIGNIFICANT_QUESTS.length; i++) {
            var index = context.SIGNIFICANT_QUESTS[i];
            result += context.answers[index - 1];
        }
        return result;
    }

    this.calcResults = function() {
        if (this.answers.length != 36) {
            throw  new Error("Test is incomplete");
        }

        _honesty = _calcHonesty(this);
        _testValue = _calcTestResult(this);
    }

    this.getHonesty = function() {
        return _honesty;
    }

    this.getTestValue = function() {
        return _testValue;
    }
}

function Quests() {
    _ctor(this)

    function _ctor(context) {
        context.texts = [];
        _prepareJSON(context);
    }

    function _prepareJSON(context) {
        var path = 'json/questions.json';
        var xhr = new XMLHttpRequest();
        xhr.open('GET', path, true);

        xhr.onreadystatechange = function() {
            if (xhr.status == 200 && xhr.responseText != '') {
                var jsString = xhr.response;
                context.texts = JSON.parse(jsString);
                _prepareControls(context);
                xhr.onreadystatechange = function() {};
            }
        }

        xhr.send();
    }

    function _prepareControls(context) {
        document.querySelector('#quest-text').innerHTML = context.texts.quests[0];
        document.querySelector('#ok-button').disabled = false;
    }
}