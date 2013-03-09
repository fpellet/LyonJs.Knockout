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
    
    rthis.filtedResults = ko.computed(function () {
        return ko.utils.arrayFilter(rthis.results(), function (item) {
            return (item.Name != undefined && item.Name.indexOf(rthis.searchValue()) != -1) || rthis.searchValue().length == 0;
        });
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

    rthis.search();
};

LyonJs.ViewModel.Result = function (result) {
    var rthis = this;

    rthis.ImageUri = result.ImageUri;
    rthis.Name = result.Name;
    rthis.Key = result.Key;
    rthis.Keywords = result.Keywords;
    rthis.CreationDate = result.CreationDate;
};