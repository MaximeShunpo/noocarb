#!/bin/bash

# Noocarb Quick Deploy Script
# This script helps you deploy your app quickly

echo "🚀 Noocarb Quick Deploy Helper"
echo "================================"
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the /workspace directory"
    exit 1
fi

echo "✅ Found package.json"
echo ""

# Menu
echo "Choose deployment method:"
echo ""
echo "1) 🟢 Vercel (Recommended - Fastest)"
echo "2) 🔵 Netlify"  
echo "3) 🧪 Local Preview Only"
echo "4) ❌ Cancel"
echo ""

read -p "Enter your choice (1-4): " choice

case $choice in
    1)
        echo ""
        echo "📦 Deploying to Vercel..."
        echo ""
        
        # Check if vercel is installed
        if ! command -v vercel &> /dev/null; then
            echo "⚠️  Vercel CLI not found. Installing..."
            npm install -g vercel
        fi
        
        echo "🚀 Starting Vercel deployment..."
        echo "   (You'll need to login if it's your first time)"
        echo ""
        vercel
        
        echo ""
        echo "✅ Deployment complete!"
        echo "   Your app is now live! Copy the URL above and share it with your client."
        ;;
        
    2)
        echo ""
        echo "📦 Deploying to Netlify..."
        echo ""
        
        # Check if netlify is installed
        if ! command -v netlify &> /dev/null; then
            echo "⚠️  Netlify CLI not found. Installing..."
            npm install -g netlify-cli
        fi
        
        echo "🔨 Building production version..."
        npm run build
        
        echo ""
        echo "🚀 Starting Netlify deployment..."
        echo "   (You'll need to login if it's your first time)"
        echo ""
        netlify deploy --prod
        
        echo ""
        echo "✅ Deployment complete!"
        echo "   Your app is now live! Copy the URL above and share it with your client."
        ;;
        
    3)
        echo ""
        echo "🧪 Starting local preview server..."
        echo ""
        
        # Build if dist doesn't exist
        if [ ! -d "dist" ]; then
            echo "🔨 Building production version..."
            npm run build
        fi
        
        echo ""
        echo "🚀 Preview server starting..."
        echo "   Open your browser to: http://localhost:4173"
        echo ""
        echo "   Press Ctrl+C to stop the server"
        echo ""
        npm run preview
        ;;
        
    4)
        echo ""
        echo "👋 Deployment cancelled."
        exit 0
        ;;
        
    *)
        echo ""
        echo "❌ Invalid choice. Please run the script again."
        exit 1
        ;;
esac

echo ""
echo "================================"
echo "✨ Done!"
