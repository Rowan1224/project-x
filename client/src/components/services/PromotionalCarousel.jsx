import React, { useContext, useState } from "react";
import { Carousel } from "react-bootstrap";

import { ThemeContext } from "../../contexts/ThemeContext";

const PromotionalCarousel = () => {
    const [promotionalSlides] = useState([
        // `https://picsum.photos/id/${Math.floor(Math.random() * 1000)}/800`,
        // `https://picsum.photos/id/${Math.floor(Math.random() * 1000)}/800`,
        // `https://picsum.photos/id/${Math.floor(Math.random() * 1000)}/800`,
        // `https://picsum.photos/id/${Math.floor(Math.random() * 1000)}/800`,
        // `https://picsum.photos/id/${Math.floor(Math.random() * 1000)}/800`,
        // `https://picsum.photos/id/${Math.floor(Math.random() * 1000)}/800`,
        // `https://picsum.photos/id/${Math.floor(Math.random() * 1000)}/800`,
        // `https://picsum.photos/id/${Math.floor(Math.random() * 1000)}/800`,
        "/img/promotional_default.jpg",
        "/img/promotional_default2.jpg",
        "/img/promotional_default3.jpg",
        "/img/promotional_default4.jpg",
    ]);

    // Themes
    const { isLightTheme, theme } = useContext(ThemeContext);
    const border = isLightTheme ? theme.light.border : theme.dark.border;

    return (
        <div className={"card mb-5" + border}>
            <Carousel>
                {promotionalSlides.map((promotionalSlide, index) => (
                    <Carousel.Item key={index}>
                        <img
                            alt="slide"
                            className="d-block w-100"
                            style={{ maxHeight: "13rem" }}
                            src={promotionalSlide}
                            // onError={(e) => {
                            //     e.target.onerror = null;
                            //     e.target.src = "/img/promotional_default.jpg";
                            // }}
                        />
                    </Carousel.Item>
                ))}
            </Carousel>
        </div>
    );
};

export default PromotionalCarousel;
