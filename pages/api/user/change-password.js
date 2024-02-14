// API route 보호하기
// 만약 비번을 바꾸는 요청을 한다
// 인증된 사용자가 특정 API 라우트로 요청을 보내 특정 작업을 트리거 하는 방식이다
// 프로젝트에 특정 작업을 수행하는 API 라우트가 있고
// 해당 API 라우트에는 인증된 사용자가 보낸 요청인지 확인해야한다
// 사용자 인터페이스를 완벽하게 제한할 수 있다해도 다른 도구를 사용해 API 요청을 보낼 수 있기 때문이다
// 그러므로
// 요청의 유효성을 검사하고, 인증된 소스로부터의 요청인지 재확인하는 API 라우트도 보호해야한다
// 클라이언트 사이드 뿐 아니라 서버 사이드 API라우트도 중요한 것이다.

// 자체 API 경로를 만들 것이다
// 요청, 응답을 받는 핸들러 함수 생성

import {getSession} from "next-auth/react";
import {connectToDatabase} from "@/lib/db";
import {hashPassword, verifyPassword} from "@/lib/auth";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";

export default async function handler(req, res) {
  // 1. 올바른 요청이 들어오고 있는지 확인
  // 암호 변경, post, put patch 요청이 의미가 있는지 확인
  // 이것은 서버의 리소스를 생성하거나 변경해야함을 암시하는 3가지 유형의 요청이며
  // 암호 변경 = 새 암호를 생성한다고 설정
  // 들어오는 요청에 patch 메서드가 있는 경우에만 여기서 계속하고싶다고 말하기
  if(req.method !== 'PATCH') {
    return;
  }
  // 2. 인증된 사용자로부터 요청이 왔는지
  // 세션이 있는지 확인
  // getSession에는 서버 측에서 여기에서 받는 요청에 대한 req 키를 설정하는 개체 전달
  // getSession은 요청을 조사해 세션 토큰 쿠키가 요청의 일부인지 확인하기때문에
  // 들어오는 요청이 필요하다 -> 쿠키에서 데이터 유효성 검사, 추출한 다음
  // 의미가 있는 경우 세션 개체를 제공한다!

  // test
  console.log('☘️',req.body) // { oldPassword: '1111111', newPassword: '2222222' }

  const {session} = await getServerSession(req, res, authOptions)

  // const session = await getSession({req: req})
  console.log('🫧세션??', session)

  if (!session) {
    console.log('🎽세션없음.....')
    res.status(401).json({message: '세션이 없다!! 인증된 사용자가 아닙니다.'})
    return;
  }
  // 들어온 요청에서 데이터 추출
  // email을 입력하지 않아도 토큰에 이메일 주소를 부호화했기 때문에 알 수 있다
  // pages/api/auth/[...] 에서 email 객체를 반환하고 해당 데이터는 토큰이 되어
  // session 상수에 포함된다
  const userEmail = session.user.email
  // signup handler에서처럼 req.body에서 정보 가져오기
  // 요청과 함께 보내는 데이터에는 이 두 필드가 있어야한다
  const oldPassword = req.body.oldPassword
  const newPassword = req.body.newPassword

  // db에 연결해 사용자 정보가 저장된 users 컬렉션에 접근
  const client = await connectToDatabase()
  const usersCollection = client.db().collection('users')
  const user = await usersCollection.findOne({email: userEmail})


  if (!user) {
    // 세션으로부터 사용자 이메일 주소를 못가져오는 경우
    // 연결을 해제하고 에러 반환하기
    console.log('🌧️유저없음️', user)
    res.status(404).json({message: 'User not found!, 사용자를 못가져오는중!'})
    client.close()
    return;
  }

  const currentPassword = user.password
  const passwordsAreEqual = await verifyPassword(oldPassword, currentPassword)

  // 인증된 사용자이긴하지만, 비번 변경 권한이 없음
  // 422 - 입력값이 틀렸음 을 사용해도 됨
  if (!passwordsAreEqual) {
    res.status(403).json({message: 'Invalid password, 비번이 틀렸습니다!'})
    client.close()
    return;
  }

  // 문서 업데이트
  // userEmail과 일치하는 이메일을 가진 문서, 업데이트할 내용을 전달한다
  // $set 은 바꿔야 할 문서의 프로퍼티를 설정
  // 비번은 해쉬해서 넣기
  const hashedPassword = await hashPassword(newPassword)
  const result = await  usersCollection.updateOne(
    {email: userEmail},
    {$set: {password: hashedPassword}}
  )

  client.close()
  res.status(200).json({message: 'password updated!'})
}