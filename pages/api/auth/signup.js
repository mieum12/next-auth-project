// 새로운 사용자를 생성하는 역할을 하는 함수
// 데이터베이스에 연결해 들어오는 사용자 데이터를 저장해야 한다

import {connectToDatabase} from "@/lib/db";
import {hashPassword} from "@/lib/auth";

async function handler(req, res) {

  // 유효한 데이터가 있을때만 작업하기 위해 들어오는 데이터 먼저 구성하기
  const data = req.body
  const { email, password } = data

  // 유효한 데이터인지 검증 -> 검증 되면 데이터베이스(컬렉션)에 저장할 대상이 된다
  if (
    !email ||
    !email.includes('@') ||
    !password ||
    password.trim().length < 7
  ) {
    res
      .status(422)
      .json({
        message:
          'Invalid input - 이메일의 형식을 지켜주세요. 비밀번호는 7자리 이상이어야 합니다.'
      })
    return
  }


  const client = await connectToDatabase()

  const db = client.db()

  // users라는 컬렉션 생성하기 (사용자 추가)

  // 비번은 저장할 때 암호화하기
  const hashedPassword = hashPassword(password)

  const result = await db.collection('users').insertOne({
    email: email,
    password: hashedPassword
  })

  res.status(201).json({message:'Create user!'})
}

export default handler