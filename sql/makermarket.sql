CREATE TABLE makermarket.artists(
    artist varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    password_hash varchar(255) NOT NULL,
    avatar LONGBLOB NOT NULL,
    facebook varchar(255) DEFAULT NULL,
    instagram varchar(255) DEFAULT NULL,
    twitter varchar(255) DEFAULT NULL,
    website varchar(255) DEFAULT NULL,
    biography TEXT DEFAULT NULL,
    is_featured BOOLEAN NOT NULL DEFAULT 0,
    is_admin BOOLEAN NOT NULL DEFAULT 0,
    in_delete_queue BOOLEAN NOT NULL DEFAULT 0, 
    created_timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT pk_artist PRIMARY KEY(artist)
)ENGINE=INNODB AUTO_INCREMENT=1 DEFAULT CHARSET=UTF8MB4;

CREATE TABLE makermarket.products(
    product varchar(255) NOT NULL,
    summary varchar(255) NOT NULL,
    purchase_link varchar(255) DEFAULT NULL,
    website_link varchar(255) DEFAULT NULL,
    is_featured BOOLEAN NOT NULL DEFAULT 0,
    created_timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    product_owner varchar(255) NOT NULL,
    CONSTRAINT pk_product PRIMARY KEY(product),
    CONSTRAINT fk_product_owner FOREIGN KEY(product_owner) REFERENCES makermarket.artists(artist)
)ENGINE=INNODB AUTO_INCREMENT=1 DEFAULT CHARSET=UTF8MB4;

CREATE TABLE makermarket.product_images(
    picture LONGBLOB NOT NULL,
    created_timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    image_owner varchar(255) NOT NULL,
    CONSTRAINT fk_image_owner FOREIGN KEY(image_owner) REFERENCES makermarket.products(product)
)ENGINE=INNODB AUTO_INCREMENT=1 DEFAULT CHARSET=UTF8MB4;