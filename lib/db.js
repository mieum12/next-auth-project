// 데이터베이스로 연결하는 로직 구성

import { MongoClient} from 'mongodb'

export async function connectToDatabase() {
  const client = await MongoClient.connect('mongodb+srv://qpdlqltb1215:ADriB68N9I2u2KaY@cluster0.trp51w4.mongodb.net/next-auth?retryWrites=true&w=majority')

  return client
}