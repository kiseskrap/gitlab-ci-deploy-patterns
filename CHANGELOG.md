# Changelog

All notable changes to this project will be documented in this file. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and the project uses [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- `templates/ecs-deploy.yml` — per-env ECS deploy template. Two hidden jobs that downstream pipelines extend: `.ecs:deploy:force` (dev/stage; registers a new task definition revision, then `aws ecs update-service --force-new-deployment` and waits for service stability) and `.ecs:deploy:bluegreen` (prod; generates an AppSpec at runtime pointing at the new task definition and starts a CodeDeploy deployment, then waits for success). The blue/green job runs a pre-check that lists `Created`/`Queued`/`InProgress`/`Ready` deployments first and refuses to start a second one — two pipelines firing at the same time is the failure mode this catches. Designed to compose with `env-shard.yml`: extending both gives a complete deploy job in the consuming pipeline.

## [0.1.0]

### Added
- Initial project scaffold (README, LICENSE, ROADMAP, CHANGELOG).
- `templates/env-shard.yml` — branch / tag → environment mapping pattern. Defines `.deploy:dev` / `.deploy:stage` / `.deploy:prod` hidden jobs that downstream pipelines extend; each sets `DEPLOY_ENV` and `AWS_PROFILE` and carries the right rule (develop → dev, main → stage, semver tag → prod with manual gate).

[Unreleased]: https://github.com/kiseskrap/gitlab-ci-deploy-patterns/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/kiseskrap/gitlab-ci-deploy-patterns/releases/tag/v0.1.0
