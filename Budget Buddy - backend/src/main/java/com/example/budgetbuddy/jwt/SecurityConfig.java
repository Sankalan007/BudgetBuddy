package com.example.budgetbuddy.jwt;

import jakarta.servlet.Filter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.BeanIds;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.WebSecurityConfigurer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

// Configuration classes in Spring Boot can be considered as a form of metadata that provides instructions to the Spring framework on how to configure and initialize the application context. They serve as a blueprint for the Spring container to create and wire beans, manage dependencies, and configure various aspects of the application.
// Bean Definition Metadata: Configuration classes define beans by annotating methods with @Bean or classes with specific stereotype annotations like @Component, @Service, @Repository, or @Controller. These annotations act as metadata that informs the Spring container about the existence of a bean and how it should be instantiated and configured.
@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    @Autowired
    private UserDetailsService userDetailsService;
//    private  final JwtFilter jwtFilter;


    // The authenticationManager method takes an AuthenticationConfiguration object as a parameter and returns an AuthenticationManager instance.
    //
    // The AuthenticationConfiguration class is part of the Spring Security framework and provides configuration-related methods and options for authentication. It contains the necessary information and settings to create and configure an AuthenticationManager instance.
    //
    // The getAuthenticationManager() method is called on the authenticationConfiguration object, which retrieves the pre-configured AuthenticationManager instance. This method is typically used to obtain the AuthenticationManager configured by Spring Security based on the provided authentication configuration.
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration)throws Exception{
        return authenticationConfiguration.getAuthenticationManager();
    }

    // Creates an instance of BCryptPasswordEncoder to be used in configuration
    //
    // The purpose of a password encoder is to securely hash and verify passwords. In this case, `BCryptPasswordEncoder` uses the bcrypt algorithm, which is a widely adopted and secure hashing algorithm. By returning an instance of `BCryptPasswordEncoder`, the method ensures that passwords in the application are properly hashed and can be securely stored and verified.
    @Bean
    PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
    @Bean
    public JwtFilter jwtFilter() {
        return  new JwtFilter();
    }

    // The filterChain method is responsible for configuring the security filters that will be applied to the HTTP requests in your application. By defining it as a @Bean method, you are instructing Spring to create an instance of SecurityFilterChain and register it as a bean in the application context.
    //
    // The reason for defining the filterChain method as a bean is to allow Spring to manage the lifecycle and configuration of the security filter chain. By registering it as a bean, you can take advantage of Spring's automatic configuration and wiring mechanisms.
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity)throws Exception{
        httpSecurity
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeRequests()
                .requestMatchers("api/v1/auth/**","api/v1/**")
                .permitAll()
                .anyRequest()
                .authenticated()
                .and()
                .exceptionHandling(Customizer.withDefaults())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
        httpSecurity.addFilterBefore(jwtFilter(),UsernamePasswordAuthenticationFilter.class);
        return httpSecurity.build();
    }

}


// This class is used to tell spring boot application how to configure the security
