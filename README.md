# Personal Portfolio Website

A clean, minimal personal portfolio website built with HTML, CSS, and vanilla JavaScript. Perfect for showcasing your engineering projects and photography work.

## 🚀 Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Semantic HTML5**: Clean, accessible markup structure
- **Modern CSS**: Minimal design with smooth animations and transitions
- **Smooth Navigation**: Fixed header with smooth scrolling to sections
- **Three Main Sections**:
  - Bio/About section with personal introduction
  - Engineering Projects showcase with project cards
  - Photography gallery with image placeholders
- **GitHub Pages Ready**: Can be deployed directly to GitHub Pages

## 📁 File Structure

```
Personal Website/
├── index.html          # Main HTML file
├── styles.css          # All CSS styles
└── README.md          # This file
```

## 🎨 Customization Guide

### 1. Personal Information

**In `index.html`, replace these placeholders:**

- `[Your Name]` - Your actual name (appears in navigation and title)
- `[Your Location]` - Your current location
- `[Your Field]` - Your area of expertise
- Update the bio paragraphs with your own story
- Replace email and social media links in the contact section

### 2. Adding Your Photo

Replace the bio photo placeholder:

1. Add your photo file to the project folder (e.g., `profile-photo.jpg`)
2. In `index.html`, replace this section:
   ```html
   <div class="photo-placeholder">
       <span>Your Photo</span>
   </div>
   ```
   
   With:
   ```html
   <img src="profile-photo.jpg" alt="Your Name" class="profile-image">
   ```

3. Add this CSS to `styles.css`:
   ```css
   .profile-image {
       width: 250px;
       height: 250px;
       border-radius: 50%;
       object-fit: cover;
       border: 3px solid #bdc3c7;
   }
   ```

### 3. Adding Engineering Projects

For each project, update these elements in the project cards:

- **Project Title**: Replace "Project Name X"
- **Description**: Write about your project's purpose and technologies
- **Links**: Update `href="#"` with actual project and GitHub URLs
- **Tags**: Replace technology tags with ones relevant to your project

**Example project card:**
```html
<article class="project-card">
    <h3 class="project-title">Weather Dashboard</h3>
    <p class="project-description">
        A responsive web application that displays weather data with beautiful 
        visualizations. Built with React and integrates with OpenWeatherMap API.
    </p>
    <div class="project-links">
        <a href="https://weather-dashboard-demo.com" class="project-link">View Project</a>
        <a href="https://github.com/yourusername/weather-dashboard" class="project-link">GitHub</a>
    </div>
    <div class="project-tags">
        <span class="tag">React</span>
        <span class="tag">JavaScript</span>
        <span class="tag">API Integration</span>
    </div>
</article>
```

### 4. Adding Photography

To replace photo placeholders:

1. Add your photos to an `images/` folder
2. Replace each photo placeholder:
   ```html
   <div class="photo-placeholder">
       <span>Photo 1</span>
   </div>
   ```
   
   With:
   ```html
   <img src="images/photo1.jpg" alt="Description of photo" class="gallery-image">
   ```

3. Add this CSS for gallery images:
   ```css
   .gallery-image {
       width: 100%;
       height: 250px;
       object-fit: cover;
   }
   ```

### 5. Color Customization

The website uses these main colors that you can easily change in `styles.css`:

- **Primary Blue**: `#3498db` (links, accents)
- **Dark Blue**: `#2c3e50` (headings, navbar)
- **Light Gray**: `#f8f9fa` (section backgrounds)

To change colors, use find-and-replace in your editor.

## 🌐 Deployment to GitHub Pages

1. **Create a GitHub repository** for your website
2. **Upload your files** to the repository
3. **Enable GitHub Pages**:
   - Go to repository Settings
   - Scroll to "Pages" section
   - Select "Deploy from a branch"
   - Choose "main" branch and "/ (root)" folder
   - Click Save

Your website will be available at: `https://yourusername.github.io/repository-name`

## 📱 Responsive Breakpoints

The website is responsive with these breakpoints:

- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: 480px - 767px
- **Small Mobile**: Below 480px

## ♿ Accessibility Features

- Semantic HTML5 elements for screen readers
- Keyboard navigation support
- Focus indicators for interactive elements
- Reduced motion support for users with vestibular disorders
- High contrast mode support
- Print-friendly styles

## 🔧 Technical Details

- **No frameworks required**: Pure HTML, CSS, and vanilla JavaScript
- **Modern CSS features**: Grid, Flexbox, CSS custom properties
- **Performance optimized**: Minimal dependencies, optimized images
- **Cross-browser compatible**: Works in all modern browsers

## 📝 Next Steps

1. Replace all placeholder content with your information
2. Add your actual photos and project links
3. Test the website locally by opening `index.html` in a browser
4. Deploy to GitHub Pages
5. Share your portfolio with the world!

## 🆘 Need Help?

If you need assistance customizing the website or adding new features, feel free to ask for help. The code is well-commented and structured for easy modification.
