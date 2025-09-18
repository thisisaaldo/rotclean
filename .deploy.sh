#!/bin/bash

# RotClean Website Deployment Script for Hostinger
# This script builds the React app and deploys it to Hostinger

echo "🚀 Starting RotClean website deployment..."

# Navigate to the project directory
cd ~/domains/rotclean.com.au/public_html || {
    echo "❌ Error: Could not navigate to public_html directory"
    echo "Please ensure your domain is set up correctly in Hostinger"
    exit 1
}

# Remove old files (except .htaccess and other config files)
echo "🧹 Cleaning old files..."
find . -type f ! -name '.htaccess' ! -name 'robots.txt' ! -name 'sitemap.xml' ! -name '.deploy.sh' -delete
find . -type d -empty -delete

# Install dependencies
echo "📦 Installing dependencies..."
if command -v pnpm &> /dev/null; then
    echo "Using pnpm..."
    pnpm install --production
elif command -v npm &> /dev/null; then
    echo "Using npm..."
    npm install --production
else
    echo "❌ Error: Neither pnpm nor npm found. Please install Node.js and npm/pnpm"
    exit 1
fi

# Build the project
echo "🔨 Building the project..."
if command -v pnpm &> /dev/null; then
    pnpm run build
else
    npm run build
fi

# Check if build was successful
if [ ! -d "dist" ]; then
    echo "❌ Error: Build failed - dist directory not found"
    exit 1
fi

# Copy built files to public_html
echo "📁 Copying built files..."
cp -r dist/* .

# Set proper permissions
echo "🔐 Setting file permissions..."
find . -type f -exec chmod 644 {} \;
find . -type d -exec chmod 755 {} \;

# Ensure .htaccess is present and has correct permissions
if [ -f ".htaccess" ]; then
    chmod 644 .htaccess
    echo "✅ .htaccess file found and permissions set"
else
    echo "⚠️  Warning: .htaccess file not found. SPA routing may not work correctly"
fi

# Verify critical files
echo "🔍 Verifying deployment..."
if [ -f "index.html" ]; then
    echo "✅ index.html found"
else
    echo "❌ Error: index.html not found"
    exit 1
fi

if [ -f "robots.txt" ]; then
    echo "✅ robots.txt found"
fi

if [ -f "sitemap.xml" ]; then
    echo "✅ sitemap.xml found"
fi

# Clean up
echo "🧹 Cleaning up..."
rm -rf dist
rm -rf node_modules

echo "🎉 RotClean website deployment completed successfully!"
echo "🌐 Your website should now be live at: https://rotclean.com.au"
echo ""
echo "📋 Deployment Summary:"
echo "   - React app built and deployed"
echo "   - SEO files (robots.txt, sitemap.xml) included"
echo "   - File permissions set correctly"
echo "   - Cleanup completed"
echo ""
echo "🔧 Next steps:"
echo "   1. Test your website at https://rotclean.com.au"
echo "   2. Submit sitemap to Google Search Console"
echo "   3. Monitor website performance"
