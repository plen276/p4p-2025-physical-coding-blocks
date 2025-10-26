# Physical Coding Blocks - Web Server

A central connection server that facilitates communication between Pico devices and robots in the TUI (Tangible User Interface) system. Built with [Next.js 15](https://nextjs.org/) and TypeScript, it manages device registration, command routing, and real-time status updates. The server includes a web interface for monitoring and managing device connections, assignments, and command queues.

## Features

- Real-time device status monitoring
- Robot and Pico device management
- Assignment management between robots and picos
- Responsive design with dark/light mode support
- Command execution and live monitoring
- Live status updates and notifications

## Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) with App Router
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Database:** SQLite with [Prisma](https://www.prisma.io/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [shadcn UI](https://ui.shadcn.com/)
- **State Management:** React Hooks + Server Components
- **Development Tools:**
  - [Turbopack](https://turbo.build/pack) for fast builds
  - [ESLint](https://eslint.org/) for code linting
  - [Prettier](https://prettier.io/) for code formatting

## Project Structure

```bash
software/
├── app/                    # Next.js app router pages and components
│   ├── api/                # API endpoints for device management
│   │   ├── pico/           # Pico registration, commands, and live status
│   │   └── robot/          # Robot registration and command retrieval
│   ├── assignments/        # Device pairing and connection management page
│   ├── commands/           # Command queue monitoring page
│   ├── picos/              # Pico device status and configuration
│   └── robots/             # Robot status and assignment control
├── components/             # Shared UI components
│   ├── ui/                 # shadcn UI components (buttons, cards, etc.)
│   └── sidebar/            # Navigation and layout components
├── lib/                    # Utility functions and database operations
│   ├── database/           # Database operations and queries
│   └── types/              # TypeScript type definitions
└── prisma/                 # Database schema and migrations
```

### Page Structure

```bash
/
├── _components_/           # Page-specific components
├── loading.tsx             # Loading state while data fetches
└── page.tsx                # Main page component with server-side data fetching
```

## Getting Started

### Prerequisites

- [Node.js 18+](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) and [pnpm](https://pnpm.io/installation)
- Git
- VS Code (recommended)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/plen276/p4p-2025-physical-coding-blocks.git
   cd p4p-2025-physical-coding-blocks/software
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Copy the environment example file:

   ```bash
   cp .env.example .env
   ```

4. Set up the database:

   ```bash
   pnpm db:push      # Initialize the database
   pnpm db:seed      # Seed with sample data (optional)
   ```

5. Start the development server:

   ```bash
   pnpm dev
   ```

This will start the development server with Turbopack. Open <http://localhost:3000> with your browser to see the result.

### Available Scripts

- `dev` - Start development server with Turbopack
- `dev:test` - Reset DB, seed with test data, and start server
- `build` - Build for production
- `start` - Start production server
- `lint` - Run ESLint
- `format` - Format code with Prettier
- `format:fix` - Format and fix linting issues
- `db:migrate` - Run Prisma migrations
- `db:push` - Push schema changes to database
- `db:studio` - Open Prisma Studio
- `db:seed` - Reset and seed database
- `db:reset` - Reset database

## Mobile Access

The application provides QR codes for easy mobile access:

1. Scan the Wi-Fi QR code to connect to the network
2. Scan the URL QR code to open the interface
3. Control and monitor devices from your mobile device

## Database Schema

Key models in the application:

- **Pico**: Pico device information and status
- **Robot**: Robot information and status
- **Assignment**: Links Picos with Robots
- **Command**: Stores commands for execution
- **Notification**: System notifications and alerts `(not implemented)`

### Database Operations

#### Development Workflow

1. Make changes to `prisma/schema.prisma`
2. Apply changes using one of these methods:

   ```bash
   # For versioned migrations (recommended)
   pnpm db:migrate -- name <migration-name>

   # For quick prototyping
   pnpm db:push
   ```

3. Explore data using Prisma Studio:

   ```bash
   pnpm db:studio
   ```

## Development

### Code Style & Standards

- **TypeScript**
  - Use strict type checking
  - Define interfaces for all data structures in `lib/types`
  - Avoid `any` types except in edge cases
- **ESLint & Prettier**
  - ESLint rules are configured in `eslint.config.mjs`
  - Run `pnpm lint` to check for issues
  - Format on save is enabled for VS Code
  - Run `pnpm format:fix` to format all files

### Architecture Principles

- **Server Components (Default)**
  - Use for data fetching and static content
  - Place in `app/**/page.tsx` and non-interactive components
- **Client Components**
  - Mark with `"use client"` directive
  - Use for interactive features
  - Keep state management close to where it's needed
- **Data Flow**
  - Database operations in `lib/database/*`
  - API routes handle device communication
  - Server actions for form submissions and database fetches
  - Client-side state for UI interactions

### Component Organization

- **Page Components**
  - Place in `app/**/page.tsx`
  - Handle data fetching and layout
  - Split complex UI into smaller components
- **Shared Components**
  - Place reusable UI in `components/`
  - Create new folders for related components
- **Loading States**
  - Implement `loading.tsx` for each route
  - Use skeleton components from shadcn/ui
  - Show loading indicators for async actions

### UI Development with shadcn/ui

This project uses [shadcn/ui](https://ui.shadcn.com/) for component primitives:

- Install new components:

  ```bash
  pnpm dlx shadcn@latest add
  ```

- Available components:
  - Check [shadcn/ui docs](https://ui.shadcn.com/docs/components) for options
  - Components are copied to `components/ui/`
  - Can be customized after installation

### Adding New Features

1. **Plan the Feature**
   - Determine server/client component split
   - Identify required database changes
   - Plan API endpoints if needed

2. **Implementation Steps**
   - Add/update database models in `schema.prisma`
   - Create/update API routes if needed
   - Add type definitions in `lib/types`
   - Implement database operations in `lib/database`
   - Create UI components and pages

3. **Testing & Validation**
   - Test API endpoints with Postman/curl
   - Verify database operations
   - Check UI in different states
   - Test error scenarios

## Database Management

### Apply schema changes

#### Versioned migrations (recommended)

```bash
pnpm db:migrate -- --name <migration-name>
```

- Creates a migration file
- Applies changes to your database
- Automatically runs `prisma generate`

#### Quick prototype (no migration files)

```bash
pnpm db:push
```

- Updates the database directly from `schema.prisma`
- Automatically runs `prisma generate`
- Great for experimenting or local dev

### Explore the database

```bash
pnpm db:studio
```

- Opens a visual GUI for inspecting and editing your data

### Notes

- `prisma generate` runs automatically after `migrate dev` or `db push`
- Use `migrate dev` for tracked, versioned schema changes
- Use `db push` for fast iteration or prototyping

## API Routes

The application provides several API endpoints for device management and communication:

### Pico Endpoints

#### Register Pico

- **URL:** `/api/pico/register`
- **Method:** `POST`
- **Body:**

  ```json
  {
    "macAddress": "string"
  }
  ```

- **Success Response:**

  ```json
  {
    "text": "Pico <macAddress> has been registered with the server"
  }
  ```

- **Description:** Registers a new Pico device or updates its online status. Sets status to "online" and updates lastSeen timestamp.

#### Pico Commands

- **URL:** `/api/pico/commands`
- **Method:** `POST`
- **Body:**

  ```json
  {
    "macAddress": "string",
    "commands": string[]  // Array of command strings
  }
  ```

- **Success Response:**

  ```json
  {
    "text": "Commands added to queue: <number>"
  }
  ```

- **Description:** Queues commands for a specific Pico device. Commands are stored in the database until processed.

#### Pico Live Status

- **URL:** `/api/pico/live`
- **Methods:** `GET`, `POST`
- **GET Query Parameters:**
  - `macAddress`: The MAC address of the Pico device
- **POST Body:**

  ```json
  {
    "macAddress": "string",
    "commands": any[]  // Commands data
  }
  ```

- **GET Response:**

  ```json
  {
    "commands": any[]  // Current live commands for the device
  }
  ```

- **POST Response:**

  ```json
  {
    "success": true
  }
  ```

- **Description:** Manages real-time command updates between Picos and the server

### Robot Endpoints

#### Register Robot

- **URL:** `/api/robot/register`
- **Method:** `POST`
- **Body:**

  ```json
  {
    "macAddress": "string"
  }
  ```

- **Success Response:**

  ```json
  {
    "text": "Robot <macAddress> has been registered with the server"
  }
  ```

- **Description:** Registers a new robot or updates its status. Sets status to "online" and updates lastSeen timestamp.

#### Robot Commands

- **URL:** `/api/robot/commands`
- **Method:** `GET`
- **Query Parameters:**
  - `macAddress`: The MAC address of the robot
- **Success Response:**

  ```json
  {
    "commands": string[]  // Array of commands from the assigned Pico
  }
  ```

- **Description:** Retrieves pending commands for the robot from its assigned Pico. Marks retrieved commands as read.

### Error Responses

All endpoints follow a standard error response format:

```json
{
  "error": "Error message description"
}
```

Common HTTP status codes:

- `200`: Success
- `400`: Bad Request (missing or invalid parameters)
- `404`: Not Found (robot/Pico not found or no active assignment)
- `500`: Server Error (database errors or invalid JSON)

### Notes

- All POST requests require JSON content type
- Commands are queued in the database until marked as read
- The system maintains active assignments between Picos and Robots
- Live status updates use a separate in-memory storage system
- All endpoints include detailed logging for debugging

### Testing API Endpoints

#### Pico Endpoints

1. Register Pico:

   ```bash
   curl -X POST http://localhost:3000/api/pico/register \
     -H "Content-Type: application/json" \
     -d "{\"macAddress\": \"AA:BB:CC:DD:EE:FF\"}"
   ```

2. Send Commands from Pico:

   ```bash
   curl -X POST http://localhost:3000/api/pico/commands \
     -H "Content-Type: application/json" \
     -d "{\"macAddress\": \"AA:BB:CC:DD:EE:FF\", \"commands\": [\"AAAAAAAAAA\", \"BBBBBBBBBB\", \"DDDDDD\"]}"
   ```

3. Live Feed of Commands from Pico:

   ```bash
   # GET current commands (used to display in UI)
   curl -X GET "http://localhost:3000/api/pico/live?macAddress=AA:BB:CC:DD:EE:FF"

   # POST new commands
   curl -X POST http://localhost:3000/api/pico/live \
     -H "Content-Type: application/json" \
     -d "{\"macAddress\": \"AA:BB:CC:DD:EE:FF\", \"commands\": [\"A\", \"BB\", \"DDD\"]}"
   ```

#### Robot Endpoints

1. Register Robot:

   ```bash
   curl -X POST http://localhost:3000/api/robot/register \
     -H "Content-Type: application/json" \
     -d "{\"macAddress\": \"AA:BB:CC:DD:EE:FF\"}"
   ```

2. Get Robot Commands:

   ```bash
   # Get commands for a specific robot
   curl -X GET "http://localhost:3000/api/robot/commands?macAddress=AA:BB:CC:DD:EE:FF"
   ```

Notes:

- Replace `AA:BB:CC:DD:EE:FF` with actual MAC addresses
- All POST requests require `Content-Type: application/json` header
- Commands are examples; use actual command strings for your devices

## FAQ

<details>
<summary>Are the search bars and filters meant to work?</summary>
<ul>
  <li>
  Yeah, but I was too lazy to spend too much time on linking the search feature for most of the pages
  </li>
</ul>
</details>

<details><summary>Does the notifications type do anything?</summary>

<ul><li>Nope I was too lazy to implement that too :) so you can have a look at `notification-controller.tsx` as a start</li></ul></details>
