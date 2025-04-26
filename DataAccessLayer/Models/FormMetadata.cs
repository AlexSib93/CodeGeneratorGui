using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace DataAccessLayer.Dto
{
    public class FormMetadata
    {

        public FormMetadata()
        {
          Components = new HashSet<ComponentMetadata>();

        }

        [Key]
        public int IdFormMetadata { get; set; }
        public string Name { get; set; }
        public string Caption { get; set; }
        public string Description { get; set; }
        public bool AddToNavBar { get; set; }

        
        public virtual ICollection<ComponentMetadata>? Components { get; set; }
        public int? IdProject { get; set; }

        
        [ForeignKey("IdProject")]
        public virtual ProjectMetadata? Project { get; set; }
    }
}
