using DataAccessLayer.Dto;
using Microsoft.EntityFrameworkCore;

namespace DataAccessLayer.Data
{
    public class DataBaseContext: DbContext
    {


        public virtual DbSet<User> User { get; set; } = null!;

        public virtual DbSet<ModelMetadata> ModelMetadata { get; set; } = null!;


        public virtual DbSet<ProjectMetadata> ProjectMetadata { get; set; } = null!;


        public virtual DbSet<FormMetadata> FormMetadata { get; set; } = null!;


        public virtual DbSet<PropMetadata> PropMetadata { get; set; } = null!;


        public virtual DbSet<ComponentMetadata> ComponentMetadata { get; set; } = null!;



        public DataBaseContext(string connectionString)
           : base(new DbContextOptionsBuilder<DataBaseContext>().UseSqlServer(connectionString).Options)
        {
        }

        public DataBaseContext()
        {
        }

        public DataBaseContext(DbContextOptions<DataBaseContext> options)
            : base(options)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("TestConnectionString");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

        }

    }
}

