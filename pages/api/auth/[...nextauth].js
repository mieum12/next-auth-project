import NextAuth from "next-auth";
import {connectToDatabase} from "@/lib/db";
import {verifyPassword} from "@/lib/auth";
import CredentialsProvider from "next-auth/providers/credentials";


// NextAuth을 호출 -> 새로운 handler 함수 생성
// 로그인 로직 구현
export default NextAuth({
  // 인증된 사용자에 대한 세션을 관리하는 방법을 구성할 수 있는 객체
  session: {
    jwt: true, //jwt를 사용
    // 아래것으로 바뀌었다함
    // strategy: "jwt",
  },
  // 크레덴결셜 기반의 인증
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const client = await connectToDatabase()

        // 1. 사용자가 있는지 확인해야한다.
        // 먼저 db접근하기
        const userCollection = client.db().collection('users')
        // 이메일 확인: credentials에서 email 프로퍼티를 찾기
        // 클라이언트 코드에서 요청을 보낼 때 그 크레덴셜을 설정하는 것은 우리
        // 유저 찾기!
        const user = await userCollection.findOne({email: credentials.email})

        if(!user) {
          client.close()
          throw new Error('No user found!')
        }

        // user가 제출한 비번, 데이터베이스에 저장되어있는 비번끼리 맞는지 비교
        const isValid = await verifyPassword(credentials.password, user.password)
        // 비번이 다를 때
        if (!isValid) {
          client.close()
          throw new Error('Could not log you in!')
        }

        // authorize 함수 안에서 객체를 반환하며 NextAuth 인증이 성공했다고 알리기
        // 이 객체는 JSON web token 으로 부호화된다
        // user 객체 전체를 전달할 수는 없다, 비번 포함 주의
        client.close()
        return {
          email: user.email
        }
      }
    })
  ]
})