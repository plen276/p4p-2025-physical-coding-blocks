# Physical Coding Blocks - Web Interface

A modern web interface for managing and controlling Physical Coding Blocks, built with Next.js 15 and TypeScript. This application provides a robust interface for managing Pico devices, robots, and their assignments.

## Features

- Real-time device status monitoring
- Robot and Pico device management
- Assignment management between robots and Picos
- Responsive design with dark/light mode support
- Command execution and monitoring
- Live status updates and notifications

## Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) with App Router
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Database:** SQLite with [Prisma](https://www.prisma.io/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [Radix UI](https://www.radix-ui.com/)
- **State Management:** React Hooks + Server Components
- **Development Tools:**
  - [Turbopack](https://turbo.build/pack) for fast builds
  - [ESLint](https://eslint.org/) for code linting
  - [Prettier](https://prettier.io/) for code formatting

## Project Structure

```bash
software/
├── app/                    # Next.js app router pages and components
│   ├── api/               # API routes for Pico and Robot management
│   ├── assignments/       # Assignment management interface
│   ├── commands/         # Command execution interface
│   ├── picos/           # Pico device management
│   └── robots/          # Robot management
├── components/            # Reusable UI components
│   ├── ui/              # Base UI components (buttons, cards, etc.)
│   └── sidebar/         # Navigation components
├── lib/                   # Utility functions and database operations
│   ├── database/        # Database operations and queries
│   └── types/          # TypeScript type definitions
└── prisma/               # Database schema and migrations
```

## Getting Started

### Prerequisites

- Node.js 18+ and pnpm
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

3. Set up the database:

   ```bash
   pnpm run db:push      # Initialize the database
   pnpm run db:seed      # Seed with sample data
   ```

4. Start the development server:

   ```bash
   pnpm run dev
   ```

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

- **Pico**: Manages Pico device information and status
- **Robot**: Tracks robot information and connectivity
- **Assignment**: Links Picos with Robots
- **Command**: Stores commands for execution
- **Notification**: System notifications and alerts

### Database Operations

#### Development Workflow

1. Make changes to `prisma/schema.prisma`
2. Apply changes using one of these methods:

   ```bash
   # For versioned migrations (recommended)
   pnpm run db:migrate -- name <migration-name>

   # For quick prototyping
   pnpm run db:push
   ```

3. Explore data using Prisma Studio:

   ```bash
   pnpm run db:studio
   ```

## 🔧 Development

### Code Style

- Use TypeScript for type safety
- Follow ESLint rules
- Format with Prettier
- Use Next.js best practices and Server Components where appropriate

### Architecture

- Uses Next.js App Router for routing
- Server Components for data fetching
- Client Components for interactivity
- Prisma for database operations
- Radix UI for accessible components

### Adding New Features

1. Create new components in the appropriate directory
2. Update Prisma schema if needed
3. Add API routes if required
4. Update types in `lib/types`
5. Add UI components to relevant pages

## Database Management

After changing db

```shell
pnpm run db:migrate -- --name <name>
```

To explore the db

```shell
pnpm run db:studio
```

Either run

```bash
pnpm run db:migrate -- --name <name>
```

or

```bash
pnpm run db:push
```

both will run `prisma generate` under the hood

### Apply schema changes

#### Versioned migrations (recommended)

```bash
pnpm run db:migrate -- --name <migration-name>
```

- Creates a migration file
- Applies changes to your database
- Automatically runs `prisma generate`

#### Quick prototype (no migration files)

```bash
pnpm run db:push
```

- Updates the database directly from `schema.prisma`
- Automatically runs `prisma generate`
- Great for experimenting or local dev

### Explore the database

```bash
pnpm run db:studio
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
