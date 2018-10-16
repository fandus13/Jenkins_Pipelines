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

      stage('SSHPush_to_Apache') {
        steps {
      sshPublisher(publishers: [sshPublisherDesc(configName: 'Apache', transfers: [sshTransfer(cleanRemote: false, excludes: '', execCommand: '', execTimeout: 120000, flatten: false, makeEmptyDirs: false, noDefaultExcludes: false, patternSeparator: '[, ]+', remoteDirectory: '', remoteDirectorySDF: false, removePrefix: '', sourceFiles: '/build/**/*')], usePromotionTimestamp: false, useWorkspaceInPromotion: false, verbose: false)])
      }
    }
  }
}