set FOREIGN_KEY_CHECKS = 0;
INSERT INTO hywtl_has_api.department (id, category, created_at, created_by, memo, name, deleted_at, deleted_by, seq, parent_id) VALUES (1, 'COMPANY', '2022-04-12 15:13:04.655439', 0, null, '한양풍동실험연구소', null, null, 1, null);
INSERT INTO hywtl_has_api.department (id, category, created_at, created_by, memo, name, deleted_at, deleted_by, seq, parent_id) VALUES (2, 'HQ', '2022-04-12 15:13:04.740280', 0, null, '기술본부', null, null, 1, 1);
INSERT INTO hywtl_has_api.department (id, category, created_at, created_by, memo, name, deleted_at, deleted_by, seq, parent_id) VALUES (3, 'TEAM', '2022-04-12 15:13:04.799615', 0, null, '기술팀', null, null, 1, 2);
INSERT INTO hywtl_has_api.department (id, category, created_at, created_by, memo, name, deleted_at, deleted_by, seq, parent_id) VALUES (4, 'TEAM', '2022-04-12 15:13:04.844448', 0, null, '영업팀', null, null, 2, 2);
INSERT INTO hywtl_has_api.department (id, category, created_at, created_by, memo, name, deleted_at, deleted_by, seq, parent_id) VALUES (5, 'TEAM', '2022-04-12 15:13:04.903988', 0, null, '모형팀', null, null, 3, 2);
INSERT INTO hywtl_has_api.department (id, category, created_at, created_by, memo, name, deleted_at, deleted_by, seq, parent_id) VALUES (6, 'PART', '2022-04-12 15:13:04.959709', 0, null, '기술부', null, null, 1, 3);
INSERT INTO hywtl_has_api.department (id, category, created_at, created_by, memo, name, deleted_at, deleted_by, seq, parent_id) VALUES (7, 'PART', '2022-04-12 15:13:05.009016', 0, null, '실험부', null, null, 2, 3);
INSERT INTO hywtl_has_api.department (id, category, created_at, created_by, memo, name, deleted_at, deleted_by, seq, parent_id) VALUES (8, 'PART', '2022-04-12 15:13:05.054741', 0, null, '편집부', null, null, 3, 3);
INSERT INTO hywtl_has_api.personnel (id, address, birth_date, emergency_phone, eng_name, personal_email, phone, relationship, sex, hired_date, hired_type, recommender, created_at, created_by, image_id, user_id) VALUES (1, null, '1982-03-01', null, 'djemals', null, '01012341234', null, '남', '2020-01-01', '경력', null, '2022-04-22 12:34:14.005902', 0, null, 1);
INSERT INTO hywtl_has_api.personnel (id, address, birth_date, emergency_phone, eng_name, personal_email, phone, relationship, sex, hired_date, hired_type, recommender, created_at, created_by, image_id, user_id) VALUES (2, null, '1992-05-07', null, 'dbwj', null, '01045674567', null, '여', '2021-02-11', '신입', null, '2022-04-22 12:34:14.005902', 0, null, 2);
INSERT INTO hywtl_has_api.personnel_academic_list (personnel_id, academy_name, degree, end_date, grade, major, start_date, state) VALUES (1, '한양대', null, '2016-04-01', null, '관리과', '2012-03-01', '졸업');
INSERT INTO hywtl_has_api.personnel_academic_list (personnel_id, academy_name, degree, end_date, grade, major, start_date, state) VALUES (2, '한양대', null, '2022-03-02', null, '유저과', '2018-02-05', '졸업');
INSERT INTO hywtl_has_api.personnel_job (id, job_class, job_duty, job_position, job_title, job_type, department_id) VALUES (1, null, null, '최고', '최고관리자', '최고관리자', 1);
INSERT INTO hywtl_has_api.personnel_job (id, job_class, job_duty, job_position, job_title, job_type, department_id) VALUES (2, null, null, '일반', '일반직', '일반유저', 1);
INSERT INTO hywtl_has_api.personnel_job_list (personnel_id, job_list_id) VALUES (1, 1);
INSERT INTO hywtl_has_api.personnel_job_list (personnel_id, job_list_id) VALUES (2, 2);
INSERT INTO hywtl_has_api.project (id, created_at, created_by, deleted_at, deleted_by, modified_at, modified_by, basic__address, basic__alias, basic__base_count, basic__building_count, basic__client_email, basic__client_manager, basic__client_name, basic__client_phone, basic__code, basic__floor_count, basic__household_count, basic__is_client_lh, basic__lot_area, basic__modified_at, basic__name, basic__purpose1, basic__purpose2, basic__status, basic__total_area, estimate__figure_level, estimate__modified_at, estimate__received_date, estimate__report_level, estimate__test_level, order__amount, order__begin_date, order__close_date, order__is_on_going, order__modified_at, order__received_date, basic__project_manager_id, basic__sales_manager_id) VALUES (1, '2022-04-27 12:05:37.044207', 0, null, null, '2022-04-27 12:05:37.044207', 0, null, 'ssx', null, null, null, null, null, null, '123', null, null, null, null, '2022-04-27 12:05:37.028178', 'asdf', null, null, 'TEMPLATE', null, null, null, null, null, null, null, null, null, null, null, null,  2, 1);
INSERT INTO hywtl_has_api.project_estimate_sheet (id, created_at, created_by, deleted_at, deleted_by, modified_at, modified_by, confirmed, engineering_period, estimate_date, expected_start_month, final_report_period, memo, special_discount, status, title, project_id, review_id, sales_management_leader_id, sales_team_leader_id, target_id, writer_id) VALUES (1, '2022-05-24 12:07:07.591557', 1, null, null, null, 1, false, null, '2022-05-10', null, null, null, null, 0, 'asdf', 1, 1, null, 1, null, 1);
INSERT INTO hywtl_has_api.project_estimate_sheet_test_service (id, created_at, created_by, deleted_at, deleted_by, modified_at, modified_by, seq, title) VALUES (1, '2022-05-24 12:07:07.607414', 1, null, null, null, 1, 1, '주골조설계용 풍하중');
INSERT INTO hywtl_has_api.project_estimate_sheet_test_service (id, created_at, created_by, deleted_at, deleted_by, modified_at, modified_by, seq, title) VALUES (2, '2022-05-24 12:07:07.614834', 1, null, null, null, 1, 2, '외장재설계용 풍하중');
INSERT INTO hywtl_has_api.project_estimate_sheet_test_service_detail (id, created_at, created_by, deleted_at, deleted_by, modified_at, modified_by, count, is_included, memo, seq, total_price, unit, unit_price) VALUES (1, '2022-05-24 12:07:07.612208', 1, null, null, null, 1, 1, true, '국토교통부 풍동실험 가이드라인', 1, 7500000, '동', 7500000);
INSERT INTO hywtl_has_api.project_estimate_sheet_test_service_detail (id, created_at, created_by, deleted_at, deleted_by, modified_at, modified_by, count, is_included, memo, seq, total_price, unit, unit_price) VALUES (2, '2022-05-24 12:07:07.616945', 1, null, null, null, 1, 1, true, '국토교통부 풍동실험 가이드라인', 1, 8500000, '동', 8500000);
INSERT INTO hywtl_has_api.project_estimate_sheet_test_service_detail_list (project_estimate_sheet_test_service_id, detail_list_id) VALUES (1, 1);
INSERT INTO hywtl_has_api.project_estimate_sheet_test_service_detail_list (project_estimate_sheet_test_service_id, detail_list_id) VALUES (2, 2);
INSERT INTO hywtl_has_api.project_estimate_sheet_test_service_detail_title_list (project_estimate_sheet_test_service_detail_id, title_list) VALUES (1, '주골조설계용 풍응답 평가(재해석 2회)');
INSERT INTO hywtl_has_api.project_estimate_sheet_test_service_detail_title_list (project_estimate_sheet_test_service_detail_id, title_list) VALUES (1, '중간요약본 및 최종평가보고서');
INSERT INTO hywtl_has_api.project_estimate_sheet_test_service_detail_title_list (project_estimate_sheet_test_service_detail_id, title_list) VALUES (1, '풍력실험을 위한 풍력 특수모형 제작');
INSERT INTO hywtl_has_api.project_estimate_sheet_test_service_detail_title_list (project_estimate_sheet_test_service_detail_id, title_list) VALUES (1, '풍력실험을 통한 풍하중 측정');
INSERT INTO hywtl_has_api.project_estimate_sheet_test_service_detail_title_list (project_estimate_sheet_test_service_detail_id, title_list) VALUES (2, '외장재설계용 풍하중 평가');
INSERT INTO hywtl_has_api.project_estimate_sheet_test_service_detail_title_list (project_estimate_sheet_test_service_detail_id, title_list) VALUES (2, '최종평가보고서');
INSERT INTO hywtl_has_api.project_estimate_sheet_test_service_detail_title_list (project_estimate_sheet_test_service_detail_id, title_list) VALUES (2, '풍압실험을 위한 풍압 특수모형 제작');
INSERT INTO hywtl_has_api.project_estimate_sheet_test_service_detail_title_list (project_estimate_sheet_test_service_detail_id, title_list) VALUES (2, '풍압실험을 통한 풍압 측정(최대 250개소)');
INSERT INTO hywtl_has_api.project_estimate_sheet_test_service_list (project_estimate_sheet_id, test_service_list_id) VALUES (1, 1);
INSERT INTO hywtl_has_api.project_estimate_sheet_test_service_list (project_estimate_sheet_id, test_service_list_id) VALUES (1, 2);
INSERT INTO hywtl_has_api.project_review (id, created_at, created_by, deleted_at, deleted_by, modified_at, modified_by, code, land_figure_count, status, project_id, writer_id) VALUES (1, '2022-05-17 17:37:35.215375', 1, null, null, '2022-05-17 17:37:35.215375', 1, '반포 자이', null, 'DRAFT_CONFIRMED', 1, 1);
INSERT INTO hywtl_has_api.project_review_detail (id, created_at, created_by, deleted_at, deleted_by, modified_at, modified_by, area, base_count, building_name, floor_count, height, memo1, memo2, ratio) VALUES (1, '2022-05-17 17:37:35.231373', 1, null, null, '2022-05-17 17:37:35.231373', 1, 301, 2, '201호', 29, 81, null, null, 4.668762383404303);
INSERT INTO hywtl_has_api.project_review_detail_list (project_review_id, detail_list_id) VALUES (1, 1);
INSERT INTO hywtl_has_api.project_review_detail_special_wind_load_condition_list (project_review_detail_id, special_wind_load_condition_list) VALUES (1, '4');
INSERT INTO hywtl_has_api.project_review_detail_test_list (project_review_detail_id, test_list) VALUES (1, 'F');
INSERT INTO hywtl_has_api.project_review_detail_test_list (project_review_detail_id, test_list) VALUES (1, 'P');
INSERT INTO hywtl_has_api.estimate_template_detail (id, created_at, created_by, deleted_at, deleted_by, modified_at, modified_by, memo, seq, unit, unit_price) VALUES (1, '2022-05-20 16:43:43.944352', 1, null, null, null, 1, '글로벌 수준 ESDU 기반', 1, '단지', 25000000);
INSERT INTO hywtl_has_api.estimate_template_detail (id, created_at, created_by, deleted_at, deleted_by, modified_at, modified_by, memo, seq, unit, unit_price) VALUES (2, '2022-05-20 16:46:09.573678', 1, null, null, null, 1, '국토교통부 풍동실험 가이드라인', 1, '동', 7500000);
INSERT INTO hywtl_has_api.estimate_template_detail (id, created_at, created_by, deleted_at, deleted_by, modified_at, modified_by, memo, seq, unit, unit_price) VALUES (3, '2022-05-23 15:41:08.312062', 1, null, null, null, 1, '(2)항 평가 후 필요 시 수행', 1, '동', 30000000);
INSERT INTO hywtl_has_api.estimate_template_detail (id, created_at, created_by, deleted_at, deleted_by, modified_at, modified_by, memo, seq, unit, unit_price) VALUES (4, '2022-05-23 15:44:06.280857', 1, null, null, '2022-05-23 15:44:14.961202', 1, '국토교통부 풍동실험 가이드라인', 1, '동', 8500000);
INSERT INTO hywtl_has_api.estimate_template_detail (id, created_at, created_by, deleted_at, deleted_by, modified_at, modified_by, memo, seq, unit, unit_price) VALUES (5, '2022-05-23 15:54:40.665333', 1, null, null, null, 1, '국토교통부 빌딩풍 가이드라인', 1, '단지', 18000000);
INSERT INTO hywtl_has_api.estimate_template_detail (id, created_at, created_by, deleted_at, deleted_by, modified_at, modified_by, memo, seq, unit, unit_price) VALUES (6, '2022-05-23 15:54:40.667422', 1, null, null, null, 1, '개선방안 요구 시', 2, '단지', 15000000);
INSERT INTO hywtl_has_api.estimate_template_detail (id, created_at, created_by, deleted_at, deleted_by, modified_at, modified_by, memo, seq, unit, unit_price) VALUES (7, '2022-05-23 15:59:09.735384', 1, null, null, null, 1, '국토교통부 CFD해석 가이드라인', 1, '단지', 85000000);
INSERT INTO hywtl_has_api.estimate_template_detail (id, created_at, created_by, deleted_at, deleted_by, modified_at, modified_by, memo, seq, unit, unit_price) VALUES (8, '2022-05-23 15:59:59.764916', 1, null, null, null, 1, '(2)항 업무와 연계', 1, '동', 3000000);
INSERT INTO hywtl_has_api.estimate_template_detail_title_list (estimate_template_detail_id, title_list) VALUES (1, '대상부지 지표면조도구분 판정');
INSERT INTO hywtl_has_api.estimate_template_detail_title_list (estimate_template_detail_id, title_list) VALUES (1, '대지주변 건물모델링 및 모형제작');
INSERT INTO hywtl_has_api.estimate_template_detail_title_list (estimate_template_detail_id, title_list) VALUES (1, '재현기간 별 기본풍속 평가');
INSERT INTO hywtl_has_api.estimate_template_detail_title_list (estimate_template_detail_id, title_list) VALUES (1, '풍동실험을 위한 맞춤형 자연기류 형성');
INSERT INTO hywtl_has_api.estimate_template_detail_title_list (estimate_template_detail_id, title_list) VALUES (2, '주골조설계용 풍응답 평가(재해석 2회)');
INSERT INTO hywtl_has_api.estimate_template_detail_title_list (estimate_template_detail_id, title_list) VALUES (2, '중간요약본 및 최종평가보고서');
INSERT INTO hywtl_has_api.estimate_template_detail_title_list (estimate_template_detail_id, title_list) VALUES (2, '풍력실험을 위한 풍력 특수모형 제작');
INSERT INTO hywtl_has_api.estimate_template_detail_title_list (estimate_template_detail_id, title_list) VALUES (2, '풍력실험을 통한 풍하중 측정');
INSERT INTO hywtl_has_api.estimate_template_detail_title_list (estimate_template_detail_id, title_list) VALUES (3, '공기력불안정진동 발생여부 평가');
INSERT INTO hywtl_has_api.estimate_template_detail_title_list (estimate_template_detail_id, title_list) VALUES (3, '공기력진동실험을 위한 특수모형 제작');
INSERT INTO hywtl_has_api.estimate_template_detail_title_list (estimate_template_detail_id, title_list) VALUES (3, '공기력진동실험을 통한 수평변위 측정');
INSERT INTO hywtl_has_api.estimate_template_detail_title_list (estimate_template_detail_id, title_list) VALUES (3, '최종평가보고서');
INSERT INTO hywtl_has_api.estimate_template_detail_title_list (estimate_template_detail_id, title_list) VALUES (4, '외장재설계용 풍하중 평가');
INSERT INTO hywtl_has_api.estimate_template_detail_title_list (estimate_template_detail_id, title_list) VALUES (4, '최종평가보고서');
INSERT INTO hywtl_has_api.estimate_template_detail_title_list (estimate_template_detail_id, title_list) VALUES (4, '풍압실험을 위한 풍압 특수모형 제작');
INSERT INTO hywtl_has_api.estimate_template_detail_title_list (estimate_template_detail_id, title_list) VALUES (4, '풍압실험을 통한 풍압 측정(최대 250개소)');
INSERT INTO hywtl_has_api.estimate_template_detail_title_list (estimate_template_detail_id, title_list) VALUES (5, '보행자의 풍쾌적도 및 풍안전도 평가');
INSERT INTO hywtl_has_api.estimate_template_detail_title_list (estimate_template_detail_id, title_list) VALUES (5, '최종평가보고서');
INSERT INTO hywtl_has_api.estimate_template_detail_title_list (estimate_template_detail_id, title_list) VALUES (5, '풍압실험을 통한 풍압 측정(최대 70개소)');
INSERT INTO hywtl_has_api.estimate_template_detail_title_list (estimate_template_detail_id, title_list) VALUES (5, '풍환경실험을 위한 특수모형 제작');
INSERT INTO hywtl_has_api.estimate_template_detail_title_list (estimate_template_detail_id, title_list) VALUES (6, '풍쾌적도 및 풍안전도 개선 평가(최대 2회)');
INSERT INTO hywtl_has_api.estimate_template_detail_title_list (estimate_template_detail_id, title_list) VALUES (7, '건축물들 상/중/저층부 빌딩풍 평가');
INSERT INTO hywtl_has_api.estimate_template_detail_title_list (estimate_template_detail_id, title_list) VALUES (7, '대상건축물 및 주변건축물 3D 모델링');
INSERT INTO hywtl_has_api.estimate_template_detail_title_list (estimate_template_detail_id, title_list) VALUES (7, '보행자의 풍쾌적도 및 풍안전도 평가');
INSERT INTO hywtl_has_api.estimate_template_detail_title_list (estimate_template_detail_id, title_list) VALUES (7, '빌딩풍 시뮬레이션(16개 풍향)');
INSERT INTO hywtl_has_api.estimate_template_detail_title_list (estimate_template_detail_id, title_list) VALUES (7, '최종평가보고서');
INSERT INTO hywtl_has_api.estimate_template_detail_title_list (estimate_template_detail_id, title_list) VALUES (8, '구조물 동특성 자료 수급');
INSERT INTO hywtl_has_api.estimate_template_detail_title_list (estimate_template_detail_id, title_list) VALUES (8, '풍하중 검토 및 구조설계 반영');
INSERT INTO hywtl_has_api.estimate_template (id, created_at, created_by, deleted_at, deleted_by, modified_at, modified_by, seq, test_type, title) VALUES (1, '2022-05-20 16:43:43.918093', 1, null, null, null, 1, 1, 'COMMON', '자연기류 형성');
INSERT INTO hywtl_has_api.estimate_template (id, created_at, created_by, deleted_at, deleted_by, modified_at, modified_by, seq, test_type, title) VALUES (2, '2022-05-20 16:46:09.571086', 1, null, null, null, 1, 2, 'F', '주골조설계용 풍하중');
INSERT INTO hywtl_has_api.estimate_template (id, created_at, created_by, deleted_at, deleted_by, modified_at, modified_by, seq, test_type, title) VALUES (3, '2022-05-23 15:41:08.289271', 1, null, null, null, 1, 3, 'A', '부가적인 공기력진동');
INSERT INTO hywtl_has_api.estimate_template (id, created_at, created_by, deleted_at, deleted_by, modified_at, modified_by, seq, test_type, title) VALUES (4, '2022-05-23 15:44:06.278263', 1, null, null, '2022-05-23 15:44:14.959638', 1, 4, 'P', '외장재설계용 풍하중');
INSERT INTO hywtl_has_api.estimate_template (id, created_at, created_by, deleted_at, deleted_by, modified_at, modified_by, seq, test_type, title) VALUES (5, '2022-05-23 15:54:40.662695', 1, null, null, null, 1, 5, 'E', '보행자 풍쾌적도 및 풍안전도');
INSERT INTO hywtl_has_api.estimate_template (id, created_at, created_by, deleted_at, deleted_by, modified_at, modified_by, seq, test_type, title) VALUES (6, '2022-05-23 15:59:09.733309', 1, null, null, null, 1, 6, 'B', '빌딩풍 시뮬레이션');
INSERT INTO hywtl_has_api.estimate_template (id, created_at, created_by, deleted_at, deleted_by, modified_at, modified_by, seq, test_type, title) VALUES (7, '2022-05-23 15:59:59.762333', 1, null, null, null, 1, 7, 'REVIEW', '구조설계사 구조협력');
INSERT INTO hywtl_has_api.estimate_template_detail_list (estimate_template_id, detail_list_id) VALUES (1, 1);
INSERT INTO hywtl_has_api.estimate_template_detail_list (estimate_template_id, detail_list_id) VALUES (2, 2);
INSERT INTO hywtl_has_api.estimate_template_detail_list (estimate_template_id, detail_list_id) VALUES (3, 3);
INSERT INTO hywtl_has_api.estimate_template_detail_list (estimate_template_id, detail_list_id) VALUES (4, 4);
INSERT INTO hywtl_has_api.estimate_template_detail_list (estimate_template_id, detail_list_id) VALUES (5, 5);
INSERT INTO hywtl_has_api.estimate_template_detail_list (estimate_template_id, detail_list_id) VALUES (5, 6);
INSERT INTO hywtl_has_api.estimate_template_detail_list (estimate_template_id, detail_list_id) VALUES (6, 7);
INSERT INTO hywtl_has_api.estimate_template_detail_list (estimate_template_id, detail_list_id) VALUES (7, 8);
INSERT INTO hywtl_has_api.user (id, created_at, created_by, deleted_at, deleted_by, modified_at, modified_by, email, locked_at, login_at, name, password, password_changed_at, role, username, department_id) VALUES (1, '2022-04-13 10:43:09.640141', 0, null, null, '2022-04-13 10:43:09.700159', 0, 'admin@test.com', null, null, '마스터', '$2a$10$0ATIxnSm9RIMhg7.q5mqWOBp45n48KUFMUzzXqqwGcc9LN/VgCEUa', '2022-04-13 10:43:09.700159', 'MASTER', 'admin', 1);
INSERT INTO hywtl_has_api.user (id, created_at, created_by, deleted_at, deleted_by, modified_at, modified_by, email, locked_at, login_at, name, password, password_changed_at, role, username, department_id) VALUES (2, '2022-04-13 10:43:09.640141', 0, null, null, '2022-04-13 10:43:09.700159', 0, 'user@test.com', null, null, '유저', '$2a$10$0ATIxnSm9RIMhg7.q5mqWOBp45n48KUFMUzzXqqwGcc9LN/VgCEUa', '2022-04-13 10:43:09.700159', 'NORMAL', 'user', 2);
INSERT INTO hywtl_has_api.user (id, created_at, created_by, deleted_at, deleted_by, modified_at, modified_by, email, locked_at, login_at, name, password, password_changed_at, role, username, department_id) VALUES (3, '2022-05-12 12:11:03.767944', null, null, null, '2022-05-12 12:11:03.767944', null, 'test@test.com', null, null, 'aas', '$2a$10$Eyzu6ADvAEWwXJYQBfyC6eP/7cdz6Fd4ulhlvyHQdY4lMjuu/nNk2', '2022-05-12 12:11:03.757347', 'ADMIN', 'test', 2);
INSERT INTO hywtl_has_api.user_invitation (id, created_at, created_by, deleted_at, deleted_by, modified_at, modified_by, email, name, role, department_id) VALUES (1, '2022-04-13 10:42:47.046140', 0, '2022-04-13 10:43:09.705662', null, null, null, 'admin@test.com', 'admin', 0, 1);
INSERT INTO hywtl_has_api.user_invitation (id, created_at, created_by, deleted_at, deleted_by, modified_at, modified_by, email, name, role, department_id) VALUES (2, '2022-04-13 10:42:47.046140', 0, '2022-04-13 10:43:09.705662', null, null, null, 'user@test.com', 'user', 0, 2);
INSERT INTO hywtl_has_api.user_invitation (id, created_at, created_by, deleted_at, deleted_by, modified_at, modified_by, email, name, role, department_id) VALUES (3, '2022-05-12 12:10:42.064628', 1, '2022-05-12 12:11:03.000000', null, '2022-05-12 12:10:42.064628', 1, 'test@test.com', 'test', 1, 2);
INSERT INTO hywtl_has_api.business (id, created_at, created_by, deleted_at, deleted_by, modified_at, modified_by, address, ceo_name, name, note, office_phone, registration_number) VALUES (1, '2022-08-17 11:21:23.077118', null, null, null, null, null, null, '김갑수', '김기업', null, '02-1111-1111', '111-222-1212123');
INSERT INTO hywtl_has_api.business (id, created_at, created_by, deleted_at, deleted_by, modified_at, modified_by, address, ceo_name, name, note, office_phone, registration_number) VALUES (2, '2022-08-17 11:22:32.466625', null, null, null, null, null, null, '정갑수', '정기업', null, '02-2222-2222', '222-222-1212123');
INSERT INTO hywtl_has_api.business (id, created_at, created_by, deleted_at, deleted_by, modified_at, modified_by, address, ceo_name, name, note, office_phone, registration_number) VALUES (3, '2022-08-17 11:23:50.518280', null, null, null, null, null, null, '박갑수', '박기업', null, '02-3333-3333', '333-222-1212123');
INSERT INTO hywtl_has_api.business_manager (id, created_at, created_by, deleted_at, deleted_by, modified_at, modified_by, email, job_title, mobile_phone, name, office_phone, status) VALUES (1, '2022-08-17 11:21:23.101241', null, null, null, null, null, null, '차장', null, '김을수', null, 'IN_OFFICE');
INSERT INTO hywtl_has_api.business_manager (id, created_at, created_by, deleted_at, deleted_by, modified_at, modified_by, email, job_title, mobile_phone, name, office_phone, status) VALUES (2, '2022-08-17 11:22:32.469267', null, null, null, null, null, null, '대리', null, '정을수', null, 'IN_OFFICE');
INSERT INTO hywtl_has_api.business_manager (id, created_at, created_by, deleted_at, deleted_by, modified_at, modified_by, email, job_title, mobile_phone, name, office_phone, status) VALUES (3, '2022-08-17 11:23:50.520355', null, null, null, null, null, null, '부장', null, '박을수', null, 'RESIGNATION');
INSERT INTO hywtl_has_api.business_manager (id, created_at, created_by, deleted_at, deleted_by, modified_at, modified_by, email, job_title, mobile_phone, name, office_phone, status) VALUES (4, '2022-08-17 11:23:50.522439', null, null, null, null, null, null, '사원', null, '박병수', null, 'IN_OFFICE');
INSERT INTO hywtl_has_api.business_manager_list (business_id, manager_list_id) VALUES (1, 1);
INSERT INTO hywtl_has_api.business_manager_list (business_id, manager_list_id) VALUES (2, 2);
INSERT INTO hywtl_has_api.business_manager_list (business_id, manager_list_id) VALUES (3, 3);
INSERT INTO hywtl_has_api.business_manager_list (business_id, manager_list_id) VALUES (3, 4);
INSERT INTO hywtl_has_api.business_manager_meta (business_manager_id, meta) VALUES (1, '김기업 차장');
INSERT INTO hywtl_has_api.business_manager_meta (business_manager_id, meta) VALUES (1, '김차장');
set FOREIGN_KEY_CHECKS = 1;