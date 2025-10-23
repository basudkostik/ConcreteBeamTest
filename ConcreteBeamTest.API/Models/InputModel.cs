using System.ComponentModel.DataAnnotations;

namespace ConcreteBeamTest.API.Models
{
    public class InputModel
    {
        [Required] public double fck { get; set; }  // Beton karakteristik basınç dayanımı [MPa]
        [Required] public double fyk { get; set; }  // Çelik karakteristik akma dayanımı fyk [MPa]
        [Required] public double b { get; set; }    // Kesit genişliği b mm
        [Required] public double h { get; set; }    // Kesit yüksekliği h mm
        [Required] public double d1 { get; set; }   // Üst donatı merkezine uzaklık d mm  
        [Required] public double d2 { get; set; }   // Alt donatı merkezine uzaklık d (alt donatı)
        [Required] public double As_top { get; set; } // Üst donatı alanı As mm²
        [Required] public double As_bot { get; set; } // Alt donatı alanı As mm²
    }
}
