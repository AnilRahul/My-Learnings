package demo1;

import java.net.URL;
import java.io.*;
import javax.net.ssl.HttpsURLConnection;
 
public class demo1
{
  public static void main(String[] args)
  throws Exception
  {
    String httpsURL = "https://graph.facebook.com/me?fields=id,name&access_token=CAACEdEose0cBAFfJT8Ah70OCnlwKZCsZCU1eQAZCbDQyiAnDEAI1zwtkCvRZCTyzXu2kx7cN9e1k6mLPXmPHwApWgZCKfv9NKGmUW1YwiTpTZBzciJE2dh10wQ5KQO6L7BQAvYE3VBkwWQQvhEAbtXZAfBxZBLrI2EWZAZBKlZCfBtZBXEdZB97163TgyEb2dY95rPrMiJVLM1eEMyAbAKyZBLA9rA";
    URL myurl = new URL(httpsURL);
    HttpsURLConnection con = (HttpsURLConnection)myurl.openConnection();
    InputStream ins = con.getInputStream();
    InputStreamReader isr = new InputStreamReader(ins);
    BufferedReader in = new BufferedReader(isr);
 
    String inputLine;
 
    while ((inputLine = in.readLine()) != null)
    {
      System.out.println(inputLine);
    }
 
    in.close();
  }
}