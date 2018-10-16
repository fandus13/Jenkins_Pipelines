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
    }
  }