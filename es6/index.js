#!/usr/bin/env node

'use strict'

import chalk from 'chalk'
import clear from 'clear'
import CLI from 'clui'
import figlet from 'figlet'
import inquirer from 'inquirer'
import Preferences from 'preferences'
import _ from 'lodash'
import touch from 'touch'
import fs from 'fs'

let Spinner = CLI.Spinner
let status = new Spinner('Downloading, please wait...')

import { getDirectoryBase, directoryExists, getCreativeInfo, createProjectDirectory, multipleVersions } from './lib/files'

clear()
console.log(
    chalk.red.bold(
        figlet.textSync('40BANNER', {font: 'colossal'})
    )
)

if (directoryExists('.git')) {
  console.log(chalk.yellow('Making banners and changing the world!' + '\n\n'))

  getCreativeInfo(function () {
    let banner = arguments[0]
    createProjectDirectory(banner)
    status.stop()
  })
}

