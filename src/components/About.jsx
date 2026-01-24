import './About.css';

const About = ({ bio, skills }) => {
  return (
    <section className="about section">
      <div className="container">
        <h2 className="section-title">About Me</h2>
        <p className="bio">{bio}</p>
        {skills && skills.length > 0 && (
          <div className="skills">
            <h3 className="skills-title">Skills</h3>
            <div className="skills-list">
              {skills.map((skill, index) => (
                <span key={index} className="skill-tag">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default About;
