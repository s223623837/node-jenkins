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
                    [ -s "\$NVM_DIR/nvm.sh" ] && . "\$NVM_DIR/nvm.sh"
                    [ -s "\$NVM_DIR/bash_completion" ] && . "\$NVM_DIR/bash_completion"
                    
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
                    sh 'npm run build' // Adjust this if you have a specific build script
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    echo 'Running unit tests...'
                    sh 'npm test'
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
