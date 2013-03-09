namespace LyonJs.KnockoutJs.Seo.Models
{
    public abstract class ViewModelBase
    {
        public string ViewModelType
        {
            get
            {
                return GetType().Name.Replace("ViewModel", "");
            }
        }

        public virtual string Title { get; protected set; }
    }
}