SHELL := /bin/sh

PNPM ?= pnpm
PORTFOLIO_FILTER := --filter=portfolio
API_FILTER := --filter=yap-api

.DEFAULT_GOAL := help

.PHONY: help install clean dev build check check-biome test unit e2e preflight ready-to-push \
	portfolio-dev portfolio-build portfolio-check \
	api-dev api-build api-test deploy \
	e2e-headed e2e-debug e2e-ui e2e-report

help: ## Show available targets
	@printf "\nProject task runner\n\n"
	@awk 'BEGIN {FS = ":.*## "} /^[a-zA-Z0-9_.-]+:.*## / {printf "  %-20s %s\n", $$1, $$2}' $(MAKEFILE_LIST)

install: ## Install dependencies
	$(PNPM) install

clean: ## Clean generated artifacts
	$(PNPM) $(PORTFOLIO_FILTER) clean

dev: ## Run all apps in development mode
	$(PNPM) dev

build: ## Build all apps
	$(PNPM) build

check: ## Run formatting, linting, and app checks
	$(PNPM) check

check-biome: ## Run Biome formatting/linting
	$(PNPM) check:biome

test: ## Run all tests
	$(PNPM) test

unit: ## Run unit tests for all apps
	$(PNPM) test:unit

e2e: ## Run end-to-end tests
	$(PNPM) test:e2e

preflight: check test build ## Run full pre-push validation (format/lint/check + tests + build)

ready-to-push: preflight ## Alias for full pre-push validation

portfolio-dev: ## Start portfolio dev server (http://localhost:4321)
	$(PNPM) $(PORTFOLIO_FILTER) dev

portfolio-build: ## Build portfolio app
	$(PNPM) $(PORTFOLIO_FILTER) build

portfolio-check: ## Run Astro type checks for portfolio
	$(PNPM) $(PORTFOLIO_FILTER) check:astro

api-dev: ## Start API dev server (http://localhost:8787)
	$(PNPM) $(API_FILTER) dev

api-build: ## Validate API deploy build (dry-run)
	$(PNPM) $(API_FILTER) build

api-test: ## Run API unit tests
	$(PNPM) $(API_FILTER) test:unit

deploy: ## Deploy all deployable apps
	$(PNPM) run deploy

e2e-headed: ## Run Playwright tests in headed mode (portfolio)
	$(PNPM) $(PORTFOLIO_FILTER) test:e2e:headed

e2e-debug: ## Run Playwright tests in debug mode (portfolio)
	$(PNPM) $(PORTFOLIO_FILTER) test:e2e:debug

e2e-ui: ## Open Playwright UI mode (portfolio)
	$(PNPM) $(PORTFOLIO_FILTER) test:e2e:ui

e2e-report: ## Open Playwright HTML report (portfolio)
	$(PNPM) $(PORTFOLIO_FILTER) test:e2e:report
