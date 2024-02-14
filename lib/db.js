// 데이터베이스로 연결하는 로직 구성

import { MongoClient} from 'mongodb'

const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.trp51w4.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`

export async function connectToDatabase() {
  const client = await MongoClient.connect(connectionString)

  return client
}