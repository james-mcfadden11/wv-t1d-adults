#!/bin/bash
# This script generates the gallery HTML
# Run this from the wvt1d-website directory

echo "Generating gallery HTML..."

# Create the gallery items
gallery_html=""
for file in images/gallery/*; do
    filename=$(basename "$file")
    gallery_html+="                <div class=\"gallery-item\"><img src=\"images/gallery/$filename\" alt=\"Gallery photo\" loading=\"lazy\"></div>
"
done

# Output the gallery HTML
echo "$gallery_html" > gallery-items.html
echo "Gallery HTML generated in gallery-items.html"
echo "Copy and paste this into gallery.html between the <div class=\"gallery-grid\"> tags"