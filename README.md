# Nexora

**Nexora is a business intelligence dashboard concept designed to help
business owners understand their revenue, orders, customers, and
products from one place.**

The project is organized as a multi-app workspace, with separate
applications for the landing page, authentication interface, main
dashboard, and backend.

> **Project status:** In development. The landing page and interface
> prototypes are being built. Backend services, database integration,
> and production authentication must be implemented and verified before
> the project can be considered production-ready.

## Project Goals

-   Present key business metrics in one clear dashboard.
-   Help users explore revenue, orders, customers, and product
    performance.
-   Provide a dedicated landing page and authentication experience.
-   Establish a foundation for connecting frontend applications to a
    backend API.
-   Keep the codebase organized as the project grows.

## Workspace Structure

``` text
NexoraApp/
├── NexoraLanding/    # Public landing page (React + Vite)
├── NexoraAuth/       # Authentication UI (React + Vite)
├── NexoraFrontend/   # Main business dashboard (React + Vite)
└── NexoraBackend/    # Backend API (planned / in development)
```

Each frontend folder is a separate Vite application and may have its own
`package.json`, dependencies, development server, and environment
configuration. The backend will have its own configuration and secrets.

## Planned Dashboard Areas

-   **Dashboard** --- key performance indicators and recent activity.
-   **Analytics** --- compare periods and explore business trends.
-   **Revenue** --- revenue performance over time.
-   **Customers** --- customer information and activity.
-   **Products** --- product performance.
-   **Orders** --- order records and statuses.
-   **Reports** --- business summaries.
-   **Settings** --- account and business preferences.

The final scope may change as development progresses. Demo or mock data
should not be treated as live business data.

## Tech Stack

### Current frontend foundation

-   React
-   Vite
-   JavaScript
-   HTML and CSS

### Planned backend and data layer

-   Node.js
-   Express
-   PostgreSQL

These backend technologies are planned choices; list them as implemented
only after the corresponding code and integration are in place.

## Getting Started

### Requirements

-   Node.js and npm
-   Git

### Run a frontend application

Choose the application you want to run:

``` bash
# Landing page
cd NexoraLanding
npm install
npm run dev
```

Or:

``` bash
# Authentication interface
cd NexoraAuth
npm install
npm run dev
```

Or:

``` bash
# Main dashboard
cd NexoraFrontend
npm install
npm run dev
```

Vite prints the local URL in the terminal. The default is commonly
`http://localhost:5173`, but if that port is already in use, Vite may
select another one.

> Run each command from the selected app's folder---the folder
> containing its `package.json`.

### Build a frontend

From the relevant frontend folder:

``` bash
npm run build
```

To preview the production build locally:

``` bash
npm run preview
```

## Environment Variables

Keep local environment settings out of Git. Create a local env file in
the root of the specific app that needs it, and commit a safe
`.env.example` template when useful.

Example frontend `.env.example`:

``` dotenv
VITE_APP_NAME=Nexora
VITE_API_BASE_URL=http://localhost:3000/api
```

Important security rules:

-   Never put passwords, database credentials, private API keys, or
    token-signing secrets in frontend variables.
-   Variables prefixed with `VITE_` are exposed to browser-side code
    when bundled.
-   Keep backend secrets in `NexoraBackend/.env`.
-   Ensure `.env`, `.env.local`, and other local env files are ignored
    by Git.
-   The example values above are placeholders; the API URL only works
    once a backend is running at that address.

## Security and Git Hygiene

-   Do not commit `node_modules/`, build output, or local secrets.
-   Keep `.gitignore` files in the relevant repositories or workspace
    root, depending on how Git is configured.
-   If a secret is accidentally pushed, remove it from use and
    rotate/revoke it. Deleting it in a later commit does not make the
    exposed secret safe again.
-   Do not describe demo authentication or mock data as
    production-secure or live-integrated.

## Screenshots and Demo

Screenshots and a live demo link can be added here once they are
available:

-   **Landing page:** to be added
-   **Authentication:** to be added
-   **Dashboard:** to be added
-   **Live demo:** not available yet

Suggested screenshot location:

``` text
docs/
└── screenshots/
    ├── landing.png
    ├── auth.png
    └── dashboard.png
```

Only add image links after the corresponding screenshot files exist in
the repository.

## Development Roadmap

-   [ ] Complete the React landing page.
-   [ ] Complete the authentication interface.
-   [ ] Build the main dashboard and its navigation.
-   [ ] Implement the backend API.
-   [ ] Connect a database and define business data models.
-   [ ] Implement and test secure authentication.
-   [ ] Connect the frontend applications to the API.
-   [ ] Add tests, deployment configuration, and screenshots.

## Contributing

This is an evolving development project. If you want to suggest an
improvement, open an issue describing the idea, the expected behavior,
and any relevant screenshots. For code contributions, create a focused
branch and submit a pull request.

## License

No license has been selected yet. Add a `LICENSE` file only after
deciding how the project may be used and redistributed. If you choose
the MIT License, update this section accordingly.

## Author

**TemurbekCode**

-   GitHub: [@TemurbekCode](https://github.com/TemurbekCode)
