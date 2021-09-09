package com.example.springbootbackend.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
public class SecurityConfigurations extends WebSecurityConfigurerAdapter {

    @Autowired
    private NewUserDetailsService userDetailsService;

    @Autowired
    private JwtRequestFilter jwtRequestFilter;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors()
                .and()
                .csrf().disable()
                .authorizeRequests()
                .antMatchers(HttpMethod.POST,"/authenticate","/validate-token")
                .permitAll()

                .antMatchers(HttpMethod.PUT,"/transfusionTable/{id}")
                .hasAnyAuthority( "ADMIN","EMPLOYEE_DOCTOR", "EMPLOYEE_MEDICAL_TECH")

                .antMatchers(HttpMethod.PUT,"/donations/{id}")
                .hasAnyAuthority( "ADMIN","EMPLOYEE_DOCTOR")

                .antMatchers(HttpMethod.POST,"/transfusionTable")
                .hasAnyAuthority( "ADMIN","EMPLOYEE_DOCTOR", "EMPLOYEE_MEDICAL_TECH")

                .antMatchers(HttpMethod.POST,"/donations")
                .hasAnyAuthority( "ADMIN","EMPLOYEE_DOCTOR")

                .antMatchers(HttpMethod.DELETE,"/transfusionTable/{id}")
                .hasAnyAuthority( "ADMIN","EMPLOYEE_DOCTOR")


                .antMatchers(HttpMethod.GET, "/bloodType/**",
                        "/donations/**",
                        "/role/**",
                        "/transfusionTable/**",
                        "/user/username")
                .hasAnyAuthority( "ADMIN","EMPLOYEE_DOCTOR","EMPLOYEE_MEDICAL_TECH", "EMPLOYEE_HOSPITAL_MANAG" , "USER")

                .antMatchers(HttpMethod.GET,"/user/**")
                .hasAnyAuthority( "ADMIN","EMPLOYEE_DOCTOR", "EMPLOYEE_HOSPITAL_MANAG","EMPLOYEE_MEDICAL_TECH" )

                .antMatchers("/**")
                .hasAuthority("ADMIN")

                .anyRequest()
                .authenticated()
                .and()
                .exceptionHandling().and().sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);

    }

    @Bean
    CorsConfigurationSource corsConfigurationSource()
    {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("GET","POST", "PUT", "DELETE"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Override
    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(10);
    }


}
