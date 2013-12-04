test('test1()', function () {
    var arr0 = [1, 2, 3, 2, 1, 3, 2, 3, 3, 3, 1, 1, 2, 1, 2, 2, 3, 2, 2, 1, 3, 4, 1, 3, 3, 4, 3, 1, 2, 1, 2, 4, 1, 3, 1, 1];
    var test0 = new Testing(arr0);
    test0.calcResults();
    equal(test0.getHonesty(), 0, "Honesty");
    equal(test0.getTestValue(), 47, "Value");
});

test('test2', function() {
    var arr0 = [4, 3, 1, 2, 2, 5, 4, 3, 4, 4, 2, 1, 3, 2, 2, 3, 2, 1, 2, 2, 4, 1, 2, 2, 2, 4, 4, 3, 4, 2, 3, 2, 3, 3, 1, 3];
    var test0 = new Testing(arr0);
    test0.calcResults();
    equal(test0.getHonesty(), 0, "Honesty");
    equal(test0.getTestValue(), 50, "Value");
});

test('test3', function() {
    var arr0 = [4, 3, 3, 2, 0, 4, 2, 3, 4, 3, 2, 1, 4, 2, 3, 3, 3, 1, 3, 1, 3, 1, 1, 3, 2, 4, 5, 1, 4, 1, 4, 4, 2, 3, 1, 1];
    var test0 = new Testing(arr0);
    test0.calcResults();
    equal(test0.getHonesty(), 1, "Honesty");
    equal(test0.getTestValue(), 53, "Value");
});

test('all zero', function() {
    var arr0 = [];
    for (var i = 0; i < 36; i++) { arr0.push(0); }
    var test0 = new Testing(arr0);
    test0.calcResults();
    equal(test0.getHonesty(), 6, "Honesty");
    equal(test0.getTestValue(), 0, "Value");
})
