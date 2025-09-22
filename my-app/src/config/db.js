// Database configuration - migrated to Spring Boot backend with MySQL
// This file is kept for compatibility but no longer connects to MongoDB
// All database operations are now handled by the Spring Boot backend

export async function connect() {
    // Return a dummy object for compatibility
    // All database operations are now handled by Spring Boot backend
    return {
        collection: () => ({
            find: () => ({ toArray: () => Promise.resolve([]) }),
            findOne: () => Promise.resolve(null),
            insertOne: () => Promise.resolve({ insertedId: null }),
            updateOne: () => Promise.resolve({ modifiedCount: 0 }),
            deleteOne: () => Promise.resolve({ deletedCount: 0 })
        })
    };
}

export async function disconnect() {
    // No-op - database connection is managed by Spring Boot backend
}

