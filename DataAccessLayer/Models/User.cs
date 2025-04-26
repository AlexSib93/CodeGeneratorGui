using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace DataAccessLayer.Dto
{
    public class User
    {

        public User()
        {

        }

        public int Id { get; set; }
        public string Login { get; set; }
        public string Barcode { get; set; }
        public string Password { get; set; }
        public string Name { get; set; }

    }
}
