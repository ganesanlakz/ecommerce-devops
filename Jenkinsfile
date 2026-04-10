pipeline {
    agent any

    environment {
        DOCKER_USER = 'ganesanlakz'
        IMAGE_NAME = 'ecommerce-devops'
        REMOTE_HOST = '18.212.15.163'
        REMOTE_USER = 'ubuntu'
    }

    stages {

        stage('Clean Workspace (Optional)') {
            steps {
                sh 'docker system prune -f || true'
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
ssh -i /var/lib/jenkins/Jenkins_keypair.pem -o StrictHostKeyChecking=no ${REMOTE_USER}@${REMOTE_HOST} << EOF

set -e

echo "🚀 Connected to EC2"

# Check Docker
if ! command -v docker &> /dev/null
then
    echo "Installing Docker..."
    sudo apt update -y
    sudo apt install -y docker.io
    sudo systemctl start docker
    sudo systemctl enable docker
fi

# Check Docker Compose (v2)
if ! docker compose version &> /dev/null
then
    echo "Installing Docker Compose v2..."
    sudo mkdir -p /usr/libexec/docker/cli-plugins
    sudo curl -SL https://github.com/docker/compose/releases/download/v2.27.0/docker-compose-linux-x86_64 -o /usr/libexec/docker/cli-plugins/docker-compose
    sudo chmod +x /usr/libexec/docker/cli-plugins/docker-compose
fi

# Remove old project
rm -rf ecommerce-devops

# Clone latest code
git clone https://github.com/ganesanlakz/ecommerce-devops.git
cd ecommerce-devops

# Deploy containers
sudo docker compose down || true
sudo docker compose pull
sudo docker compose up -d

echo "✅ Deployment completed"

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