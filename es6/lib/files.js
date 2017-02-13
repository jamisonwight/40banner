import fs from 'fs'
import path from 'path'
import inquirer from 'inquirer'
import chalk from 'chalk'
import mkdirp from 'mkdirp'
import CLI from 'clui'
import git from 'simple-git'

let Spinner = CLI.Spinner
let status = new Spinner('Downloading, please wait...')

export function getCreativeInfo (callback) {
  var info = [
    {
      name: 'clientName',
      type: 'input',
      message: 'Enter the name of the client:',
      validate: function (value) {
        if (value.length) {
          return true
        } else {
          return 'Please enter the name of the client'
        }
      }
    },
    {
      name: 'campaignName',
      type: 'input',
      message: 'Enter the name of the campaign:',
      validate: function (value) {
        if (value.length) {
          return true
        } else {
          return 'Please enter the campaign name'
        }
      }
    },
    {
      name: 'versions',
      type: 'list',
      message: 'How many versions do these banners have?',
      choices: [
        'One',
        'Two',
        'Three',
        'Four',
        'Custom'
      ],
      validate: function (value) {
        if (value.length) {
          return true
        } else {
          return 'Please enter the campaign name'
        }
      }
    },
    {
      name: 'selectSizes',
      type: 'list',
      message: 'Select the banner sizes:',
      choices: [
        'Standard',
        'Desktop & Mobile',
        'Full',
        'Custom'
      ],
      validate: function (value) {
        if (value.length) {
          return true
        } else {
          return 'Please enter the campaign name'
        }
      }
    }
  ]
  inquirer.prompt(info).then(callback)
}

export function getDirectoryBase () {
  return path.basename(process.cwd())
}

export function directoryExists (filepath) {
  try {
    return fs.statSync(filepath).isDirectory()
  } catch (err) {
    return false
  }
}

export function createProjectDirectory (banner) {
  status.start()
  getDirectoryBase()
  let rootPath = banner.clientName + '/' + banner.campaignName + '/production'
  mkdirp(rootPath, (err) => {
    if (err) {
      status.stop()
      console.log(chalk.red('AHH! Sorry, there was an error creating the directory: \n') + err)
    } else {
      return multipleVersions(banner)
    }
  })
}

export function multipleVersions (banner) {
  let rootPath = banner.clientName + '/' + banner.campaignName + '/production'
  if (banner.versions === 'One') {
    let newPath = rootPath
    return bannerSizes(banner, newPath)
  }
  if (banner.versions === 'Two') {
    let v2 = ['v1', 'v2']
    let createTwoVersions = v2.map((version) => {
      let newPath = rootPath + '/' + version
      mkdirp(newPath, (err) => {
        if (err) {
          status.stop()
          console.log(chalk.red('Oh No! Sorry, there was an error creating the directory: \n') + err)
        } else {
          return bannerSizes(banner, newPath)
        }
      })
    })
  }
  if (banner.versions === 'Three') {
    let v3 = ['v1', 'v2', 'v3']
    let createTwoVersions = v3.map((version) => {
      let newPath = rootPath + '/' + version
      mkdirp(newPath, (err) => {
        if (err) {
          status.stop()
          console.log(chalk.red('Oh No! Sorry, there was an error creating the "GWD" directory: \n') + err)
        } else {
          return bannerSizes(banner, newPath)
        }
      })
    })
  }
  if (banner.versions === 'Four') {
    let v4 = ['v1', 'v2', 'v3', 'v4']
    let createTwoVersions = v4.map((version) => {
      let newPath = rootPath + '/' + version
      mkdirp(newPath, (err) => {
        if (err) {
          status.stop()
          console.log(chalk.red('Oh No! Sorry, there was an error creating the directory: \n') + err)
        } else {
          return bannerSizes(banner, newPath)
        }
      })
    })
  }
}

export function bannerSizes (banner, newPath) {
  if (banner.selectSizes === 'Standard') {
    git().clone('https://github.com/jamisonwight/Standard.git', newPath, (err) => {
      if (err) {
        return console.log('There was a problem with downloading the directory:' + err)
      } else {
        status.stop()
        console.log(chalk.green('\n\n' + 'Woo! The directory ') + chalk.yellow(newPath) + chalk.green(' has been created!'))
      }
    })
  }
  if (banner.selectSizes === 'Desktop & Mobile') {
    git().clone('https://github.com/jamisonwight/Desktop-Mobile.git', newPath, (err) => {
      if (err) {
        return console.log('There was a problem with downloading the directory:' + err)
      } else {
        status.stop()
        console.log(chalk.green('\n\n' + 'Woo! The directory ') + chalk.yellow(newPath) + chalk.green(' has been created!'))
      }
    })
  }
  if (banner.selectSizes === 'Full') {
    git().clone('https://github.com/jamisonwight/Full.git', newPath, (err) => {
      if (err) {
        return console.log('There was a problem with downloading the directory:' + err)
      } else {
        status.stop()
        console.log(chalk.green('\n\n' + 'Woo! The directory ') + chalk.yellow(newPath) + chalk.green(' has been created!'))
      }
    })
  // } else {
  //   console.log(chalk.red('Failed to create banner files :('))
  // }
  }
}
