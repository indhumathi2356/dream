package com.example.reset;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.example.exchange.CrossOrigin;
import com.example.log.RequestMapping;
import com.example.log.RestController;

/**
 * Servlet implementation class reset
 */
@WebServlet("/reset")
@RestController
@RequestMapping("/api")
@CrossOrigin(origin="http://localhost:5000")
public class reset extends HttpServlet {
    private static final long serialVersionUID = 1L;
    private static final String query = "SELECT * FROM users WHERE reset_token=? AND token_expiry > NOW()";
    private static final String query1 = "UPDATE users SET password=?, reset_token=NULL, token_expiry=NULL WHERE reset_token=?";

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        PrintWriter out = response.getWriter();
        response.setContentType("text/html");

        String token = request.getParameter("token");
        String newPassword = request.getParameter("newPassword");

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
            out.println("JDBC Driver not found");
            return;
        }

        try (Connection con = DriverManager.getConnection("jdbc:mysql:///users", "root", "Indhumathi&2356");
             PreparedStatement ps1 = con.prepareStatement(query)) {

            ps1.setString(1, token);
            ResultSet rs = ps1.executeQuery(); 

            if (rs.next()) {
                PreparedStatement updatePassword = con.prepareStatement(query1);
                updatePassword.setString(1, newPassword); 
                updatePassword.setString(2, token);     
                int rows = updatePassword.executeUpdate();

                if (rows > 0) {
                    out.println("Password reset successful");
                } else {
                    out.println("Failed to reset password");
                }
            } else {
                out.println("Invalid or expired token");
            }
            ps1.close();
        } catch (SQLException se) {
            out.println("SQL Error: " + se.getMessage());
            se.printStackTrace();
        } catch (Exception e) {
            out.println("Error: " + e.getMessage());
            e.printStackTrace();
        }
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doGet(request, response);
    }
}