pipeline {
    agent any

    tools {
        jdk 'JDK_HOME'
        maven 'MAVEN_HOME'
        nodejs 'NODE_HOME'
    }

    environment {
        TOMCAT_HOME = '/home/ubuntu/tomcat10'
    }

    stages {

        /* ========== 1. Checkout Code ========== */
        stage('Checkout') {
            steps {
                git url: 'https://github.com/PavanKarthikGaraga/Arbeit-cicd.git', branch: 'main'
            }
        }

        /* ========== 2. Build Frontend ========== */
        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    script {
                        def nodeHome = tool name: 'NODE_HOME', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
                        env.PATH = "${nodeHome}/bin:${env.PATH}"
                    }
                    sh 'npm install'
                    sh 'npm run build'
                    sh 'npm run export'
                }
            }
        }

        /* ========== 3. Deploy Frontend to Tomcat 10 ========== */
        stage('Deploy Frontend to Tomcat10') {
            steps {
                sh '''
                    rm -rf ${TOMCAT_HOME}/webapps/arbeit
                    mkdir -p ${TOMCAT_HOME}/webapps/arbeit
                    cp -r frontend/out/* ${TOMCAT_HOME}/webapps/arbeit/
                '''

                sh '${TOMCAT_HOME}/bin/shutdown.sh || true'
                sleep 3
                sh '${TOMCAT_HOME}/bin/startup.sh'
            }
        }

        /* ========== 4. Build Backend WAR ========== */
        stage('Build Backend WAR') {
            steps {
                dir('backend') {
                    sh 'mvn clean package -DskipTests'
                }
            }
        }

        /* ========== 5. Deploy Backend to Tomcat 10 ========== */
        stage('Deploy Backend to Tomcat10') {
            steps {
                sh '''
                    cp backend/target/arbeits-backend.war ${TOMCAT_HOME}/webapps/api.war
                '''

                sh '${TOMCAT_HOME}/bin/shutdown.sh || true'
                sh '${TOMCAT_HOME}/bin/startup.sh'
            }
        }
    }

    post {
        success {
            echo 'Deployment SUCCESS!'
        }
        failure {
            echo 'Deployment FAILED!'
        }
    }
}
