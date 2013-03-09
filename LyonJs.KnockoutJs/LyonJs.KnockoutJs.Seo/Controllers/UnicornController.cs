using System.Collections.Generic;
using System.Web;
using System.Web.Http;
using System.IO;
using System.Linq;
using LyonJs.KnockoutJs.Seo.Models;

namespace LyonJs.KnockoutJs.Seo.Controllers
{
    public class UnicornController : ApiController
    {
        public IEnumerable<UnicornViewModel> Get()
        {
            return (new DirectoryInfo(HttpContext.Current.Server.MapPath("~/Content/Unicorn/"))).EnumerateFiles().Select(f => new UnicornViewModel(f));
        }

        public IEnumerable<UnicornViewModel> Search(string keyword)
        {
            if (string.IsNullOrWhiteSpace(keyword)) return Get();

            var keywords = keyword.Split(' ');
            return Get().Where(m => keywords.Any(m.Name.Contains));
        }
    }
}