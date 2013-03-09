$(function() {
    var vm = new LyonJs.ViewModel.SearchPage();

    ko.applyBindings(vm);
});

LyonJs = function() {
};
LyonJs.ViewModel = function () {
};

LyonJs.ViewModel.SearchPage = function() {
    var rthis = this;

    rthis.searchValue = ko.observable('');
    rthis.results = ko.observableArray();

    rthis.filtedResults = ko.computed(function() {
        return ko.utils.arrayFilter(rthis.results(), function(item) {
            return item.Name != undefined && item.Name.indexOf(rthis.searchValue()) != -1 || rthis.searchValue().length == 0;
        });
    });

    rthis.itemSelected = ko.observable(false);

    rthis.reverseValue = ko.computed({
        read: function() {
            return rthis.searchValue().split("").reverse().join("");
        },
        write: function (value) {
            rthis.searchValue(value.split("").reverse().join(""));
        }
    });

    rthis.search = function() {
        $.ajax({
                url: "/api/unicorn",
                type: "GET",
                success:  function (result) {
                    var results = ko.utils.arrayMap(result, function(item) {
                        return new LyonJs.ViewModel.Result(item);
                    });

                    rthis.results(results);
                }
            });
    };

    rthis.select = function(item) {
        var oldItem = rthis.itemSelected();
        if (oldItem != undefined) {
            oldItem.IsSelected(false);
        }
        
        item.IsSelected(true);
        rthis.itemSelected(item);
    };
};

LyonJs.ViewModel.Result = function (item) {
    var rthis = this;

    rthis.ImageUri = item.ImageUri;
    rthis.Name = item.Name;
    rthis.Keywords = item.Keywords;
    rthis.CreationDate = item.CreationDate;
    rthis.IsSelected = ko.observable(false);
};