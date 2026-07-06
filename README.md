# PicobelloGo

Professional project foundation for a production-oriented textile cleaning web application.  
The current repository contains the first structured Angular frontend setup and is organized to support a secure full-stack expansion.

## Project Overview

PicobelloGo is being built as a real customer-facing application for a textile cleaning business. The goal is to let customers register garments for pickup and cleaning through a clean, accessible, and mobile-friendly ordering flow.

The intended MVP covers:

- Selecting service items from a price list
- Entering quantities per item
- Calculating the total price in real time
- Capturing customer contact and address data
- Choosing a pickup date
- Persisting the order
- Preparing operator notifications and future automation workflows

## Features

### Implemented

| Feature | Status | Notes |
|---|---|---|
| Angular application scaffold | Done | Standalone Angular application with routing bootstrap |
| Strict TypeScript configuration | Done | Strict compiler settings enabled |
| Feature-based frontend structure | Done | `core`, `shared`, and `features` areas prepared for scale |
| Public order form MVP | Done | Reactive Forms-based order page with live totals and customer inputs |
| Client-side validation | Done | Required fields, German phone pattern, postal code, pickup date, privacy consent |
| Mobile-first responsive layout | Done | Layout designed to remain usable down to 320px width |
| Starter test setup | Done | Jasmine/Karma test entry for the root component |

### Planned

| Feature | Status | Notes |
|---|---|---|
| Server-side order validation | Planned | Mirror client validation rules at the API boundary |
| Backend API | Planned | Node.js + Express + TypeScript |
| PostgreSQL database | Planned | Prisma-based schema and migrations |
| Admin area foundation | Planned | Architecture prepared, not yet implemented |
| Notifications and automations | Planned | Email, n8n, and messaging integrations |
| Containerized deployment | Planned | Docker, Docker Compose, Nginx, TLS |

## Tech Stack

### Current

| Layer | Technology |
|---|---|
| Frontend | Angular |
| Language | TypeScript |
| Styling | SCSS |
| Routing | Angular Router |
| Testing | Jasmine, Karma |
| Package Management | npm |

### Target Architecture

| Layer | Technology |
|---|---|
| Frontend | Angular, TypeScript, SCSS, Reactive Forms |
| Backend | Node.js, Express.js, TypeScript |
| Database | PostgreSQL, Prisma ORM |
| Validation | Angular Validators, Zod or equivalent server-side validation |
| Security | Helmet, CORS, rate limiting, secure password hashing |
| Deployment | Docker, Docker Compose, Nginx, Let's Encrypt |
| Automation | n8n, email integrations, future WhatsApp integration |

## Project Structure

The repository currently follows a lightweight Angular application layout:

```text
PicobelloGo/
├── angular.json
├── package.json
├── public/
├── src/
│   ├── app/
│   │   ├── core/
│   │   ├── features/
│   │   │   ├── admin/
│   │   │   └── public-order/
│   │   │       ├── data/
│   │   │       ├── models/
│   │   │       ├── pages/
│   │   │       └── validators/
│   │   ├── shared/
│   │   ├── app.component.spec.ts
│   │   ├── app.component.ts
│   │   ├── app.config.ts
│   │   └── app.routes.ts
│   ├── favicon.ico
│   ├── index.html
│   ├── main.ts
│   └── styles.scss
├── tsconfig.app.json
├── tsconfig.json
└── tsconfig.spec.json
```

## Installation

### Prerequisites

| Tool | Recommended Version |
|---|---|
| Node.js | 20 LTS or newer |
| npm | 10 or newer |
| Angular CLI | Optional globally, local CLI is already configured in scripts |

### Setup

```bash
npm install
```

## Environment Variables

No environment variables are required for the current frontend-only MVP scaffold.

For the planned full-stack setup, environment variables should be introduced through environment-specific files or container configuration. Expected examples:

```bash
NODE_ENV=development
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/picobellogo
CORS_ORIGIN=http://localhost:4200
JWT_SECRET=replace-with-secure-random-value
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100
```

Security note:

- Never commit secrets to the repository
- Store production secrets in a secure secret management or deployment environment
- Use separate values for local, staging, and production environments

## Running the Project

### Development Server

```bash
npm start
```

Default Angular development URL:

```text
http://localhost:4200
```

### Watch Build

```bash
npm run watch
```

## Docker Setup

Docker is planned but not yet implemented in this repository.

The intended production setup is:

- Angular frontend build served via Nginx
- Node/Express backend running in a separate container
- PostgreSQL as a dedicated database container or managed service
- TLS termination via Nginx and Let's Encrypt

When Docker support is added, this section should include:

