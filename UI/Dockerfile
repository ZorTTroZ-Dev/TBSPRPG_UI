FROM node:14-alpine

WORKDIR /app

#add node_modules bin to path
ENV PATH /app/node_modules/.bin:$PATH

#copy code this won't copy node_modules or .git and .gitignore because of .dockerignore
COPY . /app

#we'll only do this for development environment
RUN npm install

# this should eventually go to a docker compose file, maybe not
CMD ng serve --host 0.0.0.0 --port 4200