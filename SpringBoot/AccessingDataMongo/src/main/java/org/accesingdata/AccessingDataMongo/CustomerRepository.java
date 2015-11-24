/**
 * 
 */
package org.accesingdata.AccessingDataMongo;

import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * @author njg5kor
 *
 */
//@RepositoryRestResource( collectionResourceRel = "customer", path = "customer" )
public interface CustomerRepository extends MongoRepository<Customer,String>{

	/*public Customer findByFirstName(@Param("name")String name);
	
	public Customer findByLastName(@Param("name")String name);*/
	
	public Customer findByFirstName(String firstName);
	
	public java.util.List<Customer> findByLastName(String lastName);
	
	
}
