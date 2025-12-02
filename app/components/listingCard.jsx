"use client";
import OptimizedImage from "./optimizedImage";
import { formatPrice, categories } from "../utils/listings";

export default function ListingCard({ listing }) {
  const {
    title,
    category,
    location,
    price,
    currency,
    type,
    period,
    bedrooms,
    bathrooms,
    size,
    image,
    description,
  } = listing;

  const categoryInfo = categories.find((c) => c.id === category);

  return (
    <div className="listing-card">
      <div className="listing-card__cover">
        <OptimizedImage alt={title} src={image} objectFit="cover" layout="fill" />
        
        <div className="listing-card__cover__badge">
          {type === "rent" ? "For Rent" : "For Sale"}
        </div>
        
        <div className="listing-card__cover__category">
          {categoryInfo?.icon} {categoryInfo?.label}
        </div>

        <div className="listing-card__cover__info">
          <div className="listing-card__cover__info__title">{title}</div>
          <div className="listing-card__cover__info__body">{description}</div>
        </div>
      </div>

      <div className="listing-card__content">
        <div className="listing-card__price">
          {formatPrice(price, currency)}
          {period && <span className="listing-card__price__period">/{period.replace("per ", "")}</span>}
        </div>

        <div className="listing-card__title">{title}</div>
        
        <div className="listing-card__location">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          {location}
        </div>

        <div className="listing-card__details">
          {bedrooms && (
            <div className="listing-card__details__item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 7v11a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V7"></path>
                <path d="M21 7V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v3"></path>
                <path d="M3 11h18"></path>
              </svg>
              {bedrooms} Beds
            </div>
          )}
          {bathrooms && (
            <div className="listing-card__details__item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 12h16a1 1 0 0 1 1 1v3a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-3a1 1 0 0 1 1-1z"></path>
                <path d="M6 12V5a2 2 0 0 1 2-2h2.5"></path>
                <circle cx="12" cy="5" r="2"></circle>
              </svg>
              {bathrooms} Baths
            </div>
          )}
          {size && (
            <div className="listing-card__details__item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              </svg>
              {size}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

