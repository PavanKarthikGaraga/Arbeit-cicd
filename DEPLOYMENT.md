# Arbeit - Deployment Guide

This document provides instructions for deploying the Arbeit application using Docker and GitHub Actions CI/CD.

## Architecture

- **Frontend**: Next.js 15 application running on port 3000
- **Backend**: Spring Boot application running on port 9090  
- **Database**: MySQL 8.0 running on port 3307 (mapped from 3306)
- **Reverse Proxy**: Nginx running on port 80

## Environment Configuration

### Production Server IP
- Server IP: `13.221.25.150`
- Frontend API URL: `http://13.221.25.150:9090/api`

## Required GitHub Secrets

To enable CI/CD deployment, configure the following secrets in your GitHub repository:

### Docker Hub Credentials
- `DOCKER_USERNAME`: Your Docker Hub username
- `DOCKER_TOKEN`: Your Docker Hub access token

### Server Access
- `HOST`: Server IP address (13.221.25.150)
- `USERNAME`: SSH username for server access
- `PRIVATE_KEY`: SSH private key for server access
- `PORT`: SSH port (default: 22)

### Database Credentials
- `MYSQL_ROOT_PASSWORD`: MySQL root password
- `MYSQL_PASSWORD`: MySQL application user password

### Application Secrets
- `JWT_SECRET`: JWT signing secret (256-bit key)

## Local Development

### Using Docker Compose

```bash
# Build and start all services
docker-compose up --build

# Stop all services
docker-compose down

# View logs
docker-compose logs -f [service-name]
```

### Services URLs (Local)
- Frontend: http://localhost:3000
- Backend API: http://localhost:9090/api
- MySQL: localhost:3307
- Nginx: http://localhost:80

## Production Deployment

### Automatic Deployment
Deployments are triggered automatically when code is pushed to the `main` or `master` branch.

The CI/CD pipeline will:
1. Run tests for both frontend and backend
2. Build Docker images for frontend and backend
3. Push images to Docker Hub
4. Deploy to production server via SSH

### Manual Deployment

```bash
# SSH into production server
ssh username@13.221.25.150

# Navigate to deployment directory
cd /home/ubuntu/arbeit-deployment

# Pull latest images
docker pull your-docker-username/arbeit-frontend:latest
docker pull your-docker-username/arbeit-backend:latest

# Restart services
docker-compose -f docker-compose.prod.yml down
docker-compose -f docker-compose.prod.yml up -d
```

## Service Health Checks

### Backend Health Check
```bash
curl http://13.221.25.150:9090/actuator/health
```

### Frontend Health Check  
```bash
curl http://13.221.25.150:3000
```

### Application Access
- Frontend: http://13.221.25.150
- Backend API: http://13.221.25.150/api

## Troubleshooting

### View Container Logs
```bash
docker-compose logs -f backend
docker-compose logs -f frontend  
docker-compose logs -f mysql
docker-compose logs -f nginx
```

### Container Status
```bash
docker-compose ps
```

### Database Connection
```bash
# Connect to MySQL
docker exec -it arbeit-mysql mysql -u arbeit_user -p arbeit
```

### Rebuild Services
```bash
# Rebuild specific service
docker-compose up --build backend

# Rebuild all services
docker-compose up --build
```

## File Structure

```
.
├── .github/workflows/
│   └── deploy.yml                 # CI/CD pipeline
├── my-app/                        # Next.js frontend
│   ├── Dockerfile
│   └── ...
├── springboot-backend/            # Spring Boot backend
│   ├── Dockerfile
│   └── ...  
├── nginx/
│   └── nginx.conf                # Nginx configuration
├── docker-compose.yml            # Development compose
└── DEPLOYMENT.md                 # This file
```

## Security Considerations

1. Change default database passwords in production
2. Use strong JWT secrets
3. Configure HTTPS/SSL certificates for Nginx
4. Implement proper firewall rules
5. Regular security updates for base images
6. Use secrets management for sensitive configuration

## Monitoring

Consider implementing:
- Application logs aggregation
- Health check monitoring  
- Resource usage monitoring
- Database performance monitoring
- SSL certificate expiry monitoring