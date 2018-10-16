pipeline {
    agent any
      
    tools {nodejs "node"}
      
    stages {
          
      stage('Cloning Git') {
        steps {
          git 'https://github.com/fandus13/react-test01.git'
        }
      }
          
      stage('Install dependencies') {
        steps {
          sh 'npm install'
        }
      }
       
      stage('Test') {
        steps {
           sh 'CI=true npm test'
        }
      }
      
      stage('Build') {
        steps {
        sh 'npm run build'
        }
      }
      
      stage('Archive') {
        steps {
        archiveArtifacts artifacts: 'build/**/*', fingerprint: true, onlyIfSuccessful: true
        }
      }
    }
  }