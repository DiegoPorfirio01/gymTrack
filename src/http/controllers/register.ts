import { prisma } from '@/lib/prisma'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export const register = async (req: FastifyRequest, reply: FastifyReply) => {
  const registerBodySchema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = registerBodySchema.parse(req.body)

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash: password,
    },
  })

  return reply.status(201).send()
}
