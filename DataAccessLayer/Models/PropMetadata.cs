using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace DataAccessLayer.Dto
{
    public class PropMetadata
    {

        public PropMetadata()
        {

        }

        [Key]
        public int IdPropMetadata { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public string Caption { get; set; }

        public int? IdModel { get; set; }

        
        [ForeignKey("IdModel")]
        public virtual ModelMetadata? Model { get; set; }
    }
}
