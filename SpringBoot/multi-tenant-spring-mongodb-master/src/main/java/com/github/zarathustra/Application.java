package com.github.zarathustra;

import java.time.LocalDate;
import java.time.Month;
import java.time.temporal.ChronoUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.core.MongoTemplate;

import com.github.zarathustra.domain.Person;
import com.github.zarathustra.mongo.MultiTenantMongoDbFactory;
import com.github.zarathustra.service.PersonRepository;
import com.mongodb.Mongo;

@Configuration
@EnableAutoConfiguration
public class Application implements CommandLineRunner {

    @Autowired
    MongoTemplate mongoTemplate;

    @Autowired
    PersonRepository personRepository;

    @Bean
    public MongoTemplate mongoTemplate(final Mongo mongo) throws Exception {
        return new MongoTemplate(mongoDbFactory(mongo));
    }

    @Bean
    public MultiTenantMongoDbFactory mongoDbFactory(final Mongo mongo) throws Exception {
        return new MultiTenantMongoDbFactory(mongo, "default");
    }

//    just to make it as simple as possible.
    private Person createPerson(final String name, final String surename, final long age) {
        Person p = new Person();
        p.setName(name);
        p.setSurname(surename);
        p.setAge(age);
        return p;
    }

    @Override
    public void run(final String... args) throws Exception {
//        add something to the default database (test)
        this.personRepository.save(createPerson("Phillip default", "Wirth default", ChronoUnit.YEARS.between(
                LocalDate.of(1992, Month.FEBRUARY, 3),
                LocalDate.now())));

        System.out.println("data from test: " + this.personRepository.findAll());
//        okay? fine. - lets switch the database
        MultiTenantMongoDbFactory.setDatabaseNameForCurrentThread("Tenant#1");
        this.personRepository.save(createPerson("Phillip tenant1", "Wirth tenant 1", ChronoUnit.YEARS.between(
                LocalDate.of(1992, Month.FEBRUARY, 3),
                LocalDate.now())));

//        should be empty
        System.out.println("data from test666: " + this.personRepository.findAll());

//        switch back and clean up
        MultiTenantMongoDbFactory.setDatabaseNameForCurrentThread("Tenant#2");
        //this.personRepository.deleteAll();
        this.personRepository.save(createPerson("Phillip tenant2", "Wirth tenant2", ChronoUnit.YEARS.between(
                LocalDate.of(1992, Month.FEBRUARY, 3),
                LocalDate.now())));
    }


    public static void main(final String[] args) {
        SpringApplication.run(Application.class, args);
    }

}
