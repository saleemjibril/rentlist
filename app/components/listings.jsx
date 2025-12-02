"use client";
import Image from "next/image";
import ListingCard from "./listingCard";
import Link from "next/link";
import { getFeaturedListings } from "../utils/listings";
import { useEffect, useRef } from "react";

export default function ListingsComponent() {
  const sliderRef = useRef(null);
  const featuredListings = getFeaturedListings();

  const scrollLeft = () => {
    if (sliderRef.current) {
      const cardWidth = sliderRef.current.querySelector(".listing-card")?.offsetWidth || 340;
      sliderRef.current.scrollLeft -= cardWidth + 24;
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      const cardWidth = sliderRef.current.querySelector(".listing-card")?.offsetWidth || 340;
      sliderRef.current.scrollLeft += cardWidth + 24;
    }
  };

  return (
    <section className="featured-listings" id="listings">
      <div className="featured-listings__header">
        <div className="featured-listings__header__text">
          <h2 className="featured-listings__header__title">Featured Properties</h2>
          <p className="featured-listings__header__subtitle">
            Discover our hand-picked selection of premium properties
          </p>
        </div>

        <div className="featured-listings__header__actions">
          <Link href="/listings" className="featured-listings__header__link">
            View All Listings →
          </Link>
          
          <div className="featured-listings__header__buttons">
            <button onClick={scrollLeft} className="featured-listings__header__btn" aria-label="Previous">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6"></path>
              </svg>
            </button>
            <button onClick={scrollRight} className="featured-listings__header__btn" aria-label="Next">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="featured-listings__slider" ref={sliderRef}>
        {featuredListings.map((listing) => (
          <ListingCard listing={listing} key={listing.id} />
        ))}
      </div>
    </section>
  );
}

