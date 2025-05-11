using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace DataAccessLayer.Dto
{
    public class ComponentMetadata
    {

        public ComponentMetadata()
        {
          Props = new HashSet<PropMetadata>();

        }

        [Key]
        public int IdComponentMetadata { get; set; }
        public string? Name { get; set; }
        public string? Caption { get; set; }
        public string? Description { get; set; }
        public string Type { get; set; }

        public int? IdModelPropMetadata { get; set; }

        
        [ForeignKey("IdModelPropMetadata")]
        public virtual PropMetadata? ModelPropMetadata { get; set; }
        
        public virtual ICollection<PropMetadata>? Props { get; set; }        public bool ModelProp { get; set; }

        public int? IdFormMetadata { get; set; }

        
        [ForeignKey("IdFormMetadata")]
        public virtual FormMetadata? FormMetadata { get; set; }
    }
}
