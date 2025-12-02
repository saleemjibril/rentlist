"use client";
import { useState, useEffect, useRef } from "react";
import OptimizedImage from "./optimizedImage";
import Link from "next/link";

export default function RotatingImageItem({ images, columnIndex = 0, project }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (images.length <= 1) return;

    // Stagger based on column index (items in the same column change together)
    // Each column starts 0.5 seconds after the previous column
    const initialDelay = columnIndex * 500;

    const timeout = setTimeout(() => {
      // Start the rotation after the initial delay
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);

      // Then set up the interval to continue rotating every 2 seconds
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 2000);
    }, initialDelay);

    return () => {
      clearTimeout(timeout);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [images.length, columnIndex]);

  const content = (
    <div className="home__hero__grid__item">
      <div className="home__hero__grid__item__image-container">
        {images.map((image, imgIndex) => (
          <div
            key={imgIndex}
            className={`home__hero__grid__item__image ${
              imgIndex === currentIndex ? "active" : ""
            }`}
          >
            <OptimizedImage src={image} objectFit="cover" layout="fill" />
          </div>
        ))}
        {project && (
          <div className="home__hero__grid__item__info">
            <div className="home__hero__grid__item__info__title">
              {project.location || project.title}
            </div>
            <div className="home__hero__grid__item__info__body">
              {project.description || "Contact us for more details about this listing."}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  if (project?.id) {
    return (
      <Link href={`/projects/${project.id}`}>
        {content}
      </Link>
    );
  }

  return content;
}
