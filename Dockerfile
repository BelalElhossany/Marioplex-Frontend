FROM belalelhossany/start as builder
WORKDIR '/app'
COPY ./package.json /app/package.json
RUN npm install
COPY . .
RUN npm run build

FROM nginx
EXPOSE 80
COPY ./default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html
