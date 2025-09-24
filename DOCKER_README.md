# Docker Setup for Arbeit Application

This directory contains Docker configuration files to containerize the Arbeit job platform application consisting of a Next.js frontend and Spring Boot backend.

## Project Structure

```
.
├── docker-compose.yml          # Main orchestration file
├── my-app/                     # Next.js frontend
│   ├── Dockerfile             # Frontend container configuration
│   └── .dockerignore          # Files to ignore during build
├── springboot-backend/         # Spring Boot backend
│   ├── Dockerfile             # Backend container configuration
│   └── .dockerignore          # Files to ignore during build
└── nginx/                      # Optional reverse proxy
    └── nginx.conf             # Nginx configuration
```

## Services

### 1. MySQL Database
- **Port**: 3306
- **Database**: `arbeit_db`
- **User**: `arbeit_user`
- **Password**: `arbeit_password`

### 2. Spring Boot Backend
- **Port**: 8080
- **Health Check**: `/actuator/health`
- **Profile**: `docker`

### 3. Next.js Frontend
- **Port**: 3000
- **Environment**: `production`
- **API URL**: `http://localhost:8080/api`

## Prerequisites

1. **Docker**: Install Docker Desktop or Docker Engine
2. **Docker Compose**: Ensure docker-compose is available (included with Docker Desktop)

## Quick Start

### 1. Clone and navigate to the project directory
```bash
cd /home/karthik/Dev/Arbeit-cicd
```

### 2. Build and start all services
```bash
# Build and start all containers
docker-compose up --build

# Or run in detached mode (background)
docker-compose up -d --build
```

### 3. Access the application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8080
- **Database**: localhost:3306

## Individual Service Commands

### Build specific service
```bash
docker-compose build frontend
docker-compose build backend
```

### Start specific service
```bash
docker-compose up frontend
docker-compose up backend
docker-compose up mysql
```

### View logs
```bash
# All services
docker-compose logs

# Specific service
docker-compose logs frontend
docker-compose logs backend
docker-compose logs mysql

# Follow logs in real-time
docker-compose logs -f
```

## Environment Variables

### Backend Environment Variables
The following environment variables are configured in `docker-compose.yml`:

- **Database Connection**:
  - `SPRING_DATASOURCE_URL`
  - `SPRING_DATASOURCE_USERNAME`
  - `SPRING_DATASOURCE_PASSWORD`

- **Security**:
  - `JWT_SECRET` (⚠️ Change this in production!)
  - `JWT_EXPIRATION`

- **CORS**:
  - `CORS_ALLOWED_ORIGINS`

- **File Upload**:
  - `SPRING_SERVLET_MULTIPART_MAX_FILE_SIZE`
  - `SPRING_SERVLET_MULTIPART_MAX_REQUEST_SIZE`

### Frontend Environment Variables
- `NODE_ENV`: Set to `production`
- `NEXT_PUBLIC_API_URL`: Backend API endpoint
- `DATABASE_URL`: MySQL connection string (if needed)

## Data Persistence

### Volumes
- `mysql_data`: MySQL database files
- `uploads_data`: Backend file uploads

### Backup Data
```bash
# Create backup
docker-compose exec mysql mysqldump -u arbeit_user -p arbeit_db > backup.sql

# Restore backup
docker-compose exec -T mysql mysql -u arbeit_user -p arbeit_db < backup.sql
```

## Development vs Production

### Development Mode
For development with hot-reloading:

```bash
# Start only database
docker-compose up mysql

# Run frontend locally
cd my-app
npm run dev

# Run backend locally (in separate terminal)
cd springboot-backend
mvn spring-boot:run
```

### Production Mode
The current configuration is optimized for production with:
- Multi-stage builds for smaller images
- Non-root users for security
- Health checks
- Resource optimization

## Scaling

### Scale specific services
```bash
# Scale frontend to 3 instances
docker-compose up -d --scale frontend=3

# Scale backend to 2 instances
docker-compose up -d --scale backend=2
```

## Monitoring

### Check service health
```bash
# Check all containers
docker-compose ps

# Check container resource usage
docker stats

# Check health status
docker-compose exec backend curl -f http://localhost:8080/actuator/health
docker-compose exec frontend curl -f http://localhost:3000
```

## Troubleshooting

### Common Issues

1. **Port conflicts**:
   ```bash
   # Check what's using the port
   lsof -i :3000
   lsof -i :8080
   lsof -i :3306
   ```

2. **Database connection issues**:
   ```bash
   # Check MySQL logs
   docker-compose logs mysql
   
   # Connect to MySQL directly
   docker-compose exec mysql mysql -u arbeit_user -p arbeit_db
   ```

3. **Build issues**:
   ```bash
   # Clean build (remove all containers and images)
   docker-compose down --rmi all --volumes
   docker-compose up --build
   ```

4. **Permission issues**:
   ```bash
   # Fix file permissions
   sudo chown -R $USER:$USER .
   ```

### Useful Commands

```bash
# Stop all services
docker-compose down

# Stop and remove volumes
docker-compose down -v

# Remove everything (containers, networks, images, volumes)
docker-compose down --rmi all --volumes --remove-orphans

# View container resource usage
docker-compose top

# Access container shell
docker-compose exec backend bash
docker-compose exec frontend sh
docker-compose exec mysql bash
```

## Optional: Nginx Reverse Proxy

To enable the nginx reverse proxy (useful for production):

1. Uncomment the nginx service in `docker-compose.yml`
2. Start the services:
   ```bash
   docker-compose up -d --build
   ```
3. Access the application through nginx: http://localhost

## Security Considerations

### For Production Deployment:

1. **Change default passwords**:
   - MySQL root password
   - MySQL user password
   - JWT secret key

2. **Use environment files**:
   ```bash
   # Create .env file
   touch .env
   
   # Add to .env
   MYSQL_ROOT_PASSWORD=your-secure-password
   JWT_SECRET=your-256-bit-secret-key
   ```

3. **Enable SSL/HTTPS** with proper certificates

4. **Configure firewall rules** to restrict access

5. **Use Docker secrets** for sensitive data

## Performance Optimization

1. **Resource Limits**: Add resource constraints to docker-compose.yml
2. **Caching**: Configure Redis for session/data caching
3. **Database Optimization**: Tune MySQL configuration
4. **CDN**: Use CDN for static assets in production

---

## Support

For issues or questions:
1. Check the logs: `docker-compose logs`
2. Verify service health: `docker-compose ps`
3. Review the application-specific documentation in each service directory