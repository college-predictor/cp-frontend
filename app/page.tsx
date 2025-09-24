import HeroSection from './components/HeroSection';
import FeaturedSections from './components/FeaturedSections';
import TopColleges from './components/TopColleges';
import PopularExams from './components/PopularExams';
import TrendingCourses from './components/TrendingCourses';
import LatestNews from './components/LatestNews';
import Testimonials from './components/Testimonials';

export default function Home() {
  return (
    <div>
      <HeroSection />
      <FeaturedSections />
      <TopColleges />
      <PopularExams />
      <TrendingCourses />
      <LatestNews />
      <Testimonials />
    </div>
  );
}
