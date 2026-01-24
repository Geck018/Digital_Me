import { useState } from 'react';
import './Portfolio.css';

const Portfolio = ({ portfolioItems = [] }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  if (!portfolioItems || portfolioItems.length === 0) return null;

  const openModal = (item) => {
    setSelectedItem(item);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  return (
    <>
      <section className="portfolio section">
        <div className="container">
          <h2 className="section-title">Portfolio</h2>
          <div className="portfolio-grid">
            {portfolioItems.map((item, index) => (
              <div
                key={index}
                className="portfolio-item"
                onClick={() => openModal(item)}
              >
                {item.image && (
                  <div className="portfolio-image">
                    <img src={item.image} alt={item.title} />
                    <div className="portfolio-overlay">
                      <span className="view-details">View Details</span>
                    </div>
                  </div>
                )}
                <div className="portfolio-content">
                  <h3 className="portfolio-title">{item.title}</h3>
                  {item.category && (
                    <span className="portfolio-category">{item.category}</span>
                  )}
                  {item.description && (
                    <p className="portfolio-description">{item.description}</p>
                  )}
                  {item.technologies && item.technologies.length > 0 && (
                    <div className="portfolio-tech">
                      {item.technologies.slice(0, 3).map((tech, i) => (
                        <span key={i} className="tech-badge">{tech}</span>
                      ))}
                      {item.technologies.length > 3 && (
                        <span className="tech-more">+{item.technologies.length - 3}</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedItem && (
        <div className="portfolio-modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            
            {selectedItem.image && (
              <div className="modal-image">
                <img src={selectedItem.image} alt={selectedItem.title} />
              </div>
            )}
            
            <div className="modal-body">
              <h2 className="modal-title">{selectedItem.title}</h2>
              
              {selectedItem.category && (
                <span className="modal-category">{selectedItem.category}</span>
              )}
              
              {selectedItem.description && (
                <p className="modal-description">{selectedItem.description}</p>
              )}
              
              {selectedItem.details && (
                <div className="modal-details">
                  {Array.isArray(selectedItem.details) ? (
                    <ul>
                      {selectedItem.details.map((detail, i) => (
                        <li key={i}>{detail}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>{selectedItem.details}</p>
                  )}
                </div>
              )}
              
              {selectedItem.technologies && selectedItem.technologies.length > 0 && (
                <div className="modal-tech">
                  <h4>Technologies Used</h4>
                  <div className="tech-list">
                    {selectedItem.technologies.map((tech, i) => (
                      <span key={i} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>
              )}
              
              {selectedItem.links && (
                <div className="modal-links">
                  {selectedItem.links.demo && (
                    <a
                      href={selectedItem.links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="modal-link"
                    >
                      Live Demo
                    </a>
                  )}
                  {selectedItem.links.github && (
                    <a
                      href={selectedItem.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="modal-link"
                    >
                      GitHub
                    </a>
                  )}
                  {selectedItem.links.caseStudy && (
                    <a
                      href={selectedItem.links.caseStudy}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="modal-link"
                    >
                      Case Study
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

export default Portfolio;
