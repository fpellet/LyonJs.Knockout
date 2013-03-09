LyonJs = function () { };
LyonJs.ViewModel = function () { };
LyonJs.Util = function () { };

$(function () {
    var vm = new LyonJs.ViewModel.SearchPage();

    ko.applyBindings(vm);
});

LyonJs.ViewModel.SearchPage = function() {
    var rthis = this;

    rthis.searchValue = ko.observable('');
    rthis.results = ko.observableArray([
        new LyonJs.ViewModel.Result({})
    ]);
    rthis.selectedResult = ko.observable();
    
    rthis.filtedResults = ko.computed(function () {
        return ko.utils.arrayFilter(rthis.results(), function (item) {
            return (item.Name != undefined && item.Name.indexOf(rthis.searchValue()) != -1) || rthis.searchValue().length == 0;
        });
    });

    rthis.valueReversed = ko.computed({
        read: function () {
            return rthis.searchValue().split("").reverse().join("");
        },
        write: function (value) {
            rthis.searchValue(value.split("").reverse().join(""));
        }
    });

    rthis.search = function() {
        $.ajax({
            url: "/api/unicorn",
            type: 'GET',
            success: function(result) {
                var results = ko.utils.arrayMap(result, function(item) {
                    return new LyonJs.ViewModel.Result(item);
                });
                rthis.results(results);
            }
        });

        return false;
    };

    rthis.select = function (item) {
        rthis.selectedResult(item);
        ko.utils.arrayForEach(rthis.results(), function (item) {
            item.IsSelected(false);
        });
        
        item.IsSelected(true);
    };

    rthis.search();
};

LyonJs.ViewModel.Result = function (result) {
    var rthis = this;

    rthis.ImageUri = result.ImageUri;
    rthis.Name = result.Name;
    rthis.Key = result.Key;
    rthis.Keywords = result.Keywords;
    rthis.CreationDate = result.CreationDate;
    rthis.IsSelected = ko.observable(false);
};