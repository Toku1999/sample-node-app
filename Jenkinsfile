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
                git 'https://github.com/Toku1999/sample-node-app.git'
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
                    -Dsonar.projectKey=nodejs-app \
                    -Dsonar.sources=. \
                    -Dsonar.login=$SONAR_TOKEN
                    '''
                }
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                ssh -o StrictHostKeyChecking=no ubuntu@<EC2-IP> << EOF
                cd /home/ubuntu/nodeapp || mkdir -p /home/ubuntu/nodeapp && cd /home/ubuntu/nodeapp
                git pull || git clone https://github.com/Toku1999/sample-node-app.git .
                npm install
                sudo systemctl restart nodeapp
                EOF
                '''
            }
        }
    }
}
