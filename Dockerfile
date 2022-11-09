#  Reference:  https://www.youtube.com/watch?v=-ANCcFQBk6I

FROM node as build

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
FROM nginx:1.19

# Expose the service over PORT 80
EXPOSE 80

# COPY ./nginx/ngnix.conf /etc/nginx/nginx.conf
COPY --from=build /app/build /usr/share/nginx/html