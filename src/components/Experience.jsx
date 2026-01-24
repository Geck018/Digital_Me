import './Experience.css';

const Experience = ({ experiences }) => {
  if (!experiences || experiences.length === 0) return null;

  return (
    <section className="experience section">
      <div className="container">
        <h2 className="section-title">Experience</h2>
        <div className="experience-list">
          {experiences.map((exp, index) => (
            <div key={index} className="experience-item">
              <div className="experience-header">
                <h3 className="job-title">{exp.title}</h3>
                <span className="company">{exp.company}</span>
              </div>
              <div className="experience-meta">
                <span className="period">{exp.period}</span>
                {exp.location && <span className="location">{exp.location}</span>}
              </div>
              {exp.description && (
                <p className="job-description">{exp.description}</p>
              )}
              {exp.responsibilities && exp.responsibilities.length > 0 && (
                <ul className="responsibilities">
                  {exp.responsibilities.map((resp, i) => (
                    <li key={i}>{resp}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
