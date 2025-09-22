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

        TOMCAT_URL = 'http://54.159.15.170:9090/manager/text'
        TOMCAT_USER = 'admin'
        TOMCAT_PASS = 'admin'

        BACKEND_WAR = 'springapp.war'
        FRONTEND_WAR = 'frontapp.war'
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
                    sh 'ls -la out/ 2>/dev/null || echo "ERROR: out/ directory not found after build"'
                }
            }
        }

        stage('Package Frontend as WAR') {
            steps {
                dir("${env.FRONTEND_DIR}") {
                    sh """
                        echo "=== FRONTEND PACKAGING ==="
                        pwd
                        ls -la out/ 2>/dev/null || echo "ERROR: out/ directory not found"
                        if [ -d "out/" ]; then
                            mkdir -p frontapp_war/WEB-INF
                            cp -r out/* frontapp_war/ 2>/dev/null || echo "Warning: No files to copy from out/"
                            echo "Creating WAR file..."
                            jar -cvf ../../${FRONTEND_WAR} -C frontapp_war . 2>/dev/null
                            echo "WAR file creation completed"
                        else
                            echo "ERROR: Cannot create WAR - out/ directory missing"
                            exit 1
                        fi
                    """
                }
            }
        }

        stage('Build Backend (Spring Boot WAR)') {
            steps {
                dir("${env.BACKEND_DIR}") {
                    sh """
                        echo "=== BACKEND BUILD ==="
                        pwd
                        mvn clean package
                        echo "Build completed, checking for WAR files..."
                        ls -la target/ 2>/dev/null || echo "ERROR: target/ directory not found"
                        WAR_FILE=\$(ls target/arbeits-backend-*.war 2>/dev/null | head -1)
                        if [ -n "\$WAR_FILE" ]; then
                            echo "Found WAR file: \$WAR_FILE"
                            cp "\$WAR_FILE" "../../${BACKEND_WAR}"
                            echo "WAR file copied to ../../${BACKEND_WAR}"
                        else
                            echo "ERROR: No WAR file found in target directory"
                            echo "Contents of target directory:"
                            ls -la target/ 2>/dev/null || echo "target directory does not exist"
                            exit 1
                        fi
                    """
                }
            }
        }

        stage('Verify WAR Files') {
            steps {
                dir('.') {  // Workspace root
                    sh """
                        echo "=== WAR FILE VERIFICATION ==="
                        pwd
                        echo "Listing all files in workspace root:"
                        ls -la
                        echo ""
                        echo "Checking for WAR files specifically:"
                        ls -la *.war 2>/dev/null || echo "No .war files found"

                        if [ ! -f "${BACKEND_WAR}" ]; then
                            echo "❌ ERROR: ${BACKEND_WAR} not found!"
                            echo "Expected backend WAR file: ${BACKEND_WAR}"
                            exit 1
                        else
                            echo "✅ ${BACKEND_WAR} found (\$(stat -c%s "${BACKEND_WAR}") bytes)"
                        fi

                        if [ ! -f "${FRONTEND_WAR}" ]; then
                            echo "❌ ERROR: ${FRONTEND_WAR} not found!"
                            echo "Expected frontend WAR file: ${FRONTEND_WAR}"
                            exit 1
                        else
                            echo "✅ ${FRONTEND_WAR} found (\$(stat -c%s "${FRONTEND_WAR}") bytes)"
                        fi

                        echo ""
                        echo "🎉 All WAR files found and ready for deployment!"
                    """
                }
            }
        }

        stage('Deploy Backend to Tomcat (/springapp)') {
            steps {
                dir('.') {  // Ensure we're in workspace root
                    script {
                        sh "pwd && ls -la *.war"
                        sh """
                            if [ -f "${BACKEND_WAR}" ]; then
                                echo "Deploying ${BACKEND_WAR} to Tomcat..."
                                curl -u ${TOMCAT_USER}:${TOMCAT_PASS} \\
                                  --upload-file ${BACKEND_WAR} \\
                                  "${TOMCAT_URL}/deploy?path=/springapp&update=true"
                            else
                                echo "ERROR: ${BACKEND_WAR} not found!"
                                echo "Current directory: \$(pwd)"
                                ls -la
                                exit 1
                            fi
                        """
                    }
                }
            }
        }

        stage('Deploy Frontend to Tomcat (/frontapp)') {
            steps {
                dir('.') {  // Ensure we're in workspace root
                    script {
                        sh "pwd && ls -la *.war"
                        sh """
                            if [ -f "${FRONTEND_WAR}" ]; then
                                echo "Deploying ${FRONTEND_WAR} to Tomcat..."
                                curl -u ${TOMCAT_USER}:${TOMCAT_PASS} \\
                                  --upload-file ${FRONTEND_WAR} \\
                                  "${TOMCAT_URL}/deploy?path=/frontapp&update=true"
                            else
                                echo "ERROR: ${FRONTEND_WAR} not found!"
                                echo "Current directory: \$(pwd)"
                                ls -la
                                exit 1
                            fi
                        """
                    }
                }
            }
        }
    }

    post {
        success {
            echo "✅ Backend deployed: http://54.159.15.170:9090/springapp"
            echo "✅ Frontend deployed: http://54.159.15.170:9090/frontapp"
        }
        failure {
            echo "❌ Build or deployment failed"
        }
    }
}
