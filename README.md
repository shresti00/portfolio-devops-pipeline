# Portfolio — DevOps Pipeline Project

A static portfolio site, deployed through a full CI/CD + monitoring pipeline:

```
Website → GitHub → Jenkins → Docker → Kubernetes → App Running → Nagios → Graphite → Grafana
```

## Local preview
Just open `index.html` in a browser — no build step, no dependencies.

## Build the Docker image
```bash
docker build -t portfolio-site .
docker run -d -p 8080:80 --name portfolio-site portfolio-site
```
Visit http://localhost:8080

## Files
- `index.html`, `style.css`, `script.js` — the site
- `Dockerfile` — containerizes the site with nginx:alpine
- `Jenkinsfile` — CI/CD pipeline definition (added in Part 4)
- `k8s/` — Kubernetes manifests (added in Part 6)

## Status
- [x] Part 1 — Website
- [ ] Part 2 — Pushed to GitHub
- [ ] Part 3 — Jenkins installed
- [ ] Part 4 — Jenkins pipeline
- [ ] Part 5 — Dockerized
- [ ] Part 6 — Deployed on Kubernetes
- [ ] Part 7 — Nagios monitoring
- [ ] Part 8 — Graphite metrics
- [ ] Part 9 — Grafana dashboards
- [ ] Part 10 — Screenshots
- [ ] Part 11 — Report