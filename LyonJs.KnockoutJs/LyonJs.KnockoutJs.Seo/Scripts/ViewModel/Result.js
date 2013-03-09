LyonJs.ViewModel.Result = function (data) {
    var rthis = this;

    rthis.ImageUrl = data.ImageUrl;
    rthis.Name = data.Name;
    rthis.CreationDate = data.CreationDate;
    rthis.Keywords = data.Keywords;
    rthis.IsSelected = ko.observable(false);
}