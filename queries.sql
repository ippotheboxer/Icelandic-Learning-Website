-- Create database called icelandicLearning --
DROP TABLE IF EXISTS topics;
DROP TABLE IF EXISTS matching_items;


CREATE TABLE topics (
	id SERIAL PRIMARY KEY,
	topic_name_eng VARCHAR(20),
	topic_name_is TEXT
);

CREATE TABLE matching_items (
	id SERIAL PRIMARY KEY,
	english VARCHAR(15),
	icelandic TEXT,
	emoji TEXT,
	topic_id INT,
	FOREIGN KEY(topic_id) REFERENCES topics(id)
);
