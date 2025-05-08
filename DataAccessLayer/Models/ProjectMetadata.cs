using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace DataAccessLayer.Dto
{
    public class ProjectMetadata
    {

        public ProjectMetadata()
        {
          Models = new HashSet<ModelMetadata>();
          Forms = new HashSet<FormMetadata>();
          EnumTypes = new HashSet<EnumMetadata>();

        }

        [Key]
        public int IdProjectMetadata { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Path { get; set; }
        public string DbConnectionString { get; set; }
        public string UnitOfWork { get; set; }
        public int WebApiHttpsPort { get; set; }
        public int DevServerPort { get; set; }

        
        public virtual ICollection<ModelMetadata>? Models { get; set; }
        
        public virtual ICollection<FormMetadata>? Forms { get; set; }
        
        public virtual ICollection<EnumMetadata>? EnumTypes { get; set; }
    }
}
