import '../App.scss';
import {
  FaSearch,
  FaUser,
  FaHeart,
  FaShoppingCart,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useParams } from 'react-router-dom';
import { FiLogOut } from "react-icons/fi";
import { products } from '../fakeData';
import Header from '../components/Header';
import { addProduct } from '../store/productSlice';

const sizeList = [40, 41, 42, 43];

function App({ match }) {
  const location = useParams();
  const dispatch = useDispatch();
  const [productItem, setProductItem] = useState([]);
  const [size, setSize] = useState();

  useEffect(() => {
    const callApi = async () => {
      const result = await axios.get(`http://localhost:3000/sp/${location?.id}`);
      console.log(result.data);
      setProductItem(result.data.data);
    };
    callApi();
  }, []);

  const onSelectSize = (size) => () => {
    setSize(size);
  };

  const onAddProduct = (product) => () => {
    dispatch(addProduct({ ...product, quantity: 1, size: size }));
  };

  return (
    <div>
      {/* header */}
      <Header />

      {/* product detail */}
      <div>
        <div className='flex flex-row mt-14 mb-8'>
          <div className='w-1/2'>
            <img src={`http://localhost:3000/Image/${productItem[0]?.Anh}`} alt={'shoes'} className='object-cover w-full' style={{ height: 700}} />
          </div>
          <div className='w-1/2 px-8'>
            <div className='bg-gray-800 inline-block p-2 px-6 text-white font-bold'>MEN</div>
            <div className='text-4xl font-bold my-1'>{productItem[0]?.TenSP}</div>
           
           
            <div>Price: {productItem[0]?.GiaBan} VND</div>
            <div className='my-2 border-dashed border-y-2  border-gray-500 py-4 w-full'>
            <textarea value={productItem[0]?.MoTaKhuyeMai} className='w-full' style={{height: `350px`}} disabled></textarea>
            </div>
            <div className='flex flex-row items-center'>
              
             
            </div>
            <div className='flex flex-row mt-4'>
              <div onClick={onAddProduct(productItem)} className='w-1/2 bg-gray-800 h-11 flex justify-center items-center uppercase font-medium text-white cursor-pointer'>
                Mua ngay
              </div>
              
            </div>
          </div>
        </div>

       

      </div>


    </div >
  );
}

export default App;
