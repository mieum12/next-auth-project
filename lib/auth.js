// 인증과 관련된 유틸리티 메서드를 정의

import { hash, compare } from 'bcryptjs'

export async function hashPassword(password) {
  const hashedPassword = await hash(password, 12)
  return hashedPassword
}

// 해쉬 된 비번과 사용자 입력 비번이 맞는지 비교 -> 불리언 반환
export async function verifyPassword(password, hashedPassword) {
    const isValid = await compare(password, hashedPassword)
  return isValid
}