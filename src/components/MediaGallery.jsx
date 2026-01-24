import { useState } from 'react';
import './MediaGallery.css';

const MediaGallery = ({ images = [], videos = [], mediaItems = [], title = 'Media Gallery' }) => {
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [filter, setFilter] = useState('all'); // 'all', 'images', 'videos'

  // Use mediaItems if available (with linking info), otherwise fall back to simple arrays
  const allMedia = mediaItems.length > 0
    ? mediaItems.map(item => ({
        type: item.type || (item.path.match(/\.(jpg|jpeg|png|gif|webp|svg|bmp)$/i) ? 'image' : 'video'),
        src: item.path,
        alt: item.alt || item.caption || item.path.split('/').pop(),
        caption: item.caption || '',
        linkedTo: item.linkedTo || (item.project ? { type: 'project', title: item.project } : 
                                   item.experience ? { type: 'experience', title: item.experience } : null),
      }))
    : [
        ...images.map(img => ({ type: 'image', src: img, alt: img.split('/').pop(), caption: '', linkedTo: null })),
        ...videos.map(vid => ({ type: 'video', src: vid, alt: vid.split('/').pop(), caption: '', linkedTo: null })),
      ];

  const filteredMedia = filter === 'all' 
    ? allMedia 
    : allMedia.filter(item => item.type === filter);

  const openModal = (media) => {
    setSelectedMedia(media);
  };

  const closeModal = () => {
    setSelectedMedia(null);
  };

  if (allMedia.length === 0) {
    return (
      <section className="media-gallery section">
        <div className="container">
          <h2 className="section-title">{title}</h2>
          <p className="no-media">No media files found. Upload images or videos to the media folder.</p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="media-gallery section">
        <div className="container">
          <div className="gallery-header">
            <h2 className="section-title">{title}</h2>
            <div className="gallery-filters">
              <button
                className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                onClick={() => setFilter('all')}
              >
                All ({allMedia.length})
              </button>
              <button
                className={`filter-btn ${filter === 'images' ? 'active' : ''}`}
                onClick={() => setFilter('images')}
              >
                Images ({images.length})
              </button>
              <button
                className={`filter-btn ${filter === 'videos' ? 'active' : ''}`}
                onClick={() => setFilter('videos')}
              >
                Videos ({videos.length})
              </button>
            </div>
          </div>
          <div className="gallery-grid">
            {filteredMedia.map((item, index) => (
              <div
                key={index}
                className="gallery-item"
                onClick={() => openModal(item)}
              >
                {item.type === 'image' ? (
                  <img
                    src={item.src}
                    alt={item.alt}
                    loading="lazy"
                    className="gallery-image"
                  />
                ) : (
                  <div className="gallery-video-thumbnail">
                    <video src={item.src} className="gallery-video" />
                    <div className="play-overlay">
                      <span className="play-icon">▶</span>
                    </div>
                  </div>
                )}
                <div className="gallery-overlay">
                  <div className="overlay-content">
                    <span className="media-type-badge">
                      {item.type === 'image' ? '📷' : '🎥'}
                    </span>
                    {item.linkedTo && (
                      <span className="linked-badge">
                        {item.linkedTo.type === 'project' ? '📁' : '💼'} {item.linkedTo.title}
                      </span>
                    )}
                    {item.caption && (
                      <span className="caption-preview">{item.caption}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedMedia && (
        <div className="media-modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            {selectedMedia.type === 'image' ? (
              <img src={selectedMedia.src} alt={selectedMedia.alt} className="modal-media" />
            ) : (
              <video src={selectedMedia.src} controls className="modal-media" autoPlay>
                Your browser does not support the video tag.
              </video>
            )}
            <div className="modal-caption">
              {selectedMedia.linkedTo && (
                <div className="modal-link-info">
                  <strong>
                    {selectedMedia.linkedTo.type === 'project' ? '📁 Project: ' : '💼 Experience: '}
                    {selectedMedia.linkedTo.title}
                  </strong>
                </div>
              )}
              <p>{selectedMedia.caption || selectedMedia.alt}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MediaGallery;
