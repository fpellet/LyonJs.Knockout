using System.Collections.Generic;
using System.Linq;

namespace LyonJs.KnockoutJs.Seo.Models
{
    public class SearchPageViewModel : ViewModelBase
    {
        public string SearchValue { get; set; }

        public IEnumerable<UnicornViewModel> Results { get; set; }

        public bool HasResults { get { return Results.Any(); } }

        public override string Title
        {
            get
            {
                return "LyonJs";
            }
        }
    }
}