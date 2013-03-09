LyonJs.Utils.Navigation = function() {

};

LyonJs.Utils.Navigation.search = function (keyword) {
    var url;

    if (keyword == undefined) {
        url = "/home/index";
    } else {
        url = "/home/search/" + escape(keyword);
    }

    LyonJs.Utils.Navigation._goToUrl(url);
};

LyonJs.Utils.Navigation.update = function (vm) {
    if (vm == undefined) return;

    window["viewModel"] = vm;
    LyonJs.Utils.Navigation.initialize();
};

LyonJs.Utils.Navigation.initialize = function () {
    var data = window["viewModel"];

    document.title = data.Title;

    var type = data.ViewModelType;
    var viewModel = undefined;
    if (type == "HomePage") viewModel = new LyonJs.ViewModel.HomePage(data);
    else if (type == "SearchPage") viewModel = new LyonJs.ViewModel.SearchPage(data);

    if (viewModel == undefined) return;

    viewModel.ViewName = type;

    var body = window.document.body;
    ko.cleanNode(body);
    ko.applyBindings(viewModel);
};

LyonJs.Utils.Navigation._historySupported = !(typeof history.pushState === 'undefined');
LyonJs.Utils.Navigation._lastRequest = undefined;

LyonJs.Utils.Navigation.initializeHistory = function () {
    window.addEventListener('popstate', function (event) {
        LyonJs.Utils.Navigation.update(event.state);
    });

    if (!LyonJs.Utils.Navigation._historySupported) return;

    history.replaceState(window["viewModel"], document.title, document.location.href);
};

LyonJs.Utils.Navigation._goToUrl = function (url) {
    if (!LyonJs.Utils.Navigation._historySupported) {
        window.location = url;
        return;
    }

    if (LyonJs.Utils.Navigation._lastRequest != undefined) {
        LyonJs.Utils.Navigation._lastRequest.abort();
    }

    var successCallback = function(data) {
        LyonJs.Utils.Navigation._lastRequest = undefined;

        LyonJs.Utils.Navigation.update(data);

        history.pushState(data, data.Title, url);
    };

    LyonJs.Utils.Navigation._lastRequest = $.ajax({
        url: url + "?json",
        type: 'GET',
        dataType: 'json',
        success: successCallback,
        error: function(a) {
        }
    });
};