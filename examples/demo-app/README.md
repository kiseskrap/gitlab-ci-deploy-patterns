# examples/demo-app

A minimal end-to-end example that consumes the templates in this repo.

The "app" is a toy HTTP service from the fictional *AcmeShop platform* — a single `/health` endpoint, no business logic — so the focus stays on the deploy pipeline shape, not the application.

## What this shows

The `.gitlab-ci.yml` here includes both templates from the parent repo and uses them as the consuming pipeline is supposed to:

```yaml
include:
  - project: 'your-org/gitlab-ci-deploy-patterns'
    file: '/templates/env-shard.yml'
    ref: v0.3.0
  - project: 'your-org/gitlab-ci-deploy-patterns'
    file: '/templates/ecs-deploy.yml'
    ref: v0.3.0
```

Then each deploy job is two lines: the routing rule (from `env-shard`) plus the deploy mechanism (from `ecs-deploy`), with the app-specific variables on top.

```yaml
deploy:prod:
  extends:
    - .deploy:prod          # routes: only on semver tags + manual gate
    - .ecs:deploy:bluegreen
  variables:
    APP_NAME:    acmeshop-orders
    CLUSTER:     acmeshop-prod
    SERVICE:     acmeshop-orders
    TASK_FAMILY: acmeshop-orders-task
    IMAGE_URI:   $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA
```

No per-env duplication; no `if`-chains in the deploy steps; the AppSpec generator and in-flight check happen inside the template.

## Layout

```
.
├── Dockerfile          minimal multi-stage build for the toy service
├── src/server.js       three-line HTTP listener — purely so there's something to ship
├── package.json        Node 22, no runtime dependencies
└── .gitlab-ci.yml      build → deploy dev/stage/prod via the templates
```

## What's deliberately not here

- Real business logic — the templates don't care; the app could be anything.
- A real terraform / CDK to provision the ECS cluster — the templates assume the infra already exists.
- Test stages — covered by the consuming team's own conventions; the templates don't dictate.
