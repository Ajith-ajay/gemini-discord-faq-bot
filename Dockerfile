# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install any needed packages
RUN npm install

# Copy the rest of the application's source code
COPY . .

# Build the TypeScript code
RUN npm run build

# Your app binds to port 3000, so let's document that
# (This is for documentation purposes, not strictly required for the bot)
EXPOSE 3000

# Define the command to run your app
CMD [ "node", "dist/index.js" ]
