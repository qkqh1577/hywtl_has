set FOREIGN_KEY_CHECKS = 0;
drop table if exists business;
drop table if exists business_manager;
drop table if exists business_manager_list;
drop table if exists business_manager_meta;
drop table if exists business_trip;
drop table if exists business_trip_accompany;
drop table if exists contract_basic;
drop table if exists contract_collection;
drop table if exists contract_collection_stage_list;
drop table if exists contract_condition;
drop table if exists contract_condition_description_list;
drop table if exists department;
drop table if exists estimate_content;
drop table if exists estimate_content_detail_list;
drop table if exists estimate_content_test_type_list;
drop table if exists estimate_template;
drop table if exists estimate_template_detail;
drop table if exists estimate_template_detail_list;
drop table if exists estimate_template_detail_title_list;
drop table if exists file_item;
drop table if exists password_reset;
drop table if exists personnel;
drop table if exists personnel_academic_list;
drop table if exists personnel_basic;
drop table if exists personnel_career_list;
drop table if exists personnel_company;
drop table if exists personnel_job;
drop table if exists personnel_job_list;
drop table if exists personnel_language_list;
drop table if exists personnel_license_list;
drop table if exists project;
drop table if exists project_basic_business;
drop table if exists project_basic_contributor;
drop table if exists project_basic_design;
drop table if exists project_basic_fail_reason;
drop table if exists project_bid;
drop table if exists project_collection;
drop table if exists project_collection_stage;
drop table if exists project_collection_stage_status;
drop table if exists project_collection_stage_status_list;
drop table if exists project_collection_stage_version;
drop table if exists project_collection_stage_version_list;
drop table if exists project_complex_building;
drop table if exists project_complex_building_condition_list;
drop table if exists project_complex_building_test_type_list;
drop table if exists project_complex_site;
drop table if exists project_contract;
drop table if exists project_contract_basic;
drop table if exists project_contract_collection;
drop table if exists project_contract_collection_stage_list;
drop table if exists project_contract_condition;
drop table if exists project_contract_condition_description_list;
drop table if exists project_contract_condition_list;
drop table if exists project_document;
drop table if exists project_estimate;
drop table if exists project_estimate_building_list;
drop table if exists project_estimate_complex_building;
drop table if exists project_estimate_complex_building_condition_list;
drop table if exists project_estimate_complex_building_test_type_list;
drop table if exists project_estimate_complex_site;
drop table if exists project_estimate_site_list;
drop table if exists project_estimate_template;
drop table if exists project_estimate_template_detail;
drop table if exists project_estimate_template_detail_list;
drop table if exists project_estimate_template_detail_title_list;
drop table if exists project_estimate_template_list;
drop table if exists project_log;
drop table if exists project_memo;
drop table if exists project_memo_attendance_list;
drop table if exists project_rival_bid;
drop table if exists project_rival_estimate;
drop table if exists project_schedule;
drop table if exists project_schedule_attendance_list;
drop table if exists project_system_estimate_content_list;
drop table if exists user;
drop table if exists user_invitation;
drop table if exists user_notification;
set FOREIGN_KEY_CHECKS = 1;