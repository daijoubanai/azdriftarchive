using ImageServer.Models;

namespace ImageServer
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Events> Events { get; set; }
    }
}
