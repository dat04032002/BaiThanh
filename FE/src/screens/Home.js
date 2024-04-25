import '../App.scss';
import { useNavigate } from "react-router-dom";
import {
  BrowserRouter, Routes, Route, Link
} from "react-router-dom";
import { FiLogOut } from "react-icons/fi";

import Header from '../components/Header';
import { useEffect, useState } from 'react';
import { addProduct } from '../store/productSlice';
import axios from 'axios';
import { useSelector, useDispatch } from "react-redux";
function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [productList, setProductList1] = useState([]);
  const [categories, setProductList] = useState([]);
  useEffect(() => {
    const callApi = async () => {
      const result = await axios.get('http://localhost:3000/dm');
       console.log(result.data);
      setProductList(result.data.data);
    };
    callApi();
   }, []);
   useEffect(() => {
  
      const callApi = async () => {
        const result = await axios.get('http://localhost:3000/sp');
         console.log(result.data);
         setProductList1(result.data.data.slice(0, 10));
      };
      callApi();
    
   
   }, []);
   const onAddProduct = (product) => () => {
    dispatch(addProduct({ ...product, SoLuong: 1 }));
  };
  return (
    <div>
      {/* header */}
      <Header />

      {/* trademark */}
      <div className='flex flex-row move-down'>
        <div className='flex flex-col w-1/2 justify-center items-center'>
          <div className='text-6xl font-bold text-center mx-20'>CHÀO MỪNG BẠN ĐẾN VỚI DA PHONE SHOP.</div>
          <div className='text-xl mt-10'>Nơi cung cấp các mẫu điện thoại chất lượng tốt .</div>
        </div>
        <div className='flex w-1/2 img-hero' />
      </div>

      {/* category */}
      <div className='flex flex-row justify-around px-10 mt-8'>
        {categories.map((e, i) => (
          <div className='border flex-1 justify-center items-center relative'
            style={i === 1 ? { marginLeft: 20, marginRight: 20 } : {}}
          >
            <div className="gradient-category"></div>
            <img src={`http://localhost:3000/Image/${e?.Anh}`} alt={e?.HangSanXuat} className='h-full w-full object-cover' />
           
              <div className='flex flex-col absolute top-1/2 left-1/2 transform-center' onClick={() => navigate(`/product/${e.id}`)}>
                <div className=' text-center text-white text-3xl font-bold'>{e?.HangSanXuat}</div>
                <button className='bg-white p-2 round'>Shop Now</button>
              </div>
            
          </div>
        ))}
      </div>

      {/* feature */}
      <div className='px-10 mt-8'>
        <div className='text-6xl font-bold'>Sản Phẩm Bán Chạy</div>
        <div className='flex-1'>

          <div className='flex flex-wrap overflow-auto mt-4 -mr-10' >
            {productList?.map(e => {
              return (
                <div className='mr-12 mb-12' style={{ width: 'calc(25% - 48px)' }}>
                  <div onClick={() => navigate(`/detail/${e.id}`, { state: { name: 'ahihi' } })}>
                  <div className="relative">
                    {/* <img src={require(`../assets/images/${e.image}`)} alt={e.title} className='object-cover h-48 w-full' /> */}
                   <img src={`http://localhost:3000/Image/${e.Anh}`} alt={e.idDanhmuc} className='object-cover' style={{ width: '20rem', height:'15rem'}}/>
                    
                  </div>
                  <div className='p-1' >
                    <div className='ml-5'>
                    <div className='font-bold'>{e.TenSP}</div>

                    <div>{e.GiaBan.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</div>
                    </div>

                    
                  </div>
                  </div>
                  <div onClick={onAddProduct(e)} className='bg-gray-800 h-11 flex justify-center items-center uppercase font-medium text-white cursor-pointer'>
                    <Link to='/cart' className='w-full h-full text-center p-2'>
                    Mua ngay
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;
