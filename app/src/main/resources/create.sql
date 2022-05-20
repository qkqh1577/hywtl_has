set FOREIGN_KEY_CHECKS = 0;
create table company
(
	id bigint auto_increment
		primary key,
	created_at datetime(6) null,
	created_by bigint null,
	deleted_at datetime(6) null,
	deleted_by bigint null,
	modified_at datetime(6) null,
	modified_by bigint null,
	address varchar(255) null,
	company_number varchar(255) not null,
	memo varchar(255) null,
	name varchar(255) not null,
	phone varchar(255) null,
	representative_name varchar(255) null,
	zip_code varchar(255) null
) engine = InnoDB DEFAULT CHARSET = utf8mb4;

create table department
(
	id bigint auto_increment
		primary key,
	created_at datetime(6) null,
	created_by bigint null,
	deleted_at datetime(6) null,
	deleted_by bigint null,
	modified_at datetime(6) null,
	modified_by bigint null,
	category varchar(255) not null,
	memo varchar(255) null,
	name varchar(255) not null,
	seq int not null,
	parent_id bigint null
) engine = InnoDB DEFAULT CHARSET = utf8mb4;

create table file_item
(
	id bigint auto_increment
		primary key,
	created_at datetime(6) null,
	created_by bigint null,
	deleted_at datetime(6) null,
	deleted_by bigint null,
	modified_at datetime(6) null,
	modified_by bigint null,
	ext varchar(255) not null,
	file_key varchar(255) not null,
	filename varchar(255) not null,
	path varchar(255) not null,
	size bigint not null,
	constraint UK_lv7svsmug5711aj4a6a3lu194
		unique (file_key)
) engine = InnoDB DEFAULT CHARSET = utf8mb4;

create table manager
(
	id bigint auto_increment
		primary key,
	created_at datetime(6) null,
	created_by bigint null,
	deleted_at datetime(6) null,
	deleted_by bigint null,
	modified_at datetime(6) null,
	modified_by bigint null,
	email varchar(255) null,
	mobile varchar(255) null,
	name varchar(255) null,
	phone varchar(255) null,
	position varchar(255) null,
	state varchar(255) null
) engine = InnoDB DEFAULT CHARSET = utf8mb4;

create table company_manager_list
(
	company_id bigint not null,
	manager_list_id bigint not null,
	constraint UK_rk125mp5hbdsigthfunl90awr
		unique (manager_list_id)
) engine = InnoDB DEFAULT CHARSET = utf8mb4;

create table password_reset
(
	id bigint auto_increment
		primary key,
	created_at datetime(6) null,
	created_by bigint null,
	deleted_at datetime(6) null,
	deleted_by bigint null,
	modified_at datetime(6) null,
	modified_by bigint null,
	email varchar(255) not null,
	name varchar(255) not null
) engine = InnoDB DEFAULT CHARSET = utf8mb4;

create table personnel_job
(
	id bigint auto_increment
		primary key,
	created_at datetime(6) null,
	created_by bigint null,
	deleted_at datetime(6) null,
	deleted_by bigint null,
	modified_at datetime(6) null,
	modified_by bigint null,
	job_class varchar(255) null,
	job_duty varchar(255) null,
	job_position varchar(255) not null,
	job_title varchar(255) not null,
	job_type varchar(255) not null,
	department_id bigint not null
) engine = InnoDB DEFAULT CHARSET = utf8mb4;

create table project_bid
(
	id bigint auto_increment
		primary key,
	created_at datetime(6) null,
	created_by bigint null,
	deleted_at datetime(6) null,
	deleted_by bigint null,
	modified_at datetime(6) null,
	modified_by bigint null,
	figure_level varchar(255) null,
	report_level varchar(255) null,
	requested_date date null,
	test_level varchar(255) null
) engine = InnoDB DEFAULT CHARSET = utf8mb4;

create table project_estimate_custom_sheet
(
	id bigint auto_increment
		primary key,
	created_at datetime(6) null,
	created_by bigint null,
	deleted_at datetime(6) null,
	deleted_by bigint null,
	modified_at datetime(6) null,
	modified_by bigint null
) engine = InnoDB DEFAULT CHARSET = utf8mb4;

