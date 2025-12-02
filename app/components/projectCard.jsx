import OptimizedImage from "./optimizedImage";
import Link from "next/link";

export default function ProjectCard({id, title, subtitle, date, image, location, description}) {
  return (
    <Link href={`/projects/${id}`} className="projects__grid__card">
    <div className="projects__grid__card__cover">
    <OptimizedImage alt="" src={image} objectFit="cover" layout="fill" />
      <div className="projects__grid__card__cover__info">
        <div className="projects__grid__card__cover__info__title">
          {location || title}
        </div>
        <div className="projects__grid__card__cover__info__body">
          {description || "Contact us for more details about this listing."}
        </div>
      </div>
    </div>

    <div className="projects__grid__card__title">
      {title}
    </div>
    <div className="projects__grid__card__subtitle">
      {subtitle}
    </div>
    <div className="projects__grid__card__date">
      {date}
    </div>
  </Link>
  );
}
