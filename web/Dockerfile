FROM node:14.1.0

LABEL maintainer="Vinh Ngu"

# Build assets
WORKDIR /build
ADD . .

RUN npm install
RUN echo "npm run build" >> scripts/tokenize.sh
RUN bash scripts/tokenize.sh

# Serve assets
FROM nginx:latest

COPY --from=0 /build/dist /usr/share/nginx/html
COPY --from=0 /build/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=0 /build/scripts .
COPY --from=0 /build/src/config.js .

EXPOSE 80
CMD bash detokenize.sh && nginx -g 'daemon off;'
