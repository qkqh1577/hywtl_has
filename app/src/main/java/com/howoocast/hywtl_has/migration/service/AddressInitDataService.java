package com.howoocast.hywtl_has.migration.service;

import com.howoocast.hywtl_has.address.domain.Address;
import com.howoocast.hywtl_has.migration.enums.AddressHeader;
import com.howoocast.hywtl_has.migration.loader.AddressExcelReader;
import java.util.List;
import java.util.Map;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

@Component
@RequiredArgsConstructor
public class AddressInitDataService {

    @PersistenceContext
    private EntityManager em;

    @Transactional
    public void init() {
        List<Map<String, String>> addressMapList = AddressExcelReader.excelReader();
        addressMapList.forEach(addressMap -> {
            if (StringUtils.hasText(addressMap.get(AddressHeader.CODE.getName()))
                && StringUtils.hasText(addressMap.get(AddressHeader.CITY1.getName()))
                && StringUtils.hasText(addressMap.get(AddressHeader.CITY2.getName()))) {
                em.persist(Address.of(
                    addressMap.get(AddressHeader.CODE.getName()),
                    addressMap.get(AddressHeader.CITY1.getName()),
                    addressMap.get(AddressHeader.CITY2.getName())
                ));
            } else {
                em.persist(Address.of(
                    addressMap.get(AddressHeader.CODE.getName()),
                    addressMap.get(AddressHeader.CITY1.getName()),
                    null
                ));
            }
            em.flush();
            em.clear();
        });
    }

}
