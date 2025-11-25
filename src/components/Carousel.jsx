import { useState, useEffect } from "react";
import Img01 from "../assets/images/velho01.png";
import Img02 from "../assets/images/velho02.png";
import Img03 from "../assets/images/velho03.png";
import Img04 from "../assets/images/velho04.png";
import Img05 from "../assets/images/velho05.png";

export default function Carousel() {
  const images = [Img01, Img02, Img03, Img04, Img05];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div
      style={{
        width: "100%",
        height: "550px",
        overflow: "hidden",
        position: "relative",
        borderRadius: "10px",
      }}
    >
      {images.map((img, i) => (
        <img
          key={i}
          src={img}
          alt={`slide-${i}`}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: index === i ? 1 : 0,
            transition: "opacity 1s ease-in-out",
          }}
        />
      ))}
    </div>
  );
}
