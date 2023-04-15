// Artist account SQL queries
const checkAccountExists = `
SELECT
    SUM(IF(artist = ?, 1, 0)) AS userCount,
    SUM(IF(email = ?, 1, 0)) AS emailCount
FROM
    artists
`

const createAccount = `
INSERT INTO 
    makermarket.artists (artist, email, password_hash, avatar)
VALUES
    (?, ?, ?, ?)
`

// Export all of the queries so we can access them from other components
module.exports = {
    checkAccountExists,
    createAccount
}