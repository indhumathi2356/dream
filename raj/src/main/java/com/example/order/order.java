package com.example.order;

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
 * Servlet implementation class order
 */
@WebServlet("/order")
public class order extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private static final String query="insert into order(orderId,email)values(?,?)";
   	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
   		PrintWriter out=response.getWriter();
		response.setContentType("text/html");
		String orderId=request.getParameter("orderId");
		String email=request.getParameter("email");
		try {
			Class.forName("com.mysql.jdbc.Driver");
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		try(Connection con=DriverManager.getConnection("jdbc:mysql:///ordernow","root","Indhumathi&2356");
				PreparedStatement ps=con.prepareStatement(query);){
			ps.setString(1, orderId);
			ps.setString(2, email);
			ResultSet rs=ps.executeQuery("select * from ordernow");
			if(rs.next())
			{
				out.print("order track has been success");
			}
			else
			{
				out.print("order track failed");
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
