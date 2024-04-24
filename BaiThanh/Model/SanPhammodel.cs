using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace BaiThanh.Model
{
    public class SanPhammodel
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int? Id { get; set; }
        public string? TenSanPham { get; set; }
      
       
        public double? GiaBan { get; set; }
        public string? Anh { get; set; }
        public int? TrangThai { get; set; }
        public string? MoTa { get; set; }
        public string? LoaiSp { get; set; }
        public string? Hang { get; set; }
        public int? SoLuong { get; set; }
       
        public int? IdKho { get; set; }
    }
}
