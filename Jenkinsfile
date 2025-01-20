pipeline {
    agent any
 
    environment {
        // NODE_ENV = 'development'
        // NODE_ENV = 'production'
        PROJECT_NAME = "nextjs-dashboard-api"
        BUILD_ID = 'dontKillMe' // Jenkins의 ProcessTreeKiller 방지
        // JENKINS_NODE_COOKIE = 'dontKillMe' // Jenkins의 ProcessTreeKiller 방지
        // PM2_HOME = '/var/lib/jenkins/.pm2'
    }
    stages {
        stage('■■■■Build && Deploy  @@@222 생겨서 함침') {
            steps {
                echo '■Deploying....start...'

                sh '''
                    pwd
                    ls -alt
                    echo '■ npm install'
                    npm install
                    echo '■ npm run build'
                    npm run build
                    echo '■ npm run start' 
                    '''
                    //BUILD_ID=dontKillMe pm2 restart nextjs-dashboard-api || pm2 start "npm run preview" --name nextjs-dashboard-api
                echo "■Deploying 성공 !!"
            }
        }
        stage('run') {
          steps {
            echo 'nextjs-dashboard-api building the application...  now....'
            // sh 'npm run dev'
            sh 'sudo pm2 restart "nextjs-dashboard-api" || sudo pm2 start "npm run start" --name nextjs-dashboard-api'
          }
        } 
    }
}
