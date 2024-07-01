import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: '益诊',
  webDir: 'dist',
  bundledWebRuntime: false,
  server: {
    url: 'http://healthdb.mewtopia.cn/'
  }
}

export default config
