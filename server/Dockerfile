# Use an official Node.js runtime as a parent image
FROM node:22

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Install ts-node and Prisma globally
RUN npm install -g ts-node prisma

# Generate Prisma client
RUN npx prisma generate

# Expose the port that the app will run on
EXPOSE 3000

# Run migrations before starting the application
CMD ["sh", "-c", "npx prisma migrate deploy && ts-node src/index.ts"]
