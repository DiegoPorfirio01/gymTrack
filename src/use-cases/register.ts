import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

interface RegisterUseCase {
  name: string
  email: string
  password: string
}

export const registerUseCase = async ({
  name,
  email,
  password,
}: RegisterUseCase) => {
  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (userWithSameEmail) {
    throw new Error('email already exists')
  }

  const password_hash = await hash(password, 6)

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash,
    },
  })
}
