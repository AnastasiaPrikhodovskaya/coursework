package com.prihodovskaya.marketing.services;

import com.prihodovskaya.marketing.models.subject.Order;
import com.prihodovskaya.marketing.repository.OrdersRepository;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

import static org.apache.poi.ss.util.CellUtil.createCell;

public final class ReportService {
    private static ReportService instance;

    public List<Order> orders;

    private XSSFWorkbook workbook;
    private XSSFSheet sheet;

    private ReportService(List<Order> orders) {
        this.orders = orders;

        try {
            workbook = new XSSFWorkbook();
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }

    public static ReportService getInstance(List<Order> orders) {
        if (instance == null) {
            instance = new ReportService(orders);
        }
        return instance;
    }

    private void writeHeaderLine() {
        sheet = workbook.createSheet("Отчет по вашим исследованиям");

        Row row = sheet.createRow(0);

        CellStyle style = workbook.createCellStyle();
        XSSFFont font = workbook.createFont();
        font.setBold(true);
        font.setFontHeight(16);
        style.setFont(font);

        createCell(row, 0, "User ID", style);
        createCell(row, 1, "E-mail", style);
        createCell(row, 2, "Full Name", style);
        createCell(row, 3, "Roles", style);
        createCell(row, 4, "Enabled", style);

    }

    public String writeToDisk() {
        writeHeaderLine();
        return null;
    }
}