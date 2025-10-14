import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "../assets/styles/popup.css";

export default function ProductPopup({ product, onClose }) {
    if (!product) return null;

    return (
        <div className="popup-overlay" onClick={onClose}>
            <div
                className="popup-container"
                onClick={(e) => e.stopPropagation()} // prevent overlay click
            >
                <div className="popup-close" onClick={onClose}>
                    <span></span>
                    <span></span>
                </div>
                <h2 className="product-name">{product.name}</h2>
                <Swiper
                    direction="vertical"   // <-- make Swiper vertical
                    spaceBetween={20}
                    slidesPerView={1}
                >
                    <SwiperSlide>
                        <div className="swiper_image">
                            <img src={product.image} alt={product.name} />
                        </div>
                    </SwiperSlide>
                    {product.images &&
                        product.images.map((img, idx) => (
                            <SwiperSlide key={idx}>
                                <div className="swiper_image">
                                    <img src={img} alt={`${product.name} ${idx}`} />
                                </div>
                            </SwiperSlide>
                        ))}
                </Swiper>
            </div>
        </div>
    );
}
