using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Helpers;
using System.Web.Optimization;

namespace LyonJs.KnockoutJs.Seo
{
    public class TemplateTransform : IBundleTransform
    {
        private const string BeginScript = "var a=window.templates||(window.templates=[]);";
        private const string PushScript = "a.push(";
        private const string EndScript = ");";
        private const string ContentType = "text/javascript";

        public string GeneratedTemplatesPath { get; set; }

        public TemplateTransform()
        {
            GeneratedTemplatesPath = Path.Combine(HttpContext.Current.Server.MapPath("~/content"), "generatedTemplates");
        }

        public void Process(BundleContext context, BundleResponse response)
        {
            var isDebug = context.HttpContext.IsDebuggingEnabled;

            if (isDebug && !Directory.Exists(GeneratedTemplatesPath)) Directory.CreateDirectory(GeneratedTemplatesPath);

            var str = new StringBuilder();
            str.Append(BeginScript);

            var results = new List<FileInfo>();
            foreach (var file in response.Files.Select(o => new { Name = o.Name, Value = EncodeItem(o) }))
            {
                str.Append(PushScript);
                str.Append(file.Value);
                str.Append(EndScript);

                if (!isDebug) continue;

                var fileName = GenerateTemplate(file.Name, file.Value);
                results.Add(new FileInfo(fileName));
            }

            response.Files = results;
            response.Content = str.ToString();
            response.ContentType = ContentType;
        }

        private string GenerateTemplate(string fileName, string value)
        {
            var newFileName = Path.Combine(GeneratedTemplatesPath, fileName + ".js");
            using (var newFile = File.CreateText(newFileName))
            {
                newFile.Write(BeginScript);
                newFile.Write(PushScript);
                newFile.Write(value);
                newFile.Write(EndScript);
            }

            return newFileName;
        }

        private static string EncodeItem(FileSystemInfo file)
        {
            var name = Path.GetFileNameWithoutExtension(file.Name);
            var value = File.ReadAllText(file.FullName);
            var item = new { Name = name, Value = value };
            return Json.Encode(item);
        }
    }
}