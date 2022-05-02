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
	user_id bigint null
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
	id bigint auto_increment primary key,
	created_time datetime(6) not null,
	deleted_time datetime(6) null,
	updated_time datetime(6) not null,
  basic_id bigint not null,
	order_id bigint null,
	target_id bigint null
);

create table project_basic
(
	id bigint auto_increment primary key,
	address varchar(255) null,
	alias varchar(255) null,
	base_count int null,
	building_count int null,
	client_email varchar(255) null,
	client_manager varchar(255) null,
	client_name varchar(255) null,
	client_phone varchar(255) null,
	code varchar(255) not null,
	created_time datetime(6) not null,
	deleted_time datetime(6) null,
	floor_count int null,
	household_count int null,
	is_client_lh bit null,
	lot_area double null,
	name varchar(255) not null,
	purpose1 varchar(255) null,
	purpose2 varchar(255) null,
	status varchar(255) not null,
	total_area double null,
	updated_time datetime(6) not null,
	project_manager_id bigint not null,
	sales_manager_id bigint not null,
	constraint UK_project_project_basic unique (code)
) engine = InnoDB DEFAULT CHARSET = utf8mb4;

create table project_order
(
	id bigint auto_increment primary key,
	amount bigint null,
	begin_date date null,
	close_date date null,
	created_time datetime(6) not null,
	deleted_time datetime(6) null,
	is_on_going bit null,
	received_date date null,
	updated_time datetime(6) not null
) engine = InnoDB DEFAULT CHARSET = utf8mb4;

create table project_comment
(
    id bigint auto_increment primary key,
    created_time datetime(6) not null,
    deleted_time datetime(6) null,
    description  varchar(255) not null,
    updated_time datetime(6) not null,
    project_id bigint null,
    writer_id bigint null
) engine = InnoDB DEFAULT CHARSET = utf8mb4;

create table project_target
(
	id bigint auto_increment primary key,
	created_time datetime(6) not null,
	deleted_time datetime(6) null,
	land_model_count int null,
	updated_time datetime(6) not null
);

create table project_target_review_list
(
	project_target_id bigint not null,
	review_list_id bigint not null,
	constraint UK_project_target_project_target_review_list unique (review_list_id)
);

create table project_target_document_list
(
	project_target_id bigint not null,
	document_list_id bigint not null,
	constraint UK_project_target_project_target_document_list unique (document_list_id)
);
