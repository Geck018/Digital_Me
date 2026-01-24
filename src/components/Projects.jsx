import { useState } from 'react';
import { getProjectMedia } from '../utils/getLinkedMedia';
import './Projects.css';

const Projects = ({ projects, mediaItems = [] }) => {
  const [selectedProject, setSelectedProject] = useState(null);

  if (!projects || projects.length === 0) return null;

  const openModal = (project) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  return (
    <>
      <section className="projects section">
        <div className="container">
          <h2 className="section-title">Projects</h2>
          <div className="projects-grid">
            {projects.map((project, index) => {
              const linkedMedia = getProjectMedia(mediaItems, project.title);
              const hasLinkedMedia = linkedMedia.length > 0;
              
              return (
                <div
                  key={index}
                  className="project-card"
                  onClick={() => openModal(project)}
                >
                  {project.image && (
                    <div className="project-image">
                      <img src={project.image} alt={project.title} />
                      <div className="project-overlay">
                        <span className="view-details">View Details</span>
                      </div>
                    </div>
                  )}
                  <div className="project-content">
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-description">{project.description}</p>
                    
                    {project.technologies && project.technologies.length > 0 && (
                      <div className="project-tech">
                        {project.technologies.slice(0, 4).map((tech, i) => (
                          <span key={i} className="tech-tag">
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 4 && (
                          <span className="tech-more">+{project.technologies.length - 4}</span>
                        )}
                      </div>
                    )}
                    
                    {(project.scope || project.impact) && (
                      <div className="project-summary-indicator">
                        <span className="summary-badge">
                          {project.scope && project.impact ? 'Scope & Impact' : 
                           project.scope ? 'Scope Details' : 'Impact Details'}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {selectedProject && (
        <div className="project-modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            
            {selectedProject.image && (
              <div className="modal-image">
                <img src={selectedProject.image} alt={selectedProject.title} />
              </div>
            )}
            
            <div className="modal-body">
              <h2 className="modal-title">{selectedProject.title}</h2>
              
              {selectedProject.description && (
                <p className="modal-description">{selectedProject.description}</p>
              )}
              
              {selectedProject.scope && (
                <div className="modal-scope">
                  <h4 className="modal-section-title">Scope</h4>
                  {Array.isArray(selectedProject.scope) ? (
                    <ul className="modal-list">
                      {selectedProject.scope.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>{selectedProject.scope}</p>
                  )}
                </div>
              )}
              
              {selectedProject.impact && (
                <div className="modal-impact">
                  <h4 className="modal-section-title">Impact</h4>
                  {Array.isArray(selectedProject.impact) ? (
                    <ul className="modal-list">
                      {selectedProject.impact.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>{selectedProject.impact}</p>
                  )}
                </div>
              )}
              
              {selectedProject.technologies && selectedProject.technologies.length > 0 && (
                <div className="modal-tech">
                  <h4 className="modal-section-title">Technologies</h4>
                  <div className="tech-list">
                    {selectedProject.technologies.map((tech, i) => (
                      <span key={i} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>
              )}
              
              {(() => {
                const linkedMedia = getProjectMedia(mediaItems, selectedProject.title);
                return linkedMedia.length > 0 && (
                  <div className="modal-media">
                    <h4 className="modal-section-title">Media</h4>
                    <div className="modal-media-grid">
                      {linkedMedia.map((media, i) => (
                        <div key={i} className="modal-media-item">
                          {media.type === 'image' ? (
                            <img src={media.path} alt={media.caption || selectedProject.title} />
                          ) : (
                            <video src={media.path} controls />
                          )}
                          {media.caption && (
                            <p className="media-caption">{media.caption}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}
              
              {selectedProject.links && (
                <div className="modal-links">
                  {selectedProject.links.demo && (
                    <a
                      href={selectedProject.links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="modal-link"
                    >
                      Live Demo
                    </a>
                  )}
                  {selectedProject.links.github && (
                    <a
                      href={selectedProject.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="modal-link"
                    >
                      GitHub
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Projects;
