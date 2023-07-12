package com.example.budgetbuddy.repo;

import com.example.budgetbuddy.model.User;
import com.example.budgetbuddy.wrapper.UserWrapper;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public interface UserRepo extends JpaRepository<User,Integer> {

    User findByEmailId(@Param("email") String email);
    List<UserWrapper>getAllUser();

    @Query("SELECT new com.example.budgetbuddy.wrapper.UserWrapper(u.id, u.firstName, u.lastName, u.email, u.userName, u.status) FROM User u WHERE u.role='admin'")
    Optional<UserWrapper> getAdmin();


    @Query("SELECT new com.example.budgetbuddy.wrapper.UserWrapper(u.id, u.firstName, u.lastName, u.email, u.userName, u.status) FROM User u WHERE u.role='user'")
    List<UserWrapper> getUsers();

    default List<UserWrapper> getAll() {
        Optional<UserWrapper> adminOptional = getAdmin();
        List<UserWrapper> users = getUsers();

        List<UserWrapper> allUsers = new ArrayList<>();

        adminOptional.ifPresent(allUsers::add);
        allUsers.addAll(users);

        return allUsers;
    }



    @Override
    Optional<User> findById(Integer integer);

    List<UserWrapper>getByUsername(@Param("username") String currentUser);
}