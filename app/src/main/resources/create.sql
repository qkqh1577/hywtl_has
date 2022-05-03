create table file_item
(
	id bigint auto_increment primary key,
	created_time datetime(6) not null,
	deleted_time datetime(6) not null,
	ext varchar(255) not null,
	file_key varchar(255) not null,
	filename varchar(255) not null,
	path varchar(255) not null,
	size bigint not null,
	constraint UK_file_item_file_key unique (file_key)
) engine = InnoDB DEFAULT CHARSET = utf8mb4;

create table department
(
	id bigint auto_increment primary key,
	category varchar(255) not null,
	created_time datetime(6) not null,
	deleted_time datetime(6) null,
	memo varchar(255) null,
	name varchar(255) not null,
	parent_id bigint null,
	seq int not null
)engine = InnoDB DEFAULT CHARSET = utf8mb4;

create table user
(
	id bigint auto_increment primary key,
	created_time datetime(6) not null,
	deleted_time datetime(6) null,
	department_id bigint not null,
	email varchar(255) not null,
	locked_time datetime(6) null,
	login_time datetime(6) null,
	name varchar(255) not null,
	password varchar(255) not null,
	password_changed_time datetime(6) not null,
    updated_time datetime(6)  not null,
	user_role varchar(255) not null,
	username varchar(255) not null
) engine = InnoDB DEFAULT CHARSET = utf8mb4;

create table user_invitation
(
	id bigint auto_increment primary key,
	created_time datetime(6) not null,
	deleted_time datetime(6) null,
	department_id bigint not null,
	email varchar(255) not null,
	name varchar(255) not null,
	user_role int not null
) engine = InnoDB DEFAULT CHARSET = utf8mb4;

create table password_reset
(
	id bigint auto_increment primary key,
	created_time datetime(6) not null,
	deleted_time datetime(6) null,
	email varchar(255) not null,
	name varchar(255) not null
)engine = InnoDB DEFAULT CHARSET = utf8mb4;

create table personnel
(
  id bigint auto_increment primary key,
	address varchar(255) null,
	birth_date date null,
	created_time datetime(6) not null,
	deleted_time datetime(6) null,
	emergency_phone varchar(255) null,
	eng_name varchar(255) null,
	hired_date date not null,
	hired_type varchar(255) not null,
	image_id bigint null,
	personal_email varchar(255) null,
	phone varchar(255) null,
	recommender varchar(255) null,
	relationship varchar(255) null,
	sex varchar(255) null,
	updated_time datetime(6) null
) engine = InnoDB DEFAULT CHARSET = utf8mb4;

create table personnel_job
(
  id bigint auto_increment primary key,
	department_id bigint not null,
  job_class varchar(255) null,
	job_duty varchar(255) null,
	job_position varchar(255) not null,
	job_title varchar(255) not null,
  job_type varchar(255) not null
) engine = InnoDB DEFAULT CHARSET = utf8mb4;

create table personnel_job_list
(
	personnel_id bigint not null,
	job_list_id bigint not null,
	constraint UK_personnel_job_personnel_job_list unique (job_list_id)
);

create table personnel_academic_list
(
	personnel_id bigint not null,
	academy_name varchar(255) not null,
	degree varchar(255) null,
	end_date date null,
	grade varchar(255) null,
	major varchar(255) not null,
	start_date date null,
	state varchar(255) not null
) engine = InnoDB DEFAULT CHARSET = utf8mb4;

create table personnel_career_list
(
	personnel_id bigint not null,
	company_name varchar(255) not null,
	end_date date not null,
	major_job varchar(255) not null,
	start_date date not null
) engine = InnoDB DEFAULT CHARSET = utf8mb4;

create table personnel_license_list
(
	personnel_id bigint not null,
	memo varchar(255) null,
	name varchar(255) not null,
	organization_name varchar(255) not null,
	qualified_date date not null,
	qualified_number varchar(255) not null,
	type varchar(255) null
) engine = InnoDB DEFAULT CHARSET = utf8mb4;

create table personnel_language_list
(
	personnel_id bigint not null,
	certified_date date not null,
	expiry_period varchar(255) null,
	grade varchar(255) null,
	name varchar(255) not null,
	organization_name varchar(255) not null,
	training_period varchar(255) null,
	type varchar(255) not null
) engine = InnoDB DEFAULT CHARSET = utf8mb4;

create table project
(
	id bigint auto_increment
		primary key,
	basic__address varchar(255) null,
	basic__alias varchar(255) null,
	basic__base_count int null,
	basic__building_count int null,
	basic__client_email varchar(255) null,
	basic__client_manager varchar(255) null,
	basic__client_name varchar(255) null,
	basic__client_phone varchar(255) null,
	basic__code varchar(255) null,
	basic__floor_count int null,
	basic__household_count int null,
	basic__is_client_lh bit null,
	basic__lot_area double null,
	basic__name varchar(255) null,
	basic__project_manager_id bigint null,
	basic__purpose1 varchar(255) null,
	basic__purpose2 varchar(255) null,
	basic__sales_manager_id bigint null,
	basic__status varchar(255) null,
	basic__total_area double null,
	basic__updated_time datetime(6) null,
	created_time datetime(6) not null,
	deleted_time datetime(6) null,
	order__amount bigint null,
	order__begin_date date null,
	order__close_date date null,
	order__is_on_going bit null,
	order__received_date date null,
	order__updated_time datetime(6) null,
	target__land_model_count int null,
	target__updated_time datetime(6) null,
	updated_time datetime(6) not null
) engine = InnoDB DEFAULT CHARSET = utf8mb4;

create table project_target_document
(
	id bigint auto_increment primary key,
	created_time datetime(6) not null,
	deleted_time datetime(6) null,
	file_item_id bigint not null,
	memo varchar(255) null,
	project_id bigint not null,
	updated_time datetime(6) null,
	writer_id bigint not null
) engine = InnoDB DEFAULT CHARSET = utf8mb4;

create table project_target_review
(
	id bigint auto_increment primary key,
	confirmed bit null,
	created_time datetime(6) not null,
	deleted_time datetime(6) null,
	memo varchar(255) null,
	project_id bigint null,
	status varchar(255) not null,
	title varchar(255) not null,
	updated_time datetime(6) null,
	writer_id bigint not null
) engine = InnoDB DEFAULT CHARSET = utf8mb4;

