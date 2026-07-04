pipeline {
    agent any

    environment {
        IMAGE_NAME = "portfolio-site"
        IMAGE_TAG  = "${env.BUILD_NUMBER}"
        CONTAINER_NAME = "portfolio-site"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Verify Docker') {
            steps {
                sh 'docker --version'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t ${IMAGE_NAME}:${IMAGE_TAG} -t ${IMAGE_NAME}:latest .'
            }
        }

        stage('Run Container (smoke test)') {
            steps {
                sh '''
                    docker rm -f ${CONTAINER_NAME} || true
                    docker run -d --name ${CONTAINER_NAME} -p 8082:80 ${IMAGE_NAME}:latest
                    sleep 3
                    docker exec ${CONTAINER_NAME} wget -qO- http://localhost:80 > /dev/null || (echo "Site did not respond" && exit 1)
                '''
            }
        }
    }

    post {
        success {
            echo 'Build succeeded: image built and container responded on port 8082.'
        }
        failure {
            echo 'Pipeline failed - check the stage logs above.'
        }
    }
}