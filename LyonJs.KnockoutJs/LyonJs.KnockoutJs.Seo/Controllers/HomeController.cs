using System.Linq;
using System.Web.Mvc;
using LyonJs.KnockoutJs.Seo.Models;

namespace LyonJs.KnockoutJs.Seo.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            var vm = new HomePageViewModel();
            return Result(vm);
        }

        public ActionResult Search(string id)
        {
            var vm = new SearchPageViewModel();
            vm.SearchValue = id;
            vm.Results = (new UnicornController()).Search(id);
            return Result(vm);
        }

        private ActionResult Result<T>(T vm) where T : ViewModelBase
        {
            if (Request.AcceptTypes == null || !Request.AcceptTypes.Any()) return View(vm);

            var firstAcceptType = Request.AcceptTypes.First();
            return firstAcceptType.ToLowerInvariant().Contains("json") ? (ActionResult)Json(vm, JsonRequestBehavior.AllowGet) : View(vm);
        }
    }
}
