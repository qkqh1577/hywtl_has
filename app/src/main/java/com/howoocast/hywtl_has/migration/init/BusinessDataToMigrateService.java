package com.howoocast.hywtl_has.migration.init;

import com.howoocast.hywtl_has.business.domain.Business;
import com.howoocast.hywtl_has.business.domain.BusinessManager;
import com.howoocast.hywtl_has.business.repository.BusinessRepository;
import com.howoocast.hywtl_has.migration.enums.BusinessHeader;
import com.howoocast.hywtl_has.migration.loader.BusinessExcelReader;
import java.util.List;
import java.util.Map;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

@Component
@RequiredArgsConstructor
public class BusinessDataToMigrateService {

    @PersistenceContext
    private EntityManager em;

    private final BusinessRepository businessRepository;

    @Transactional
    public void migrate() {

        em.persist(Business.of(
            "한양풍동실험연구소",
            "000-00-00000",
            "경기도 안산시 상록구 한양대학로55, 한양대학교 풍환경실험관 2층",
            "031-400-4095",
            "이종원"
        ));

        List<Map<String, String>> businessDtoList = BusinessExcelReader.excelReader();
        businessDtoList.forEach(businessDtoMap -> {
            BusinessManager manager = null;
            if (StringUtils.hasText(businessDtoMap.get(BusinessHeader.BUSINESS_MANAGER.getName()))) {
                manager = BusinessManager.of(
                    businessDtoMap.get(BusinessHeader.BUSINESS_MANAGER.getName()),
                    businessDtoMap.get(BusinessHeader.DEPARTMENT.getName()),
                    businessDtoMap.get(BusinessHeader.POSITION.getName()),
                    businessDtoMap.get(BusinessHeader.OFFICE_PHONE.getName()),
                    businessDtoMap.get(BusinessHeader.MOBILE_PHONE.getName()),
                    businessDtoMap.get(BusinessHeader.EMAIL.getName()),
                    businessDtoMap.get(BusinessHeader.HOME_ADDRESS.getName())
                );
            }

            Business business = Business.of(
                businessDtoMap.get(BusinessHeader.NAME.getName()),
                businessDtoMap.get(BusinessHeader.BUSINESS_REGISTRATION_NUMBER.getName()),
                businessDtoMap.get(BusinessHeader.OFFICE_ADDRESS.getName()),
                businessDtoMap.get(BusinessHeader.OFFICE_PHONE.getName()),
                businessDtoMap.get(BusinessHeader.POSITION.getName()).equals("대표") ? businessDtoMap.get(
                    BusinessHeader.BUSINESS_MANAGER.getName()) : null
            );

            BusinessManager finalManager = manager;
            BusinessManager finalManager1 = manager;
            businessRepository.findByName(
                businessDtoMap.get(BusinessHeader.NAME.getName())).ifPresentOrElse(
                b -> {
                    if (finalManager != null) {
                        b.addBusinessManager(finalManager);
                    }
                    em.persist(b);
                },
                () -> {
                    business.addBusinessManager(finalManager1);
                    em.persist(business);
                }
            );
        });
    }
}
