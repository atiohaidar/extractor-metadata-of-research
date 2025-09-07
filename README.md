# Journal Metadata Extractor - React Application

A modular React application for extracting metadata from journal articles. This project has been converted from a single HTML file to a maintainable React application with proper component separation and modern hooks.

## 🚀 Features

- **URL-based extraction**: Extract metadata from journal URLs
- **HTML content extraction**: Parse metadata from HTML content directly
- **Sinta journal integration**: Fetch additional information from Sinta database
- **SCImago integration**: Get journal quartile and ranking information
- **Drag & drop support**: Drop URLs directly onto the page
- **Global paste handler**: Paste URLs or HTML anywhere on the page
- **Real-time loading animations**: Beautiful loading states with progress tracking
- **Mobile responsive**: Works on all device sizes

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── Layout.jsx       # Main layout wrapper
│   ├── Header.jsx       # Page header
│   ├── GlowBlobs.jsx    # Animated background effects
│   ├── InputForm.jsx    # Main input form with tabs
│   ├── UrlForm.jsx      # URL input component
│   ├── HtmlForm.jsx     # HTML input component
│   ├── ErrorAlert.jsx   # Error display component
│   ├── WelcomeMessage.jsx # Welcome/instructions component
│   ├── ResultsContainer.jsx # Results wrapper
│   ├── MetadataTable.jsx    # Metadata display table
│   ├── AdditionalInfo.jsx   # Additional metadata info
│   ├── SintaCard.jsx        # Sinta journal information
│   ├── ScimagoCard.jsx      # SCImago journal information
│   ├── JournalPreview.jsx   # Journal website preview
│   ├── LoadingOverlay.jsx   # Loading animation overlay
│   ├── DragOverlay.jsx      # Drag and drop overlay
│   ├── IntroOverlay.jsx     # Welcome intro animation
│   └── index.js             # Component exports
├── hooks/                # Custom React hooks
│   ├── useJournalExtractor.js # Main data fetching logic
│   ├── useDragAndDrop.js     # Drag & drop functionality
│   ├── usePasteHandler.js    # Global paste handling
│   └── index.js              # Hook exports
├── services/             # API and external services
│   └── api.js           # API calls and data fetching
├── utils/               # Utility functions and constants
│   ├── constants.js     # Application constants
│   ├── helpers.js       # Helper functions
│   └── index.js        # Utility exports
├── styles/             # Styling
│   └── global.css      # Global styles (extracted from original HTML)
├── App.jsx             # Main application component
└── main.jsx           # React application entry point
```

## 🛠️ Technology Stack

- **React 18**: Modern React with hooks
- **Vite**: Fast build tool and development server
- **Bootstrap 5**: UI framework
- **Bootstrap Icons**: Icon library
- **Custom CSS**: Extracted and modularized from original design

## 🎨 Design Philosophy

The application maintains the exact same visual design as the original HTML file while implementing modern React best practices:

- **Component separation**: Each UI element is a separate, reusable component
- **Custom hooks**: Business logic is extracted into reusable hooks
- **State management**: Clean state management using React hooks
- **Maintainability**: Modular structure for easy maintenance and testing
- **Type safety**: JSDoc comments for better IDE support

## � Deployment

### GitHub Pages
This application is automatically deployed to GitHub Pages using GitHub Actions.

**Live Demo**: [https://atiohaidar.github.io/extractor-metadata-of-research/](https://atiohaidar.github.io/extractor-metadata-of-research/)

#### Automatic Deployment
- Push to `master` branch triggers automatic deployment
- GitHub Actions workflow builds and deploys the app
- Available at the GitHub Pages URL within minutes

#### Manual Deployment
You can also trigger deployment manually from the Actions tab in GitHub.

### Local Development

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Build for GitHub Pages
```bash
npm run build:github
```

### Preview Production Build
```bash
npm run preview
```

## 📖 Usage

### Basic Usage
1. Open the application in your browser
2. Use the URL tab to extract metadata from a journal URL
3. Use the HTML tab to extract metadata from HTML content
4. View extracted metadata, Sinta info, and SCImago data

### Advanced Features
- **Drag & Drop**: Drag URLs directly onto the page
- **Global Paste**: Press Ctrl+V anywhere to paste URLs or HTML
- **Real-time Updates**: Automatic fetching of additional journal information

## 🔌 API Integration

The application integrates with several external APIs:
- **Main extraction API**: `https://api-ekstrak-web-jurnal.atiohaidar.workers.dev`
- **Sinta API**: `https://sinta-journal-api-production.atiohaidar.workers.dev`
- **SCImago API**: `https://scrape.scimago.workers.dev`

## 🎯 Key Components

### `useJournalExtractor` Hook
Manages the main data extraction logic with loading states and error handling.

### `useDragAndDrop` Hook
Handles drag and drop functionality with visual feedback.

### `usePasteHandler` Hook
Provides global paste functionality for improved UX.

### Component Architecture
Each component is self-contained with clear props interfaces and responsibilities.

## 🔄 State Management

The application uses React's built-in state management:
- **useState**: For component-level state
- **useEffect**: For side effects and lifecycle management
- **useCallback**: For performance optimization
- **Custom hooks**: For shared logic and state

## 🎨 Styling

Styles are organized in a single global CSS file (`src/styles/global.css`) that maintains the original design while being optimized for React:
- CSS custom properties for consistent theming
- Responsive design with Bootstrap classes
- Custom animations and transitions
- Dark/light theme support

## 🚀 Performance Optimizations

- **Component splitting**: Lazy loading ready structure
- **Memoization**: useCallback for expensive operations
- **Efficient re-renders**: Proper dependency arrays
- **Bundle optimization**: Vite's automatic code splitting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes following the established patterns
4. Test your changes
5. Submit a pull request

## 📄 License

This project maintains the same functionality as the original HTML application while providing a modern, maintainable React architecture.

The Code is generated by Github Copilot
