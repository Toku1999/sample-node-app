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
                ssh -o StrictHostKeyChecking=no ubuntu@13.217.160.184 "
                if [ ! -d /home/ubuntu/nodeapp ]; then
                    mkdir -p /home/ubuntu/nodeapp
                    cd /home/ubuntu/nodeapp
                    git clone https://github.com/Toku1999/sample-node-app.git .
                else
                    cd /home/ubuntu/nodeapp
                    git pull
                fi
                npm install
                sudo systemctl restart nodeapp
                "
                '''
            }
            }
        }
    }
}
