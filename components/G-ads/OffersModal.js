import React, { useState, useRef } from "react";
import { Modal, Box, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Navigation} from 'swiper';
import Style from "../styles/g-ads/offers-modal.module.css";
import PricingCard from "./Cards/PricingCard";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import Cookies from 'js-cookie';

function OffersModal({ open, setOpen }) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const swiperRef = useRef(null);

    let token = Cookies.get('id_token')

    const handlePost = async (planId) => {
        let payload = {
            user_id: token,
            payment_id: 'GA-yhamid',
            type: 'gads'
        };

        if (planId === 0) {
            payload.plan = 'silver';
        } else if (planId === 1) {
            payload.plan = 'gold';
        } else if (planId === 2) {
            payload.plan = 'diamond';
        }


        console.log("📦 Payload to send:", payload);

        // try {
        //     const response = await axios.post("https://api.boomlex.ir/api/payment", payload);
        //     console.log("Sent:", response.data);
        // } catch (error) {
        //     console.error("Error:", error);
        // }
    };

    const handleFinish = () => {
        setOpen(false);
    };

    if (!open) return null;

    return (
        <div className={Style["intro-overlay"]}>
            <IconButton
                onClick={handleFinish}
                aria-label="بستن"
                sx={{
                    position: "absolute",
                    top: 10,
                    left: 35,
                    color: "error.main",
                    backgroundColor: "background.paper",
                    "&:hover": { backgroundColor: "error.light" },
                    zIndex: 50,
                }}
                size="small"
            >
                <CloseIcon fontSize="small" />
            </IconButton>

            <Swiper
                initialSlide={0}
                dir="rtl"
                slidesPerView={1.3}
                spaceBetween={30}
                centeredSlides={true}
                onSwiper={(swiper) => { swiperRef.current = swiper; }}
                onSlideChange={(swiper) => setCurrentSlide(swiper.activeIndex)}
                watchOverflow={true}
                breakpoints={{
                    200: {
                        slidesPerView: 1.3,
                        spaceBetween: 25,
                    },
                    580: {
                        slidesPerView: 2.2,
                        spaceBetween: 20,
                    },
                    900: {
                        slidesPerView: 3,
                        spaceBetween: 5,
                        initialSlide: 1,
                    },
                    1400: {
                        slidesPerView: 3,
                        spaceBetween: 5,
                        initialSlide: 1,
                    },
                }}
            >

                {/* Silver Service */}
                <SwiperSlide>
                    <PricingCard
                        type="سرویس نقره ای"
                        price="10,000,000"
                        description="مناسب برای شروع"
                        buttonText="خرید سرویس نقره‌ای"
                        onButtonClick={() => handlePost(0)}
                        features={[
                            { label: "میانگین تعداد بازدید", value: 200 },
                            { label: "میانگین تعداد تماس", value: 20 },
                            { label: "تعداد کلمات کلیدی", value: 1 },
                            { label: "قابلیت بازگشت پول", value: "تا یک هفته" },
                            { label: "پشتیبانی 24 ساعته", value: false },
                            { label: "مشاوره اختصاصی", value: false },
                        ]}
                    />
                </SwiperSlide>

                {/* Gold Service */}
                <SwiperSlide>
                    <PricingCard
                        type="سرویس طلایی"
                        originalPrice="20,000,000"
                        price="18,000,000"
                        description="پیشنهاد بوملکس"
                        buttonText="خرید سرویس طلایی"
                        onButtonClick={() => handlePost(1)}
                        features={[
                            { label: "میانگین تعداد بازدید", value: 500 },
                            { label: "میانگین تعداد تماس", value: 50 },
                            { label: "تعداد کلمات کلیدی", value: 3 },
                            { label: "قابلیت بازگشت پول", value: "تا دو هفته" },
                            { label: "پشتیبانی 24 ساعته", value: true },
                            { label: "مشاوره اختصاصی", value: false },
                        ]}
                    />
                </SwiperSlide>

                {/* Diamond Service */}
                <SwiperSlide>
                    <PricingCard
                        type="سرویس الماس"
                        price="30,000,000"
                        description="برای حرفه‌ای ها"
                        buttonText="خرید سرویس الماس"
                        onButtonClick={() => handlePost(2)}
                        features={[
                            { label: "میانگین تعداد بازدید", value: 1500 },
                            { label: "میانگین تعداد تماس", value: 120 },
                            { label: "تعداد کلمات کلیدی", value: 5 },
                            { label: "قابلیت بازگشت پول", value: "تا دو هفته" },
                            { label: "پشتیبانی 24 ساعته", value: true },
                            { label: "مشاوره اختصاصی", value: true },
                        ]}
                    />
                </SwiperSlide>
            </Swiper>
        </div>
    );
}

export default OffersModal;
