using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace DataAccessLayer.Dto
{
    public class EnumValueMetadata
    {

        public EnumValueMetadata()
        {

        }

        [Key]
        public int IdEnumValueMetadata { get; set; }
        public string Name { get; set; }
        public string? Caption { get; set; }

        public int? IdEnumMetadata { get; set; }

        
        [ForeignKey("IdEnumMetadata")]
        public virtual EnumMetadata? EnumMetadata { get; set; }
    }
}
