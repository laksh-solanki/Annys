import { fileURLToPath, URL } from 'node:url'
import chalk from 'chalk'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import boxen from 'boxen'
import os from 'os'
import ora from 'ora'
import chalkAnimation from 'chalk-animation'
import figlet from 'figlet'

// Get all LAN IPs
function getAllLocalIPs() {
  const nets = os.networkInterfaces()
  const results = []
  for (const name of Object.keys(nets)) {
    for (const net of nets[name] || []) {
      if (net.family === 'IPv4' && !net.internal) {
        results.push(net.address)
      }
    }
  }
  return results.length > 0 ? results : ['Not Found']
}

export default defineConfig({
  plugins: [
    vue(),
    {
      name: 'custom-logger',
      configureServer() {
        console.clear()

        // Animated rainbow "Starting..." text
        const rainbow = chalkAnimation.rainbow('🚀 Starting Vite + Vue Dev Server...')

        // Spinner while preparing
        const spinner = ora({
          text: chalk.cyan('Preparing server...'),
          spinner: 'dots',
        }).start()

        setTimeout(() => {
          spinner.stop()
          rainbow.stop()

          // Generate ASCII logo
          const logo = figlet.textSync('VITE', {
            font: 'ANSI Shadow',
            horizontalLayout: 'default',
            verticalLayout: 'default',
          })

          // Rainbow animate the logo
          const rainbowLogo = chalkAnimation.rainbow(logo)
          setTimeout(() => rainbowLogo.stop(), 4000) // stop after 4s

          const local = `http://localhost:5173/`
          const ips = getAllLocalIPs()
            .map((ip) => `${chalk.magenta('👉 Network: ')} ${chalk.cyan(`http://${ip}:5173/`)}`)
            .join('\n')

          const message = `
${chalk.green.bold('🚀 Vite + Vue Dev Server Running!')}
        
${chalk.yellow('👉 Local:   ')} ${chalk.cyan(local)}
${ips}

${chalk.green.bold('✅ Happy Coding! ✨')}
          `

          console.log(
            boxen(message, {
              padding: 1,
              margin: 1,
              borderColor: 'cyan',
              borderStyle: 'round',
              title: chalk.blue.bold(' VITE SERVER '),
              titleAlignment: 'center',
            }),
          )
          // Keep rainbow title cycling forever
          const rainbowTitle = chalkAnimation.rainbow('✨ VITE SERVER READY ✨')
        })
      },
    },
  ],
  clearScreen: false,
  server: {
    host: true,
    port: 5173,
  },
  logLevel: 'silent',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
