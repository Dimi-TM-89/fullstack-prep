# Step 1: Use Nginx as the base image
FROM nginx:alpine

# Step 2: Remove the default website content
RUN rm -rf /usr/share/nginx/html/*

# Step 3: Copy your static website files into the Nginx web root
COPY . /usr/share/nginx/html

# Step 4: Expose port 80 to the host
EXPOSE 80 443

# Step 5: Start Nginx when the container launches
CMD ["nginx", "-g", "daemon off;"]