"use client";
import { useState } from "react";
import ProjectCard from "@/app/components/projectCard";
import projects, { categories, getListingsByCategory } from "../utils/projects";
import Header from "../components/header";
import Link from "next/link";

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("all");
  const filteredListings = getListingsByCategory(activeCategory);

  return (
    <>
      <Header dark={true} />
      <main className="projects">
        <div className="projects__title">LISTINGS</div>

        <div className="projects__categories">
          <button
            className={`projects__categories__btn ${activeCategory === "all" ? "active" : ""}`}
            onClick={() => setActiveCategory("all")}
          >
            All Listings
          </button>
          {categories
            .filter((cat) => cat.id !== "all")
            .map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.id}`}
                className="projects__categories__btn"
              >
                {category.label}
              </Link>
            ))}
        </div>

        <div className="projects__grid">
          {filteredListings?.map((project, index) => (
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
      </main>
    </>
  );
}
