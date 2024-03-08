export const registerUserSchema = {
  body: {
    type: 'object',
    required: ['fullname', 'username', 'email', 'password'],
    properties: {
      fullname: { type: 'string' },
      username: { type: 'string' },
      email: { type: 'string' },
      password: { type: 'string' },
    },
  },
  response: {
    200: {
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
  },
}
