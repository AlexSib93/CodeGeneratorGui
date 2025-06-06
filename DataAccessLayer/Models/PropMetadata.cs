﻿using System;
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
        public string? Type { get; set; }
        public string? Caption { get; set; }
        public string? Expression { get; set; }

        public int? IdModelMetadata { get; set; }

        
        [ForeignKey("IdModelMetadata")]
        public virtual ModelMetadata? ModelMetadata { get; set; }        public bool IsPrimaryKey { get; set; }
        public bool Visible { get; set; }
        public bool Editable { get; set; }
        public bool JsonIgnore { get; set; }
        public PropTypeEnum PropType { get; set; }
        public bool IsVirtual { get; set; }
        public bool IsNullable { get; set; }
        public bool IsEnumerable { get; set; }
        public string TypeOfEnumerable { get; set; }
        public string TypeOfNullable { get; set; }

    }
}
