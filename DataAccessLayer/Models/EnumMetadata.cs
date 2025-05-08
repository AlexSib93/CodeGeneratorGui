using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace DataAccessLayer.Dto
{
    public class EnumMetadata
    {

        public EnumMetadata()
        {
          Values = new HashSet<EnumValueMetadata>();

        }

        [Key]
        public int IdEnumMetadata { get; set; }
        public string Name { get; set; }
        public string Caption { get; set; }

        
        public virtual ICollection<EnumValueMetadata>? Values { get; set; }
        public int? IdProjectMetadata { get; set; }

        
        [ForeignKey("IdProjectMetadata")]
        public virtual ProjectMetadata? ProjectMetadata { get; set; }
    }
}
