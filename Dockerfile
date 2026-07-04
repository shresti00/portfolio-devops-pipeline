# Simple static-site image — small, fast, no build step needed.
FROM nginx:alpine

# Remove default nginx welcome page
RUN rm -rf /usr/share/nginx/html/*

# Copy the site
COPY index.html style.css script.js /usr/share/nginx/html/

EXPOSE 80

# nginx:alpine already runs nginx in the foreground by default,
# no CMD override needed.