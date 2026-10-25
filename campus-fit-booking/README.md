# CampusFit — Premium Gym Website

A React + Vite gym/class-booking project built around the Project 22 learning objectives.

## Run in VS Code

1. Extract the ZIP.
2. Open the `campus-fit-booking` folder in VS Code. **Open the folder that contains `package.json`.**
3. Open Terminal → New Terminal.
4. Run:

```bash
npm install
npm run dev
```

5. Open the local URL shown by Vite (normally `http://localhost:5173`).

For a production check:

```bash
npm run build
```

## Features

- Premium responsive gym landing page
- Sticky responsive navbar
- Home, Exercises, Diet, Classes, Membership, Trainers, About and Contact
- Exercise search and category filters
- Nutrition/meal section
- Membership pricing
- Class search, category filtering and booking
- Full-class waitlist behavior
- Simulated live capacity polling
- Next-class countdown
- Dark/light theme
- Toast notifications
- React StrictMode

## Project 22 — useEffect viva notes

### Search race condition
`useRaceSafeSearch()` starts a simulated request whenever the search text changes. Each request gets an `AbortController` and a request id. The cleanup function aborts the previous request and clears its timer. This prevents an older, slower search from overwriting the result of a newer search.

### Polling cleanup
The live class capacity uses `setInterval`. The effect returns:

```js
return () => window.clearInterval(interval);
```

This teardown prevents the interval from continuing after the component unmounts.

### Countdown cleanup
The countdown also uses `setInterval` and returns `clearInterval` during cleanup.

### Derived state
Filtered exercises/classes are derived from existing state during render with `useMemo`; they are not unnecessarily copied into another state variable through `useEffect`.

### StrictMode
`src/main.tsx` wraps the application in `React.StrictMode`, allowing development-time effect behavior to expose cleanup mistakes.

## Tech

- React
- Vite
- TypeScript/TSX
- Custom CSS
- Lucide icons were removed from the main UI to keep the implementation simple and CSS/HTML focused.

## Note

The remote Unsplash images are used as visual placeholders. Replace them with your own licensed gym images before a real commercial deployment.
