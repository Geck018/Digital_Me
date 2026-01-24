// CV Data - Update this with your actual information
export const cvData = {
  personal: {
    name: 'Your Name',
    title: 'Your Professional Title',
    profileImage: '', // Path to your profile image in public/media/
    bio: 'A passionate professional with expertise in web development, design, and technology. Always eager to learn and take on new challenges.',
    phoneNumber: '+1234567890', // Include country code
    whatsappNumber: '+1234567890', // Include country code (can be same as phoneNumber)
    email: 'your.email@example.com',
  },
  skills: [
    'React',
    'JavaScript',
    'HTML/CSS',
    'Node.js',
    'Git',
    'UI/UX Design',
  ],
  experience: [
    {
      title: 'Senior Developer',
      company: 'Tech Company Inc.',
      period: '2022 - Present',
      location: 'Remote',
      description: 'Leading development of innovative web applications.',
      responsibilities: [
        'Developed and maintained multiple React applications',
        'Collaborated with cross-functional teams',
        'Mentored junior developers',
      ],
    },
    {
      title: 'Frontend Developer',
      company: 'Startup XYZ',
      period: '2020 - 2022',
      location: 'San Francisco, CA',
      description: 'Built responsive and accessible web interfaces.',
      responsibilities: [
        'Created reusable component libraries',
        'Optimized application performance',
        'Implemented modern UI/UX designs',
      ],
    },
  ],
  projects: [
    {
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce solution with payment integration.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      image: '/media/screenshots/project1.jpg', // Add your project screenshots here
      links: {
        demo: 'https://example.com',
        github: 'https://github.com/yourusername/project',
      },
    },
    {
      title: 'Task Management App',
      description: 'A collaborative task management application with real-time updates.',
      technologies: ['React', 'Firebase', 'Material-UI'],
      image: '/media/screenshots/project2.jpg',
      links: {
        demo: 'https://example.com',
        github: 'https://github.com/yourusername/project',
      },
    },
  ],
  socials: {
    linkedin: 'https://linkedin.com/in/yourprofile',
    github: 'https://github.com/yourusername',
    twitter: 'https://twitter.com/yourhandle',
    portfolio: 'https://yourportfolio.com',
    // Add more social links as needed
  },
};
