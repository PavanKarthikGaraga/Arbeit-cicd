pipeline {
    agent any

    environment {
        BACKEND_DIR = 'springboot-backend'
        FRONTEND_DIR = 'my-app'

        TOMCAT_URL = 'http://localhost:8080/manager/text'
        TOMCAT_USER = 'admin'
        TOMCAT_PASS = 'admin'

        BACKEND_WAR = 'arbeits-backend.war'
        FRONTEND_WAR = 'frontapp.war'

        JAVA_HOME = '/usr/lib/jvm/java-21-openjdk-amd64'
        MAVEN_HOME = '/opt/maven'
        NODE_HOME = '/usr'
        PATH = "${env.JAVA_HOME}/bin:${env.MAVEN_HOME}/bin:${env.NODE_HOME}/bin:${env.PATH}"
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
                    sh 'node -v'
                    sh 'npm -v'
                    sh 'npm install'
                    sh 'npm run export-war'
                    sh 'ls -la out/ 2>/dev/null || echo "ERROR: out/ directory not created"'
                }
            }
        }

        stage('Package Frontend as WAR') {
            steps {
                dir("${env.FRONTEND_DIR}") {
                    sh """
                        mkdir -p ROOT/WEB-INF
                        cp -r out/* ROOT/
                        jar -cvf ${env.WORKSPACE}/${FRONTEND_WAR} -C ROOT .
                    """
                }
                sh 'ls -la ${WORKSPACE}/*.war 2>/dev/null || echo "No WAR files after frontend packaging"'
            }
        }

        stage('Build Backend (Spring Boot WAR)') {
            steps {
                dir("${env.BACKEND_DIR}") {
                    sh 'mvn clean package'
                    sh "cp target/arbeits-backend-*.war ${env.WORKSPACE}/${BACKEND_WAR}"
                }
                sh 'ls -la ${WORKSPACE}/*.war 2>/dev/null || echo "No WAR files in workspace"'
            }
        }

        stage('Deploy Backend to Tomcat (/api)') {
            steps {
                dir("${env.WORKSPACE}") {
                    sh "ls -la ${BACKEND_WAR}"
                    sh """
                        curl -u ${TOMCAT_USER}:${TOMCAT_PASS} \\
                          --upload-file ${BACKEND_WAR} \\
                          "${TOMCAT_URL}/deploy?path=/api&update=true"
                    """
                }
            }
        }

        stage('Deploy Frontend to Tomcat (/)') {
            steps {
                dir("${env.WORKSPACE}") {
                    sh "ls -la ${FRONTEND_WAR}"
                    sh """
                        curl -u ${TOMCAT_USER}:${TOMCAT_PASS} \\
                          --upload-file ${FRONTEND_WAR} \\
                          "${TOMCAT_URL}/deploy?path=/&update=true"
                    """
                }
            }
        }
    }

    post {
        success {
            echo "✅ Backend deployed"
            echo "✅ Frontend deployed"
        }
        failure {
            echo "❌ Build or deployment failed"
        }
    }
}
