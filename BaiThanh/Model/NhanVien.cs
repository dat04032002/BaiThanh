using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BaiThanh.Model
{
    public class NhanVien
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string TenNhanVien { get; set; }
        public string GioiTinh { get; set; }
        public string NgaySinh { get; set; }
        public string CCCD { get; set; }
    }
}
