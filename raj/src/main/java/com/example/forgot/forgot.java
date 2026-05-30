package com.example.forgot;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.UUID;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.example.exchange.CrossOrigin;
import com.example.log.RequestMapping;
import com.example.log.RestController;

/**
 * Servlet implementation class forgot
 */
@WebServlet("/forgot")
@RestController
@RequestMapping("/api")
@CrossOrigin(origin="http://localhost:5000")
public class forgot extends HttpServlet {
    private static final long serialVersionUID = 1L;

    private static final String query = 
        "UPDATE users SET reset_token=?, token_expiry=DATE_ADD(NOW(), INTERVAL 30 MINUTE) WHERE email=?";

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        PrintWriter out = response.getWriter();
        response.setContentType("text/html");

        String email = request.getParameter("email");
        if (email == null || email.isEmpty()) {
            out.println("Email is required");
            return;
        }

        String token = UUID.randomUUID().toString();

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
            out.println("JDBC Driver not found");
            return;
        }

        try (Connection con = DriverManager.getConnection("jdbc:mysql:///users", "root", "Indhumathi&2356");
             PreparedStatement ps = con.prepareStatement(query)) {

            ps.setString(1, token);
            ps.setString(2, email); 

            int rows = ps.executeUpdate(); 

            if (rows > 0) {
                String link = "http://localhost:5000/raj/reset.html?token=" + token;
                out.println("Reset link: " + link);
            } else {
                out.println("Email not found");
            }
            ps.close();
        } catch (SQLException se) {
            out.println("SQL Error: " + se.getMessage());
            se.printStackTrace();
        } catch (Exception e) {
            out.println("Error: " + e.getMessage());
            e.printStackTrace();
        }
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request, response);
    }
}