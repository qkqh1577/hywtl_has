set FOREIGN_KEY_CHECKS = 0;
create table department
(
id bigint auto_increment primary key,
category varchar(255) not null,
created_at datetime(6) null,
created_by bigint null,
deleted_at datetime(6) null,
deleted_by bigint null,
memo varchar(255) null,
modified_at datetime(6) null,
modified_by bigint null,
name varchar(255) not null,
seq int not null,
parent_id bigint null
) engine = InnoDB DEFAULT CHARSET = utf8mb4;

create table file_item
(
id bigint auto_increment primary key,
created_at datetime(6) null,
created_by bigint null,
deleted_at datetime(6) null,
deleted_by bigint null,
ext varchar(255) not null,
file_key varchar(255) not null,
filename varchar(255) not null,
modified_at datetime(6) null,
modified_by bigint null,
path varchar(255) not null,
size bigint not null,
constraint UK_file_item__file_key unique (file_key)
) engine = InnoDB DEFAULT CHARSET = utf8mb4;

create table password_reset
(
id bigint auto_increment primary key,
created_at datetime(6) null,
created_by bigint null,
deleted_at datetime(6) null,
deleted_by bigint null,
email varchar(255) not null,
modified_at datetime(6) null,
modified_by bigint null,
name varchar(255) not null
) engine = InnoDB DEFAULT CHARSET = utf8mb4;

create table personnel
(
id bigint not null primary key,
address varchar(255) null,
birth_date date null,
emergency_phone varchar(255) null,
eng_name varchar(255) null,
personal_email varchar(255) null,
phone varchar(255) null,
relationship varchar(255) null,
sex varchar(255) null,
hired_date date not null,
hired_type varchar(255) not null,
recommender varchar(255) null,
created_at datetime(6) null,
created_by bigint null,
deleted_at datetime(6) null,
deleted_by bigint null,
modified_at datetime(6) null,
modified_by bigint null,
image_id bigint null,
user_id bigint not null
) engine = InnoDB DEFAULT CHARSET = utf8mb4;

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

create table personnel_job
(
id bigint auto_increment primary key,
job_class varchar(255) null,
job_duty varchar(255) null,
job_position varchar(255) not null,
job_title varchar(255) not null,
job_type varchar(255) not null,
department_id bigint not null
) engine = InnoDB DEFAULT CHARSET = utf8mb4;

