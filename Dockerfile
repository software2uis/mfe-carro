FROM node:20 AS dev-deps
WORKDIR /app
COPY package.json package.json
RUN yarn install --frozen-lockfile




FROM node:20 AS builder
WORKDIR /app
COPY --from=dev-deps /app/node_modules ./node_modules
COPY . .
# RUN yarn test
RUN yarn build

# FROM node:19-alpine3.15 AS prod-deps
# WORKDIR /app
# COPY package.json package.json
# RUN yarn install --prod --frozen-lockfile


FROM nginx:1.25 AS prod
EXPOSE 80
COPY --from=builder /app/dist/mfe-carro /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
CMD [ "nginx", "-g", "daemon off;"]

