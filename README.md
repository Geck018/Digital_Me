# Digital CV

A modern, responsive digital CV website built with React and Vite.

## Features

- 🎨 Modern, professional design
- 📱 Fully responsive layout
- 💬 WhatsApp integration for easy contact
- 📞 Phone call functionality
- 🔗 Social media links section
- 📸 Media folder for screenshots and videos
- ⚡ Fast and optimized with Vite

## Project Structure

```
digital-cv/
├── public/
│   └── media/
│       ├── screenshots/    # Project screenshots
│       └── videos/         # Video content
├── src/
│   ├── components/         # React components
│   │   ├── Header.jsx
│   │   ├── About.jsx
│   │   ├── Experience.jsx
│   │   ├── Projects.jsx
│   │   ├── SocialLinks.jsx
│   │   └── Contact.jsx
│   ├── hooks/
│   │   └── useContact.js  # Custom hook for contact functionality
│   ├── data/
│   │   └── cvData.js      # Your CV data - UPDATE THIS!
│   ├── App.jsx
│   └── main.jsx
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

## Customization

### Update Your CV Data

Edit `src/data/cvData.js` with your information:

- **Personal Info**: Name, title, bio, contact details
- **Skills**: List of your skills
- **Experience**: Your work history
- **Projects**: Your portfolio projects
- **Social Links**: Links to your social media profiles

### Add Media Files

1. Place profile images in `public/media/`
2. Add project screenshots to `public/media/screenshots/`
3. Add videos to `public/media/videos/`
4. Reference them in `cvData.js` using paths like `/media/screenshots/image.jpg`

### Contact Configuration

In `cvData.js`, update:
- `phoneNumber`: Your phone number with country code (e.g., `+1234567890`)
- `whatsappNumber`: Your WhatsApp number (can be the same as phoneNumber)
- `email`: Your email address

The contact buttons will automatically work:
- **Call Me**: Opens phone dialer
- **WhatsApp**: Opens WhatsApp with a pre-filled message
- **Email Me**: Opens email client

## Deployment to Cloudflare Pages

1. Build the project: `npm run build`
2. Connect your repository to Cloudflare Pages
3. Set build command: `npm run build`
4. Set output directory: `dist`
5. Deploy!

## Technologies Used

- React 19
- Vite 7
- CSS3 (Modern styling with gradients and animations)

## License

Personal use - customize as needed!
