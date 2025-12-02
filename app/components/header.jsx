"use client";
import Link from "next/link";
import { useEffect, useState, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Image from "next/image";

// Separate the part that uses useSearchParams into its own component
function HeaderContent({ dark, pathname }) {
  const searchParams = useSearchParams();
  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector("header");
      if (header) {
        const headerHeight = header.clientHeight;
        setIsScrolled(window.scrollY > headerHeight);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const hash = window.location.hash;
    const cardId = hash.substring(1);

    if (cardId) {
      const cardElement = document.getElementById(cardId);
      if (cardElement) {
        cardElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [pathname, searchParams]);

  return (
    <header
      className={`header ${isScrolled && !open && "header-float"} ${dark && "dark"}`}
    >
      <Link href="/" className="header__logo">
        <div>
          RENTLIST
        </div>
      </Link>
      <nav className="header__nav">
        <Link href="/" prefetch={true}>
          Home
        </Link>
        <Link href="/projects" prefetch={true}>
          Listings
        </Link>
        <Link href="/#contact" prefetch={true}>
          Contact
        </Link>
      </nav>
      <div className="header__buttons">
        <button>Contact us</button>
      </div>
      <svg
        className="header__hamburger"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onClick={() => setOpen(true)}
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          {" "}
          <path
            d="M20 7L4 7"
            stroke="#000"
            strokeWidth="1.5"
            strokeLinecap="round"
          ></path>{" "}
          <path
            d="M20 12L4 12"
            stroke="#000"
            strokeWidth="1.5"
            strokeLinecap="round"
          ></path>{" "}
          <path
            d="M20 17L4 17"
            stroke="#000"
            strokeWidth="1.5"
            strokeLinecap="round"
          ></path>{" "}
        </g>
      </svg>{" "}
      {open && (
        <div className="header__sidebar">
          <div className="header__sidebar__hamburger">
          <Link href="/" className="header__logo">
        <div>
          RENTLIST
        </div>
      </Link>

            <svg
              className="header__hamburger"
              onClick={() => setOpen(false)}
              viewBox="0 0 64 64"
              xmlns="http://www.w3.org/2000/svg"
              strokeWidth="4.8"
              stroke="#000000"
              fill="none"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <line x1="8.06" y1="8.06" x2="55.41" y2="55.94"></line>
                <line x1="55.94" y1="8.06" x2="8.59" y2="55.94"></line>
              </g>
            </svg>
          </div>

          <nav>
            <Link href="/">Home</Link>
            <Link href="/projects">Listings</Link>
            <Link href="/#contact">Contact</Link>
          </nav>

          <button>Contact us</button>
        </div>
      )}
    </header>
  );
}

// Main Header component with Suspense boundary
export default function Header({ dark }) {
  const pathname = usePathname();

  return (
    <Suspense fallback={<div className="header-loading">Loading...</div>}>
      <HeaderContent dark={dark} pathname={pathname} />
    </Suspense>
  );
}
