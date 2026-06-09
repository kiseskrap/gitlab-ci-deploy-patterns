# Changelog

All notable changes to this project will be documented in this file. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and the project uses [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- `templates/ecs-deploy.yml` — per-env ECS deploy template. Two hidden jobs that downstream pipelines extend: `.ecs:deploy:force` (dev/stage; registers a new task definition revision, then `aws ecs update-service --force-new-deployment` and waits for service stability) and `.ecs:deploy:bluegreen` (prod; generates an AppSpec at runtime pointing at the new task definition and starts a CodeDeploy deployment, then waits for success). The blue/green job runs a pre-check that lists `Created`/`Queued`/`InProgress`/`Ready` deployments first and refuses to start a second one — two pipelines firing at the same time is the failure mode this catches. Designed to compose with `env-shard.yml`: extending both gives a complete deploy job in the consuming pipeline.
- `templates/frontend-static.yml` — static frontend deploy to S3 + CloudFront. Builds upload to a versioned per-env folder (`<env>/<short-sha>/`); a live pointer (`<env>/live/`) is updated to point at the new build *after* the upload completes; CloudFront invalidates configurable paths last. Long-lived assets use `max-age=31536000, immutable` so CloudFront edge caching does the right thing; HTML uses `max-age=60, must-revalidate` so users pick up the new index promptly after an invalidation. Includes a `.static:rollback` manual job that swaps the live pointer back to any previous SHA without rebuilding.
- `examples/demo-app/` — toy Node 22 HTTP service used as a consuming-pipeline example. `Dockerfile` + `src/server.js` + `package.json` + a `.gitlab-ci.yml` that includes both `env-shard.yml` and `ecs-deploy.yml` and wires up dev / stage (force-deploy) and prod (blue/green) jobs. Uses the same "AcmeShop platform" naming convention as the `infra-docs-template` example so the three sibling repos tell a consistent story.

## [0.1.0]

### Added
- Initial project scaffold (README, LICENSE, ROADMAP, CHANGELOG).
- `templates/env-shard.yml` — branch / tag → environment mapping pattern. Defines `.deploy:dev` / `.deploy:stage` / `.deploy:prod` hidden jobs that downstream pipelines extend; each sets `DEPLOY_ENV` and `AWS_PROFILE` and carries the right rule (develop → dev, main → stage, semver tag → prod with manual gate).

[Unreleased]: https://github.com/kiseskrap/gitlab-ci-deploy-patterns/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/kiseskrap/gitlab-ci-deploy-patterns/releases/tag/v0.1.0
