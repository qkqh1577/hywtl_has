package com.howoocast.hywtl_has.migration.loader;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.core.io.ClassPathResource;

import java.io.File;
import java.io.FileInputStream;
import java.util.Iterator;

public class ExcelReader {

    public static void main(String[] args)
    {
        try
        {
            File excelFile = new ClassPathResource("migration/HAS-DB-영업.xlsx").getFile();
            FileInputStream file = new FileInputStream(excelFile);
            XSSFWorkbook workbook = new XSSFWorkbook(file);
            XSSFSheet sheet = workbook.getSheetAt(0);
            Iterator<Row> rowIterator = sheet.iterator();
            while (rowIterator.hasNext())
            {
                Row row = rowIterator.next();
                Iterator<Cell> cellIterator = row.cellIterator();

                while (cellIterator.hasNext())
                {
                    Cell cell = cellIterator.next();
                    CellType type = cell.getCellType();
                    if(type.equals(CellType.NUMERIC)){
                        System.out.print(cell.getNumericCellValue() + "\t");
                    } else if(type.equals(CellType.STRING)){
                        System.out.print(cell.getStringCellValue() + "\t");
                    } else {
                        System.out.print("["+cell.getCellType().toString() + "]\t");
                    }
                }
                System.out.println("");
            }
            file.close();
        }
        catch (Exception e)
        {
            e.printStackTrace();
        }
    }

}
