using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace BETarjetas.Models
{
  public class TarjetaCredito
  {
    [Required]
    public int Id { get; set; } //clave primaria
    [Required]
    public  string Titular { get; set; }
    [Required]
    public string NumeroTarjeta { get; set; }
    [Required]
    public string FechaExpiracion { get; set; }
    [Required]
    public int CVV { get; set; }
  }
}
