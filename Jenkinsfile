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

        TOMCAT_URL = 'http://54.175.124.104/:9090/manager/text'
        TOMCAT_USER = 'admin'
        TOMCAT_PASS = 'admin'

        BACKEND_WAR = 'arbeits-backend.war'
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
                    script {
                        def nodeHome = tool name: 'NODE_HOME', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
                        env.PATH = "${nodeHome}/bin:${env.PATH}"
                    }
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