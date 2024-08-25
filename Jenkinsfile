pipeline {
    agent any

    environment {
        NODE_VERSION = '18.20.4'
        EMAIL_RECIPIENT = 's223623837@deakin.edu.au' 
    }

    stages {
        stage('Checkout') {
            steps {
                script {
                    echo 'Checking out the code from GitHub...'
                    checkout scm
                }
            }
        }

        stage('Install Node.js') {
            steps {
                script {
                    echo "Installing Node.js version ${NODE_VERSION}..."
                    sh """
                    # Installing nvm (Node Version Manager)
                    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
                    export NVM_DIR="\$HOME/.nvm"
                    [ -s "\$NVM_DIR/nvm.sh" ] && \. "\$NVM_DIR/nvm.sh"
                    [ -s "\$NVM_DIR/bash_completion" ] && \. "\$NVM_DIR/bash_completion"
                    
                    # Installing specific Node.js version
                    nvm install ${NODE_VERSION}
                    nvm use ${NODE_VERSION}
                    
                    # Verify Node.js and npm versions
                    node -v
                    npm -v
                    """
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    echo 'Installing Node.js dependencies...'
                    sh 'npm install'
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    echo 'Building the application...'
                    sh 'npm run build' // Assuming there's a build script in package.json
                }
            }
        }

        stage('Unit and Integration Tests') {
            steps {
                script {
                    echo 'Running unit and integration tests...'
                    sh 'npm test'
                }
            }
        }

        stage('Code Analysis') {
            steps {
                script {
                    echo 'Running code analysis...'
                    sh 'npx eslint . || true' // Using ESLint for code analysis
                }
            }
        }

        stage('Security Scan') {
            steps {
                script {
                    echo 'Performing security scan...'
                    sh 'npx nsp check || true' // Using Node Security Platform (nsp) for security scan
                }
            }
        }

        stage('Deploy to Staging') {
            steps {
                script {
                    echo 'Deploying to the staging environment...'
                    // Replace with your deployment script or command
                    sh 'echo Deploying to Staging...'
                }
            }
        }

        stage('Integration Tests on Staging') {
            steps {
                script {
                    echo 'Running integration tests on the staging environment...'
                    // Replace with your test script or command for staging
                    sh 'echo Running tests on Staging...'
                }
            }
        }

        stage('Deploy to Production') {
            steps {
                script {
                    echo 'Deploying to the production environment...'
                    // Replace with your production deployment script or command
                    sh 'echo Deploying to Production...'
                }
            }
        }
    }

    post {
        success {
            script {
                echo 'Pipeline completed successfully!'
            }
        }
        failure {
            script {
                echo 'Pipeline failed.'
            }
        }
        always {
            script {
                echo 'Sending notification email...'
                emailext(
                    to: "${env.EMAIL_RECIPIENT}",
                    subject: "Jenkins Pipeline - ${currentBuild.fullDisplayName}",
                    body: "Pipeline ${currentBuild.fullDisplayName} completed with status: ${currentBuild.currentResult}. Check the Jenkins logs for more details.",
                    attachLog: true
                )
            }
        }
    }
}
