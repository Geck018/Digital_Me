# Digital CV

A modern, responsive digital CV website built with React and Vite. **Fully modular and reactive** - just upload your CV data and media files, and the site automatically displays them!

## Features

- 🎨 Modern, professional design
- 📱 Fully responsive layout
- 💬 WhatsApp integration for easy contact
- 📞 Phone call functionality
- 🔗 Social media links section
- 📸 **Dynamic media gallery** - automatically displays all images and videos
- 📄 **Dynamic CV loading** - upload your CV as JSON, site parses it automatically
- ⚡ Fast and optimized with Vite
- 🔄 **Reactive** - add files, refresh, and they appear automatically

## Project Structure

```
digital-cv/
├── public/
│   ├── data/
│   │   ├── cv.json              # Your CV data (JSON format)
│   │   └── media-manifest.json   # Auto-generated media index
│   └── media/
│       ├── screenshots/         # Project screenshots
│       └── videos/              # Video content
├── src/
│   ├── components/              # React components
│   │   ├── Header.jsx
│   │   ├── About.jsx
│   │   ├── Experience.jsx
│   │   ├── Projects.jsx
│   │   ├── SocialLinks.jsx
│   │   ├── Contact.jsx
│   │   └── MediaGallery.jsx     # Dynamic media gallery
│   ├── hooks/
│   │   ├── useContact.js        # Contact functionality
│   │   ├── useCVData.js         # Dynamic CV data loading
│   │   └── useMedia.js          # Dynamic media loading
│   ├── utils/
│   │   ├── loadCVData.js        # CV data parser
│   │   └── loadMedia.js          # Media scanner
│   └── App.jsx
└── package.json
```

## Getting Started

### Installation

Dependencies are already installed. If you need to reinstall:

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` folder, ready for deployment to Cloudflare Pages.

## Modular & Reactive System

### 📄 Upload Your CV Data

1. **Edit `public/data/cv.json`** with your information:
   ```json
   {
     "personal": {
       "name": "Your Name",
       "title": "Your Title",
       "profileImage": "/media/profile.jpg",
       "bio": "Your bio...",
       "phoneNumber": "+1234567890",
       "whatsappNumber": "+1234567890",
       "email": "your@email.com"
     },
     "skills": ["React", "JavaScript", ...],
     "experience": [...],
     "projects": [...],
     "socials": {...}
   }
   ```

2. **The site automatically loads and displays your CV!** No code changes needed.

### 📸 Upload Media Files

1. **Add images/videos** to `public/media/`:
   - Screenshots: `public/media/screenshots/`
   - Videos: `public/media/videos/`
   - Profile images: `public/media/`

2. **Generate media manifest** (optional but recommended):
   ```bash
   npm run generate-media
   ```
   This scans your media folder and creates `public/data/media-manifest.json`

3. **Or manually edit** `public/data/media-manifest.json`:
   ```json
   {
     "images": [
       "/media/screenshots/project1.jpg",
       "/media/screenshots/project2.png"
     ],
     "videos": [
       "/media/videos/demo.mp4"
     ]
   }
   ```

4. **The gallery automatically displays all media!** Just refresh the page.

### 🎯 How It Works

- **CV Data**: The app loads `public/data/cv.json` on startup and displays it dynamically
- **Media Gallery**: Scans `public/data/media-manifest.json` and displays all images/videos in a beautiful gallery
- **Reactive**: Add new files → update manifest → refresh page → they appear!

## Customization

### CV Data Structure

The `cv.json` file supports:
- **personal**: Name, title, bio, contact info, profile image
- **skills**: Array of skill strings
- **experience**: Array of job objects with title, company, period, location, description, responsibilities
- **projects**: Array of project objects with title, description, technologies, image, links
- **socials**: Object with social media platform names as keys and URLs as values

### Media Gallery

The gallery automatically:
- Displays all images and videos from the manifest
- Provides filtering (All/Images/Videos)
- Opens media in a modal for full-screen viewing
- Is fully responsive

### Contact Configuration

In `cv.json`, update:
- `phoneNumber`: Your phone number with country code (e.g., `+1234567890`)
- `whatsappNumber`: Your WhatsApp number (can be the same as phoneNumber)
- `email`: Your email address

The contact buttons will automatically work:
- **Call Me**: Opens phone dialer
- **WhatsApp**: Opens WhatsApp with a pre-filled message
- **Email Me**: Opens email client

## Workflow

1. **Update CV**: Edit `public/data/cv.json` → Save → Refresh browser
2. **Add Media**: Drop files in `public/media/` → Run `npm run generate-media` → Refresh browser
3. **Deploy**: Build and deploy - everything is included automatically!

## Deployment to Cloudflare Pages

1. Build the project: `npm run build`
2. Connect your repository to Cloudflare Pages
3. Set build command: `npm run build`
4. Set output directory: `dist`
5. Deploy!

**Note**: Make sure `public/data/cv.json` and `public/data/media-manifest.json` are committed to your repo.

## Technologies Used

- React 19
- Vite 7
- CSS3 (Modern styling with gradients and animations)

## License

Personal use - customize as needed!
