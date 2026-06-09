# gitlab-ci-deploy-patterns

Reusable GitLab CI templates for AWS deploys — environment sharding, ECS blue/green via CodeDeploy, S3 + CloudFront static deploys.

Built from real-world experience running multi-environment AWS deploys through GitLab CI in a production APAC environment. The patterns generalize.

## Status

Early stage. The first template (`templates/env-shard.yml`) is the foundation that other templates build on. More templates are tracked in [ROADMAP.md](./ROADMAP.md) and shipped one at a time.

## What problem this solves

When you ship code to multiple AWS environments (dev / stage / prod), the deploy pipeline tends to grow ad-hoc:

- Per-env jobs duplicated with copy-paste
- Branch / tag → env mapping scattered across `.gitlab-ci.yml`
- Promotion path unclear: "what gets deployed where, again?"

These templates extract the boring parts so your application's `.gitlab-ci.yml` only describes *what* to deploy — not *how the environment routing works*.

Everything is **convention-first, override-last** — sensible defaults that match what most teams already do, with variables you can override per project.

## Quick start

```yaml
# .gitlab-ci.yml in your app repo
include:
  - project: 'your-org/gitlab-ci-deploy-patterns'
    file: '/templates/env-shard.yml'
    ref: v0.1.0

deploy:dev:
  extends: .deploy:dev
  script:
    - aws s3 sync ./build s3://${APP_NAME}-${DEPLOY_ENV}/
```

The `extends: .deploy:dev` line wires up the right `DEPLOY_ENV` / `AWS_PROFILE` variables and the rule that says "only run on the develop branch." No per-env duplication needed in your pipeline.

## Templates

| Template | Status | What it does |
|----------|--------|--------------|
| `templates/env-shard.yml` | shipped | Branch / tag → environment mapping with sensible defaults for dev / stage / prod |
| `templates/ecs-deploy.yml` | shipped | dev/stage `force-new-deployment`, prod CodeDeploy blue/green with runtime-generated AppSpec and an in-flight pre-check |
| `templates/frontend-static.yml` | shipped | S3 sync to versioned per-env folder + live pointer + CloudFront invalidation. Includes a manual rollback job that swaps the live pointer back to any previous SHA without rebuilding |

See [ROADMAP.md](./ROADMAP.md) for the full sequence.

## Design principles

- **Convention-first, override-last.** Defaults match the most common deploy patterns; per-project variables override anything you need.
- **No business-specific naming.** Variables like `APP_NAME`, `CLUSTER`, `SERVICE` — templates never assume your service is called "orders" or your company has a specific naming scheme.
- **Read the YAML, not the docs.** Every template fits in one screen with comments explaining the *why*.
- **AWS-first.** Templates assume AWS as the target. Other cloud providers are out of scope.

## Project layout

```
.
├── templates/   reusable GitLab CI snippets, includable per-project
├── examples/    toy apps that include the templates end-to-end (later)
└── docs/        deeper explanations and decision notes (later)
```

## License

MIT — see [LICENSE](./LICENSE).
