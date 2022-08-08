import passport from 'passport'
import LocalStrategy from 'passport-local'
import BearerStrategy from 'passport-http-bearer'

import local from './local'
import bearer from './bearer'

export const strategies = { local, bearer }

passport.use(new LocalStrategy.Strategy({ session: false }, local))
passport.use(new BearerStrategy.Strategy(bearer))

export default passport
