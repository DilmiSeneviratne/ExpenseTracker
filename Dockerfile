#node base image
FROM node:20.12.2

#install nodemon
RUN npm install -g nodemon

#working directory
WORKDIR /app

#copy package.json and package-lock.json
COPY package*.json .

#install dependencies
RUN npm install

#copy rest of the files
COPY . .

#expose the port
EXPOSE 5000

#start script
CMD [ "npm","start" ]

