# Roadmap

Each unchecked item is a future commit. Items are sequenced to deliver incremental value — a user adopting the templates early should get something useful in week 1, week 2, etc., rather than waiting for a "complete" v1.

## v0.2 — backend templates

GitLab CI templates for the most common AWS backend deploy patterns.

- [x] `templates/env-shard.yml` — branch / tag → environment mapping with dev / stage / prod defaults.
- [ ] `templates/ecs-deploy.yml` — dev/stage `force-new-deployment`, prod CodeDeploy blue/green with AppSpec generator. Includes a pre-check that blocks deploy when another is already in flight.

## v0.3 — frontend templates

- [ ] `templates/frontend-static.yml` — S3 sync + CloudFront invalidation, with versioned per-env folders so rollbacks are a folder swap.

## v0.4 — examples + polish

- [ ] `examples/demo-app/` — toy backend (minimal Node or Python service) showing template usage end-to-end with `.gitlab-ci.yml`.
- [ ] `examples/demo-app-frontend/` — toy frontend showing the static template against a fake "AcmeShop platform" use case.

## v1.0 — release

- [ ] Polish, full test coverage where applicable, tag `v1.0.0`.
- [ ] `docs/decision-notes.md` walking through the "why this convention?" choices.

## Out of scope (intentionally)

- GitHub Actions equivalents. Different CI system, different conventions — would dilute the focus.
- Kubernetes deploys. ECS-first; k8s templates would need their own repo.
- Multi-cloud. AWS only.
