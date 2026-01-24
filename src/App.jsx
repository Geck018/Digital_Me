import { cvData } from './data/cvData';
import Header from './components/Header';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import SocialLinks from './components/SocialLinks';
import Contact from './components/Contact';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header
        name={cvData.personal.name}
        title={cvData.personal.title}
        profileImage={cvData.personal.profileImage}
      />
      <About bio={cvData.personal.bio} skills={cvData.skills} />
      <Experience experiences={cvData.experience} />
      <Projects projects={cvData.projects} />
      <SocialLinks socials={cvData.socials} />
      <Contact
        phoneNumber={cvData.personal.phoneNumber}
        whatsappNumber={cvData.personal.whatsappNumber}
        email={cvData.personal.email}
      />
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} {cvData.personal.name}. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
