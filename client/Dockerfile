#node base image
FROM node:20.12.2

#working directory
WORKDIR /app

#copy package.json and package-lock.json
COPY package*.json .

#install dependencies
RUN npm install

#copy rest of the files
COPY . .

#expose port
EXPOSE 3000

#start command
CMD [ "npm","start" ]

