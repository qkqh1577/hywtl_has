package com.howoocast.hywtl_has.migration.loader;

import com.howoocast.hywtl_has.migration.enums.ProjectStatusHeader;
import java.io.File;
import java.io.FileInputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.core.io.ClassPathResource;
import org.springframework.util.StringUtils;

/**
 * HAS-DB-분류.xlsx
 */
public class ProjectStatusExcelReader {

    public static List<Map<String, String>> excelReader() {
        List<Map<String, String>> projectStatusList = new ArrayList<>();
        try {
            File excelFile = new ClassPathResource("migration/HAS-DB-분류.xlsx").getFile();
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
                        /* row.cellIterator에 프로젝트명이 없음. */
                        if (headers.get(cell.getColumnIndex())
                            .equals(ProjectStatusHeader.CODE.getName())
                            && (
                            String.valueOf(row.getCell(cell.getColumnIndex())).equals("18017.0")
                                || String.valueOf(row.getCell(cell.getColumnIndex())).equals("18051.0")
                                || String.valueOf(row.getCell(cell.getColumnIndex())).equals("18217.0")
                                || String.valueOf(row.getCell(cell.getColumnIndex())).equals("18219.0")
                                || String.valueOf(row.getCell(cell.getColumnIndex())).equals("21151.0")
                            )
                        ) {
                            body.put(headers.get(0),
                                String.valueOf(row.getCell(0)));
                            body.put(headers.get(1), "프로젝트명 없음");
                        } else {
                            body.put(headers.get(cell.getColumnIndex()),
                                String.valueOf(row.getCell(cell.getColumnIndex())));
                        }
                    }
                }
                if (row.getRowNum() != 0) {
                    projectStatusList.add(body);
                }
            }
            file.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return projectStatusList;
    }
}
