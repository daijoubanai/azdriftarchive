namespace ImageServer.Models
{
    public class Events
    {
        public int id { get; set; }
        public DateTime date { get; set; }
        public string location { get; set; } = string.Empty;
        public string path { get; set; } = string.Empty;


    }
}
