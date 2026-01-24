import { useCVData } from './hooks/useCVData';
import { useMedia } from './hooks/useMedia';
import Header from './components/Header';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Portfolio from './components/Portfolio';
import SocialLinks from './components/SocialLinks';
import Contact from './components/Contact';
import MediaGallery from './components/MediaGallery';
import './App.css';

function App() {
  const { cvData, loading: cvLoading, error: cvError } = useCVData();
  const { media } = useMedia(cvData?.media);

  // Show loading state
  if (cvLoading) {
    return (
      <div className="App">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading CV data...</p>
        </div>
      </div>
    );
  }

  // Show error state with fallback
  if (cvError && !cvData) {
    return (
      <div className="App">
        <div className="error-container">
          <h2>Error Loading CV Data</h2>
          <p>{cvError}</p>
          <p>Please ensure <code>public/data/cv.json</code> exists and is valid.</p>
        </div>
      </div>
    );
  }

  // Default data structure if cvData is null
  const data = cvData || {
    personal: { name: '', title: '', profileImage: '', bio: '', phoneNumber: '', whatsappNumber: '', email: '' },
    skills: [],
    experience: [],
    projects: [],
    socials: {},
  };

  return (
    <div className="App">
      <Header
        name={data.personal.name}
        title={data.personal.title}
        profileImage={data.personal.profileImage}
      />
      <About bio={data.personal.bio} skills={data.skills} />
      <Experience experiences={data.experience} />
      <Projects projects={data.projects} mediaItems={media.items} />
      
      <Portfolio portfolioItems={data.portfolio || []} />
      
      <MediaGallery
        images={media.images}
        videos={media.videos}
        mediaItems={media.items}
        title="Portfolio Gallery"
      />
      
      <SocialLinks socials={data.socials} />
      <Contact
        phoneNumber={data.personal.phoneNumber}
        whatsappNumber={data.personal.whatsappNumber}
        email={data.personal.email}
      />
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} {data.personal.name || 'Digital CV'}. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
