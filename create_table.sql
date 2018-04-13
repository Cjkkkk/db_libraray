--  ( 书号, 类别, 书名, 出版社, 年份, 作者, 价格, 数量 ) 
--  Note: 其中 年份、数量是整数类型； 价格是两位小数类型； 其余为字符串类型
create table book(
    book_no char(8),
    category varchar(50),
    book_name varchar(50),
    press varchar(30),
    year int,
    author varchar(20),
    price decimal(7,2),
    stock int,
    primary key(book_no)
);
-- 卡号, 姓名, 单位, 类别 (教师 学生等)
create table card(
    cno char(8),
    user_name varchar(20),
    depart_name varchar(30),
    class char(1),
    primary key(cno)
);

-- 管理员ID, 密码， 姓名， 联系方式
create table admin(
    id char(8),
    password varchar(20),
    admin_name varchar(20),
    phone_number int,
    primary key(id) 
);

-- 卡号, 借书证号 ,借期, 还期， 经手人（管理员ID）
create table record(
    book_no char(8),
    cno char(8),
    borrow_date date,
    return_date date,
    id char(8),
    primary key(book_no,cno,borrow_date),
    foreign key(book_no) references book(book_no),on delete CASCADE,on delete CASCADE,
    foreign key(cno) references card(cno),on delete CASCADE,on delete CASCADE,
    foreign key(id) references admin(id),on delete CASCADE,on delete CASCADE,
);