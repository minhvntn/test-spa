FROM node:16 as builder
ARG NEXT_PUBLIC_BASE_URL
ENV NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL
WORKDIR /app
COPY spa ./
RUN npm install && npm run build

FROM node:16 as runner
WORKDIR /app
COPY spa/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
EXPOSE 3000
CMD ["npm", "start"]
