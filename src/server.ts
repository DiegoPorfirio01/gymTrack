import { app } from './app'
import { env } from './env'

const startServer = async () => {
  try {
    await app.listen({
      port: env.PORT,
    })

    console.log('Servidor iniciado na porta env.PORT')
  } catch (error) {
    console.error('Erro ao iniciar o servidor:', error)
  }
}

startServer()
