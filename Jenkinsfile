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
                }
            }
        }

        stage('Package Frontend as WAR') {
            steps {
                dir("${env.FRONTEND_DIR}") {
                    sh """
                        mkdir -p frontapp_war/WEB-INF
                        cp -r out/* frontapp_war/
                        jar -cvf ../../${FRONTEND_WAR} -C frontapp_war .
                    """
                }
            }
        }

        stage('Build Backend (Spring Boot WAR)') {
            steps {
                dir("${env.BACKEND_DIR}") {
                    sh 'mvn clean package'
                    sh "cp target/arbeits-backend-*.war ../../${BACKEND_WAR}"
                }
            }
        }

        stage('Verify WAR Files') {
            steps {
                dir('.') {  // Workspace root
                    sh """
                        echo "Verifying WAR files exist..."
                        ls -la *.war

                        if [ ! -f "${BACKEND_WAR}" ]; then
                            echo "ERROR: ${BACKEND_WAR} not found!"
                            exit 1
                        fi

                        if [ ! -f "${FRONTEND_WAR}" ]; then
                            echo "ERROR: ${FRONTEND_WAR} not found!"
                            exit 1
                        fi

                        echo "✅ All WAR files found and ready for deployment"
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
