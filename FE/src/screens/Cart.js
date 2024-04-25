import '../App.scss';
import {
  BrowserRouter, Routes, Route, Link
} from "react-router-dom";
import {
  FaSearch,
  FaUser,
  FaHeart,
  FaShoppingCart,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { products } from '../fakeData';
import Header from '../components/Header';
import { getImagePath } from '../utils';
import { removeProduct, decreaseQuantity, increaseQuantity } from '../store/productSlice';



function App() {
  const dispatch = useDispatch();
  const listTaskStore = useSelector((state) => state.product.productList);
  const totalPrice = listTaskStore.reduce((acc, item) => acc + item?.GiaBan*item?.SoLuong, 0);

  const onRemoveItem = (item) => () => {
    dispatch(removeProduct(item));
  };

  const onChangeQuantity = (type, item) => () => {
    if (type === 'decrease') {
      dispatch(decreaseQuantity(item));
    } else {
      dispatch(increaseQuantity(item));
    }
  };


  console.log('item', listTaskStore);
  return (
    <div>
      {/* header */}
      <Header />
      {/* cart */}
      <div className='mt-16 px-16'>
        <div className='text-4xl font-bold mb-4'>Items in Cart:</div>

        <div className='flex flex-row'>
          <div className='flex-1 mr-8'>
            {listTaskStore?.map(item => {
              return (
                <div key={item?.id} className='flex flex-row hover:border p-2 mb-6'>
                  <img src={`http://localhost:3000/Image/${item?.Anh}`} alt={'shoes'} className='object-cover w-40 h-40' />
                  <div className='ml-4 w-full'>
                    <div className='flex justify-between'>
                      <div className='font-bold'>{item?.TenSP}</div>
                      <div className='font-bold'>{item?.GiaBan}$</div>
                    </div>
                  
                    <div>{item?.MoTaSP}</div>
                    <div className='flex flex-row my-4'>
                     
                      <div className='flex flex-row'>
                        <div className='mr-2'>Quantity</div>
                        <div className='flex flex-row'>
                          <div onClick={onChangeQuantity('decrease', item)} className='h-6 w-6 bg-gray-200 flex justify-center items-center cursor-pointer'>-</div>
                          <div className='h-6 w-6 bg-gray-300 flex justify-center items-center'>{item?.SoLuong}</div>
                          <div onClick={onChangeQuantity('increase', item)} className='h-6 w-6 bg-gray-200 flex justify-center items-center cursor-pointer'>+</div>
                        </div>
                      </div>
                    </div>
                    <p>{item?.MoTaKhuyeMai}</p>
                  </div>
                </div>
              );
            })}




          </div>

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
            <div className='w-full bg-gray-800 h-14 flex justify-center items-center uppercase font-medium text-white cursor-pointer'>
            <Link to='/thanhtoan' className='w-full h-full text-center p-4'>
                   Thanh Toán
                    </Link>
            </div>
          </div>
        </div>
      </div>


    </div >
  );
}

export default App;
