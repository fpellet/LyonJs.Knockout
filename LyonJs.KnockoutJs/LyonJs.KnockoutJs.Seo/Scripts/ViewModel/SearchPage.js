LyonJs.ViewModel.SearchPage = function (data) {
    var rthis = this;

    if (data.SearchValue == undefined) data.SearchValue = '';
    rthis.SearchValue = ko.observable(data.SearchValue);

    var results = ko.utils.arrayMap(data.Results, function (item) {
        return new LyonJs.ViewModel.Result(item);
    });
    rthis.Results = ko.observableArray(results);

    rthis.HasResults = ko.computed(function () {
        return rthis.Results().length > 0;
    });
    rthis.SelectedResult = ko.observable();
    rthis.HasSelectedResult = ko.computed(function () {
        return rthis.SelectedResult() != undefined;
    });

    rthis.filtedResults = ko.computed(function () {
        return ko.utils.arrayFilter(rthis.Results(), function (item) {
            return item.Name.indexOf(rthis.SearchValue()) !== -1 || rthis.SearchValue().length == 0;
        });
    }, this);

    rthis.search = function () {
        LyonJs.Utils.Navigation.search(rthis.SearchValue());

        return false;
    };

    rthis.select = function(item) {
        rthis.SelectedResult(item);
        ko.utils.arrayForEach(rthis.Results(), function (item) {
            item.IsSelected(false);
        });

        item.IsSelected(true);
    };

    rthis.displayItem = function (elem, index) {
        if (elem.nodeType === 1) {
            $(elem).hide().fadeIn(200 * index);
        }
    };

    rthis.hideItem = function (elem) {
        if (elem.nodeType === 1) {
            $(elem).fadeOut(200);
        }
    };
}