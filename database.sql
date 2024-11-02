
create TABLE person(
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE,        
    pwd VARCHAR(255),       
    role VARCHAR(255),
    fullName VARCHAR(255)     
);

create TABLE employee(
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(200),
    lastName VARCHAR(200),
    middleName VARCHAR(200),
    phoneNumber VARCHAR(100),
    birthday VARCHAR(100),
    ID VARCHAR(100),
    INN VARCHAR(100),
    faceId INTEGER,
    FOREIGN KEY (faceId) REFERENCES image(id),
    jobTitleId INTEGER,
    FOREIGN KEY (jobTitleId) REFERENCES jobTitle(id),
    personId INTEGER,
    FOREIGN KEY (personId) REFERENCES person(id)
)

create TABLE jobTitle(
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) UNIQUE NOT NULL
)

create TABLE image(
    id SERIAL PRIMARY KEY,
    image TEXT
)

create TABLE schedule(
    id SERIAL PRIMARY KEY,
    start VARCHAR(200),
    endTime VARCHAR(200),
    name VARCHAR(200),
    personId INTEGER,
    FOREIGN KEY (personId) REFERENCES person(id)
)

create TABLE history(
    id SERIAL PRIMARY KEY,
    status VARCHAR(100),
    time VARCHAR(100),

)