pipeline {
    agent any

    environment {
        DOCKER_USER = 'ganesanlakz'
        IMAGE_NAME = 'ecommerce-devops'
        REMOTE_HOST = '18.212.15.163'
        REMOTE_USER = 'ubuntu'
    }

    stages {

        stage('Clone Repository') {
            steps {
                git 'https://github.com/ganesanlakz/ecommerce-devops.git'
            }
        }

        stage('Build Docker Images') {
            steps {
                sh 'docker compose -f docker-compose.yml build'
            }
        }

        stage('Login & Push Images') {
            steps {
                withCredentials([string(credentialsId: 'docker-token', variable: 'DOCKER_PASS')]) {
                    sh '''
                        echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
                        docker compose -f docker-compose.yml push
                    '''
                }
            }
        }

        stage('Deploy to EC2 Server') {
            steps {
                sh '''
                ssh -i /var/lib/jenkins/Jenkins_keypair.pem -o StrictHostKeyChecking=no ${REMOTE_USER}@${REMOTE_HOST} << 'EOF'
                
                set -e

                # Clone repo if not exists
                if [ ! -d "ecommerce-devops" ]; then
                    git clone https://github.com/ganesanlakz/ecommerce-devops.git
                fi

                cd ecommerce-devops

                # Deploy latest containers
                docker compose down || true
                docker compose pull
                docker compose up -d

                EOF
                '''
            }
        }
    }

    post {
        success {
            echo '✅ Pipeline executed successfully!'
        }
        failure {
            echo '❌ Pipeline failed. Check logs.'
        }
    }
}