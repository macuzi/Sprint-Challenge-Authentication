# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Sprint Challenge Authentication project - a Dad Jokes API with user authentication. The application requires users to register and login before accessing protected dad jokes endpoints. This is a Lambda School assessment project focused on implementing JWT authentication, password hashing, and middleware.

## Development Commands

**Start development server:**
```bash
npm run server
```

**Run tests:**
```bash
npm test
```

**Run tests in watch mode:**
```bash
npm run test
```

**Database operations:**
```bash
npx knex migrate:latest    # Run migrations
npx knex seed:run          # Run seeds
```

## Architecture Overview

### Authentication Flow
The application uses **JWT (JSON Web Tokens)** for authentication with the following flow:
1. User registers via `/api/auth/register` - password is hashed with bcryptjs
2. User logs in via `/api/auth/login` - receives JWT token
3. Protected routes require JWT token in Authorization header
4. `authenticate-middleware.js` validates tokens before granting access

### Route Structure
- **`/api/auth/register`** - User registration (POST)
- **`/api/auth/login`** - User login (POST)
- **`/api/jokes`** - Protected dad jokes endpoint (GET) - requires authentication

### Core Components

**Server Setup** (`api/server.js`):
- Express server with helmet, cors, and JSON middleware
- Routes: `/api/auth` (public) and `/api/jokes` (protected)
- Authentication middleware applied to jokes routes

**Authentication System** (`auth/`):
- `auth-router.js`: Register/login endpoints with bcrypt password hashing
- `auth-model.js`: Database operations for user management
- `authenticate-middleware.js`: JWT token validation middleware ⚠️ **INCOMPLETE**

**Database** (`database/`):
- SQLite database (`auth.db3`) configured via Knex
- User table with username/password fields
- Migrations available in `database/migrations/`

### Key Implementation Notes

**Authentication Issues:**
- `generateToken()` function in `auth-router.js` is missing return statement (line 61)
- `authenticate-middleware.js` is incomplete - currently blocks all requests
- JWT secret is hardcoded in auth-router.js (line 7)

**Database Configuration:**
- Uses SQLite for development via Knex ORM
- Database file: `./database/auth.db3`
- Knex configuration in `knexfile.js`

**External API Integration:**
- Jokes fetched from `https://icanhazdadjoke.com/search`
- Uses axios for HTTP requests

## Sprint Challenge Requirements

**MVP Tasks:**
1. Complete `register` and `login` functionality in `/auth/auth-router.js`
2. Implement `authenticate` middleware in `/auth/authenticate-middleware.js`
3. Write minimum 2 tests per API endpoint

**Key Features to Implement:**
- Password hashing with bcryptjs (✅ partially implemented)
- JWT token generation and validation (⚠️ needs completion)
- Protected route access control (❌ not implemented)

## Testing

Test files are located in the same directories as the modules they test:
- `auth/auth-router.test.js` - Authentication endpoint tests

Tests use Jest with supertest for API endpoint testing.

## Known Issues

1. **JWT Token Generation**: `generateToken()` function missing return statement
2. **Authentication Middleware**: Currently blocks all requests - needs JWT verification logic
3. **Hardcoded Secret**: JWT secret should be in environment variables
4. **Incomplete Tests**: Need to add comprehensive test coverage per requirements

## Database Schema

**Users Table:**
- `id` (primary key)
- `username` (unique, required)
- `password` (hashed, required)