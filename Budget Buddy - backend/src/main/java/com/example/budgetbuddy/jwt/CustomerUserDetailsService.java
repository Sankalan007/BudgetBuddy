package com.example.budgetbuddy.jwt;

import com.example.budgetbuddy.model.User;
import com.example.budgetbuddy.repo.UserRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Objects;

@Service
@RequiredArgsConstructor
@Slf4j
public class CustomerUserDetailsService implements UserDetailsService {
    private  final UserRepo userRepo;
    private User userDetail;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException{
        log.info("Inside loadUserByUsername{}",username);
        userDetail=userRepo.findByEmailId(username);
        if(!Objects.isNull(userDetail))
            return  new org.springframework.security.core.userdetails.User(userDetail.getEmail(),userDetail.getPassword()
                    ,new ArrayList<>());//The User used is pre-built one.userDetail is the database one.
        else  throw  new UsernameNotFoundException("User not found");
    }
    public User getUserDetail(){
        return userDetail;
    }
}
