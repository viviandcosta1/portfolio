#!/bin/bash

# Quick Start Guide for Portfolio Website
# This script helps you get started quickly

echo "╔════════════════════════════════════════╗"
echo "║  Portfolio Website - Quick Start       ║"
echo "╚════════════════════════════════════════╝"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed"
    echo "📥 Please install Node.js from: https://nodejs.org/"
    exit 1
fi

echo "✓ Node.js version: $(node --version)"
echo "✓ npm version: $(npm --version)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Check if .env exists
if [ ! -f .env ]; then
    echo "⚠️  .env file not found"
    echo "📝 Creating .env from .env.example..."
    cp .env.example .env
    echo "✓ .env created (update with your Gmail credentials)"
fi

echo ""
echo "╔════════════════════════════════════════╗"
echo "║  Setup Complete!                       ║"
echo "╚════════════════════════════════════════╝"
echo ""
echo "📝 Next steps:"
echo "1. Update .env file with your credentials"
echo "   - EMAIL_USER: Your Gmail address"
echo "   - EMAIL_PASSWORD: Your Gmail app password"
echo "   - ADMIN_API_KEY: Your secret admin key"
echo ""
echo "2. Start the server:"
echo "   npm start"
echo ""
echo "3. Open index.html in your browser"
echo ""
echo "📖 For more info, see README.md"
