// 새로운 사용자를 생성하는 역할을 하는 함수
// 데이터베이스에 연결해 들어오는 사용자 데이터를 저장해야 한다

import {connectToDatabase} from "@/lib/db";

async function handler(req, res) {

  const client = await connectToDatabase()

  const db = client.db()

  // users라는 컬렉션 생성하기 (사용자 추가)
  db.collection('users')
}

export default handler