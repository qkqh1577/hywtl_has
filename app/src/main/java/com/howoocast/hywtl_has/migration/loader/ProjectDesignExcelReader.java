package com.howoocast.hywtl_has.migration.loader;

import java.io.File;
import java.io.FileInputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.core.io.ClassPathResource;

public class ProjectDesignExcelReader {

    public static List<Map<String, String>> excelReader() {
        List<Map<String, String>> projectDesignList = new ArrayList<>();
        try {
            File excelFile = new ClassPathResource("migration/HAS-DB-설계개요.xlsx").getFile();
            FileInputStream file = new FileInputStream(excelFile);
            XSSFWorkbook workbook = new XSSFWorkbook(file);
            XSSFSheet sheet = workbook.getSheetAt(0);
            Iterator<Row> rowIterator = sheet.iterator();
            List<String> headers = new ArrayList<>();

            while (rowIterator.hasNext()) {
                Row row = rowIterator.next();
                Iterator<Cell> cellIterator = row.cellIterator();
                Map<String, String> body = new HashMap<>();
                while (cellIterator.hasNext()) {
                    Cell cell = cellIterator.next();
                    if (row.getRowNum() == 0) {
                        headers.add(String.valueOf(row.getCell(cell.getColumnIndex())));
                    } else {
                        System.out.println("row.getCell(cell.getColumnIndex() : " + row.getCell(
                            cell.getColumnIndex()));
                        body.put(headers.get(cell.getColumnIndex()),
                            String.valueOf(row.getCell(cell.getColumnIndex())));
                    }
                }
                if (row.getRowNum() != 0) {
                    projectDesignList.add(body);
                }
            }
            file.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return projectDesignList;
    }
}
