# CRiB Interactive Prototype

**CRiB — Cloud Resource Integration Bridge** is a proposed web application for connecting supported cloud-storage accounts and browsing permitted resources through one consistent interface.

This repository contains the **current interactive Assessment 1 prototype**.

## Design → interactive prototype

The earlier team prototype was designed in **Penpot**. That Penpot version is the visual/design reference for the project: it defines the intended screens, navigation structure and file-browser experience.

The version in this repository is the next step: we are recreating that Penpot design as an **interactive website** using plain HTML, CSS and JavaScript so the user journey can be tested directly in a browser.

In other words:

**Penpot design reference → interactive browser prototype → later implementation**

The current browser prototype is temporarily hosted with **GitHub Pages** so it can be shared and reviewed easily.

Current prototype deployment:

`https://x-cloudy-x.github.io/crib-prototype/`

GitHub Pages is a temporary hosting choice for this prototype stage. A later implementation is expected to move to a **dedicated hosting platform**, but the team still needs to discuss and agree on the final deployment platform.

## What CRiB is trying to demonstrate

CRiB is intended to reduce the need to switch between separate cloud-provider interfaces.

The product direction is:

1. Connect supported cloud-storage accounts.
2. Present permitted files and folders through one consistent CRiB file browser.
3. Search and inspect resources through the same interface.
4. Open or download an eligible file through its provider.
5. Manage cloud connections from one place.

The current interactive prototype demonstrates this journey using **simulated Google Drive data first**.

OneDrive and Dropbox are visible as planned providers so the interface communicates the wider multi-provider direction without pretending those integrations already exist.

## Current prototype scope

This is an **interactive visual prototype**, not a production cloud-storage application.

It currently demonstrates:

- landing and product explanation;
- sign in and sign up;
- empty workspace state;
- provider selection;
- simulated Google Drive authorization;
- connected dashboard;
- unified file-browser concept;
- folders;
- search and filters;
- file details;
- simulated download action;
- connected-provider management;
- disconnect flow;
- expired-connection recovery;
- loading and no-results states.

The prototype does **not** use:

- real OAuth;
- real Google Drive API access;
- a backend;
- a database;
- real file downloads;
- real OneDrive or Dropbox integrations.

## Future direction vs. this prototype

The team has also discussed possible later capabilities such as:

- multiple active providers at the same time;
- moving files between storage providers;
- local storage or NAS integration.

Those ideas are part of the wider product direction, but they are **not presented as implemented features in this Assessment 1 prototype**.

A transfer workflow would require additional design work because users would need to clearly see both the source and destination storage locations. That should be designed deliberately rather than added as a misleading button to the current file browser.

## Navigation used in this version

The main application navigation is intentionally simple:

- **Dashboard**
- **Browse files**
- **Connected providers**

Provider connection and disconnection are handled in the same **Connected providers** area.

The user profile shown at the bottom of the sidebar is separate from provider management.

## Prototype flow

Primary flow:

**Landing → Sign in / Sign up → Empty dashboard → Add provider → Simulated authorization → Dashboard → Browse files → Open folder → Search → File details**

Provider flow:

**Connected providers → Add provider / Simulate error / Disconnect**

Error recovery:

**Connection error → Reconnect Google Drive → Simulated authorization → Dashboard**

## Technology

- HTML5
- CSS
- Vanilla JavaScript
- No framework
- No build step
- No package manager

The code is intentionally lightweight so the prototype can be moved into the team's later repository without carrying unnecessary framework or hosting assumptions.

## Demo data

All identity information in the prototype is fictional and generic:

- Username: `user`
- Email: `user@example.com`
- Avatar: `U`

No real team member details or provider credentials are embedded in the prototype.

## Run locally

Open `index.html` directly in a browser, or run:

```bash
python -m http.server 8000
```

Then open:

`http://localhost:8000`

## GitHub Pages

The current prototype is deployed with the workflow in:

`.github/workflows/pages.yml`

Every push to `main` can deploy the latest prototype after GitHub Pages is enabled for the repository.

## Repository portability

The prototype uses relative paths and contains no secrets, environment variables or provider credentials.

That means it can later be moved into the team's dedicated CRiB repository and reorganized as the implementation architecture is agreed.

The current personal GitHub repository should therefore be treated as a **temporary prototype workspace**, not the final project repository.
