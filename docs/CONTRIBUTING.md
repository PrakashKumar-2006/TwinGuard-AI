# Contributor Onboarding & Workflow Guide

**Project Working Identifier:** `campus-emergency-platform`  
**Team:** Team Nexus  
**Document:** `docs/CONTRIBUTING.md`  
**Revision:** 1.0

Welcome to the Team Nexus engineering team! This guide walks you through setting up your local environment, adhering to code governance standards, and contributing changes.

---

## 1. Prerequisites

Ensure your workstation has the following tools installed:

- **Git:** Version 2.40+ (Windows / macOS / Linux)
- **Node.js:** `v20.20.2` (LTS) or higher (check via `node -v`)
- **Python:** `3.14.3` or higher (check via `py --version` or `python3 --version`)
- **Package Managers:** `npm` (v10+) for frontend; `pip` and Python `venv` for backend

---

## 2. Initial Setup

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd campus-emergency-platform
```

### Step 2: Configure Environment Variables

Copy the template configuration files:

```bash
# In repository root
cp .env.example .env
```

> [!CAUTION]
> Never commit your local `.env` file to Git. The `.gitignore` file is configured to exclude it automatically.

### Step 3: Set Up Python Backend & Simulation Environment

```bash
# Create virtual environment
python -m venv .venv

# Activate virtual environment
# Windows PowerShell:
.venv\Scripts\Activate.ps1
# Linux / macOS:
source .venv/bin/activate

# Install dependencies (when requirements.txt is available)
pip install -r requirements.txt
```

### Step 4: Set Up Node.js Frontend Environment

```bash
# Install root/workspace dependencies
npm install
```

---

## 3. Git Workflow & Branching Strategy

All work must originate from an issue and follow standard branching:

1. **Pull Latest Changes:**
   ```bash
   git checkout main
   git pull origin main
   ```
2. **Create a Dedicated Branch:**
   ```bash
   # For new features
   git checkout -b feature/<issue-num>-<short-description>

   # For bug fixes
   git checkout -b fix/<issue-num>-<short-description>

   # For documentation updates
   git checkout -b docs/<short-description>
   ```
3. **Commit Incrementally:**
   Use Conventional Commits:
   ```bash
   git commit -m "feat(routing): exclude blocked corridor segments from graph"
   git commit -m "test(sim): add test case for multi-exit building"
   ```

---

## 4. Pre-Commit Quality Checklist

Before submitting a Pull Request, run the required local verification commands:

```bash
# 1. Format and lint checks
npm run lint           # Frontend linting
npm run typecheck      # TypeScript strict compilation check
ruff check .           # Python linting
ruff format --check .  # Python formatting

# 2. Run automated test suites
pytest tests/unit tests/simulation
```

Ensure:

- Zero lint warnings.
- Zero TypeScript errors.
- All unit and simulation tests pass.
- No debug print statements or secret keys are left in code.

---

## 5. Submitting a Pull Request

1. Push your branch to the remote repository:
   ```bash
   git push origin feature/<short-description>
   ```
2. Open a Pull Request on GitHub against `main`.
3. Complete the [Pull Request Template](file:///c:/Development/Projects/Evacuate%20AI/.github/pull_request_template.md):
   - Summarize the motivation and changes.
   - List the tests executed and commands run.
   - Confirm adherence to safety, coordinate, and architecture standards.
4. Request a review from at least one Team Nexus teammate. Address feedback promptly.
