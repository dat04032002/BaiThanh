﻿
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace BaiThanh.Model
{
    public class DonHang
    {
        public string ID { get; set; }

        public string KhachHangSDT { get; set; }
        public DateTime NgayBan { get; set; }
        public double TongTien { get; set; }
        public int TrangThai { get; set; }
        public string TenKH { get; set; }
        public string DiaChi { get; set; }
    }
}
