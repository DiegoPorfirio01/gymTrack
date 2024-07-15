import 'dotenv/config'

import { z } from 'zod'


const envSchema = z.object({
    NODE_ENV: z.enum(['dev','production', 'test']).default('dev'),
    PORT: z.coerce.number().default(1111),
})

const _env = envSchema.safeParse(process.env)

if(_env.success === false) {
    console.error('Invalid enviranment variables', _env.error.format())

    throw new Error('Invalid enviranment variables.')
}

export const env = _env.data