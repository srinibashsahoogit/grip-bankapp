// Import necessary dependencies and styles
import { useState, useEffect } from "react"
import axios from 'axios';
import Navbar from './components/Navbar';
import CustomerCard from './components/CustomerCard';
import ReviewSection from './components/ReviewSection';
import HowItWorksSection from './components/HowItWorksSection';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  const [serviceImages, setServiceImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(
          'https://api.unsplash.com/photos/random',
          {
            params: {
              query: 'finance',
              count: 3,
              client_id: 'YOUR_UNSPLASH_ACCESS_KEY',
            },
          }
        );

        const images = response.data.map((photo) => photo.urls.regular);
        setServiceImages(images);
      } catch (error) {
        console.error('Error fetching images from Unsplash:', error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className='app min-h-screen flex flex-col'>
      <Navbar />

      <main className='flex-1'>
        <header className='hero  text- text-center py-16'>
          <h1 className='text-4xl font-bold'>Welcome to Our Bank</h1>
        </header>

        <section className='about bg-gray-100 py-12'>
          <div className='container mx-auto text-center'>
            <h2 className='text-3xl font-semibold mb-4'>About Our Bank</h2>
            <p className='text-gray-700'>
              We offer secure and reliable banking services to meet your financial needs.
              Our commitment is to provide the best customer experience and financial
              solutions tailored to your requirements.
            </p>
          </div>
        </section>

        <section className='customers py-12'>
          <div className='container mx-auto'>
            <h2 className='text-3xl font-semibold mb-4'>Our Valued Customers</h2>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
              <CustomerCard name='Customer 1' />
              <CustomerCard name='Customer 2' />
              <CustomerCard name='Customer 3' />
            </div>
          </div>
        </section>

        <section className='reviews bg-gray-100 py-12'>
          <div className='container mx-auto text-center'>
            <h2 className='text-3xl font-semibold mb-4'>Customer Reviews</h2>
            <ReviewSection />
          </div>
        </section>

        <section className='how-it-works py-12'>
          <div className='container mx-auto text-center'>
            <h2 className='text-3xl font-semibold mb-4'>How It Works</h2>
            <HowItWorksSection />
          </div>
        </section>

        <section className='services py-12'>
          <div className='container mx-auto text-center'>
            <h2 className='text-3xl font-semibold mb-4'>Explore More with Our Services</h2>
            <p className='text-gray-700'>
              Discover a wide range of financial services and products designed to meet your
              unique needs.
            </p>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mt-8'>
              {serviceImages.map((imageUrl, index) => (
                <div
                  className='bg-white shadow-lg rounded-md overflow-hidden'
                  key={index}
                >
                  <img
                    src={imageUrl}
                    alt={`Service ${index + 1}`}
                    className='w-full h-40 object-cover'
                  />
                  <div className='p-4'>
                    <h3 className='text-xl font-semibold mb-2'>Service {index + 1}</h3>
                    <p className='text-gray-700'>
                      Your service description goes here.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

    </div>
  );
}

export default App;
