"use client";
import Image from "next/image";
import ProjectCard from "./projectCard";
import Link from "next/link";
import projects from "../utils/projects";
import { useEffect } from "react";

export default function ProjectsComponent() {
  useEffect(() => {
    const musicNextBtn = document.querySelector(
      ".projects__slide-buttons__right"
    );
    const musicPrevBtn = document.querySelector(
      ".projects__slide-buttons__left"
    );
    const musicSlider = document.querySelector(".projects__slide");
    const musicSliderItem = document.querySelector(".projects__grid__card");

    let musicSliderItemDimensions = musicSliderItem.getBoundingClientRect();
    let amountToSlideMusic =
      window.innerWidth <= 768
        ? musicSliderItemDimensions.width
        : musicSliderItemDimensions.width * 2;

    musicNextBtn.addEventListener("click", () => {
      musicSlider.scrollLeft += amountToSlideMusic;
    });

    musicPrevBtn.addEventListener("click", () => {
      musicSlider.scrollLeft -= amountToSlideMusic;
    });
  }, []);

  return (
    <>
      <div className="projects__title-group">
        <Link href="/projects" prefetch={true}>
          FEATURED LISTINGS
        </Link>

        <div className="projects__slide-buttons">
          <Image
            alt=""
            className="projects__slide-buttons__left"
            src="/assets/icons/left-arrow.svg"
            width={60}
            height={60}
          />
          <Image
            alt=""
            className="projects__slide-buttons__right"
            src="/assets/icons/right-arrow.svg"
            width={60}
            height={60}
          />
        </div>
      </div>
      {/* <div className="projects__actions">
          <div></div>
          <div>See all projects <span>{">"}</span></div>
        </div> */}

      <div className="projects__slide">
        {projects?.map((project, index) => (
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
    </>
  );
}
