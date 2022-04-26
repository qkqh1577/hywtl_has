INSERT INTO hywtl_has_api.department (id, category, created_time, memo, name, deleted_time, seq, parent_id) VALUES (1, 'COMPANY', '2022-04-12 15:13:04.655439', null, '한양풍동실험연구소', null, 1, null);
INSERT INTO hywtl_has_api.department (id, category, created_time, memo, name, deleted_time, seq, parent_id) VALUES (2, 'HQ', '2022-04-12 15:13:04.740280', null, '기술본부', null, 1, 1);
INSERT INTO hywtl_has_api.department (id, category, created_time, memo, name, deleted_time, seq, parent_id) VALUES (3, 'TEAM', '2022-04-12 15:13:04.799615', null, '기술팀', null, 1, 2);
INSERT INTO hywtl_has_api.department (id, category, created_time, memo, name, deleted_time, seq, parent_id) VALUES (4, 'TEAM', '2022-04-12 15:13:04.844448', null, '영업팀', null, 2, 2);
INSERT INTO hywtl_has_api.department (id, category, created_time, memo, name, deleted_time, seq, parent_id) VALUES (5, 'TEAM', '2022-04-12 15:13:04.903988', null, '모형팀', null, 3, 2);
INSERT INTO hywtl_has_api.department (id, category, created_time, memo, name, deleted_time, seq, parent_id) VALUES (6, 'PART', '2022-04-12 15:13:04.959709', null, '기술부', null, 1, 3);
INSERT INTO hywtl_has_api.department (id, category, created_time, memo, name, deleted_time, seq, parent_id) VALUES (7, 'PART', '2022-04-12 15:13:05.009016', null, '실험부', null, 2, 3);
INSERT INTO hywtl_has_api.department (id, category, created_time, memo, name, deleted_time, seq, parent_id) VALUES (8, 'PART', '2022-04-12 15:13:05.054741', null, '편집부', null, 3, 3);
INSERT INTO hywtl_has_api.user_invitation (id, created_time, deleted_time, email, name, user_role, department_id) VALUES (1, '2022-04-13 10:42:47.046140', '2022-04-13 10:43:09.705662', 'admin@test.com', 'admin', 0, 1);
INSERT INTO hywtl_has_api.user_invitation (id, created_time, deleted_time, email, name, user_role, department_id) VALUES (2, '2022-04-13 10:42:47.046140', '2022-04-13 10:43:09.705662', 'user@test.com', 'user', 0, 2);
INSERT INTO hywtl_has_api.user (id, created_time, deleted_time, email, locked_time, login_time, name, password, password_changed_time, user_role, username, department_id) VALUES (1, '2022-04-13 10:43:09.640141', null, 'admin@test.com', null, null, '마스터', '$2a$10$0ATIxnSm9RIMhg7.q5mqWOBp45n48KUFMUzzXqqwGcc9LN/VgCEUa', '2022-04-13 10:43:09.700159', 'MASTER', 'admin', 1);
INSERT INTO hywtl_has_api.user (id, created_time, deleted_time, email, locked_time, login_time, name, password, password_changed_time, user_role, username, department_id) VALUES (2, '2022-04-13 10:43:09.640141', null, 'user@test.com', null, null, '유저', '$2a$10$0ATIxnSm9RIMhg7.q5mqWOBp45n48KUFMUzzXqqwGcc9LN/VgCEUa', '2022-04-13 10:43:09.700159', 'ADMIN', 'user', 2);
INSERT INTO hywtl_has_api.personnel (id, address, birth_date, emergency_phone, eng_name, personal_email, phone, relationship, sex, hired_date, hired_type, recommender, created_time, deleted_time, image_id) VALUES (1, null, '1982-03-01', null, 'djemals', null, '01012341234', null, '남', '2020-01-01', '경력', null, '2022-04-22 12:34:14.005902', null, null);
INSERT INTO hywtl_has_api.personnel_academic_list (personnel_id, academy_name, degree, end_date, grade, major, start_date, state) VALUES (1, '한양대', null, '2016-04-01', null, '관리과', '2012-03-01', '졸업');
INSERT INTO hywtl_has_api.personnel_job (id, job_class, job_duty, job_position, job_title, job_type, department_id) VALUES (1, null, null, '최고', '최고관리자', '최고관리자', 1);
INSERT INTO hywtl_has_api.personnel_job_list (personnel_id, job_list_id) VALUES (1, 1);
INSERT INTO hywtl_has_api.personnel (id, address, birth_date, emergency_phone, eng_name, personal_email, phone, relationship, sex, hired_date, hired_type, recommender, created_time, deleted_time, image_id) VALUES (2, null, '1992-05-07', null, 'dbwj', null, '01045674567', null, '여', '2021-02-11', '신입', null, '2022-04-22 12:34:14.005902', null, null);
INSERT INTO hywtl_has_api.personnel_academic_list (personnel_id, academy_name, degree, end_date, grade, major, start_date, state) VALUES (2, '한양대', null, '2022-03-02', null, '유저과', '2018-02-05', '졸업');
INSERT INTO hywtl_has_api.personnel_job (id, job_class, job_duty, job_position, job_title, job_type, department_id) VALUES (2, null, null, '일반', '일반직', '일반유저', 1);
INSERT INTO hywtl_has_api.personnel_job_list (personnel_id, job_list_id) VALUES (2, 2);
