pipeline {
    agent any

    tools {
        jdk 'JDK_HOME'
        maven 'MAVEN_HOME'
        nodejs 'NODE_HOME'
    }

    environment {
        TOMCAT_HOME = '/home/karthik/tomcat10'

        TOMCAT_URL = 'http://127.0.0.1:9090/manager/text'
        TOMCAT_USER = 'admin'
        TOMCAT_PASS = 'asdfghjk'

        // Jenkins credentials for Docker or K8s (optional)
        DB_USERNAME = credentials('DB_USERNAME')
        DB_PASSWORD = credentials('DB_PASSWORD')
        DB_URL      = credentials('DB_URL')
        JWT_SECRET  = credentials('JWT_SECRET')
    }

    stages {

        /* ========== 1. Git Checkout ========== */
        stage('Checkout') {
            steps {
                git url: 'https://github.com/PavanKarthikGaraga/Arbeit-cicd.git', branch: 'main'
            }
        }

        /* ========== 2. Frontend Build ========== */
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
                sh '${TOMCAT_HOME}/bin/startup.sh'
            }
        }

        /* ========== 4. Backend Build (WAR) ========== */
        stage('Build Backend WAR') {
            steps {
                dir('backend') {
                    sh 'mvn clean package -DskipTests'
                }
            }
        }

        /* ========== 5. Deploy Backend WAR to Tomcat 10 ========== */
        stage('Deploy Backend to Tomcat10') {
            steps {
                script {

                    // ★★★ No need to rewrite setenv.sh — it is already created ★★★

                    sh '''
                        cp backend/target/arbeits-backend.war ${TOMCAT_HOME}/webapps/api.war
                    '''

                    sh '${TOMCAT_HOME}/bin/shutdown.sh || true'
                    sh '${TOMCAT_HOME}/bin/startup.sh'
                }
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