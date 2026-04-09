pipeline {
    agent any

    tools {
        nodejs 'NodeJS'
    }

    environment {
        APP_NAME = "node-app"
        SERVER_IP = "<server-ip>"
        APP_DIR = "/home/ubuntu/node-app"
        SONAR_PROJECT_KEY = "nodejs-ci-cd-app"
    }

    stages {

        stage('Git Clone') {
            steps {
                git branch: 'main', url: 'https://github.com/your-repo/node-app.git'
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
            environment {
                SONAR_SCANNER_HOME = tool 'SonarScanner'
            }
            steps {
                withSonarQubeEnv('SonarQube') {
                    sh """
                    $SONAR_SCANNER_HOME/bin/sonar-scanner \
                    -Dsonar.projectKey=${SONAR_PROJECT_KEY} \
                    -Dsonar.sources=. \
                    -Dsonar.host.url=$SONAR_HOST_URL \
                    -Dsonar.login=$SONAR_AUTH_TOKEN
                    """
                }
            }
        }

        stage('Deploy') {
            steps {
                sh """
                scp -r * ubuntu@${SERVER_IP}:${APP_DIR}

                ssh ubuntu@${SERVER_IP} '
                    cd ${APP_DIR} &&
                    npm install &&
                    sudo systemctl restart ${APP_NAME} || sudo systemctl start ${APP_NAME}
                '
                """
            }
        }
    }

    post {
        success {
            echo "✅ Deployment successful!"
        }
        failure {
            echo "❌ Pipeline failed!"
        }
    }
}
