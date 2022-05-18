package com.howoocast.hywtl_has.company.domain;

import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

public class CompanyTest {

    @Test
    public void of(){
        String name = "name";
        String representativeName = "representativeName";
        String companyNumber = "companyNumber,";
        String address = "address";
        String zipcode = "zipcode";
        String phone = "phone";
        String memo = "memo";
        List<Manager> arrayList = new ArrayList<>();
        String createdBy = "createdBy";
        Company company = Company.of(name, representativeName, companyNumber, address, zipcode, phone, memo, arrayList);
        assertEquals(company.getRepresentativeName(),representativeName);
        assertEquals(company.getName(),name);
        assertEquals(company.getName(),name);
        assertEquals(company.getName(),name);
        assertEquals(company.getName(),name);
        assertEquals(company.getName(),name);
        assertEquals(company.getName(),name);
        assertEquals(company.getName(),name);
    }

}