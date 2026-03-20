# Admin Dashboard Module Federation

This repository contains a **micro-frontend (MF) admin dashboard** built using **Webpack 5 Module Federation**. The project integrates multiple remotes (React and Angular) into a React host application, sharing state via a framework-agnostic store.

---

## 🏗️ Project Structure
admin-dashboard-mf/
│
├─ host-admin/ # React Host Application
├─ remote-users/ # React Remote: Users Module
├─ remote-analytics/ # React Remote: Analytics Module
├─ remote-shared/ # Shared store module (RxJS)
├─ node_modules/ # Shared dependencies
├─ package.json # Root package.json for shared dependencies
├─ tsconfig.json # Root TypeScript config
└─ README.md # This file


---

## ⚡ Features

- **Host + Remote apps**  
  - Host app dynamically loads remote modules (`users`, `analytics`) at runtime.  
  - Remotes are independently deployable.

- **Shared state**  
  - `remote-shared` exposes a shared RxJS store (`selectedUser$`) for cross-app communication.  

- **Framework interoperability**  
  - Remotes can be React or Angular (via Angular Elements for custom elements).  

- **Module Federation setup**  
  - Each remote exposes a `remoteEntry.js` file.  
  - Host consumes remotes dynamically using Webpack Module Federation.  

---

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install

Make sure you are at the root of the repo.

2. Run Remote Apps

Each remote app must run independently for the host to consume it.

# Remote Users
cd remote-users
npm run start

# Remote Analytics
cd ../remote-analytics
npm run start

# Remote Shared
cd ../remote-shared
npm run start
3. Run Host App
cd ../host-admin
npm run start

The host app loads the remotes via Module Federation URLs.

⚙️ Shared State Usage

remote-shared/src/store.ts:

import { BehaviorSubject } from "rxjs";

export const selectedUser$ = new BehaviorSubject<string | null>(null);

export function selectedUser(name: string) {
  selectedUser$.next(name);
}

Example usage in a remote:

const store = await import("shared/store");
store.selectedUser("Hayes");

Example usage in Analytics remote:

const store = await import("shared/store");
store.selectedUser$.subscribe(setSelectedUser);
📌 Notes

Ensure all apps are running on their respective ports (default: 3000-3003).

Make sure remoteEntry.js URLs match in your host app Webpack configuration.

All apps share react and react-dom as singleton dependencies.

📦 Dependencies

React v19.x

RxJS v7.x

Webpack 5

TypeScript 5