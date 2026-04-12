Microservices E-Commerce Platform (DevOps Project)
Project Description
This project is a Microservices-based E-Commerce Platform designed to demonstrate a complete DevOps workflow. The application is divided into multiple services such as Authentication, Product, and Order services. Each service runs independently and communicates through REST APIs.

The project uses Jenkins for CI/CD automation and Docker for containerization. The application is deployed on AWS EC2 instances.

Tech Stack
GitHub – Source code management
Jenkins – CI/CD automation
Docker – Containerization
Docker Compose – Multi-container orchestration
AWS EC2 – Cloud deployment platform
Ubuntu Linux – Server OS
Docker Hub – Container registry
Setup Instructions
1. Clone the Repository
git clone https://github.com/your-username/microservices-ecommerce.git cd microservices-ecommerce

2. Build Docker Images
docker build -t ecommerce-app .

3. Run using Docker Compose
docker-compose up -d

4. Access Application
Frontend/API Gateway: http://localhost:8080

CI/CD Flow (Jenkins Pipeline)
Developer pushes code to GitHub
Jenkins triggers the pipeline automatically
Jenkins pulls source code from GitHub
Docker images are built using Dockerfile
Images are pushed to Docker Hub (optional)
Application is deployed to AWS EC2 using Docker Compose
Monitoring is done using logs and metrics tools (optional Prometheus/Grafana)
Project Objective
Automate build and deployment process
Implement CI/CD pipeline using Jenkins
Use Docker for containerization
Deploy application on cloud (AWS EC2)
Improve scalability and maintainability
