package rsx.tp2;

import java.io.IOException;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;
import java.net.SocketException;
import java.net.UnknownHostException;


public class SendUDP {

	public static void main(String[] args) throws UnknownHostException, SocketException, IOException {
		DatagramSocket s=null;
		DatagramPacket p=null;
		InetAddress destination  = InetAddress.getByName(args[0]);
		int port = Integer.parseInt(args[1]);
		String message = args[2];
		p = new DatagramPacket(message.getBytes(), message.length(), destination, port);
		s = new DatagramSocket();
		
		s.send(p);
		s.close();
	}

}