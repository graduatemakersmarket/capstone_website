/*
Author: Capstone Spring 2023
Description: Store MySQL queries in one central location
Documentation: https://www.w3schools.com/mysql/mysql_sql.asp
*/

//*******************************************************************
//* Account Queries
//*******************************************************************

// Count the number of times a specific username or email address is used
const checkAccountExists = `
SELECT
    SUM(IF(artist = ?, 1, 0)) AS userCount,
    SUM(IF(email = ?, 1, 0)) AS emailCount
FROM
    makermarket.artists
`

// Grab the username, password hash and admin status for a specific username
const checkAccountDetails = `
SELECT
    artist, password_hash, is_admin
FROM
    makermarket.artists
WHERE
    artist = ?
`

// Insert new account into the database
const createAccount = `
INSERT INTO 
    makermarket.artists (artist, email, password_hash, avatar)
VALUES
    (?, ?, ?, ?)
`

// Grab all account information
const getAccountInfo = `
SELECT
    artist, firstname, lastname, avatar, facebook, instagram, twitter, website, biography, is_featured, is_admin, in_delete_queue
FROM
    makermarket.artists
`

// Grab the account profile information for a specific username
const getAccountProfile = `
SELECT
    artist, firstname, lastname, avatar, facebook, instagram, twitter, website, biography
FROM
    makermarket.artists
WHERE
    artist = ?
`

// Update the profile information for a specific username
const updateAccountProfile = `
UPDATE
    makermarket.artists
SET
    firstname = ?, lastname = ?, avatar = ?, facebook = ?, instagram = ?, twitter = ?, website = ?, biography = ?
WHERE
    artist = ?
`

// Grab basic information for featured users
const getFeaturedArtists = `
SELECT
    firstname, lastname, avatar, biography
FROM
    makermarket.artists
WHERE
    is_featured = 1
`

//*******************************************************************
//* Product Queries
//*******************************************************************

// Coming soon

// Export all of the queries so we can access them from other components
module.exports = {
    checkAccountExists,
    createAccount,
    checkAccountDetails,
    getAccountInfo,
    getAccountProfile,
    updateAccountProfile,
    getFeaturedArtists
}