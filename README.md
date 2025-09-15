# AWS Demo Assignment

Welcome to the AWS Demo Assignment. This project is all about showing how to build, deploy, and automate a Node.js app using AWS and DevOps best practices. Think of it as a hands-on demo of modern cloud workflows.


## Project Objective
The goal here is to: demonstrate how to move from code to a running app in the cloud. Specifically, this project showcases:

- CI/CD pipelines with GitHub Actions  
- Docker containerization  
- AWS ECS (Fargate) deployment  
- Centralized logging via CloudWatch  
- Public access to the app so anyone can see it in action  



## Architecture Overview

                ┌───────────────────────┐
                │   Developer     │
                │   Push code to GitHub │
                └──────────┬────────────┘
                           │
                           ▼
                ┌────────────────────────┐
                │ GitHub Actions CI/CD   │
                │ (Build & Push Docker   │
                │ Image to AWS ECR)      │
                └──────────┬─────────────┘
                           │
                           ▼
                ┌────────────────────────┐
                │ AWS Elastic Container  │
                │ Registry (ECR)         │
                │ Stores Docker Images   │
                └──────────┬─────────────┘
                           │
                           ▼
                ┌────────────────────────┐
                │ AWS ECS (Fargate)      │
                │ Runs container using   │
                │ image from ECR         │
                └──────────┬─────────────┘
                           │
                           ▼
                ┌────────────────────────┐
                │ Public IP (Fargate ENI)│
                │ Accessible via Browser │
                │ Shows Login Page/App   │
                └────────────────────────┘

                          │
                          ▼
                ┌────────────────────────┐
                │ AWS CloudWatch Logs    │
                │ App logs & monitoring  │
                └────────────────────────┘




## Flow: 


GitHub (Code Repository)
│
│ Push code
▼
GitHub Actions (CI/CD Pipeline)
│
│ Build Docker Image + Push to ECR
▼
AWS ECR (Container Registry)
│
│ Stores Docker images
▼
AWS ECS (Fargate)
┌─────────────────┐
│ Task/Service    │
│ myapp-task      │
│ Container       │
│ myapp-container │
└─────────────────┘
│
│ Runs container (Node.js app)
▼
Public IP → Access in browser


## Tech stack justification

### 1. Version Control & CI/CD

* **Tool / Service Used**: GitHub + GitHub Actions
* **Why Chosen**:

  * GitHub is free and widely used for version control.
  * GitHub Actions lets us automate the process of **push → build → test → deploy**.
  * The pipeline is written in YAML, so it’s **Infrastructure as Code** (easy to reproduce).


### 2. Containerization

* **Tool / Service Used**: Docker
* **Why Chosen**:

  * Packages the app and its dependencies into one unit.
  * Ensures the app runs the same everywhere (local or AWS).
  * Industry standard for containerization.


### 3. Container Registry

* **Tool / Service Used**: Amazon ECR (Elastic Container Registry)
* **Why Chosen**:

  * Secure and fully managed by AWS.
  * Stores Docker images with versioning.
  * Works natively with ECS for deployments.


### 4. Container Orchestration & Hosting

* **Tool / Service Used**: Amazon ECS (Fargate)
* **Why Chosen**:

  * **Fargate** removes the need to manage servers (serverless containers).
  * AWS automatically allocates compute power.
  * Each ECS task can get a **public IP**, so the app is accessible directly.
  * Scalable and cost-efficient for demo projects.


### 5. Application Runtime

* **Tool / Service Used**: Node.js
* **Why Chosen**:

  * Lightweight and simple runtime for building web apps.
  * Easy for beginners, yet powerful.
  * Perfect fit for a small demo with login functionality.


### 6. Monitoring & Logging

* **Tool / Service Used**: Amazon CloudWatch
* **Why Chosen**:

  * ECS container logs are automatically sent to CloudWatch.
  * Centralized log storage helps with debugging and monitoring.
  * No extra setup required, fully integrated.


### 7. Infrastructure as Code (IaC)

* **Tool / Service Used**: GitHub Actions Workflow (deploy.yml)
* **Why Chosen**:

  * Even though we didn’t use Terraform/CloudFormation, the deployment pipeline itself is **defined as code**.
  * Ensures repeatable, automated deployments.
  * All changes are tracked in GitHub, ensuring version control of the infra setup.



## Deploy & Test

### Step 1: Prepare the Project Files
```bash
cd aws-demo/app


### Step 2: Push Your App to GitHub

```bash
git add .
git commit -m "Initial commit"
git push origin main

### Step 3: Set Up AWS ECR

Create a new ECR repository called `myapp`.

Authenticate Docker with AWS:

```bash
aws ecr get-login-password --region ap-south-1 | docker login --username AWS --password-stdin <account-id>.dkr.ecr.ap-south-1.amazonaws.com
```

### Step 4: Configure GitHub Actions

Create the workflow file at `.github/workflows/deploy.yml` to:

* Build the Docker image
* Push it to ECR
* Update the ECS service

### Step 5: Deploy Your ECS Task

1. Create an ECS Cluster → Fargate
2. Define your task:

   * Container: `myapp-container`
   * Image: `ECR_image:latest`
   * CPU: 0.25 vCPU, Memory: 0.5 GB
   * Port: 3000
3. Create the service:

   * Launch type: Fargate
   * Desired tasks: 1
   * Assign a public IP

### Step 6: Test Your App

Open the public IP of your ECS task in a browser. You should see:

Demo Login
 Username [Fieldbox]
 Password [Fieldbox]
 Login [Button]

### Step 7: Monitor Logs

Head over to CloudWatch → Logs → `/ecs/myapp-cluster/myapp-task` to see deployment messages, health checks, and errors.

### Step 8 (Optional: Stable IP)

For a stable demo URL, allocate an **Elastic IP** in AWS and associate it with your ECS task or an ALB.



## Demo Account

Want to see it in action without setting up everything yourself? Use this:

* **Email:** [hire-me@anshumat.org]
* **Password:** HireMe\@2025!

Access the app directly and explore the features.