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

/**
 * Servlet implementation class reset
 */
@WebServlet("/reset")
public class reset extends HttpServlet {
	private static final long serialVersionUID = 1L;
    private static final String query="select * from users where reset_token=? and token_expiry > now()";
    private static final String query1="update users set password=? reset_token=null,token_expiry=null where reset_token=?";
   	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out=response.getWriter();
		response.setContentType("text/html");
		String token=request.getParameter("token");
		String newPassword=request.getParameter("newPassword");
		try {
			Class.forName("com:mysql:jdbc:Driver");
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		try(Connection con=DriverManager.getConnection("jdbc:mysql:///users","root","Indhumathi&2356");
				PreparedStatement ps1=con.prepareStatement(query);){
			ps1.setString(1, token);
			ResultSet rs=ps1.executeQuery("select * from users");
			if(rs.next())
			{
				PreparedStatement updatepassword=con.prepareStatement(query1);
				updatepassword.setString(1, newPassword);
				updatepassword.setString(2, token);
				updatepassword.executeUpdate();
				out.println("password reset successful");
			}
			else
			{
				out.println("invalid or expired token");
			}
		} catch (SQLException se) {
			// TODO Auto-generated catch block
			out.println(se.getMessage());
			se.printStackTrace();
		}
		catch(Exception e)
		{
			out.println(e.getMessage());
			e.printStackTrace();
		}
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
