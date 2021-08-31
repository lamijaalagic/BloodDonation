package com.example.springbootbackend.security;

import com.example.springbootbackend.model.UserData;
import com.example.springbootbackend.repository.UserDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthenticationController {

    @Autowired
    private UserDataRepository userRepository;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private NewUserDetailsService userDetailsService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/authenticate")
    public ResponseEntity<?> createToken(@RequestBody AuthenticationRQ request) throws Exception {

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
            );
        }
        catch (BadCredentialsException e) {
            throw new Exception("Incorrect username or password", e);
        }

        final UserDetails userDetails = userDetailsService.loadUserByUsername(request.getUsername());

        final String token = jwtUtil.generateToken(userDetails);

        return ResponseEntity.ok(new AuthenticationRS(token));
    }

    @PostMapping("/validate-token")
    public ResponseEntity<?> validateToken(@RequestBody ValidationRQ validationRQ) throws Exception {

        UserDetails userDetails = userDetailsService.loadUserByUsername(validationRQ.getUsername());

        if(!jwtUtil.validateToken(validationRQ.getToken(), userDetails)) {
            throw new BadCredentialsException("Incorrect username or password") ;
        }

        UserData user = userRepository.findByUsername(validationRQ.getUsername());
        return new ResponseEntity<>(new ValidationRS(userDetails.getUsername(), userDetails.getPassword(), userDetails.getAuthorities().stream().findFirst().get().getAuthority(), user.getRole().getRoleName(), user.getId()), HttpStatus.OK);
    }
}
