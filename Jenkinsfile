pipeline {
agent any

```
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
            ssh -i /var/lib/jenkins/Jenkins_keypair.pem -o StrictHostKeyChecking=no ${REMOTE_USER}@${REMOTE_HOST} << 'EOF'

            set -e

            # Install Docker & Compose if not installed (safe re-run)
            sudo apt update -y
            sudo apt install -y docker.io docker-compose-plugin

            sudo systemctl start docker
            sudo systemctl enable docker

            # Always get latest code
            if [ -d "ecommerce-devops" ]; then
                rm -rf ecommerce-devops
            fi

            git clone https://github.com/ganesanlakz/ecommerce-devops.git
            cd ecommerce-devops

            # Deploy containers
            sudo docker compose down || true
            sudo docker compose pull
            sudo docker compose up -d

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
```

}
