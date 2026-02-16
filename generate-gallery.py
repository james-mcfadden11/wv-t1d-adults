#!/usr/bin/env python3
"""
Gallery Generator for WV T1D Adults Website
Run this script to automatically generate gallery.html with all your photos
"""

import os

# List of all 134 gallery photos (you'll need to update this list with your actual filenames)
# For now, I'm creating a template - you run this script and it will read from your images/gallery folder

def generate_gallery_html():
    # Get the directory where this script is located
    script_dir = os.path.dirname(os.path.abspath(__file__))
    gallery_dir = os.path.join(script_dir, 'images', 'gallery')
    
    # Get all image files from the gallery directory
    if os.path.exists(gallery_dir):
        image_files = sorted([f for f in os.listdir(gallery_dir) 
                            if f.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.webp'))])
        print(f"Found {len(image_files)} images in gallery folder")
    else:
        print(f"Gallery directory not found: {gallery_dir}")
        print("Please make sure images/gallery exists with your photos")
        return
    
    # Generate the HTML
    gallery_items = ""
    for img in image_files:
        gallery_items += f'                <div class="gallery-item">\n'
        gallery_items += f'                    <img src="images/gallery/{img}" alt="Gallery photo" loading="lazy">\n'
        gallery_items += f'                </div>\n'
    
    # Read the template
    html_content = f'''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Photo Gallery - WV T1D Adults</title>
    <link href="https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@400;600;700&family=Work+Sans:wght@400;500;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <!-- Navigation -->
    <nav id="navbar">
        <div class="nav-container">
            <a href="index.html" class="logo">WV T1D Adults</a>
            <div class="menu-toggle" id="menuToggle">
                <span></span>
                <span></span>
                <span></span>
            </div>
            <ul class="nav-links" id="navLinks">
                <li><a href="index.html">Home</a></li>
                <li><a href="about.html">About Us</a></li>
                <li><a href="connect.html">How to Connect</a></li>
                <li><a href="upcoming-events.html">Upcoming Events</a></li>
                <li><a href="past-events.html">Past Events</a></li>
                <li><a href="gallery.html" class="active">Photo Gallery</a></li>
                <li><a href="tims-story.html">Tim's Story</a></li>
            </ul>
        </div>
    </nav>

    <!-- Page Header -->
    <section class="page-header">
        <div class="container">
            <h1>Photo Gallery</h1>
            <p>Memories from our retreats and community gatherings</p>
        </div>
    </section>

    <!-- Content Section -->
    <section class="content-section">
        <div class="container">
            <div class="gallery-grid">
{gallery_items}            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer>
        <p>&copy; 2025 WV T1D Adults. Building community, creating connections.</p>
        <p style="margin-top: 1rem;">Proudly sponsored by Ties for Tim and Camp Kno-Koma</p>
    </footer>

    <script src="script.js"></script>
</body>
</html>'''
    
    # Write the new gallery.html
    output_file = os.path.join(script_dir, 'gallery.html')
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(html_content)
    
    print(f"✓ Successfully generated gallery.html with {len(image_files)} photos")
    print(f"✓ Saved to: {output_file}")

if __name__ == "__main__":
    generate_gallery_html()
