pipeline {
    agent any

    environment {
        SONAR_TOKEN = credentials('sonar-token')
    }

    stages {

        stage('Clone') {
            steps {
                git 'https://github.com/YOUR_USERNAME/nodejs-ci-cd-app.git'
            }
        }

        stage('Build') {
            steps {
                sh 'npm install'
            }
        }

        stage('Unit Test') {
            steps {
                sh 'npm test'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('SonarQube') {
                    sh """
                    sonar-scanner \
                    -Dsonar.projectKey=nodejs-app \
                    -Dsonar.sources=. \
                    -Dsonar.login=$SONAR_TOKEN
                    """
                }
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                sudo systemctl stop nodeapp || true
                cp -r * /home/ubuntu/nodeapp/
                sudo systemctl start nodeapp
                '''
            }
        }
    }
}
