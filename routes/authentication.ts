import express from 'express'

import base from './authentication.base'
import token from './authentication.token'

export const authentication = { base, token }

export default authentication
