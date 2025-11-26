import { useState, useEffect } from "react";
import Img01 from "../assets/images/velho01.png";
import Img02 from "../assets/images/velho02.png";
import Img03 from "../assets/images/velho03.png";
import Img04 from "../assets/images/velho04.png";
import Img05 from "../assets/images/velho05.png";

import Img01_v from "../assets/images/velho01_v.png";
import Img02_v from "../assets/images/velho02_v.png";
import Img03_v from "../assets/images/velho03_v.png";
import Img04_v from "../assets/images/velho04_v.png";
import Img05_v from "../assets/images/velho05_v.png";

export default function Carousel() {
    const images = [Img01, Img02, Img03, Img04, Img05];
    const images_v = [Img01_v, Img02_v, Img03_v, Img04_v, Img05_v];

    const [index, setIndex] = useState(0);
    const [index_v, setIndex_v] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % images.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [images.length]);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex_v((prev) => (prev + 1) % images_v.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [images_v.length]);

    return (
        <div
            style={{
                width: "100%",
                height: "350px",
                overflow: "hidden",
                position: "relative",
                borderRadius: "10px",
            }}
        >
            {images.map((img, i) => (
                <>
  {/* Desktop */}
  <img
    className="hidden lg:block"
    key={`desk-${i}`}
    src={img}
    alt={`slide-${i}`}
    style={{
      position: "absolute",
      width: "100%",
      height: "100%",
      objectFit: "contain",
      opacity: index === i ? 1 : 0,
      transition: "opacity 1s ease-in-out",
    }}
  />

  {/* Mobile */}
  <img
    className="block lg:hidden"
    key={`mob-${i}`}
    src={images_v[i]}
    alt={`slide-v-${i}`}
    style={{
      position: "absolute",
      width: "100%",
      height: "100%",
      objectFit: "contain",
      opacity: index_v === i ? 1 : 0,
      transition: "opacity 1s ease-in-out",
    }}
  />
</>

            ))}
        </div>
    );
}
