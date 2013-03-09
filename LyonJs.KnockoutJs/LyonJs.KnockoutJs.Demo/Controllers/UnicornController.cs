using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace LyonJs.KnockoutJs.Demo.Controllers
{
    public class UnicornController : ApiController
    {
        public IEnumerable<UnicornViewModel> Get()
        {
            return (new DirectoryInfo(HttpContext.Current.Server.MapPath("~/Content/Unicorn/"))).EnumerateFiles().Select(f => new UnicornViewModel(f));
        }
    }

    public class UnicornViewModel
    {
        public UnicornViewModel()
        {
        }

        public UnicornViewModel(FileInfo file)
        {
            Key = Path.GetFileNameWithoutExtension(file.Name);
            Name = Key.Replace('_', ' ');
            Keywords = Key.Split('_');
            CreationDate = file.CreationTime;
            ImageUri = file.FullName.Replace(HttpContext.Current.Request.PhysicalApplicationPath, "\\");
        }

        public string ImageUri { get; set; }

        public string Name { get; set; }

        public string Key { get; set; }

        public IEnumerable<string> Keywords { get; set; }

        public DateTime CreationDate { get; set; }
    }
}
