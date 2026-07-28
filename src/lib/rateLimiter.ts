import { RateLimiterMemory } from 'rate-limiter-flexible'

export const loginRateLimiter = new RateLimiterMemory({
  points: 2,          // 2 attempts
  duration: 129600,   // per 36 hours (in seconds)
  blockDuration: 129600, // block for 36 hours
})
