LyonJs.ViewModel.HomePage = function (data) {
    var rthis = this;

    rthis.SearchValue = ko.observable('');
    rthis.SearchValue.subscribe(function () {
        LyonJs.Utils.Navigation.search(rthis.SearchValue());
    });

    rthis.search = function () {
        LyonJs.Utils.Navigation.search(rthis.SearchValue());

        return false;
    };
}