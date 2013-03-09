using System.Web;
using System.Web.Mvc;

namespace LyonJs.KnockoutJs.Seo
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}