create table personnel_job_list
(
personnel_id bigint not null,
job_list_id bigint not null,
constraint UK_personnel_job_list__job_list_id unique (job_list_id)
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

create table project
(
id bigint auto_increment primary key,
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
basic__modified_at datetime(6) null,
basic__name varchar(255) null,
basic__project_manager_id bigint null,
basic__purpose1 varchar(255) null,
basic__purpose2 varchar(255) null,
basic__sales_manager_id bigint null,
basic__status varchar(255) null,
basic__total_area double null,
created_at datetime(6) null,
created_by bigint null,
deleted_at datetime(6) null,
deleted_by bigint null,
estimate__figure_level varchar(255) null,
estimate__modified_at datetime(6) null,
estimate__received_date date null,
estimate__report_level varchar(255) null,
estimate__test_level varchar(255) null,
modified_at datetime(6) null,
modified_by bigint null,
order__amount bigint null,
order__begin_date date null,
order__close_date date null,
order__is_on_going bit null,
order__modified_at datetime(6) null,
order__received_date date null,
target__land_model_count int null,
target__modified_at datetime(6) null
) engine = InnoDB DEFAULT CHARSET = utf8mb4;

create table project_comment
(
id bigint auto_increment primary key,
created_at datetime(6) null,
created_by bigint null,
deleted_at datetime(6) null,
deleted_by bigint null,
description varchar(255) not null,
modified_at datetime(6) null,
modified_by bigint null,
project_id bigint null,
writer_id bigint null
) engine = InnoDB DEFAULT CHARSET = utf8mb4;

create table project_estimate_custom_sheet
(
	id bigint auto_increment primary key,
	created_at datetime(6) null,
	created_by bigint null,
	deleted_at datetime(6) null,
	deleted_by bigint null,
	modified_at datetime(6) null,
	modified_by bigint null
) engine = InnoDB DEFAULT CHARSET = utf8mb4;

create table project_estimate_sheet
(
	id bigint auto_increment primary key,
	confirmed bit not null,
	created_at datetime(6) null,
	created_by bigint null,
	deleted_at datetime(6) null,
	deleted_by bigint null,
	estimate_date date not null,
	expected_start_month date null,
	memo varchar(255) null,
	modified_at datetime(6) null,
	modified_by bigint null,
	project_id bigint not null,
	review_id bigint not null,
	sales_management_leader_id bigint null,
	sales_team_leader_id bigint not null,
	special_discount bigint null,
	status int not null,
	title varchar(255) not null,
	writer_id bigint not null
) engine = InnoDB DEFAULT CHARSET = utf8mb4;

create table project_estimate_sheet_comment_list
(
	project_estimate_sheet_id bigint not null,
	description varchar(255) not null,
	in_use bit not null,
	seq int not null
) engine = InnoDB DEFAULT CHARSET = utf8mb4;

create table project_estimate_sheet_detail
(
	id bigint auto_increment primary key,
	created_at datetime(6) null,
	created_by bigint null,
	deleted_at datetime(6) null,
	deleted_by bigint null,
	modified_at datetime(6) null,
	modified_by bigint null,
	count int not null,
	is_included bit not null,
	memo varchar(255) null,
	seq int not null,
	title varchar(255) not null,
	total_price bigint not null,
	unit varchar(255) not null,
	unit_price bigint not null
) engine = InnoDB DEFAULT CHARSET = utf8mb4;

create table project_estimate_sheet_detail_list
(
	project_estimate_sheet_id bigint not null,
	detail_list_id bigint not null,
	constraint UK_project_estimate_sheet_detail_list__detail_list_id unique (detail_list_id)
);

create table project_estimate_sheet_detail_sub_title_list
(
	project_estimate_sheet_detail_id bigint not null,
	sub_title_list varchar(255) null
) engine = InnoDB DEFAULT CHARSET = utf8mb4;

create table project_target_document
(
id bigint auto_increment primary key,
created_at datetime(6) null,
created_by bigint null,
deleted_at datetime(6) null,
deleted_by bigint null,
memo varchar(255) null,
modified_at datetime(6) null,
modified_by bigint null,
file_item_id bigint not null,
project_id bigint not null,
writer_id bigint not null
) engine = InnoDB DEFAULT CHARSET = utf8mb4;

create table project_target_review
(
id bigint auto_increment primary key,
confirmed bit not null,
created_at datetime(6) null,
created_by bigint null,
deleted_at datetime(6) null,
deleted_by bigint null,
memo varchar(255) null,
modified_at datetime(6) null,
modified_by bigint null,
status varchar(255) not null,
title varchar(255) not null,
project_id bigint null,
writer_id bigint not null
) engine = InnoDB DEFAULT CHARSET = utf8mb4;

create table project_target_review_detail
(
id bigint auto_increment primary key,
area double not null,
base_count int null,
building_name varchar(255) not null,
floor_count int not null,
height double not null,
memo1 varchar(255) null,
memo2 varchar(255) null,
ratio double not null
) engine = InnoDB DEFAULT CHARSET = utf8mb4;

create table project_target_review_detail_list
(
project_target_review_id bigint not null,
detail_list_id bigint not null,
constraint UK_project_target_review_detail_list__detail_list_id unique (detail_list_id)
) engine = InnoDB DEFAULT CHARSET = utf8mb4;

create table project_target_review_detail_special_wind_load_condition_list
(
project_target_review_detail_id bigint not null,
special_wind_load_condition_list varchar(255) null
) engine = InnoDB DEFAULT CHARSET = utf8mb4;

create table project_target_review_detail_test_list
(
project_target_review_detail_id bigint not null,
test_list varchar(255) null
) engine = InnoDB DEFAULT CHARSET = utf8mb4;

create table user
(
id bigint auto_increment primary key,
created_at datetime(6) null,
created_by bigint null,
deleted_at datetime(6) null,
deleted_by bigint null,
email varchar(255) not null,
locked_at datetime(6) null,
login_at datetime(6) null,
modified_at datetime(6) null,
modified_by bigint null,
name varchar(255) not null,
password varchar(255) not null,
password_changed_at datetime(6) not null,
user_role varchar(255) not null,
username varchar(255) not null,
department_id bigint not null
) engine = InnoDB DEFAULT CHARSET = utf8mb4;

create table user_invitation
(
id bigint auto_increment primary key,
created_at datetime(6) null,
created_by bigint null,
deleted_at datetime(6) null,
deleted_by bigint null,
email varchar(255) not null,
modified_at datetime(6) null,
modified_by bigint null,
name varchar(255) not null,
user_role int not null,
department_id bigint not null
) engine = InnoDB DEFAULT CHARSET = utf8mb4;

set FOREIGN_KEY_CHECKS = 1;