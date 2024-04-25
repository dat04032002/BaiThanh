using Microsoft.EntityFrameworkCore;
namespace BaiThanh.Model
{
    public class BaoCaoContext : DbContext
    {
        public BaoCaoContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<TaiKhoan> taiKhoans { get; set; }
        public DbSet<SanPhammodel> sanPhams { get; set; }
        public DbSet<NhanVien> nhanViens { get; set; }  
        public DbSet<Kho> khos { get; set; }
        public DbSet<DonHang> donHang { get; set; } 
        public DbSet<DanhMucSanPham> danhMucSanPhams { get; set; }  
        public DbSet<ChiTietDonHang> chiTietDonHangs { get; set; }
    }
}
