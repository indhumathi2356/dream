package com.example.log;

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
 * Servlet implementation class log
 */
@WebServlet("/log")
public class log extends HttpServlet {
	private static final long serialVersionUID = 1L;
      private static final String query="insert into log(email,password)values(?,?)"; 
    	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out=response.getWriter();
		response.setContentType("text/html");
		String email=request.getParameter("email");
		String password=request.getParameter("password");
		try {
			Class.forName("com.mysql.jdbc.Driver");
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		try(Connection con=DriverManager.getConnection("jdbc:mysql:///log","root","Indhumathi&2356");
				PreparedStatement ps=con.prepareStatement(query);){
			ps.setString(1, email);
			ps.setString(2, password);
			ResultSet rs=ps.executeQuery("select * from log.log");
			if(rs.next())
			{
				out.print("login has been successfully");
				request.getRequestDispatcher("wel").include(request, response);			
				}
			else
			{
				out.print("login failed");
				request.getRequestDispatcher("login.html").include(request, response);
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
