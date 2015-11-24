/**
 * 
 */
package org.accesingdata.async_method;

import static org.apache.http.conn.ssl.SSLSocketFactory.ALLOW_ALL_HOSTNAME_VERIFIER;

import java.security.KeyManagementException;
import java.security.KeyStoreException;
import java.security.NoSuchAlgorithmException;
import java.security.UnrecoverableKeyException;
import java.security.cert.X509Certificate;
import java.util.concurrent.Future;

import javax.net.ssl.SSLContext;

import org.apache.http.conn.scheme.Scheme;
import org.apache.http.conn.ssl.SSLConnectionSocketFactory;
import org.apache.http.conn.ssl.SSLSocketFactory;
import org.apache.http.conn.ssl.TrustStrategy;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.ssl.SSLContexts;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.scheduling.annotation.AsyncResult;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

/**
 * @author njg5kor
 * 
 *         The FacebookLookupService class uses Spring’s RestTemplate to invoke
 *         a remote REST point (graph.facebook.com), and then convert the answer
 *         into a Page object.
 * 
 *         The class is marked with the @Service annotation, making it a
 *         candidate for Spring’s component scanning to detect it and add it to
 *         the application context.
 * 
 *         The findPage method is flagged with Spring’s @Async annotation,
 *         indicating it will run on a separate thread. The method’s return type
 *         is Future<Page> instead of Page, a requirement for any asynchronous
 *         service. This code uses the concrete implementation of AsyncResult to
 *         wrap the results of the Facebook query.
 */
@Service
public class FacebookLookupService {

	RestTemplate restTemplate = new RestTemplate();

	public Future<Page> findPage(String page) throws InterruptedException, KeyManagementException, UnrecoverableKeyException, NoSuchAlgorithmException, KeyStoreException {
		System.out.println("Looking up:" + page);
		
		
		/*HttpComponentsClientHttpRequestFactory requestFactory = 
			      new HttpComponentsClientHttpRequestFactory();
			    DefaultHttpClient httpClient = (DefaultHttpClient) requestFactory.getHttpClient();*/
			    TrustStrategy acceptingTrustStrategy = new TrustStrategy() {
			    @Override
			        public boolean isTrusted(X509Certificate[] certificate, String authType) {
			            return true;
			        }
			    };
			    //SSLSocketFactory sf = new SSLSocketFactory(acceptingTrustStrategy, ALLOW_ALL_HOSTNAME_VERIFIER);
			   // httpClient.getConnectionManager().getSchemeRegistry().register(new Scheme("https", 443, sf));
		
			    SSLContext sslcontext = SSLContexts.createSystemDefault();

			 // Allow TLSv1 protocol only
			 SSLConnectionSocketFactory s = new SSLConnectionSocketFactory(
			         sslcontext,
			         new String[] { "TLSv1" },
			         null,
			         SSLConnectionSocketFactory.BROWSER_COMPATIBLE_HOSTNAME_VERIFIER);
			    
			   
			    
			   // CloseableHttpClient httpClient1 = HttpClientBuilder.create().build();
			    
			    CloseableHttpClient httpclient1 = HttpClients.custom().setSSLSocketFactory(sf).build();
			    
		
		Page results = restTemplate
				.getForObject("https://graph.facebook.com/" + page, Page.class);
		Thread.sleep(1000L);
		return new AsyncResult<Page>(results);
	}

}
