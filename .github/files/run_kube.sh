    kubectl apply -f .circleci/files/deploy/backend-app-deployment.yml
    kubectl apply -f .circleci/files/deploy/backend-app-service.yml
    kubectl apply -f .circleci/files/deploy/templates-config.yml
    
    kubectl apply -f .circleci/files/deploy/frontend-app-deployment.yml
    kubectl apply -f .circleci/files/deploy/frontend-app-service.yml
    kubectl apply -f .circleci/files/deploy/nginx-configmap.yml

    kubectl apply -f .circleci/files/deploy/postgres-deployment.yml
