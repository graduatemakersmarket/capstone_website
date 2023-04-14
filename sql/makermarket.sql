CREATE TABLE makermarket.artists(
    artist_name varchar(255) NOT NULL,
    artist_email varchar(255) NOT NULL,
    artist_profile_picture LONGBLOB NOT NULL,
    artist_facebook varchar(255) DEFAULT NULL,
    artist_instagram varchar(255) DEFAULT NULL,
    artist_twitter varchar(255) DEFAULT NULL,
    artist_website varchar(255) DEFAULT NULL,
    artist_bio TEXT,
    artist_password_hash varchar(70) NOT NULL,
    artist_featured BOOLEAN NOT NULL DEFAULT 0,
    artist_delete_request BOOLEAN NOT NULL DEFAULT 0,
    artist_is_admin BOOLEAN NOT NULL DEFAULT 0,
    created_timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT pk_artist PRIMARY KEY(artist_name)
)ENGINE=INNODB AUTO_INCREMENT=1 DEFAULT CHARSET=UTF8MB4;


CREATE TABLE makermarket.products(
    product_name varchar(255) NOT NULL,
    product_description varchar(255) NOT NULL,
    product_image_one LONGBLOB NOT NULL,
    product_image_two LONGBLOB NOT NULL,
    product_image_three LONGBLOB NOT NULL,
    product_image_four LONGBLOB NOT NULL,
    product_purchase_link varchar(255) DEFAULT NULL,
    product_external_website varchar(255) DEFAULT NULL,
    product_featured BOOLEAN NOT NULL DEFAULT 0,
    created_timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    artist varchar(255) NOT NULL,
    CONSTRAINT fk_product_owner FOREIGN KEY(artist) REFERENCES makermarket.artists(artist_name)
)ENGINE=INNODB AUTO_INCREMENT=1 DEFAULT CHARSET=UTF8MB4;