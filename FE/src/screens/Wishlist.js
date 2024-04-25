import '../App.scss';
import { withSwal } from 'react-sweetalert2';

import { FiLogOut } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { products } from '../fakeData';
import Header from '../components/Header';
import { getImagePath } from '../utils';
import { removeProduct, decreaseQuantity, increaseQuantity } from '../store/productSlice';
import {useEffect, useState } from 'react';
import { path } from '../fakeData';
import SweetAlert2 from 'react-sweetalert2';
import axios from 'axios';
function App() {
  const dispatch = useDispatch();
  const listTaskStore = useSelector((state) => state.product.productList);
  const totalPrice = listTaskStore.reduce((acc, item) => acc + item?.GiaBan*item?.SoLuong, 0);
  const [diachiquan , setInputdiachiquan]= useState() 
  const [diachiphuong , setInputdiachiphuong]= useState() 
  const [diachisonha , setInputdiachisonha]= useState()
  const regex = /^(0)[0-9]{9}$/;
  const onRemoveItem = (item) => () => {
    dispatch(removeProduct(item));
  };

  
  const [inputvalue , setInputvalue]= useState({}) 
  const onchaneinput = (event)=>{
     setInputvalue({...inputvalue, [event.target.name]:event.target.value})
  }
  const [phuong , setInputphuong]= useState([]) 
  const mapphuong = (event)=>{
    
    const mang=path.filter(e=>{if(e.name==event.target.value){return e.wards}})
    setInputphuong(mang)
    setInputdiachiquan(event.target.value)
 }
 const chonphuong = (event)=>{
  
  setInputdiachiphuong(event.target.value)
}
const onchaneinputsonha = (event)=>{
  
  setInputdiachisonha(event.target.value)
}
 const [swalProps, setSwalProps] = useState({});

 
 const ThanhToan = ()=>{
  
  if(listTaskStore.length === 0 ){
    
    setSwalProps({
      show: true,
      title: "Cảnh Báo",
      text: " Bạn chưa chọn sản phẩm nào",
      icon: 'error',
   }); 
   return;
  }
  if(Object.entries(inputvalue).length === 0||inputvalue.TenKH===""|| inputvalue.TenKH===null|| inputvalue.TenKH===undefined ){
    
    setSwalProps({
      show: true,
      title: "Cảnh Báo",
      text: " tên không được để trống",
      icon: 'error',
   }); 
   return;
  }
  if(Object.entries(inputvalue).length === 0||inputvalue.SDT===""|| inputvalue.SDT===null|| inputvalue.SDT===undefined ){
    console.log(Object.entries(inputvalue).length)
    console.log(inputvalue)
    setSwalProps({
      show: true,
      title: "Cảnh Báo",
      text: "Số điện thoại không được để trống",
      icon: 'error',
   }); 
   return;
  }else{
    console.log(inputvalue.SDT.length)
    if(inputvalue.SDT.match(regex)===false||inputvalue.SDT.length != 10){
      
      setSwalProps({
        show: true,
        title: "Cảnh Báo",
        text: "Số điện thoại không đúng định dạnh",
        icon: 'error',
     }); 
     return;
    }
  
  }
  if(diachiphuong===""|| diachiphuong===null|| diachiphuong===undefined||diachiquan===""|| diachiquan===null|| diachiquan===undefined||diachisonha===""|| diachisonha===null|| diachisonha===undefined){
    
    setSwalProps({
      show: true,
      title: "Cảnh Báo",
      text: " địa chỉ không được để trống",
      icon: 'error',
   }); 
   return;
  }
 
  const diachi=diachisonha+"- "+diachiphuong+"- "+diachiquan+"- Hà Nội"
  // setInputvalue({...inputvalue, SoLuong:listTaskStore[0]?.SoLuong})
  // setInputvalue({...inputvalue, GiaBan:listTaskStore[0]?.GiaBan})
  // setInputvalue({...inputvalue, IdSanPham:listTaskStore[0]?.id})

  inputvalue["SoLuong"]=listTaskStore[0]?.SoLuong;
  inputvalue["GiaBan"]=listTaskStore[0]?.GiaBan;
  inputvalue["IdSanPham"]=listTaskStore[0]?.id;
  inputvalue["DiaChi"]=diachi;
  inputvalue["TrangThaiGiaoHang"]=0;

    const callApi = async () => {
      const result = await axios.post('http://localhost:3000/dh',inputvalue).then(e=>{
        if(e?.status===200){
          setSwalProps({
            show: true,
            title: "Cảnh Báo",
            text: " Bạn đã đặt hàng thành công! Chúng tôi sẽ liên hệ với bạn để xác nhận đơn hàng. Xin cảm ơn!",
            icon: 'success',
         }); 
        }
      }).catch(e=>{
        setSwalProps({
          show: true,
          title: "Cảnh Báo",
          text: " Có lỗi khi đặt hàng vui lòng liên hệ chúng tôi để được giải quyết",
          icon: 'error',
       }); 
      });
    
      
      
    };
    callApi();
}


  return (
    <div>
      {/* header */}
      <Header />
      {/* cart */}
      <div className='mt-16 px-16'>
       

        <div className='flex flex-row'>
          

          <div className='w-72'>
            <div className='text-2xl font-bold'>Hóa Đơn</div>
            <div className='text-2xl font-bold'>{listTaskStore[0]?.SoLuong} Sản Phẩm</div>

            <div className='flex justify-between mb-4 pl-2 mt-4'>
              <div>Giá Bán</div>
              <div>{(listTaskStore[0]?.DonGia*listTaskStore[0]?.SoLuong).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</div>
            </div>
            <div className='flex justify-between mb-4 pl-2'>
              <div>Khuyến mãi</div>
              <div className='text-green-500'>{(listTaskStore[0]?.DonGia*listTaskStore[0]?.KhuyenMai*listTaskStore[0]?.SoLuong/100).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})} </div>
            </div>
            <div className='flex justify-between mb-4 pl-2'>
              <div>Giá vận chuyển</div>
              <div className='text-green-500'>10,0000 VND</div>
            </div>
            <div className='flex justify-between font-bold mb-4 pl-2'>
              <div>Total Amount</div>
              <div className=''>{(listTaskStore[0]?.DonGia*listTaskStore[0]?.SoLuong-listTaskStore[0]?.DonGia*listTaskStore[0]?.KhuyenMai*listTaskStore[0]?.SoLuong/100+10000).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</div>
            </div>
           
          </div>
          <div className='flex-1 mr-8'>
          <div className=' w-full '>   
    <div class="flex  ml-10 w-full ">
    <div class="w-full ">

      <div class="w-full    lg:pl-20 lg:pr-40 ">
        <div class="flex justify-center">
          <p class="font-bold uppercase"><br /> Thông tin khách hàng</p>
        </div>
        <div class="grid grid-row gap-5  ">
            <div class="flex grid-row-1 ">
               
                  <p  class="w-1/3 mt-4">Họ tên</p>
                  <input class="w-full bg-gray-100 text-gray-900  p-3 rounded-lg focus:outline-none focus:shadow-outline"
                    name="TenKH"
                    value={inputvalue.TenKH}
                    onChange={onchaneinput} 
                    type="text"  
                    />
           
            </div>
            <div class="flex grid-row-1 ">
               
                  <p  class="w-1/3 mt-4">Số điện thoại</p>
                  <input class="w-full bg-gray-100 text-gray-900  p-3 rounded-lg focus:outline-none focus:shadow-outline"
                      type="text"
                      name="SDT"     
                      value={inputvalue.SDT}
                      onChange={onchaneinput}
                      />
                
                
                
            </div>
            <div class="flex grid-row-1  ">
                <div class="w-full flex mr-1 ">
                  <p  class="w-1/4 mt-4">Địa chỉ</p> 
                  <div  class="w-3/4 mt-4 ">
                    <select  class="w-1/4  mr-4 border-solid border-black border-2">
                      <option>Hà Nội</option>
                    </select>
                    <select  class="w-1/3 mr-4 border-solid border-black border-2" onChange={mapphuong}>
                    <option value={""} >------</option>
                     {path?.map(
                      (e)=>(
                        <option value={e.name}>{e.name}</option>
                     ))}
                    </select>
                    <select  class="w-1/3 mr-4 border-solid border-black border-2" onChange={chonphuong}>
                    <option value={""} >------</option>
                    {phuong[0]?.wards?.map(
                      (e)=>(
                        <option value={e.name}>{e.name}</option>
                     ))}
                    </select>
                  </div>             
                 
                </div>
                
                
            </div> 
            <div class="flex grid-row-1  ">
                <div class="w-full flex mr-1 ">
                  <p  class="w-1/4 mt-4">Số Nhà</p> 
                  <div  class="w-3/4 mt-4 ">
               
                  <input class="w-full bg-gray-100 text-gray-900  p-3 rounded-lg focus:outline-none focus:shadow-outline"
                    name="name"
                    value={inputvalue.price}
                    onChange={onchaneinputsonha} 
                    type="text"  
                    />
                  </div>             
                 
                </div>
                
                
            </div> 
        </div>
        </div>          
      </div>       
    </div>
    </div>
          <div onClick={ThanhToan} style={{marginLeft:'27rem', marginTop:'4rem'}} className='w-1/4  bg-gray-800 h-14 flex justify-center items-center uppercase font-medium text-white cursor-pointer'>
            
            Đặt hàng
            
          </div>
        </div>
        </div>
       
      </div>

      <SweetAlert2 {...swalProps} didClose={() => {
                    setSwalProps({})
                }} />
    </div >
  );
}

export default App;
