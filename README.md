<div align="center">
  <h1>🌐 Find Country App</h1>
</div>

<div align="center">
  A modern React Router framework-mode app powered by the REST Countries API.<br />
</div>

<div align="center">
  from Frontend Mentor Challenges
</div>

### Stack

- Bun
- TypeScript, Vite, React 19, and React Router framework mode
- TanStack Query
- shadcn/ui Base UI components and Tailwind CSS utilities

### Setup

#### `bun install`

Installs the locked Bun dependencies.

#### `bun run dev`

Runs the app in development mode. Open the URL printed by Vite.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

#### `bun run typecheck`

Generates React Router route types and checks the TypeScript project.

#### `bun run build`

Builds the framework-mode SPA for production in `build/client`.

Country data is bundled from the [official REST Countries repository](https://github.com/restcountries/restcountries). This avoids exposing a v5 API key in the browser; run `bun run update-country-data` to refresh the snapshot.

### Features
* See all countries from the API on the homepage
* Search for a country using an input field
* Filter countries by region
* Click on a country to see more detailed information on a separate page
* Click through to the border countries on the detail page
* Toggle the color scheme between light and dark mode
