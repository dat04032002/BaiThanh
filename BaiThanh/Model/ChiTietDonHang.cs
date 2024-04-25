using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BaiThanh.Model
{
    public class ChiTietDonHang
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int? Id { get; set; }
        public string DonHangID { get; set; }
        public int SanPhamId { get; set; }
        public string TenSP { get; set; }
        public double GiaGoc { get; set; }
        public double GiaBan { get; set; }
        public float GiamGia { get; set; }

        public DateTime BaoHanh { get; set; }
       
    }
}
