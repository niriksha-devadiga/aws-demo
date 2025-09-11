provider "aws" {
  region = "ap-south-1"
}

# ECS Cluster
resource "aws_ecs_cluster" "demo_cluster" {
  name = "demo-cluster"
}

# ECR repository for Docker image
resource "aws_ecr_repository" "demo_repo" {
  name = "demo-app-repo"
}

# IAM role for ECS task
resource "aws_iam_role" "ecs_task_execution" {
  name = "ecsTaskExecutionRole"
  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "ecs-tasks.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF
}

resource "aws_iam_role_policy_attachment" "ecs_task_execution_attach" {
  role       = aws_iam_role.ecs_task_execution.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}