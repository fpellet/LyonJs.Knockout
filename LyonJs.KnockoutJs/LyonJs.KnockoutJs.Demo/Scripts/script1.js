LyonJs = function () { };
LyonJs.ViewModel = function () { };
LyonJs.Util = function () { };

$(function () {
    var vm = new LyonJs.ViewModel.SearchPage();

    ko.applyBindings(vm);
});

LyonJs.ViewModel.SearchPage = function () {
    var rthis = this;

    rthis.searchValue = ko.observable('');

    rthis.search = function () {
        alert(rthis.searchValue());
        return false;
    };
}