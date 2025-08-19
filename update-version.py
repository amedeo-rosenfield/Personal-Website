#!/usr/bin/env python3
"""
Version Update Script for Amedeo Rosenfield's Personal Website

This script updates the cache-busting version number in all HTML files.
Usage: python update-version.py <new_version_number>

Example: python update-version.py 3
"""

import sys
import re
import os

def update_version_in_file(file_path, old_version, new_version):
    """Update version number in a single file."""
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            content = file.read()
        
        # Update CSS and JS file references
        updated_content = re.sub(
            r'(href|src)="([^"]*\.(css|js))\?v=\d+"',
            rf'\1="\2?v={new_version}"',
            content
        )
        
        if content != updated_content:
            with open(file_path, 'w', encoding='utf-8') as file:
                file.write(updated_content)
            print(f"✓ Updated {file_path}")
            return True
        else:
            print(f"- No changes needed in {file_path}")
            return False
    except Exception as e:
        print(f"✗ Error updating {file_path}: {e}")
        return False

def main():
    if len(sys.argv) != 2:
        print("Usage: python update-version.py <new_version_number>")
        print("Example: python update-version.py 3")
        sys.exit(1)
    
    try:
        new_version = int(sys.argv[1])
    except ValueError:
        print("Error: Version number must be an integer")
        sys.exit(1)
    
    # List of HTML files to update
    html_files = [
        'index.html',
        'bio.html', 
        'engineering.html',
        'volunteering.html',
        'photography.html',
        'dj.html',
        'contact.html'
    ]
    
    print(f"Updating version to v{new_version}...")
    print("=" * 50)
    
    updated_count = 0
    for html_file in html_files:
        if os.path.exists(html_file):
            if update_version_in_file(html_file, None, new_version):
                updated_count += 1
        else:
            print(f"⚠ Warning: {html_file} not found")
    
    print("=" * 50)
    print(f"Update complete! Updated {updated_count} files to version {new_version}")
    print("\nNext steps:")
    print("1. Test your website to ensure everything works")
    print("2. Commit and push your changes to GitHub")
    print("3. Clear your browser cache to see the changes")

if __name__ == "__main__":
    main()
