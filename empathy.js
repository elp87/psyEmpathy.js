/**
 * Created by elp on 04.12.13.
 */

function Testing(arr) {
    var _honesty;
    var _testValue;
    _ctor(this, arr);

    function _ctor(context, arr) {
        context.SIGNIFICANT_QUESTS = [2, 5, 8, 9, 10, 12, 13, 15, 16, 19, 21, 22, 24, 25, 26, 27, 29, 32];
        context.DONT_KNOW_HONESTY = [3, 9, 11, 13, 28, 36];
        context.YES_HONESTY = [11, 13, 15, 27];
        if (arr == undefined) { context.answers = []; }
        else {context.answers = arr; }
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
}