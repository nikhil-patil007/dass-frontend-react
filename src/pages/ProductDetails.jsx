import { useParams } from "react-router-dom";

export default function ProductDetails() {
  const { slug } = useParams();
  return <>
    <div className="">
      <div className="page-title">
        <h2>Product Details Page - Product Slug: {slug}</h2>
      </div>
    </div>
  </>;
}