create table project_estimate_sheet_detail
(
	id bigint auto_increment
		primary key,
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

create table project_estimate_sheet_detail_sub_title_list
(
	project_estimate_sheet_detail_id bigint not null,
	sub_title_list varchar(255) null
) engine = InnoDB DEFAULT CHARSET = utf8mb4;
create table project_review_detail
(
	id bigint auto_increment
		primary key,
	created_at datetime(6) null,
	created_by bigint null,
	deleted_at datetime(6) null,
	deleted_by bigint null,
	modified_at datetime(6) null,
	modified_by bigint null,
	area double not null,
	base_count int null,
	building_name varchar(255) not null,
	floor_count int not null,
	height double not null,
	memo1 varchar(255) null,
	memo2 varchar(255) null,
	ratio double not null
) engine = InnoDB DEFAULT CHARSET = utf8mb4;

create table project_review_detail_special_wind_load_condition_list
(
	project_review_detail_id bigint not null,
	special_wind_load_condition_list varchar(255) null
) engine = InnoDB DEFAULT CHARSET = utf8mb4;

create table project_review_detail_test_list
(
	project_review_detail_id bigint not null,
	test_list varchar(255) null
) engine = InnoDB DEFAULT CHARSET = utf8mb4;

create table project_target_detail
(
	id bigint auto_increment
		primary key,
	created_at datetime(6) null,
	created_by bigint null,
	deleted_at datetime(6) null,
	deleted_by bigint null,
	modified_at datetime(6) null,
	modified_by bigint null,
	building_name varchar(255) not null,
	memo varchar(255) null
) engine = InnoDB DEFAULT CHARSET = utf8mb4;

create table project_target_detail_test_list
(
	project_target_detail_id bigint not null,
	test_list varchar(255) null
) engine = InnoDB DEFAULT CHARSET = utf8mb4;

create table test_service_detail_template
(
	id bigint auto_increment
		primary key,
	created_at datetime(6) null,
	created_by bigint null,
	deleted_at datetime(6) null,
	deleted_by bigint null,
	modified_at datetime(6) null,
	modified_by bigint null,
	memo varchar(255) null,
	seq int not null,
	unit varchar(255) not null,
	unit_price bigint not null
) engine = InnoDB DEFAULT CHARSET = utf8mb4;

create table test_service_detail_template_title_list
(
	test_service_detail_template_id bigint not null,
	title_list varchar(255) null
) engine = InnoDB DEFAULT CHARSET = utf8mb4;

create table test_service_template
(
	id bigint auto_increment
		primary key,
	created_at datetime(6) null,
	created_by bigint null,
	deleted_at datetime(6) null,
	deleted_by bigint null,
	modified_at datetime(6) null,
	modified_by bigint null,
	seq int not null,
	test_type varchar(255) not null,
	title varchar(255) not null
) engine = InnoDB DEFAULT CHARSET = utf8mb4;

create table test_service_template_detail_list
(
	test_service_template_id bigint not null,
	detail_list_id bigint not null,
	constraint UK_offt4rh2wshvv38plbnxn9wr9
		unique (detail_list_id)
) engine = InnoDB DEFAULT CHARSET = utf8mb4;

create table user
(
	id bigint auto_increment
		primary key,
	created_at datetime(6) null,
	created_by bigint null,
	deleted_at datetime(6) null,
	deleted_by bigint null,
	modified_at datetime(6) null,
	modified_by bigint null,
	email varchar(255) not null,
	locked_at datetime(6) null,
	login_at datetime(6) null,
	name varchar(255) not null,
	password varchar(255) not null,
	password_changed_at datetime(6) not null,
	user_role varchar(255) not null,
	username varchar(255) not null,
	department_id bigint not null
) engine = InnoDB DEFAULT CHARSET = utf8mb4;

create table personnel
(
	id bigint auto_increment
		primary key,
	created_at datetime(6) null,
	created_by bigint null,
	deleted_at datetime(6) null,
	deleted_by bigint null,
	modified_at datetime(6) null,
	modified_by bigint null,
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

create table personnel_job_list
(
	personnel_id bigint not null,
	job_list_id bigint not null,
	constraint UK_ilql5urkqght0pt1fn5x76ygd
		unique (job_list_id)
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
	id bigint auto_increment
		primary key,
	created_at datetime(6) null,
	created_by bigint null,
	deleted_at datetime(6) null,
	deleted_by bigint null,
	modified_at datetime(6) null,
	modified_by bigint null,
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
	basic__purpose1 varchar(255) null,
	basic__purpose2 varchar(255) null,
	basic__status varchar(255) null,
	basic__total_area double null,
	estimate__figure_level varchar(255) null,
	estimate__modified_at datetime(6) null,
	estimate__received_date date null,
	estimate__report_level varchar(255) null,
	estimate__test_level varchar(255) null,
	order__amount bigint null,
	order__begin_date date null,
	order__close_date date null,
	order__is_on_going bit null,
	order__modified_at datetime(6) null,
	order__received_date date null,
	basic__project_manager_id bigint null,
	basic__sales_manager_id bigint null
) engine = InnoDB DEFAULT CHARSET = utf8mb4;

create table project_comment
(
	id bigint auto_increment
		primary key,
	created_at datetime(6) null,
	created_by bigint null,
	deleted_at datetime(6) null,
	deleted_by bigint null,
	modified_at datetime(6) null,
	modified_by bigint null,
	description varchar(255) not null,
	project_id bigint null,
	writer_id bigint null
) engine = InnoDB DEFAULT CHARSET = utf8mb4;

create table project_review
(
	id bigint auto_increment
		primary key,
	created_at datetime(6) null,
	created_by bigint null,
	deleted_at datetime(6) null,
	deleted_by bigint null,
	modified_at datetime(6) null,
	modified_by bigint null,
	code varchar(255) not null,
	land_figure_count int null,
	status varchar(255) not null,
	project_id bigint null,
	writer_id bigint not null
) engine = InnoDB DEFAULT CHARSET = utf8mb4;

create table project_review_detail_list
(
	project_review_id bigint not null,
	detail_list_id bigint not null,
	constraint UK_898ik0fw1mbl2m8yqpm81gye0
		unique (detail_list_id)
) engine = InnoDB DEFAULT CHARSET = utf8mb4;

create table project_review_file_list
(
	project_review_id bigint not null,
	file_list_id bigint not null,
	constraint UK_dfxrcxrmppayrnof5or5jegto
		unique (file_list_id)
) engine = InnoDB DEFAULT CHARSET = utf8mb4;

create table project_review_test_list
(
	project_review_id bigint not null,
	test_list varchar(255) null
) engine = InnoDB DEFAULT CHARSET = utf8mb4;

create table project_target
(
	id bigint auto_increment
		primary key,
	created_at datetime(6) null,
	created_by bigint null,
	deleted_at datetime(6) null,
	deleted_by bigint null,
	modified_at datetime(6) null,
	modified_by bigint null,
	code varchar(255) not null,
	memo varchar(255) null,
	project_id bigint not null,
	writer_id bigint not null
) engine = InnoDB DEFAULT CHARSET = utf8mb4;

create table project_estimate_sheet
(
	id bigint auto_increment
		primary key,
	created_at datetime(6) null,
	created_by bigint null,
	deleted_at datetime(6) null,
	deleted_by bigint null,
	modified_at datetime(6) null,
	modified_by bigint null,
	confirmed bit not null,
	estimate_date date not null,
	expected_start_month date null,
	memo varchar(255) null,
	special_discount bigint null,
	status int not null,
	title varchar(255) not null,
	project_id bigint not null,
	review_id bigint null,
	sales_management_leader_id bigint null,
	sales_team_leader_id bigint not null,
	target_id bigint null,
	writer_id bigint not null
) engine = InnoDB DEFAULT CHARSET = utf8mb4;

create table project_estimate_sheet_comment_list
(
	project_estimate_sheet_id bigint not null,
	description varchar(255) not null,
	in_use bit not null,
	seq int not null
) engine = InnoDB DEFAULT CHARSET = utf8mb4;

create table project_estimate_sheet_detail_list
(
	project_estimate_sheet_id bigint not null,
	detail_list_id bigint not null,
	constraint UK_gpr3i9bj015g5rni7axac1hpo
		unique (detail_list_id)
) engine = InnoDB DEFAULT CHARSET = utf8mb4;

create table project_target_detail_list
(
	project_target_id bigint not null,
	detail_list_id bigint not null,
	constraint UK_f5exroy99v2j61cpt4af4ldux
		unique (detail_list_id)
) engine = InnoDB DEFAULT CHARSET = utf8mb4;

create table project_target_test_list
(
	project_target_id bigint not null,
	test_list varchar(255) null
) engine = InnoDB DEFAULT CHARSET = utf8mb4;

create table user_invitation
(
	id bigint auto_increment
		primary key,
	created_at datetime(6) null,
	created_by bigint null,
	deleted_at datetime(6) null,
	deleted_by bigint null,
	modified_at datetime(6) null,
	modified_by bigint null,
	email varchar(255) not null,
	name varchar(255) not null,
	user_role int not null,
	department_id bigint not null
) engine = InnoDB DEFAULT CHARSET = utf8mb4;

set FOREIGN_KEY_CHECKS = 1;

