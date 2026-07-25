<div align="center">
  <img src="https://raw.githubusercontent.com/cartova-app/cartova/main/logo2.png" alt="Cartova Logo" width="300"/>

  <h1>Cartova User Dashboard</h1>
  <p><strong>The intuitive dashboard for merchants to manage their stores</strong></p>

  <p>
    <a href="https://cartova.dev">Website</a> •
    <a href="https://github.com/cartova-app/cartova/issues">Issues</a> •
    <a href="https://github.com/cartova-app/cartova/discussions">Community</a>
  </p>

  <p>
    <a href="https://github.com/cartova-app/user-dashboard/stargazers">
      <img src="https://img.shields.io/github/stars/cartova-app/user-dashboard?style=for-the-badge&color=FFB000" alt="Stars" />
    </a>
    <a href="https://github.com/cartova-app/user-dashboard/blob/main/LICENSE">
      <img src="https://img.shields.io/badge/License-ELv2-FFB000?style=for-the-badge" alt="License" />
    </a>
  </p>
</div>

---

> [!WARNING]
> 🚧 **Work in Progress:** Cartova is currently under heavy development. The APIs, architecture, and features are subject to change. It is **NOT** ready for production use yet. Please stay tuned for our first stable release!

## About
This repository houses the main management dashboard for Cartova merchants, providing them with all the necessary tools to monitor and configure their e-commerce storefronts.

## Software Architecture

### Core Technologies
- **React & Vite:** Fast frontend rendering and lightning-fast Hot Module Replacement (HMR).
- **TypeScript:** Strict type-safety across all domains and payload interactions.

### Directory Structure (Feature-Sliced Design)
The dashboard strictly adheres to a Domain-Driven / Feature-Sliced architectural pattern to prevent tight coupling as the application scales.
- `src/app/`: Application core. Handles global initialization, routing providers, and global styles.
- `src/core/`: Domain-agnostic modules. Contains generic UI `components`, shared `hooks`, structural `layouts`, and utility functions (`utils`).
- `src/feature/`: The heart of the business logic. It is divided into bounded contexts:
  - `assistant`: AI chat interface components.
  - `auth`: Authentication flows and user sessions.
  - `organization` & `team`: Multi-tenant management and RBAC.
  - `profile`: User specific settings.
  - `store`: E-commerce store management layers.
- `src/types/`: Global TypeScript definitions and API payload interfaces.

### Data Flow
Features encapsulate their own state. Global state is provided via React Context in `src/core/providers/`, ensuring that feature modules remain decoupled and independently testable.

## Getting Started

### Prerequisites
- Node.js
- `pnpm`

### Installation & Execution
```bash
# 1. Clone the repository
git clone https://github.com/cartova-app/user-dashboard.git
cd user-dashboard

# 2. Install dependencies
pnpm install

# 3. Start the development server
pnpm dev
```

## License

Cartova is licensed under the **Elastic License 2.0 (ELv2)**. 

In short, you can run, modify, and host the software for your own ecommerce stores or clients. However, you **may not** offer the software to third parties as a managed service (SaaS), nor may you use it to offer a competing ecommerce builder, website builder, or software development platform. For the full legal terms, please read the [LICENSE](./LICENSE).
