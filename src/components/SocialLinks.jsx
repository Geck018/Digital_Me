import './SocialLinks.css';

const SocialLinks = ({ socials }) => {
  if (!socials || Object.keys(socials).length === 0) return null;

  const socialIcons = {
    linkedin: '🔗',
    github: '💻',
    twitter: '🐦',
    instagram: '📷',
    facebook: '👥',
    portfolio: '🌐',
    email: '📧',
  };

  return (
    <section className="social-links section">
      <div className="container">
        <h2 className="section-title">Connect With Me</h2>
        <div className="socials-grid">
          {Object.entries(socials).map(([platform, url]) => (
            <a
              key={platform}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              <span className="social-icon">{socialIcons[platform.toLowerCase()] || '🔗'}</span>
              <span className="social-platform">{platform.charAt(0).toUpperCase() + platform.slice(1)}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialLinks;
