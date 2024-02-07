// 인증과 관련된 유틸리티 메서드를 정의

import { hash } from 'bcryptjs'

export async function hashPassword(password) {
  const hashedPassword = await hash(password, 12)
  return hashedPassword
}