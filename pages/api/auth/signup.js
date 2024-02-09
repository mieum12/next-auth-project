// 새로운 사용자를 생성하는 역할을 하는 함수
// 데이터베이스에 연결해 들어오는 사용자 데이터를 저장해야 한다

import {connectToDatabase} from "@/lib/db";
import {hashPassword} from "@/lib/auth";

async function handler(req, res) {
  // post 일 때만 사용자를 생성하는 로직이기 때문에 post가 아니라면 끝내준다
  if (req.method !== 'POST') {
    console.log('not post!!!')
    return
  }

  console.log('yes post!!!1')
  // 유효한 데이터가 있을때만 작업하기 위해 들어오는 데이터 먼저 구성하기
  const data = req.body
  const { email, password } = data
  console.log('email&pw ----------', email, password)

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

  console.log('유효성 검증은 통과')

  const client = await connectToDatabase()
  console.log('client', client)

  const db = client.db()
  console.log('db', db)

  // 비번은 저장할 때 암호화하기
  const hashedPassword = await hashPassword(password)
  console.log('hashedPassword: ',hashedPassword)

  // users라는 컬렉션 생성하기 (사용자 추가)
  const result = await db.collection('users').insertOne({
    email: email,
    password: hashedPassword
  })

  console.log('result: ',result)

  res.status(201).json({message:'Create user!'})
}

export default handler