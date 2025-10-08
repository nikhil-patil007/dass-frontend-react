import { useEffect, useState } from "react";

export default function Home() {
  // Dummy image URLs simulating DB fetch
  const [images, setImages] = useState([]);

  useEffect(() => {
    async function fetchImages() {
      let allImages = [];
      for (let page = 1; page <= 10; page++) {
        const response = await fetch(
          `https://picsum.photos/v2/list?page=${page}&limit=30`
        );
        const data = await response.json();
        // Extract only the download URLs
        const urls = data.map((img) => img.download_url);
        console.log("🚀 ~ fetchImages ~ urls:", urls);
        allImages = allImages.concat(urls);
      }
      setImages(allImages); // update state after fetching all images
    }

    fetchImages();
  }, []);

  return (
    <div className="home-container">
      {images.map((img, index) => (
        <div className="image-item" key={index}>
          <img src={img} alt={`img-${index}`} />
          <p>img: {index}</p>
        </div>
      ))}
    </div>
  );
}
