import { useState } from 'react';
import './App.css'
import Carousel from './components/Carousel'
import { useEffect } from 'react';

/*
Build a Highly Scalable Carousel Component in React JS.
Requirements:
  - We want to create a carousel component which takes array of images as input.
  - The component should efficiently handle a large number of images while maintaining scalability, performance optimizations, and extensibility.
  - Provide callback functions for events like image click, enabling users to define custom behavior.
  - Focus on Accessibility.
*/
function App() {
  // https://jsonplaceholder.typicode.com/photos?_limit=8
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false)
  const fetchImages = async (limit) => {
    setLoading(true);
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/photos?_limit=${limit}`)
      const data = await response.json();
      setImages(data);
    } catch (error) {
      console.error("Error while fetching images", error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchImages(8);
  }, [])

  return (
    <div className='carousel-container'>
      <h1>Carousel Component</h1>
      <Carousel
        isLoading={loading}
        images={images}
        imageClick={(image, index) => { console.log("Image Clicked", image, index) }}
        imageLimit={1}
      />
    </div>
  )
}

export default App
