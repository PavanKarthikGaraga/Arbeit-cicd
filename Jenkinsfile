pipeline {
    agent any

    tools {
        jdk 'JDK_HOME'
        maven 'MAVEN_HOME'
        nodejs 'NODE_HOME'
    }

    environment {
        BACKEND_DIR = 'springboot-backend'
        FRONTEND_DIR = 'my-app'

        TOMCAT_URL = 'http://http://54.159.15.170/:9090/manager/text'
        TOMCAT_USER = 'admin'
        TOMCAT_PASS = 'admin'

        BACKEND_WAR = 'springapp.war'
        FRONTEND_WAR = 'frontapp.war'

        // Spring Boot environment variables (update these in production)
        ACCESS_TOKEN = 'your-access-token-secret-key-here-please-change-this-in-production'
        REFRESH_TOKEN = 'your-refresh-token-secret-key-here-please-change-this-in-production'
    }

    stages {
        stage('Clone Repository') {
            steps {
                git url: 'https://github.com/PavanKarthikGaraga/Arbeit-cicd.git', branch: 'main'
            }
        }

        stage('Build Frontend (Next.js)') {
            steps {
                dir("${env.FRONTEND_DIR}") {
                    // Next.js is configured for static export (output: 'export' in next.config.js)
                    // API routes have been removed as authentication/database operations moved to Spring Boot backend
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }

        stage('Package Frontend as WAR') {
            steps {
                dir("${env.FRONTEND_DIR}") {
                    sh """
                        mkdir -p frontapp_war/WEB-INF
                        cp -r out/* frontapp_war/ 2>/dev/null || echo "No out directory found"
                        ls -la out/ 2>/dev/null || echo "out directory not found"
                        jar -cvf ../../${FRONTEND_WAR} -C frontapp_war . 2>/dev/null || echo "Failed to create WAR"
                    """
                }
                // Verify the frontend WAR was created
                sh "ls -la ${FRONTEND_WAR} 2>/dev/null || echo 'Frontend WAR not found'"
            }
        }

        stage('Build Backend (Spring Boot WAR)') {
            steps {
                dir("${env.BACKEND_DIR}") {
                    sh 'echo "Java version: $(java -version)"'
                    sh 'echo "Maven version: $(mvn -version)"'
                    sh 'mvn clean package -DskipTests'
                    sh "ls -la target/"
                    sh """
                        WAR_FILE=\$(ls target/arbeits-backend-*.war 2>/dev/null | head -1)
                        if [ -n "\$WAR_FILE" ] && [ -f "\$WAR_FILE" ]; then
                            echo "Found WAR file: \$WAR_FILE"
                            cp "\$WAR_FILE" "../../${BACKEND_WAR}"
                            echo "WAR file copied successfully to ../../${BACKEND_WAR}"
                        else
                            echo "ERROR: No WAR file found in target directory"
                            echo "Contents of target directory:"
                            ls -la target/ 2>/dev/null || echo "target directory not found"
                            exit 1
                        fi
                    """
                }
                // Verify the file was copied to workspace root
                sh """
                    if [ -f "${BACKEND_WAR}" ]; then
                        ls -la ${BACKEND_WAR}
                        echo "WAR file verified in workspace root"
                    else
                        echo "ERROR: WAR file not found in workspace root"
                        pwd
                        ls -la
                        exit 1
                    fi
                """
            }
        }

        stage('Deploy Backend to Tomcat (/springapp)') {
            steps {
                script {
                    sh "echo '=== DEPLOYMENT STAGE ===' && pwd && ls -la *.war 2>/dev/null || echo 'No WAR files in workspace root'"
                    sh """
                        if [ -f "${BACKEND_WAR}" ]; then
                            echo "Deploying ${BACKEND_WAR} to Tomcat..."
                            echo "File details:"
                            ls -la ${BACKEND_WAR}
                            echo "Uploading to: ${TOMCAT_URL}/deploy?path=/springapp&update=true"
                            curl -v -u ${TOMCAT_USER}:${TOMCAT_PASS} \\
                              --upload-file ${BACKEND_WAR} \\
                              "${TOMCAT_URL}/deploy?path=/springapp&update=true" || {
                                echo "CURL FAILED with exit code: \$?"
                                exit 1
                            }
                        else
                            echo "ERROR: ${BACKEND_WAR} not found!"
                            echo "Current directory: \$(pwd)"
                            echo "All files in current directory:"
                            ls -la
                            echo "Checking for any .war files:"
                            find . -name "*.war" -type f 2>/dev/null || echo "No .war files found anywhere"
                            exit 1
                        fi
                    """
                }
            }
        }

        stage('Deploy Frontend to Tomcat (/frontapp)') {
            steps {
                script {
                    sh """
                        if [ -f "${FRONTEND_WAR}" ]; then
                            echo "Deploying ${FRONTEND_WAR} to Tomcat..."
                            curl -u ${TOMCAT_USER}:${TOMCAT_PASS} \\
                              --upload-file ${FRONTEND_WAR} \\
                              "${TOMCAT_URL}/deploy?path=/frontapp&update=true"
                        else
                            echo "ERROR: ${FRONTEND_WAR} not found!"
                            ls -la *.war 2>/dev/null || echo "No WAR files found"
                            exit 1
                        fi
                    """
                }
            }
        }
    }

    post {
        success {
            echo "✅ Backend deployed: http://13.218.221.111:9090/springapp"
            echo "✅ Frontend deployed: http://13.218.221.111:9090/frontapp"
        }
        failure {
            echo "❌ Build or deployment failed"
        }
    }
}
