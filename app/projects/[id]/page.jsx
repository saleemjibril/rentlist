"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import Header from "@/app/components/header";
import OptimizedImage from "@/app/components/optimizedImage";
import projects, { getListingById } from "@/app/utils/projects";
import Link from "next/link";

export default function ListingDetails() {
  const params = useParams();
  const listing = getListingById(params.id);
  const [selectedImage, setSelectedImage] = useState(0);
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    message: "",
  });

  if (!listing) {
    return (
      <>
        <Header dark={true} />
        <main className="listing-detail">
          <div className="listing-detail__not-found">
            <h1>Listing Not Found</h1>
            <p>The listing you're looking for doesn't exist.</p>
            <Link href="/projects" className="listing-detail__back-btn">
              ← Back to Listings
            </Link>
          </div>
        </main>
      </>
    );
  }

  // Use images array if available, otherwise fallback to single image
  const images = listing.images || [listing.image];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would send data to a backend
    console.log("Booking submitted:", formData);
    setBookingSubmitted(true);
  };

  const handlePrevImage = () => {
    setSelectedImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setSelectedImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      <Header dark={true} />
      <main className="listing-detail">
        <div className="listing-detail__breadcrumb">
          <Link href="/">Home</Link> / <Link href="/projects">Listings</Link> /{" "}
          <span>{listing.title}</span>
        </div>

        <div className="listing-detail__content">
          <div className="listing-detail__main">
            {/* Image Gallery */}
            <div className="listing-detail__gallery">
              <div className="listing-detail__gallery__main">
                <OptimizedImage
                  src={images[selectedImage]}
                  alt={`${listing.title} - Image ${selectedImage + 1}`}
                  objectFit="cover"
                  layout="fill"
                />
                <div className="listing-detail__gallery__badge">
                  {listing.type === "rent" ? "For Rent" : "For Sale"}
                </div>
                
                {/* Navigation Arrows */}
                {images.length > 1 && (
                  <>
                    <button 
                      className="listing-detail__gallery__nav listing-detail__gallery__nav--prev"
                      onClick={handlePrevImage}
                      aria-label="Previous image"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M15 18l-6-6 6-6"></path>
                      </svg>
                    </button>
                    <button 
                      className="listing-detail__gallery__nav listing-detail__gallery__nav--next"
                      onClick={handleNextImage}
                      aria-label="Next image"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 18l6-6-6-6"></path>
                      </svg>
                    </button>
                  </>
                )}

                {/* Image Counter */}
                <div className="listing-detail__gallery__counter">
                  {selectedImage + 1} / {images.length}
                </div>
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="listing-detail__gallery__thumbs">
                  {images.map((img, index) => (
                    <button
                      key={index}
                      className={`listing-detail__gallery__thumb ${selectedImage === index ? "active" : ""}`}
                      onClick={() => setSelectedImage(index)}
                    >
                      <OptimizedImage
                        src={img}
                        alt={`${listing.title} - Thumbnail ${index + 1}`}
                        objectFit="cover"
                        layout="fill"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="listing-detail__info">
              <div className="listing-detail__category">{listing.subtitle}</div>
              <h1 className="listing-detail__title">{listing.title}</h1>
              <div className="listing-detail__location">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                {listing.location}
              </div>
              <div className="listing-detail__price">{listing.date}</div>

              <div className="listing-detail__size">
                <strong>Size:</strong> {listing.size}
              </div>

              <div className="listing-detail__description">
                <h3>Description</h3>
                <p>{listing.fullDescription}</p>
              </div>

              <div className="listing-detail__features">
                <h3>Features & Amenities</h3>
                <ul>
                  {listing.features?.map((feature, index) => (
                    <li key={index}>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#2D8E95"
                        strokeWidth="2"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="listing-detail__sidebar">
            <div className="listing-detail__booking">
              <h3>Schedule an Inspection</h3>
              <p>Book a convenient time to visit and inspect this property.</p>

              {bookingSubmitted ? (
                <div className="listing-detail__booking__success">
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#2D8E95"
                    strokeWidth="2"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <h4>Booking Request Sent!</h4>
                  <p>
                    Thank you for your interest. Our team will contact you
                    shortly to confirm your inspection appointment.
                  </p>
                  <button
                    onClick={() => {
                      setBookingSubmitted(false);
                      setFormData({
                        name: "",
                        email: "",
                        phone: "",
                        date: "",
                        time: "",
                        message: "",
                      });
                    }}
                  >
                    Book Another Inspection
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Full Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email Address"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Your Phone Number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                  <div className="listing-detail__booking__row">
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      required
                    />
                    <select
                      name="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Time</option>
                      <option value="09:00">9:00 AM</option>
                      <option value="10:00">10:00 AM</option>
                      <option value="11:00">11:00 AM</option>
                      <option value="12:00">12:00 PM</option>
                      <option value="14:00">2:00 PM</option>
                      <option value="15:00">3:00 PM</option>
                      <option value="16:00">4:00 PM</option>
                    </select>
                  </div>
                  <textarea
                    name="message"
                    placeholder="Any questions or special requests? (Optional)"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                  ></textarea>
                  <button type="submit">Request Inspection</button>
                </form>
              )}
            </div>

            <div className="listing-detail__contact">
              <h4>Have Questions?</h4>
              <p>Contact our team for more information about this property.</p>
              <a href="tel:+234800RENTLIST" className="listing-detail__contact__phone">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                +234 800 RENTLIST
              </a>
            </div>
          </div>
        </div>

        <Link href="/projects" className="listing-detail__back-btn">
          ← Back to All Listings
        </Link>
      </main>
    </>
  );
}
