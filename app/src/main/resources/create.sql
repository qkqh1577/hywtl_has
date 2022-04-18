create table file_item
(
	id bigint auto_increment
		primary key,
	created_time datetime(6) not null,
	deleted_time datetime(6) not null,
	ext varchar(255) not null,
	filename varchar(255) not null,
	path varchar(255) not null,
	size bigint not null
) engine = InnoDB DEFAULT CHARSET = utf8mb4;

create table department
(
	id bigint auto_increment
		primary key,
	category varchar(255) not null,
	created_time datetime(6) not null,
	memo varchar(255) null,
	name varchar(255) not null,
	deleted_time datetime(6) null,
	seq int not null,
	parent_id bigint null
)engine = InnoDB DEFAULT CHARSET = utf8mb4;

create table user
(
	id bigint auto_increment
		primary key,
	created_time datetime(6) not null,
	deleted_time datetime(6) null,
	email varchar(255) not null,
	name varchar(255) not null,
	password varchar(255) not null,
	password_changed_time datetime(6) null,
	signed_in_time datetime(6) null,
	user_role int not null,
	username varchar(255) not null,
	department_id bigint not null
) engine = InnoDB DEFAULT CHARSET = utf8mb4;

create table user_invitation
(
	id bigint auto_increment
		primary key,
	created_time datetime(6) not null,
	deleted_time datetime(6) null,
	email varchar(255) not null,
	name varchar(255) not null,
	user_role int not null,
	department_id bigint not null
) engine = InnoDB DEFAULT CHARSET = utf8mb4;

create table personnel
(
	id bigint not null
		primary key,
	address varchar(255) null,
	birth_date varchar(255) null,
	emergency_phone varchar(255) null,
	eng_name varchar(255) null,
	personal_email varchar(255) null,
	phone varchar(255) null,
	relationship varchar(255) null,
	sex varchar(255) null,
	image_id bigint null
) engine = InnoDB DEFAULT CHARSET = utf8mb4;



