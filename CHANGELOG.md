# Changelog

All notable changes to this project will be documented in this file. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and the project uses [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.0]

### Added
- Initial project scaffold (README, LICENSE, ROADMAP, CHANGELOG).
- `templates/env-shard.yml` — branch / tag → environment mapping pattern. Defines `.deploy:dev` / `.deploy:stage` / `.deploy:prod` hidden jobs that downstream pipelines extend; each sets `DEPLOY_ENV` and `AWS_PROFILE` and carries the right rule (develop → dev, main → stage, semver tag → prod with manual gate).

[Unreleased]: https://github.com/kiseskrap/gitlab-ci-deploy-patterns/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/kiseskrap/gitlab-ci-deploy-patterns/releases/tag/v0.1.0
