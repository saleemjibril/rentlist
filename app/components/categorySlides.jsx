"use client";
import Image from "next/image";
import ProjectCard from "./projectCard";
import Link from "next/link";
import { categories, getListingsByCategory } from "../utils/projects";
import { useEffect } from "react";

export default function CategorySlides() {
  useEffect(() => {
    const cleanupFunctions = [];

    categories
      .filter((cat) => cat.id !== "all")
      .forEach((category) => {
        const categoryId = category.id;
        const nextBtn = document.querySelector(
          `.category-slide__buttons__right[data-category="${categoryId}"]`
        );
        const prevBtn = document.querySelector(
          `.category-slide__buttons__left[data-category="${categoryId}"]`
        );
        const slider = document.querySelector(
          `.category-slide[data-category="${categoryId}"]`
        );
        const sliderItem = slider?.querySelector(".projects__grid__card");

        if (nextBtn && prevBtn && slider && sliderItem) {
          let itemDimensions = sliderItem.getBoundingClientRect();
          let amountToSlide =
            window.innerWidth <= 768
              ? itemDimensions.width
              : itemDimensions.width * 2;

          const handleNext = () => {
            slider.scrollLeft += amountToSlide;
          };

          const handlePrev = () => {
            slider.scrollLeft -= amountToSlide;
          };

          nextBtn.addEventListener("click", handleNext);
          prevBtn.addEventListener("click", handlePrev);

          cleanupFunctions.push(() => {
            nextBtn.removeEventListener("click", handleNext);
            prevBtn.removeEventListener("click", handlePrev);
          });
        }
      });

    return () => {
      cleanupFunctions.forEach((cleanup) => cleanup());
    };
  }, []);

  return (
    <>
      {categories
        .filter((cat) => cat.id !== "all")
        .map((category) => {
          const listings = getListingsByCategory(category.id);
          
          // Only show category if it has listings
          if (listings.length === 0) return null;

          return (
            <section key={category.id} className="category-slide-section">
              <div className="category-slide__title-group">
                <Link href={`/category/${category.id}`} prefetch={true}>
                  {category.label.toUpperCase()}
                </Link>

                <div className="category-slide__buttons">
                  <Image
                    alt=""
                    className="category-slide__buttons__left"
                    data-category={category.id}
                    src="/assets/icons/left-arrow.svg"
                    width={60}
                    height={60}
                  />
                  <Image
                    alt=""
                    className="category-slide__buttons__right"
                    data-category={category.id}
                    src="/assets/icons/right-arrow.svg"
                    width={60}
                    height={60}
                  />
                </div>
              </div>

              <div
                className="category-slide projects__slide"
                data-category={category.id}
              >
                {listings.map((project, index) => (
                  <ProjectCard
                    id={project?.id}
                    title={project?.title}
                    subtitle={project?.subtitle}
                    date={project?.date}
                    image={project?.image}
                    location={project?.location}
                    description={project?.description}
                    key={index}
                  />
                ))}
              </div>
            </section>
          );
        })}
    </>
  );
}
