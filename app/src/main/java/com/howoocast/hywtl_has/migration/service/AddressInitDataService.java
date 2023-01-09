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

@Component
@RequiredArgsConstructor
public class AddressInitDataService {

    @PersistenceContext
    private EntityManager em;
    @Transactional
    public void init() {
        List<Map<String, String>> addressMapList = AddressExcelReader.excelReader();
        addressMapList.forEach(addressMap -> {
            System.out.println("addressMap = " + addressMap.get(AddressHeader.CODE.getName()));
            System.out.println("addressMap = " + addressMap.get(AddressHeader.CITY1.getName()));
            System.out.println("addressMap = " + addressMap.get(AddressHeader.CITY2.getName()));
            em.persist(Address.of(
                addressMap.get(AddressHeader.CODE.getName()),
                addressMap.get(AddressHeader.CITY1.getName()),
                addressMap.get(AddressHeader.CITY2.getName())
            ));
            em.flush();
            em.clear();
        });
    }

}