- `Dockerfile` for frontend
- `Dockerfile` for backend
- `docker-compose.yml` for local development
- environment injection strategy
- reverse proxy and TLS configuration

## Database Setup

Database infrastructure is planned but not yet present in the repository.

Target database stack:

- PostgreSQL
- Prisma ORM

Planned core models:

- `Customer`
- `Order`
- `OrderItem`
- `ServiceItem`
- `AdminUser`

Once implemented, this section should document:

- local PostgreSQL setup
- Prisma schema location
- migration commands
- seeding commands
- backup and restore workflow

## Development Workflow

The current workflow is frontend-first, with the repository now containing the first working MVP form flow.

Recommended workflow:

1. Install dependencies with `npm install`
2. Start the Angular development server with `npm start`
3. Build features in small, isolated increments
4. Keep business logic typed, documented, and validation-focused
5. Update this README whenever architecture or setup changes

Engineering principles for this project:

- Clean Code
- SOLID
- DRY
- KISS
- Single Responsibility Principle
- strict typing by default

## Build Instructions

### Production Build

```bash
npm run build
```

Build output is generated in:

```text
dist/picobellogo
```

## Deployment

Deployment is not configured yet.

The target deployment model is expected to include:

- containerized services
- Nginx reverse proxy
- HTTPS with Let's Encrypt
- separate application and database layers
- environment-based configuration

Before production rollout, the project should include:

- CI/CD pipeline
- production-ready Docker images
- runtime health checks
- centralized logging
- backup strategy

## Security Features

### Current

- Strict TypeScript configuration
- `OnPush` change detection on the feature entry component
- Typed Reactive Forms with explicit validation rules
- Dependency separation between runtime and development tooling
- Project foundation ready for controlled environment-based configuration

### Planned

- Server-side validation for all incoming payloads
- Helmet for secure HTTP headers
- CORS hardening
- Rate limiting
- Secure password hashing with Argon2 or bcrypt
- Prisma-backed database access to reduce SQL injection risk
- XSS-aware input/output handling
- Structured error handling
- Logging and audit-friendly operational practices

## Validation

Validation rules are defined at the product level and should be enforced both client-side and server-side.

Planned MVP validation examples:

| Field | Rule |
|---|---|
| First name / Last name | Required, minimum 2 characters |
| Phone number | Required, valid German phone format |
| Email | Required, valid email address |
| Postal code | Required, 5-digit German ZIP code |
| Pickup date | Must not be in the past |
| Privacy consent | Required |

Current frontend validation already covers:

- required first and last name with minimum length
- German phone number pattern validation
- email validation
- 5-digit postal code validation
- pickup date not in the past
- privacy consent requirement
- at least one selected service item

Implementation direction:

- Angular form validation in the frontend
- shared validation strategy where practical
- server-side schema validation for trust boundaries

## API Overview

There is currently no backend API in this repository.

The planned API surface will likely include endpoints for:

- listing service items
- creating customer orders
- retrieving order summaries
- future admin authentication and order management

This section should be expanded once the backend contract is introduced.

## Folder Structure

### Current Frontend Folders

| Path | Purpose |
|---|---|
| `src/app/core` | Reserved location for singleton services, global infrastructure, and cross-cutting concerns |
| `src/app/shared` | Reserved location for reusable UI and shared utilities |
| `src/app/features/public-order` | Public customer-facing order flow including price list, validators, and MVP page |
| `src/app/features/admin` | Admin domain placeholder for future implementation |
| `src` | Angular entry files, global styles, and static app shell |
| `public` | Public static assets |

### Planned Expansion

An example future structure could look like this:

```text
src/
  app/
    core/
    shared/
    features/
      public-order/
      admin/
backend/
  src/
    modules/
    middleware/
    config/
prisma/
  schema.prisma
docker/
```

## Future Improvements

- Connect the public order feature to a real backend persistence layer
- Add backend API and Prisma schema
- Introduce database migrations and seed data
- Prepare admin architecture without exposing unfinished UI
- Add Docker-based local development
- Add CI checks for linting, tests, and production builds
- Add notification and automation integrations

## Architecture Notes

The repository is intentionally starting with a minimal Angular foundation rather than a premature full-stack implementation.

Key decisions so far:

- Standalone Angular bootstrap keeps the frontend lean and modern
- Strict TypeScript settings improve long-term maintainability
- Routing is initialized early to support modular growth
- The frontend is split by responsibility so feature logic can grow without turning `app/` into a flat file dump
- The first business flow is implemented with typed Reactive Forms so validation and API integration can evolve without refactoring the page architecture
- The structure leaves room for a future backend and admin domain without locking the project into accidental complexity

## License

No license has been defined yet.

If this project is intended for public portfolio use, add an explicit license before publishing the repository.
