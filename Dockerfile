#  Reference:  https://www.youtube.com/watch?v=-ANCcFQBk6I

FROM node:16-alpine as build

# Set the work directory to backend folder
WORKDIR /app

# Copy package.json file in the app folder inside container
COPY package*.json .

# Install the dependencies in the container
RUN npm install

# Copy the rest of the code in the container
COPY . .

# Run the build command
RUN npm run build


# Setup nginx server
FROM nginx

# Expose the service over PORT 3000 (React)
EXPOSE 3000

# Overwrite nginx default.conf file
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

# Copy build files into nginx to serve requests
COPY --from=build /app/build /usr/share/nginx/html