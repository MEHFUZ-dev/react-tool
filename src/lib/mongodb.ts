import { MongoClient, Db } from 'mongodb'

const uri = process.env.MONGODB_URI
const options = {}

let client: MongoClient | null = null
let clientPromise: Promise<MongoClient> | null = null

// Only initialize MongoDB if URI is provided
if (uri) {
  if (process.env.NODE_ENV === 'development') {
    // In development mode, use a global variable so that the value
    // is preserved across module reloads caused by HMR (Hot Module Replacement).
    let globalWithMongo = global as typeof globalThis & {
      _mongoClientPromise?: Promise<MongoClient>
    }

    if (!globalWithMongo._mongoClientPromise) {
      client = new MongoClient(uri, options)
      globalWithMongo._mongoClientPromise = client.connect()
    }
    clientPromise = globalWithMongo._mongoClientPromise
  } else {
    // In production mode, it's best to not use a global variable.
    client = new MongoClient(uri, options)
    clientPromise = client.connect()
  }
} else {
  console.warn('MongoDB URI not found - database features will be disabled')
  // Database connection will be established once environment variables are configured
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise

export async function getDatabase(): Promise<Db | null> {
  if (!clientPromise) {
    console.warn('Database not available - MongoDB URI not configured')
    return null
  }
  
  try {
    const client = await clientPromise
    return client.db('techhub')
  } catch (error) {
    console.error('Failed to connect to database:', error)
    return null
  }
}

export function isDatabaseAvailable(): boolean {
  return clientPromise !== null
}
