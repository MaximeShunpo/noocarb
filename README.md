# 🌱 Noocarb - Configuration Mobilité & Options

A modern web application for configuring fleet mobility and energy options, built with React, Vite, and Tailwind CSS.

![Version](https://img.shields.io/badge/version-0.0.1-green.svg)
![React](https://img.shields.io/badge/react-18.2.0-blue.svg)
![Vite](https://img.shields.io/badge/vite-5.4.8-purple.svg)
![Tailwind](https://img.shields.io/badge/tailwind-3.4.13-cyan.svg)

---

## ✨ Features

### 🎯 Multi-Step Wizard
- **7-step guided configuration** for fleet and energy setup
- **Progress tracking** with visual stepper
- **Two view modes:** Step-by-step wizard or "Show All"

### 🚗 Vehicle Fleet Management
Support for multiple energy types:
- ⚡ **Electric (Elec)** - With charging parameters
- 🟢 **Bio-GNC** - Natural gas vehicles
- H₂ **Hydrogen (H2)** - Fuel cell vehicles
- 🛢️ **B100** - Biodiesel
- 🛢️ **HVO** - Hydrotreated vegetable oil
- ⛽ **Diesel** - Conventional fuel

### ⚙️ Comprehensive Configuration
- Station parameters (pressure, compressor hours, etc.)
- Financial parameters (interest rates, depreciation, inflation)
- Energy-specific options (GNC, H2, Electric, Diesel)
- TICPE and tax optimization options

### 📊 Data Export
- Export complete configuration as **JSON**
- Date-stamped filenames
- All form data preserved

### 🎨 Modern UI
- **Gradient designs** and smooth animations
- **Color-coded** vehicle types with badges
- **Responsive layout** for all screen sizes
- **Hover effects** and visual feedback
- **Sticky header** with backdrop blur
- **Icons and emojis** for better UX

---

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ installed
- npm or yarn package manager

### Installation

```bash
# Navigate to project directory
cd /workspace

# Install dependencies (if needed)
npm install

# Start development server
npm run dev
```

Open your browser to `http://localhost:5173`

---

## 📦 Build & Deploy

### Build for Production
```bash
npm run build
```
Output will be in the `dist/` directory.

### Preview Production Build
```bash
npm run preview
```
Preview at `http://localhost:4173`

### Deploy to Vercel (Recommended)
```bash
# Option 1: Using the deploy script
./deploy.sh

# Option 2: Using Vercel CLI directly
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
# Using the deploy script
./deploy.sh

# Or manually
npm install -g netlify-cli
netlify deploy --prod
```

### Deploy to GitHub Pages
See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

---

## 📁 Project Structure

```
/workspace/
├── src/
│   ├── App.jsx          # Main application component
│   ├── main.jsx         # Application entry point
│   └── index.css        # Tailwind CSS + custom styles
├── dist/                # Production build output
├── index.html           # HTML template
├── package.json         # Project dependencies
├── vite.config.js       # Vite configuration
├── tailwind.config.js   # Tailwind CSS configuration
├── postcss.config.js    # PostCSS configuration
├── vercel.json          # Vercel deployment config
├── netlify.toml         # Netlify deployment config
├── deploy.sh            # Quick deploy helper script
├── DEPLOYMENT.md        # Detailed deployment guide
├── QUICK_START.md       # Quick start guide
└── README.md            # This file
```

---

## 🎯 Usage

### Step 1: Configure Fleet
1. Add vehicle types by clicking "**+ Ajouter un type de véhicule**"
2. Select energy type (Diesel, Elec, bioGNC, etc.)
3. Fill in vehicle parameters:
   - Label/name
   - Number of vehicles
   - Consumption data
   - Annual distance
   - Purchase price
   - Energy-specific parameters

### Step 2: Other Input Data
Configure station and financial parameters:
- Gas network inlet pressure
- Compressor operating hours
- Storage pressure
- Station depreciation period
- Department registration number
- Interest rates and inflation
- Tax options (TICPE, suramortissement)

### Step 3-6: Energy Options
Configure specific options for each energy type:
- **GNC:** Sound insulation, dryer, dispenser type, etc.
- **H₂:** On-site electrolyser option
- **Élec:** Fast charging power
- **Diesel:** On-site tank and station

### Step 7: Summary & Export
- Review all configuration
- Export as JSON file
- Share configuration data

---

## 🛠️ Technology Stack

- **React 18.2** - UI framework
- **Vite 5.4** - Build tool & dev server
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **PostCSS** - CSS transformations
- **Modern JavaScript (ES6+)** - Latest language features

---

## 🎨 UI Components

### Reusable Components
- `Label` - Form labels with optional hints
- `Input` - Text/number input with validation
- `Select` - Dropdown selector
- `YesNo` - Toggle button for boolean values
- `Card` - Content container with header
- `Stepper` - Progress indicator for wizard

### Color Coding
- **Electric:** Blue theme
- **bioGNC:** Green theme
- **Hydrogen:** Purple theme
- **B100/HVO:** Orange/Amber theme
- **Diesel:** Gray theme

---

## 📝 Configuration Schema

The application uses a nested JSON structure:

```json
{
  "fleet": {
    "vehicleTypes": [...]
  },
  "otherInputs": {...},
  "optionsGNC": {...},
  "optionsH2": {...},
  "optionElec": {...},
  "optionDiesel": {...}
}
```

See exported JSON for complete structure.

---

## 🔧 Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Adding New Features

1. Edit `src/App.jsx` for component logic
2. Modify `src/index.css` for custom styles
3. Update `tailwind.config.js` for theme customization

---

## 📱 Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

---

## 🐛 Troubleshooting

### Build Issues
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json dist
npm install
npm run build
```

### Port Already in Use
```bash
# Development server on different port
npm run dev -- --port 3000

# Preview server on different port
npm run preview -- --port 4174
```

---

## 📄 License

Private project - All rights reserved

---

## 👥 Support

For questions or issues:
1. Check [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment help
2. Check [QUICK_START.md](./QUICK_START.md) for usage guide
3. Review Vite/React documentation

---

## 🎯 Deployment URLs

Once deployed, your app will be available at:

- **Vercel:** `https://[your-project].vercel.app`
- **Netlify:** `https://[your-site].netlify.app`
- **GitHub Pages:** `https://[username].github.io/[repo]`

---

## ✅ Ready to Deploy

Your app is **production-ready** with:
- ✅ Optimized build
- ✅ All dependencies installed
- ✅ Deployment configs ready
- ✅ Modern UI/UX
- ✅ Mobile responsive
- ✅ Cross-browser compatible

**Run `./deploy.sh` to get started!** 🚀

---

Made with 💚 for sustainable mobility
