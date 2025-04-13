-- Скрипты к заданию:

CREATE TABLE containers (
    id INT PRIMARY KEY,
    number INT,
  	type VARCHAR(50),
  	length INT,
  	width INT,
  	height INT,
  	weight INT,
  	is_empty BOOLEAN,
  	date_of_receipt TIMESTAMP
);

INSERT INTO containers (id, number, type, length, width, height,weight, is_empty, date_of_receipt) 
VALUES (1, 11, 'Тип 1', 111, 111,111,111, false, '2011-11-11 16:30:00');

INSERT INTO containers (id, number, type, length, width, height,weight, is_empty, date_of_receipt) 
VALUES (2, 22, 'Тип 2', 222, 222,222,222, true, '2022-12-12 14:00:00');

CREATE TABLE operations (
    id INT PRIMARY KEY,
  	container_id INT,
  	date_start TIMESTAMP,
  	date_end TIMESTAMP,
  	operation_type VARCHAR(50),
  	operator_name VARCHAR(50),
  	inspection_place VARCHAR(50)
);

INSERT INTO operations (id, container_id, date_start, date_end, operation_type, operator_name, inspection_place) 
VALUES (1, 2, '2011-11-11 12:30:00', '2011-11-11 13:30:00', 'Тип операции','Иванов И.И.', 'Место инспекции 1');

INSERT INTO operations (id, container_id, date_start, date_end, operation_type, operator_name, inspection_place) 
VALUES (2, 1, '2012-11-11 18:30:00', '2012-11-11 19:30:00', 'Тип операции','Петров П.П.', 'Место инспекции 2');

SELECT
    CONCAT(
        '{"id": ', id, ', ',
        '"number": ', number, ', ',
        '"type": "', type, '", ',
        '"length": ', length, ', ',
        '"width": ', width, ', ',
        '"height": ', height, ', ',
        '"weight": ', weight, ', ',
        '"is_empty": ', is_empty, ', ',
        '"date_of_receipt": "', DATE_FORMAT(date_of_receipt, '%Y-%m-%dT%H:%i:%s'), '"}'
    ) AS table_1
FROM containers;

SELECT
    CONCAT(
        '{"id": ', o.id, ', ',
        '"container_id": ', o.container_id, ', ',
        '"date_start": "', DATE_FORMAT(o.date_start, '%Y-%m-%dT%H:%i:%s'), '", ',
        '"date_end": "', DATE_FORMAT(o.date_end, '%Y-%m-%dT%H:%i:%s'), '", ',
        '"operation_type": "', o.operation_type, '", ',
        '"operator_name": "', o.operator_name, '", ',
        '"inspection_place": "', o.inspection_place, '"}'
    ) AS table_2
FROM operations AS o
JOIN containers AS c ON o.container_id = c.id
WHERE c.is_empty = false;
