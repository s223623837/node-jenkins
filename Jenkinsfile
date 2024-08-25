pipeline {
    agent any

    environment {
        NODE_VERSION = '18.20.4'
        DIRECTORY_PATH = '/path/to/code'
        TESTING_ENVIRONMENT = 'TestEnv'
        PRODUCTION_ENVIRONMENT = 'Bidhan Gupta'
        NVM_DIR = "$HOME/.nvm" 
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
                    npm install || { echo 'npm install failed'; exit 1; }
                    """
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    echo "Fetching the source code from the directory path specified by the environment variable: ${env.DIRECTORY_PATH}"
                    echo "Compiling the code and generating any necessary artifacts."
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    echo 'Running unit tests...'
                    echo 'Running integration tests...'
                    sh """
                    export NVM_DIR="${env.NVM_DIR}"
                    [ -s "\$NVM_DIR/nvm.sh" ] && . "\$NVM_DIR/nvm.sh"
                    nvm use ${NODE_VERSION}
                    npm test || { echo 'Tests failed'; exit 1; }
                    """
                }
            }
        }

        stage('Code Quality Check') {
            steps {
                script {
                    echo "Checking the quality of the code."
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    echo "Deploying the application to the testing environment: ${env.TESTING_ENVIRONMENT}"
                }
            }
        }

        stage('Approval') {
            steps {
                script {
                    echo "Waiting for manual approval..."
                    sleep time: 10, unit: 'SECONDS'
                }
            }
        }

        stage('Deploy to Production') {
            steps {
                script {
                    echo "Deploying the application to the production environment: ${env.PRODUCTION_ENVIRONMENT}"
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
    }
}
