create database register;
show databases;
use register;
create table register 
(username varchar(50),password varchar(50),confirmpassword varchar(50));
insert into register(username,password,confirmpassword)values('indhu',1234,1234);
insert into register values('raj',4567,4567);
insert into register values('sindhu',7890,7890);
select * from register;

