import React, { useContext, useState } from "react";
import { Image, Carousel } from "react-bootstrap";

import { ThemeContext } from "../../contexts/ThemeContext";

const PromotionalCarousel = () => {
    const [promotionalSlides] = useState([
        `https://picsum.photos/id/${Math.floor(Math.random() * 1000)}/800`,
        `https://picsum.photos/id/${Math.floor(Math.random() * 1000)}/800`,
        `https://picsum.photos/id/${Math.floor(Math.random() * 1000)}/800`,
        `https://picsum.photos/id/${Math.floor(Math.random() * 1000)}/800`,
        `https://picsum.photos/id/${Math.floor(Math.random() * 1000)}/800`,
        `https://picsum.photos/id/${Math.floor(Math.random() * 1000)}/800`,
        `https://picsum.photos/id/${Math.floor(Math.random() * 1000)}/800`,
        `https://picsum.photos/id/${Math.floor(Math.random() * 1000)}/800`,
    ]);

    // Themes
    const { isLightTheme, theme } = useContext(ThemeContext);
    const border = isLightTheme ? theme.light.border : theme.dark.border;

    return (
        <div className={"card mb-5" + border}>
            <Carousel>
                {promotionalSlides.map((promotionalSlide, index) => (
                    <Carousel.Item key={index}>
                        <Image
                            alt="slide"
                            className="d-block w-100"
                            style={{ maxHeight: "13rem" }}
                            src={promotionalSlide}
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "/img/profile_pic_default.png";
                            }}
                        />
                    </Carousel.Item>
                ))}
            </Carousel>
        </div>
    );
};

export default PromotionalCarousel;
