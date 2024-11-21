pipeline {
    environment {
        dockerRegistryCredential = 'chani'
    }

    agent any

    stages {
        stage("Clone") {
            steps {
                git branch: 'main', url: 'https://github.com/bachlex03/Chani-clothing-MERN.git'
            }
        }

        stage("Build and Deploy images") {
            steps {
                withDockerRegistry(credentialsId: "${dockerRegistryCredential}", url: 'https://index.docker.io/v1/') {
                    sh label: "build images", script: "docker compose build"
                    sh label: "deploy images", script: "docker compose push"
                }
            }
        }

        stage("Deploy to DEV environment") {
            steps {
                sh label: "down", script: "docker compose --env-file ./server/.env down"
                sh "echo y | docker container prune -f"
                sh label: "deploy", script: "docker compose --env-file ./server/.env up -d --build"
                sh label: "logs", script: "docker ps -a"
            }
        }
    }
}
