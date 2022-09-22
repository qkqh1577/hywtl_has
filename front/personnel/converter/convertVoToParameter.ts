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
                    .format('yyyy-mm-dd'),
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
                 .format('yyyy-mm-dd'),
    hiredType:   company.hiredType,
    recommender: company.recommender,
  };
}

export function toPersonnelJob(job: PersonnelJobVO): PersonnelJobParameter {
  return {
    departmentId: job.departmentId,
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
                 .format('yyyy-mm-dd'),
    endDate:     dayjs(academy.endDate)
                 .format('yyyy-mm-dd'),
  };
}

export function toPersonnelCareer(career: PersonnelCareerVO): PersonnelCareerParameter {
  return {
    companyName: career.companyName,
    majorJob:    career.majorJob,
    startDate:   dayjs(career.startDate)
                 .format('yyyy-mm-dd'),
    endDate:     dayjs(career.endDate)
                 .format('yyyy-mm-dd'),
  };
}

export function toPersonnelLicense(license: PersonnelLicenseVO): PersonnelLicenseParameter {
  return {
    name:             license.name,
    type:             license.type,
    organizationName: license.organizationName,
    qualifiedNumber:  license.qualifiedNumber,
    qualifiedDate:    dayjs(license.qualifiedDate)
                      .format('yyyy-mm-dd'),
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
                      .format('yyyy-mm-dd'),
    expiryPeriod:     dayjs(language.expiryPeriod)
                      .format('yyyy-mm-dd')
  };
}
