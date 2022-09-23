import {
  PersonnelAcademicVO,
  PersonnelBasicVO,
  PersonnelCareerVO,
  PersonnelCompanyVO,
  PersonnelJobVO,
  PersonnelLanguageVO,
  PersonnelLicenseVO
} from 'personnel/domain';
import {
  PersonnelAcademicParameter,
  PersonnelBasicParameter,
  PersonnelCareerParameter,
  PersonnelCompanyParameter,
  PersonnelJobParameter,
  PersonnelLanguageParameter,
  PersonnelLicenseParameter
} from 'personnel/parameter';
import dayjs from 'dayjs';

export function toPersonnelBasic(basic: PersonnelBasicVO): PersonnelBasicParameter {
  return {
    engName:        basic.engName,
    birthDate:      dayjs(basic.birthDate)
                    .format('YYYY-MM-DD'),
    sex:            basic.sex,
    image:          undefined,
    address:        basic.address,
    phone:          basic.phone,
    emergencyPhone: basic.emergencyPhone,
    relationship:   basic.relationship,
    personalEmail:  basic.personalEmail
  };
}

export function toPersonnelCompany(company: PersonnelCompanyVO): PersonnelCompanyParameter {
  return {
    hiredDate:   dayjs(company.hiredDate)
                 .format('YYYY-MM-DD'),
    hiredType:   company.hiredType,
    recommender: company.recommender,
  };
}

export function toPersonnelJob(job: PersonnelJobVO): PersonnelJobParameter {
  console.log("job : ", job);
  return {
    departmentId: job.department,
    jobTitle:     job.jobTitle,
    jobType:      job.jobType,
    jobPosition:  job.jobPosition,
    jobClass:     job.jobClass,
    jobDuty:      job.jobDuty,
  };
}

export function toPersonnelAcademy(academy: PersonnelAcademicVO): PersonnelAcademicParameter {
  return {
    academyName: academy.academyName,
    major:       academy.major,
    degree:      academy.degree,
    state:       academy.state,
    grade:       academy.grade,
    startDate:   dayjs(academy.startDate)
                 .format('YYYY-MM-DD'),
    endDate:     dayjs(academy.endDate)
                 .format('YYYY-MM-DD'),
  };
}

export function toPersonnelCareer(career: PersonnelCareerVO): PersonnelCareerParameter {
  return {
    companyName: career.companyName,
    majorJob:    career.majorJob,
    startDate:   dayjs(career.startDate)
                 .format('YYYY-MM-DD'),
    endDate:     dayjs(career.endDate)
                 .format('YYYY-MM-DD'),
  };
}

export function toPersonnelLicense(license: PersonnelLicenseVO): PersonnelLicenseParameter {
  return {
    name:             license.name,
    type:             license.type,
    organizationName: license.organizationName,
    qualifiedNumber:  license.qualifiedNumber,
    qualifiedDate:    dayjs(license.qualifiedDate)
                      .format('YYYY-MM-DD'),
    note:             license.note,
  };
}

export function toPersonnelLanguage(language: PersonnelLanguageVO): PersonnelLanguageParameter {
  return {
    name:             language.name,
    type:             language.type,
    grade:            language.grade,
    organizationName: language.organizationName,
    certifiedDate:    dayjs(language.certifiedDate)
                      .format('YYYY-MM-DD'),
    expiryPeriod:     dayjs(language.expiryPeriod)
                      .format('YYYY-MM-DD')
  };
}
