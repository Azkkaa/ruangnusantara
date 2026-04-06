import { useEffect, useState } from 'react';
import MenuItem from '../components/MenuItem';
import axios from 'axios';
import Loading from '../components/Loading';

const MenuPage = () => {
  const [error, setError] = useState(false);
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    const handleRequest = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/menus')
        setDatas(res.data.resources)
      } catch (err) {
        setError(true)

        // condition where server give error response
        if (err.response) {
          setDatas(err.response)
        }

        // condition where server doesn't give anything
        // or server down
        // ---write here---
      }
    }

    handleRequest()
  }, [])

  // -- error page temporary --
  if (error) return (
    <main>
      <div className='mt-50 text-center'>
        <p className='text-red-600 font-bold text-3xl'>
          Error Code {datas.status}
        </p>
      </div>
    </main>
  )

  if (datas <= 0) return (
    <main className='mt-30'>
      <Loading size={50}/>
    </main>
  )

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Our Menu</h1>
          <p className="text-gray-600">Choose your favorite Indonesian dishes</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {datas.map(item => (
            <MenuItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default MenuPage;
