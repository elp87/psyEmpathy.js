var okButton;
var questBlock;
var testBlock;
var curAnswerNumber;
var curTest;
var quests;

main();

function main() {
    okButton = document.querySelector('#ok-button');
    questBlock = document.querySelector('#quest-text');
    curTest = new Testing();
    quests = new Quests();
}

function Testing() {
    _ctor(this);

    function _ctor(context) {
        context.SIGNIFICANT_QUESTS = [2, 5, 8, 9, 10, 12, 13, 15, 16, 19, 21, 22, 24, 25, 26, 27, 29, 32];
        context.DONT_KNOW_HONESTY = [3, 9, 11, 13, 28, 36];
        context.YES_HONESTY = [11, 13, 15, 27];
        context.answers = [];
        context.descriptionsList;
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