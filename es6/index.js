#!/usr/bin/env node

'use strict'

import chalk from 'chalk'
import clear from 'clear'
import CLI from 'clui'
import figlet from 'figlet'

let Spinner = CLI.Spinner
let status = new Spinner('Downloading, please wait...')

import { directoryExists, getCreativeInfo, createProjectDirectory } from './lib/files'

clear()
console.log(
    chalk.red.bold(
        figlet.textSync('40BANNER', {font: 'colossal'})
    )
)

console.log(chalk.yellow('Making banners and changing the world!' + '\n\n'))

getCreativeInfo(function () {
  let banner = arguments[0]
  createProjectDirectory(banner)
  status.stop()
})


