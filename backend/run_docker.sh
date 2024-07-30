#!/usr/bin/env bash

## Complete the following steps to get Docker running locally

# Step 1:
# Build image and add a descriptive tag
docker image build -t tomlui2010/pawsclaws-backend-app:latest .

# Step 2: 
# List docker images
docker images | grep "pawsclaws"

# Step 3: 
# Run flask app
docker run -d -p 5001:5000 tomlui2010/pawsclaws-backend-app:latest
