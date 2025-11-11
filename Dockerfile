# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application's source code from your host to your image filesystem.
COPY . .

# Build the TypeScript code
RUN npm run build

# Your app binds to port 5000 so you'll use the EXPOSE instruction to have it mapped by the docker daemon
EXPOSE 5000

# Define the command to run your app
CMD [ "node", "dist/index.js" ]
