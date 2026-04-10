pipeline {
    agent any

    tools {
        nodejs 'nodejs'
    }

    environment {
        SONAR_TOKEN = credentials('SonarQube')
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
                    script {
                        def scannerHome = tool 'sonar-scanner'
                        sh """
                        ${scannerHome}/bin/sonar-scanner \
                        -Dsonar.projectKey=sample-node-app \
                        -Dsonar.sources=. \
                        -Dsonar.host.url=$SONAR_HOST_URL \
                        -Dsonar.login=$SONAR_TOKEN
                        """
                    }
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
