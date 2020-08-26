FROM node:14.8.0

LABEL maintainer="vinh-ngu@hotmail.com"

# Build assets
WORKDIR /build
ADD . .
RUN npm install
RUN npm run build

# Serve assets
FROM nginx:alpine
COPY --from=0 /build/dist /usr/share/nginx/html
COPY --from=0 /build/nginx.conf /etc/nginx/conf.d/default.conf
