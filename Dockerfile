FROM node:14-alpine

WORKDIR /app
COPY . .

RUN rm -rf node_modules


RUN npm install

# Run Application
CMD ["npm", "start"]
