"use client";
import { useParams } from "next/navigation";
import ProjectCard from "@/app/components/projectCard";
import { categories, getListingsByCategory } from "@/app/utils/projects";
import Header from "@/app/components/header";
import Link from "next/link";

export default function CategoryPage() {
  const params = useParams();
  const categoryId = params.id;
  const category = categories.find((cat) => cat.id === categoryId);
  const filteredListings = getListingsByCategory(categoryId);

  if (!category) {
    return (
      <>
        <Header dark={true} />
        <main className="projects">
          <div className="projects__title">Category Not Found</div>
          <div style={{ textAlign: "center", padding: "40px 20px" }}>
            <p>The category you're looking for doesn't exist.</p>
            <Link href="/projects" style={{ color: "#2D8E95", textDecoration: "underline" }}>
              ← Back to All Listings
            </Link>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Header dark={true} />
      <main className="projects">
        <div className="projects__breadcrumb">
          <Link href="/">Home</Link> / <Link href="/projects">Listings</Link> /{" "}
          <span>{category.label}</span>
        </div>

        <div className="projects__title">{category.label.toUpperCase()}</div>

        <div className="projects__count">
          Showing <strong>{filteredListings.length}</strong>{" "}
          {filteredListings.length === 1 ? "property" : "properties"} in this category
        </div>

        {filteredListings.length > 0 ? (
          <div className="projects__grid">
            {filteredListings.map((project, index) => (
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
        ) : (
          <div className="projects__empty">
            <p>No listings found in this category.</p>
            <Link href="/projects" style={{ color: "#2D8E95", textDecoration: "underline" }}>
              View All Listings
            </Link>
          </div>
        )}
      </main>
    </>
  );
}

