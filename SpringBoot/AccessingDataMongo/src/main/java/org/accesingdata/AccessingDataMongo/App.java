package org.accesingdata.AccessingDataMongo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * App
 *
 */
@SpringBootApplication
public class App implements CommandLineRunner
{
	@Autowired
	private CustomerRepository customerRepository;
	 /**
	    * @param args
	    */
	   public static void main( String[] args ) {
	      SpringApplication.run( App.class, args );
	   }

	@Override
	public void run(String... arg0) throws Exception {
		
		customerRepository.deleteAll();
		
		customerRepository.save(new Customer(1,"Anil","Jagadeesha"));
		customerRepository.save(new Customer(2,"Sheela","Jagadeesha"));
		customerRepository.save(new Customer(3,"Vishwanath","Jagadeesha"));
		customerRepository.save(new Customer(4,"Sandeep","Mayasandra"));
		
		
		
		// fetch all customers
				System.out.println("Customers found with findAll():");
				System.out.println("-------------------------------");
				for (Customer customer : customerRepository.findAll()) {
					System.out.println(customer);
				}
				System.out.println();

				// fetch an individual customer
				System.out.println("Customer found with findByFirstName('Anil'):");
				System.out.println("--------------------------------");
				System.out.println(customerRepository.findByFirstName("Anil"));

				System.out.println("Customers found with findByLastName('Jagadeesha'):");
				System.out.println("--------------------------------");
				for (Customer customer : customerRepository.findByLastName("Jagadeesha")) {
					System.out.println(customer);
				}
		
		
	}
}
