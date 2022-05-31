create table Students(
	id varchar(36) primary key not null,
	enrollmentNumber varchar(5) not null,
	[name] varchar(40) not null,
	course int not null
)

create table Courses(
	id varchar(36) primary key not null,
	[name] varchar(40) not null,
	code int not null
)
