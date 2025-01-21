# Set the base image
FROM nginx:alpine

# Copy the files generated by Astro into the container
COPY dist /usr/share/nginx/html

# Expose the application port
EXPOSE 80

# Set the metadata for the image
LABEL name="portfolio"
LABEL version="1.0"
LABEL description="Docker image for my web portfolio generated by Astro"

LABEL maintainer="Yuniel Acosta <stray-hefts.3o@icloud.com>"
