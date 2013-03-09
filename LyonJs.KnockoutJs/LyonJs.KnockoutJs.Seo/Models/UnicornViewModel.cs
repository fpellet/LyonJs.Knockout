using System;
using System.Collections.Generic;
using System.IO;
using System.Web;

namespace LyonJs.KnockoutJs.Seo.Models
{
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
            ImageUrl = file.FullName.Replace(HttpContext.Current.Request.PhysicalApplicationPath, "\\");
        }

        public string ImageUrl { get; set; }

        public string Name { get; set; }

        public string Key { get; set; }

        public IEnumerable<string> Keywords { get; set; }

        public DateTime CreationDate { get; set; }
    }
}