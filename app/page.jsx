import CategorySlides from '@/app/components/categorySlides'
import WhyChooseUs from './components/whyChooseUs';
import ContactUs from './components/contactUs';
import Header from './components/header';
import RotatingImageItem from './components/rotatingImageItem';
import projects from './utils/projects';

export async function generateMetadata() {
  return {
    title: "Rentlist - Find Your Perfect Property",
    description:
      "Premium properties for sale and rent. Houses, apartments, commercial plots, shops, and land across Nigeria.",
  };
}

// Create arrays of projects for hero grids
const upperHeroProjects = [
  projects[0], // Modern 4 Bedroom Duplex
  projects[7], // 5 Bedroom Mansion
  projects[13], // 3 Bedroom Semi-Detached
  projects[14], // 6 Bedroom Luxury Villa
];

const lowerHeroProjects = [
  projects[3], // Luxury Service Apartment
  projects[8], // 5 Bedroom Mansion
  projects[15], // 2 Bedroom Terrace
  projects[16], // 7 Bedroom Executive Mansion
];

// Mapping for lower row: [0, 1, 2, 3] -> [2, 3, 0, 1]
// This pairs: Upper[0] with Lower[2], Upper[1] with Lower[3], Upper[2] with Lower[0], Upper[3] with Lower[1]
const lowerRowColumnMapping = [2, 3, 0, 1];

export default function Home() {
  return (
    <>
          <Header />

    <main className='home'>

      
      <div className="home__hero">
        <div className="home__hero__grid">
          {upperHeroProjects.map((project, index) => {
            const images = [
              project.images[0] || project.image,
              project.images[1] || project.image,
              project.images[2] || project.image,
            ];
            return (
              <RotatingImageItem 
                key={index} 
                images={images} 
                columnIndex={index}
                project={project}
              />
            );
          })}
        </div>
        <div className="home__hero__inner">

        <div className="home__hero__inner__title">
          Find Your Perfect Property
        </div>
        <div className="home__hero__inner__subtitle">
        Premium properties for sale and rent. Houses, apartments, commercial plots, shops, and land across Nigeria.

        </div>
        </div>
        <div className="home__hero__grid">
          {lowerHeroProjects.map((project, index) => {
            const images = [
              project.images[0] || project.image,
              project.images[1] || project.image,
              project.images[2] || project.image,
            ];
            return (
              <RotatingImageItem 
                key={index} 
                images={images} 
                columnIndex={lowerRowColumnMapping[index]}
                project={project}
              />
            );
          })}
        </div>
      </div>

      <CategorySlides />
      <WhyChooseUs />
      <ContactUs /> 

     
    </main>

    </>
  );
}
