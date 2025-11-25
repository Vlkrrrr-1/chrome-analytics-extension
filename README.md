# Activity Analytics - Chrome Extension

Professional Chrome extension for tracking and analyzing user activity metrics with real-time analytics dashboard.

## Features

- **Real-time Activity Tracking**: Monitor user interactions, page views, scrolling behavior
- **Performance Metrics**: Track TTFB (Time To First Byte), page load times
- **Media Analytics**: Monitor video/audio playback events
- **Customizable Settings**: Control tracking for different event types
- **Privacy-Focused**: Incognito mode support with configurable tracking
- **Data Export**: Export analytics data to CSV or JSON formats
- **IndexedDB Storage**: Efficient local storage for analytics events

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **UI Framework**: Chakra UI
- **Build Tool**: Vite
- **Database**: IndexedDB (via idb library)
- **Code Quality**: ESLint + TypeScript strict mode
- **Architecture**: Clean Architecture with separation of concerns

## Project Structure

```
src/
├── background/
│   └── index.ts                    # Background service worker
│
├── content/                        # Content script (modular)
│   ├── index.ts                    # Clean entry point (27 lines)
│   ├── state/
│   │   └── settings.ts             # Settings management
│   ├── trackers/                   # Modular event trackers
│   │   ├── activity.ts             # Activity tracking
│   │   ├── media.ts                # Media events
│   │   ├── pageView.ts             # Page views
│   │   ├── performance.ts          # Performance metrics
│   │   └── scroll.ts               # Scroll tracking
│   └── utils/
│       ├── eventQueue.ts           # Event filtering
│       └── session.ts              # Session management
│
├── popup/                          # Extension popup UI
│   ├── index.tsx
│   ├── Popup.tsx
│   ├── types.ts                    # All popup types
│   ├── sections/                   # Main sections
│   │   ├── BasicSection.tsx
│   │   ├── ProSection.tsx
│   │   └── EnterpriseSection.tsx
│   ├── layout/                     # Layout components
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── shared/                     # Reusable UI components
│   │   ├── animations.ts           # All keyframe animations
│   │   ├── Card.tsx
│   │   ├── ToggleSwitch.tsx
│   │   └── IncognitoToggle.tsx
│   └── pages/
│       └── EventsList.tsx
│
└── shared/                         # Shared code across all contexts
    ├── constants/
    │   └── index.ts                # App constants
    ├── hooks/                      # React hooks
    │   ├── useAnalytics.ts
    │   ├── useCurrentTab.ts
    │   └── useStorageState.ts
    ├── services/                   # Business logic
    │   └── db.ts                   # IndexedDB wrapper
    ├── types/                      # TypeScript types
    │   ├── events.ts               # Event types (discriminated unions)
    │   └── index.ts
    └── utils/                      # Utility functions
        ├── export.ts               # CSV/JSON export
        └── formatters.ts           # Date/time formatting
```

## Installation

### For Development

1. Clone the repository:
```bash
git clone <your-repo-url>
cd my-extension
```

2. Install dependencies:
```bash
npm install
```

3. Build the extension:
```bash
npm run build
```

4. Load in Chrome:
   - Open `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the `dist` folder

### For Production

```bash
npm run build
```

The production build will be in the `dist/` folder.

## Development

```bash
# Development mode with hot reload
npm run dev

# Type checking
npm run lint

# Build for production
npm run build
```

## Architecture Highlights

### Type-Safe Event System
- Discriminated union types for all analytics events
- Single source of truth for event types using `as const`
- Compile-time type safety with TypeScript

### Clean Architecture
- **Separation of Concerns**: Types, Utils, Services, Components
- **DRY Principle**: Shared utilities, formatters, and hooks
- **Single Responsibility**: Each module has one clear purpose

### Performance Optimizations
- Debounced scroll tracking
- Efficient IndexedDB queries with filtering
- React hooks for optimized re-renders
- Helper functions to eliminate code duplication

### Code Quality
- JSDoc comments for all public APIs
- Descriptive function and variable names
- No magic numbers - all constants extracted
- Error handling throughout

## Features Breakdown

### Basic Tier
- Active time tracking
- Data collection on/off toggle
- Export to CSV/JSON
- Clear all data

### Pro Tier
- Average scroll depth
- Unique pages visited
- Active events count
- Incognito mode tracking
- Click/interaction tracking toggle

### Enterprise Tier
- Average TTFB metrics
- Media events tracking
- Events per minute
- Average latency
- Comprehensive analytics dashboard

## Browser Support

- Chrome 90+
- Edge 90+
- Any Chromium-based browser

## Privacy

- All data stored locally in IndexedDB
- No data sent to external servers
- Configurable incognito mode tracking
- User has full control over data

## License

MIT

## Author

[Your Name] - [Your Email/GitHub]

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Acknowledgments

- Built with React and TypeScript
- UI powered by Chakra UI
- Storage via IndexedDB (idb library)
