import './Header.css';

const Header = ({ name, title, profileImage }) => {
  return (
    <header className="header">
      <div className="header-content">
        {profileImage && (
          <div className="profile-image-container">
            <img src={profileImage} alt={name} className="profile-image" />
          </div>
        )}
        <div className="header-text">
          <h1 className="name">{name}</h1>
          <p className="title">{title}</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
