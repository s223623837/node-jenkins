pipeline {
    agent any

    environment {
        NODE_VERSION = '18.20.4'
        EMAIL_RECIPIENT = 's223623837@deakin.edu.au'
        NVM_DIR = "${env.HOME}/.nvm"
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
                    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
                    export NVM_DIR="${env.NVM_DIR}"
                    [ -s "\$NVM_DIR/nvm.sh" ] && . "\$NVM_DIR/nvm.sh"
                    [ -s "\$NVM_DIR/bash_completion" ] && . "\$NVM_DIR/bash_completion"
                    nvm install ${NODE_VERSION}
                    nvm use ${NODE_VERSION}
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
                    sh """
                    export NVM_DIR="${env.NVM_DIR}"
                    [ -s "\$NVM_DIR/nvm.sh" ] && . "\$NVM_DIR/nvm.sh"
                    nvm use ${NODE_VERSION}
                    npm install
                    """
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    echo 'Running unit tests...'
                    sh """
                    export NVM_DIR="${env.NVM_DIR}"
                    [ -s "\$NVM_DIR/nvm.sh" ] && . "\$NVM_DIR/nvm.sh"
                    nvm use ${NODE_VERSION}
                    npm test
                    """
                }
            }
        }

        // You might include this stage if you want to start the app during the pipeline
        stage('Start Application') {
            steps {
                script {
                    echo 'Starting the application...'
                    sh """
                    export NVM_DIR="${env.NVM_DIR}"
                    [ -s "\$NVM_DIR/nvm.sh" ] && . "\$NVM_DIR/nvm.sh"
                    nvm use ${NODE_VERSION}
                    npm start
                    """
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
