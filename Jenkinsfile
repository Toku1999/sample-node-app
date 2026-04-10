pipeline {
    agent any

    tools {
        nodejs 'nodejs'
    }

    environment {
        SONAR_TOKEN = credentials('sonar-token')
    }

    stages {

        stage('Clone') {
            steps {
                git branch: 'main', url: 'https://github.com/Toku1999/sample-node-app.git'
            }
        }

        stage('Build') {
            steps {
                sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                sh 'npm test'
            }
        }

        stage('SonarQube') {
            steps {
                withSonarQubeEnv('SonarQube') {
                    sh '''
                    sonar-scanner \
                    -Dsonar.projectKey=sample-node-app \
                    -Dsonar.sources=. \
                    -Dsonar.host.url=$SONAR_HOST_URL \
                    -Dsonar.login=$SONAR_TOKEN
                    '''
                }
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                ssh -o StrictHostKeyChecking=no ubuntu@13.217.160.184 << EOF

                if [ ! -d "/home/ubuntu/sample-node-app/.git" ]; then
                    rm -rf /home/ubuntu/sample-node-app
                    git clone -b main https://github.com/Toku1999/sample-node-app.git /home/ubuntu/sample-node-app
                else
                    cd /home/ubuntu/sample-node-app
                    git pull origin main
                fi

                cd /home/ubuntu/sample-node-app
                npm install
                sudo systemctl restart sample-node-app

                EOF
                '''
            }
        }
    }
}
