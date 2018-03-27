--  ( 书号, 类别, 书名, 出版社, 年份, 作者, 价格, 数量 ) 
--  Note: 其中 年份、数量是整数类型； 价格是两位小数类型； 其余为字符串类型
create table xxx(
    book_no char(8),
    category varchar(50),
    book_name varchar(50),
    press varchar(30),
    year int,
    author varchar(20)，
    price decimal(7,2),
    stock int
);