using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace DataAccessLayer.Dto
{
    public class ModelMetadata
    {

        public ModelMetadata()
        {
          Props = new HashSet<PropMetadata>();

        }

        [Key]
        public int IdModelMetadata { get; set; }
        public string Name { get; set; }
        public string? InitData { get; set; }
        public string? NameSpace { get; set; }
        public string? Caption { get; set; }

        
        public virtual ICollection<PropMetadata>? Props { get; set; }
        public int? IdProjectMetadata { get; set; }

        
        [ForeignKey("IdProjectMetadata")]
        public virtual ProjectMetadata? ProjectMetadata { get; set; }
    }
}
