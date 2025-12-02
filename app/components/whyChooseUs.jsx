import Image from "next/image";
import IntegrityBlack from "@/public/assets/icons/integrityBlack.svg"
import IntegrityGrey from "@/public/assets/icons/integrityGrey.svg"

export default function WhyChooseUs() {
  return (
    <div className="why">
      <div className="why__inner">
        <div>
          <div className="why__inner__title">Why choose us</div>
          <div className="why__inner__subtitle">
            Rentlist is your trusted partner in finding the perfect property.
            Here's why thousands of customers choose us:
          </div>
        </div>
        <div className="why__inner__grid">
          <div className="why__inner__grid__card">
            <div className="why__inner__grid__card__number">01</div>
           <Image alt="" width={50} src={IntegrityBlack} />
            <div>
              <div className="why__inner__grid__card__title">Verified Listings</div>
              <div className="why__inner__grid__card__subtitle">
                Every property on our platform is verified to ensure you get
                exactly what you see. No hidden surprises or misleading
                information - just genuine properties ready for you.
              </div>
            </div>
          </div>
          <div className="why__inner__grid__card">
            <div className="why__inner__grid__card__number">02</div>
            
            <Image alt="" width={50} src={IntegrityGrey} />

            <div>
              <div className="why__inner__grid__card__title">Best Prices</div>
              <div className="why__inner__grid__card__subtitle">
                We offer competitive pricing with no hidden charges or surprise
                fees. Our transparent pricing ensures you know exactly what
                you're paying for upfront.
              </div>
            </div>
          </div>
          <div className="why__inner__grid__card">
            <div className="why__inner__grid__card__number">03</div>
            <Image alt="" width={50} src={IntegrityGrey} />


            <div>
              <div className="why__inner__grid__card__title">Expert Support</div>
              <div className="why__inner__grid__card__subtitle">
                Our team of real estate experts are here to guide you every
                step of the way. From property viewing to final paperwork,
                we've got you covered.
              </div>
            </div>
          </div>
          <div className="why__inner__grid__card">
            <div className="why__inner__grid__card__number">04</div>
            <Image alt="" width={50} src={IntegrityBlack} />


            <div>
              <div className="why__inner__grid__card__title">Fast Process</div>
              <div className="why__inner__grid__card__subtitle">
                We streamline the property search and acquisition process to
                help you find and secure your dream property quickly. No
                unnecessary delays or bureaucracy.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
