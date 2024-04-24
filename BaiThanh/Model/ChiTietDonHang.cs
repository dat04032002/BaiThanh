namespace BaiThanh.Model
{
    public class ChiTietDonHang
    {
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
