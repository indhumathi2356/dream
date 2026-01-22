package com.example.register;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class register
 */
@WebServlet("/register")
public class register extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private static final String query="insert into register(name,email,password)values(?,?,?)";
   	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out=response.getWriter();
		response.setContentType("text/html");
		String name=request.getParameter("name");
		String email=request.getParameter("email");
		String password=request.getParameter("password");
		try {
			Class.forName("com.mysql.jdbc.Driver");
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		try(Connection con=DriverManager.getConnection("jdbc:mysql:///register","root","Indhumathi&2356");
				PreparedStatement ps=con.prepareStatement(query);){
			ps.setString(1, name);
			ps.setString(2, email);
			ps.setString(3, password);
			int i=ps.executeUpdate("update register set password='5678' where id=1");
			if(i>0)
			{
				out.println("register has been sucessfully");
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
